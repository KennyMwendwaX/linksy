export type RGBAValue = [number, number, number, number];

export interface ButtonConfig {
  backgroundColor: string;
  textColor: string;
  size: "sm" | "default" | "lg";
  shape: "default" | "square" | "pill";
  variant: "default" | "ghost" | "outline";
}

export interface ThemeColors {
  background: string;
  backgroundGradient?: {
    enabled: boolean;
    type: "linear" | "radial";
    direction: string;
    colors: string[];
  };
  buttonPrimary: ButtonConfig;
  buttonSecondary: ButtonConfig;
  buttonTertiary: ButtonConfig;
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
  id: string;
  title: string;
  url: string;
  icon: string;
  visible: boolean;
  order: number;
}
