export type RGBAValue = [number, number, number, number];

export interface BackgroundGradientConfig {
  enabled: boolean;
  type: "linear" | "radial" | "conic";
  direction: string;
  colors: string[];
}

export interface BackgroundConfig {
  color: string;
  gradient?: BackgroundGradientConfig;
}

export interface ButtonConfig {
  backgroundColor: string;
  textColor: string;
  size: "sm" | "default" | "lg";
  shape: "default" | "square" | "pill";
  variant: "default" | "ghost" | "outline";
}

export interface ThemeColors {
  background: BackgroundConfig;
  button: ButtonConfig;
  linkColor: string;
  textColor: string;
}

export interface ProfileData {
  name: string;
  username: string;
  bio: string;
  avatar: string;
}

export interface LinkItem {
  status: "active" | "inactive" | "expired" | "archived";
  id: number;
  name: string;
  originalUrl: string;
  slug: string;
  order: number;
}
