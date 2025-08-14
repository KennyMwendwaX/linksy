"use client";

import React, { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Palette, Link2, Tags } from "lucide-react";
import { LinkItem, ProfileData, ThemeConfig } from "@/lib/types";
import ProfilePreview from "./profile-preview";
import AppearanceTab from "./appearance-tab";
import ProfileTab from "./profile-tab";
import LinksTab from "./links-tab";
import { useSession } from "@/lib/auth-client";
import { ProfileCustomization } from "@/server/database/schema";
import SeoTab from "./seo-tab";

type Props = {
  customization: ProfileCustomization | undefined;
};

const defaultTheme: ThemeConfig = {
  background: {
    color: "#ffffff",
    gradient: {
      enabled: false,
      type: "linear",
      direction: "to right",
      colors: ["#3b82f6", "#8b5cf6"],
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

const defaultLinks: LinkItem[] = [
  {
    id: 1,
    name: "Google Search",
    originalUrl: "https://www.google.com",
    slug: "google",
    status: "active",
    order: 1,
    displayType: "button", // Main link as button
  },
  {
    id: 2,
    name: "YouTube",
    originalUrl: "https://www.youtube.com",
    slug: "youtube",
    status: "active",
    order: 2,
    displayType: "button", // Main link as button
  },
  {
    id: 3,
    name: "X Profile",
    originalUrl: "https://x.com/yourprofile",
    slug: "x",
    status: "active",
    order: 3,
    displayType: "social", // Social media as social icon
  },
  {
    id: 4,
    name: "LinkedIn Profile",
    originalUrl: "https://linkedin.com/in/yourprofile",
    slug: "linkedin",
    status: "active",
    order: 4,
    displayType: "social", // Social media as social icon
  },
  {
    id: 5,
    name: "Facebook Page",
    originalUrl: "https://facebook.com/yourpage",
    slug: "facebook",
    status: "inactive",
    order: 5,
    displayType: "social", // Social media as social icon
  },
  {
    id: 6,
    name: "Instagram Profile",
    originalUrl: "https://instagram.com/yourprofile",
    slug: "instagram",
    status: "active",
    order: 6,
    displayType: "social", // Social media as social icon
  },
  {
    id: 7,
    name: "Portfolio Website",
    originalUrl: "https://yourname.dev",
    slug: "portfolio",
    status: "active",
    order: 7,
    displayType: "button", // Portfolio as button
  },
];

export default function ProfileCustomizationPage({ customization }: Props) {
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

  const [links, setLinks] = useState<LinkItem[]>(defaultLinks);

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
    setLinks(defaultLinks);
  }, [
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
                <LinksTab links={links} setLinks={setLinks} />
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
