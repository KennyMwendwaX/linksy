export type RGBAValue = [number, number, number, number];

export interface ThemeColors {
  background: string;
  backgroundGradient?: {
    enabled: boolean;
    type: "linear" | "radial";
    direction: string;
    colors: string[];
  };
  buttonPrimary: string;
  buttonSecondary: string;
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
