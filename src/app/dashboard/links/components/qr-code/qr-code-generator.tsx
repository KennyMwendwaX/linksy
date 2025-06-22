"use client";

import { useState, useCallback } from "react";
import QRCode from "react-qr-code";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Download, Copy, Share2, Check } from "lucide-react";

interface QRCodeGeneratorProps {
  url: string;
  size?: number;
  className?: string;
  showControls?: boolean;
}

export default function QRCodeGenerator({
  url,
  size = 200,
  className = "",
  showControls = true,
}: QRCodeGeneratorProps) {
  const [copied, setCopied] = useState<boolean>(false);

  const downloadQRCode = useCallback(async () => {
    const svg = document.getElementById(
      `qr-${url.replace(/[^a-zA-Z0-9]/g, "")}`
    );
    if (!svg) return;

    try {
      const svgData = new XMLSerializer().serializeToString(svg);
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();

      canvas.width = size * 2;
      canvas.height = size * 2;

      img.onload = () => {
        if (ctx) {
          ctx.fillStyle = "white";
          ctx.fillRect(0, 0, size * 2, size * 2);
          ctx.drawImage(img, 0, 0, size * 2, size * 2);

          const link = document.createElement("a");
          link.download = `qr-code-${
            new Date().toISOString().split("T")[0]
          }.png`;
          link.href = canvas.toDataURL("image/png", 1.0);
          link.click();
        }
      };

      img.src = "data:image/svg+xml;base64," + btoa(svgData);
    } catch (err) {
      console.error("Failed to download QR code:", err);
    }
  }, [url, size]);

  const copyQRCode = useCallback(async () => {
    const svg = document.getElementById(
      `qr-${url.replace(/[^a-zA-Z0-9]/g, "")}`
    );
    if (!svg) return;

    try {
      const svgData = new XMLSerializer().serializeToString(svg);
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();

      canvas.width = size * 2;
      canvas.height = size * 2;

      img.onload = async () => {
        if (ctx) {
          ctx.fillStyle = "white";
          ctx.fillRect(0, 0, size * 2, size * 2);
          ctx.drawImage(img, 0, 0, size * 2, size * 2);

          canvas.toBlob(async (blob) => {
            if (blob && navigator.clipboard && window.ClipboardItem) {
              await navigator.clipboard.write([
                new ClipboardItem({ "image/png": blob }),
              ]);
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }
          });
        }
      };

      img.src = "data:image/svg+xml;base64," + btoa(svgData);
    } catch (err) {
      console.error("Failed to copy QR code:", err);
    }
  }, [url, size]);

  const shareQRCode = useCallback(async () => {
    if (!navigator.share) return;

    const svg = document.getElementById(
      `qr-${url.replace(/[^a-zA-Z0-9]/g, "")}`
    );
    if (!svg) return;

    try {
      const svgData = new XMLSerializer().serializeToString(svg);
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();

      canvas.width = size * 2;
      canvas.height = size * 2;

      img.onload = async () => {
        if (ctx) {
          ctx.fillStyle = "white";
          ctx.fillRect(0, 0, size * 2, size * 2);
          ctx.drawImage(img, 0, 0, size * 2, size * 2);

          canvas.toBlob(async (blob) => {
            if (blob) {
              const file = new File([blob], "qr-code.png", {
                type: "image/png",
              });
              await navigator.share({
                title: "QR Code",
                text: `QR Code for ${url}`,
                files: [file],
              });
            }
          });
        }
      };

      img.src = "data:image/svg+xml;base64," + btoa(svgData);
    } catch (err) {
      console.error("Failed to share QR code:", err);
    }
  }, [url, size]);

  const qrId = `qr-${url.replace(/[^a-zA-Z0-9]/g, "")}`;
  const isShareSupported =
    typeof navigator !== "undefined" && "share" in navigator;

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex justify-center">
        <div className="p-4 bg-white dark:bg-background border rounded-lg">
          <QRCode
            id={qrId}
            value={url}
            size={size}
            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
          />
        </div>
      </div>

      {showControls && (
        <div className="flex justify-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="sm" onClick={downloadQRCode}>
                  <Download className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Download QR Code</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="sm" onClick={copyQRCode}>
                  {copied ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                {copied ? "Copied!" : "Copy QR Code"}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {isShareSupported && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="sm" onClick={shareQRCode}>
                    <Share2 className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Share QR Code</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      )}
    </div>
  );
}
