"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Palette, Link2, Tags } from "lucide-react";
import { ProfileData, ThemeConfig } from "@/lib/types";
import ProfilePreview from "./profile-preview";
import AppearanceTab from "./appearance-tab";
import ProfileTab from "./profile-tab";
import LinksTab from "./links-tab";
import { useSession } from "@/lib/auth-client";
import { Link, ProfileCustomization } from "@/server/database/schema";
import SeoTab from "./seo-tab";

type Props = {
  customization: ProfileCustomization | undefined;
  activeLinks: Link[];
};

const defaultTheme: ThemeConfig = {
  background: {
    color: "#ffffff",
    gradient: {
      enabled: false,
      type: "linear",
      direction: "to right",
      colors: ["#72CE6D", "#2A6FEE"],
    },
  },
  button: {
    backgroundColor: "#3b82f6",
    textColor: "#ffffff",
    size: "default",
    shape: "default",
    variant: "default",
  },
  socialMedia: {
    backgroundColor: "#1DA1F2",
    iconColor: "#ffffff",
  },
  text: {
    name: {
      color: "#1f2937",
      size: "2xl",
    },
    username: {
      color: "#1f2937",
      size: "sm",
    },
    bio: {
      color: "#1f2937",
      size: "sm",
    },
  },
};

export default function ProfileCustomizationPage({
  customization,
  activeLinks,
}: Props) {
  const session = useSession();
  const user = session?.data?.user;

  // Use defaultTheme when customization.themeConfig is null or undefined
  const [theme, setTheme] = useState<ThemeConfig>(
    customization?.themeConfig ?? defaultTheme
  );

  // Initialize profile with user info and bio from customization
  const [profile, setProfile] = useState<ProfileData>({
    name: user?.name ?? "Guest User",
    username: user?.username ?? "guest_user",
    image: user?.image ?? "",
    bio: customization?.bio || "",
  });

  const [links, setLinks] = useState(activeLinks);

  const stableSetTheme = useCallback(
    (value: React.SetStateAction<ThemeConfig>) => {
      setTheme(value);
    },
    []
  );

  const handleSave = useCallback(() => {
    console.log("Saving theme:", theme);
    console.log("Saving profile:", profile);
    console.log("Saving links:", links);
  }, [theme, profile, links]);

  const handleReset = useCallback(() => {
    // Reset to original customization theme or default theme
    setTheme(customization?.themeConfig ?? defaultTheme);
    setProfile({
      name: user?.name ?? "Guest User",
      username: user?.username ?? "guest_user",
      image: user?.image ?? null,
      bio: customization?.bio || "",
    });
    setLinks(activeLinks);
  }, [
    activeLinks,
    customization?.themeConfig,
    customization?.bio,
    user?.name,
    user?.username,
    user?.image,
  ]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 lg:px-6 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:items-start">
          {/* Customization Form */}
          <div className="space-y-6">
            <div className="mb-6">
              <h1 className="text-2xl font-bold mb-2">
                Customize Your Profile
              </h1>
              <p className="text-muted-foreground">
                Personalize your public profile page with colors, content, and
                link organization.
              </p>
            </div>

            <Tabs defaultValue="appearance" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="appearance" className="gap-2">
                  <Palette className="w-4 h-4" />
                  Appearance
                </TabsTrigger>
                <TabsTrigger value="profile" className="gap-2">
                  <User className="w-4 h-4" />
                  Profile
                </TabsTrigger>
                <TabsTrigger value="links" className="gap-2">
                  <Link2 className="w-4 h-4" />
                  Links
                </TabsTrigger>
                <TabsTrigger value="seo" className="gap-2">
                  <Tags className="w-4 h-4" />
                  SEO
                </TabsTrigger>
              </TabsList>

              <TabsContent value="appearance" className="space-y-6">
                <AppearanceTab theme={theme} setTheme={stableSetTheme} />
              </TabsContent>

              <TabsContent value="profile" className="space-y-6">
                <ProfileTab profile={profile} setProfile={setProfile} />
              </TabsContent>

              <TabsContent value="links" className="space-y-6">
                <LinksTab
                  links={links}
                  setLinks={setLinks}
                  customization={customization}
                />
              </TabsContent>

              <TabsContent value="seo" className="space-y-6">
                <SeoTab />
              </TabsContent>
            </Tabs>

            <div className="flex gap-3">
              <Button onClick={handleSave} className="flex-1">
                Save Changes
              </Button>
              <Button onClick={handleReset} variant="outline">
                Reset All
              </Button>
            </div>
          </div>

          <ProfilePreview theme={theme} profile={profile} links={links} />
        </div>
      </div>
    </div>
  );
}
