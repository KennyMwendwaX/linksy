// lib/default-theme.ts
import { ThemeConfig } from "@/lib/types";

export const defaultTheme: ThemeConfig = {
  background: {
    color: "#0f0f23",
    gradient: {
      enabled: true,
      type: "radial",
      direction: "circle at center",
      colors: ["#1e1b4b", "#312e81", "#1e293b", "#0f172a"],
    },
  },
  button: {
    backgroundColor: "#6366f1",
    textColor: "#ffffff",
    size: "default",
    variant: "default",
    shape: "default",
  },
  socialMedia: {
    backgroundColor: "#8b5cf6",
    iconColor: "#ffffff",
  },
  text: {
    name: { color: "#f8fafc", size: "2xl" },
    username: { color: "#a78bfa", size: "base" },
    bio: { color: "#cbd5e1", size: "base" },
  },
};
