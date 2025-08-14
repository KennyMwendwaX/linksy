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

export interface Typography {
  size: "sm" | "base" | "lg" | "xl" | "2xl";
  color: string;
}

export interface TextConfig {
  name: Typography;
  username: Typography;
  bio: Typography;
}

export interface SocialMediaConfig {
  backgroundColor: string;
  iconColor: string;
}

export interface ThemeConfig {
  background: BackgroundConfig;
  button: ButtonConfig;
  socialMedia: SocialMediaConfig;
  text: TextConfig;
}

export interface ProfileData {
  name: string;
  username: string;
  image: string | null;
  bio: string;
}

export interface LinkItem {
  status: "active" | "inactive" | "expired" | "archived";
  id: number;
  name: string;
  originalUrl: string;
  slug: string;
  order: number;
  displayType: "button" | "social";
}
