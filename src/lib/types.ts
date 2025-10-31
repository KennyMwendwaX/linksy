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
  size: "sm" | "base" | "lg" | "xl" | "2xl" | "3xl";
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

export interface ProfileInfo {
  name: string;
  username: string;
  image: string | null | undefined;
  bio: string;
}
