import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { RGBAValue } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function truncateUrl(url: string, maxLength = 30): string {
  if (url.length <= maxLength) return url;

  const protocol = url.startsWith("https://")
    ? "https://"
    : url.startsWith("http://")
    ? "http://"
    : "";
  const withoutProtocol = protocol ? url.slice(protocol.length) : url;

  if (withoutProtocol.length <= maxLength - 3) return url;

  return protocol + withoutProtocol.slice(0, maxLength - 3) + "...";
}

export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toString();
}

export const rgbaToHex = (rgba: RGBAValue): string => {
  const [r, g, b, a] = rgba;
  const hex = (
    (1 << 24) +
    (Math.round(r) << 16) +
    (Math.round(g) << 8) +
    Math.round(b)
  )
    .toString(16)
    .slice(1);
  return a < 1 ? `rgba(${r}, ${g}, ${b}, ${a})` : `#${hex}`;
};
