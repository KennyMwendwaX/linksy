"use client";

import type React from "react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { QrCode, ExternalLink, Copy } from "lucide-react";
import QRCodeGenerator from "./qr-code-generator";

interface QRCodeDialogProps {
  shortUrl: string;
  originalUrl?: string;
  trigger?: React.ReactNode;
}

export function QRCodeDialog({
  shortUrl,
  originalUrl,
  trigger,
}: QRCodeDialogProps) {
  const [open, setOpen] = useState(false);
  const [, setUrlCopied] = useState(false);

  const copyUrl = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      setUrlCopied(true);
      setTimeout(() => setUrlCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy URL:", err);
    }
  };

  const defaultTrigger = (
    <Button variant="outline" size="sm" className="gap-2">
      <QrCode className="h-4 w-4" />
      QR Code
    </Button>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger || defaultTrigger}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <QrCode className="h-5 w-5" />
            QR Code
          </DialogTitle>
          <DialogDescription>
            Scan this QR code to visit the link.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <QRCodeGenerator url={shortUrl} size={200} showControls={true} />

          <div className="flex items-center space-x-2 p-3 bg-muted rounded-md">
            <div className="flex-1 min-w-0 overflow-hidden">
              <p className="text-sm font-mono break-all">{shortUrl}</p>
            </div>
            <div className="flex shrink-0 space-x-1">
              <Button variant="ghost" size="sm" onClick={copyUrl}>
                <Copy className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => window.open(shortUrl, "_blank")}>
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {originalUrl && (
            <div className="p-3 bg-muted/50 rounded-md border-dashed border">
              <p className="text-xs text-muted-foreground mb-1">
                Original URL:
              </p>
              <p className="text-xs text-muted-foreground break-all overflow-hidden">
                {originalUrl}
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
