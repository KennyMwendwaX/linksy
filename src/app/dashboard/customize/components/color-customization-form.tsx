"use client";

import React, { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Palette, Link2 } from "lucide-react";
import { LinkItem, ProfileData, RGBAValue, ThemeColors } from "@/lib/types";
import ProfilePreview from "./profile-preview";
import AppearanceTab from "./appearance-tab";
import ProfileTab from "./profile-tab";
import LinksTab from "./links-tab";

const defaultTheme: ThemeColors = {
  background: "#ffffff",
  backgroundGradient: {
    enabled: false,
    type: "linear",
    direction: "to right",
    colors: ["#3b82f6", "#8b5cf6"],
  },
  buttonPrimary: "#3b82f6",
  buttonSecondary: "#6b7280",
  linkColor: "#8b5cf6",
  textColor: "#1f2937",
};

const defaultProfile: ProfileData = {
  name: "John Doe",
  username: "johndoe",
  bio: "Full-stack developer | Coffee enthusiast | Building cool things",
  avatar: "",
};

const defaultLinks: LinkItem[] = [
  {
    id: "1",
    title: "My Website",
    url: "https://johndoe.com",
    icon: "🌐",
    visible: true,
    order: 1,
  },
  {
    id: "2",
    title: "Follow me on Twitter",
    url: "https://twitter.com/johndoe",
    icon: "🐦",
    visible: true,
    order: 2,
  },
  {
    id: "3",
    title: "Connect on LinkedIn",
    url: "https://linkedin.com/in/johndoe",
    icon: "💼",
    visible: true,
    order: 3,
  },
  {
    id: "4",
    title: "Send me an email",
    url: "mailto:john@johndoe.com",
    icon: "📧",
    visible: true,
    order: 4,
  },
  {
    id: "5",
    title: "My Portfolio",
    url: "https://portfolio.johndoe.com",
    icon: "📱",
    visible: false,
    order: 5,
  },
];

const rgbaToHex = (rgba: RGBAValue): string => {
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

const linearDirections = [
  { value: "to right", label: "Left to Right" },
  { value: "to bottom", label: "Top to Bottom" },
  { value: "90deg", label: "90°" },
];

const radialPositions = [
  { value: "center", label: "Center" },
  { value: "top", label: "Top" },
  { value: "bottom", label: "Bottom" },
  { value: "top left", label: "Top Left" },
];

export default function ColorCustomizationForm() {
  const [theme, setTheme] = useState<ThemeColors>(defaultTheme);
  const [profile, setProfile] = useState<ProfileData>(defaultProfile);
  const [links, setLinks] = useState<LinkItem[]>(defaultLinks);

  const handleBackgroundChange = useCallback((color: RGBAValue) => {
    setTheme((prev) => ({ ...prev, background: rgbaToHex(color) }));
  }, []);

  const handleGradientColorChange = useCallback(
    (index: number, color: RGBAValue) => {
      setTheme((prev) => ({
        ...prev,
        backgroundGradient: {
          ...prev.backgroundGradient!,
          colors: prev.backgroundGradient!.colors.map((c, i) =>
            i === index ? rgbaToHex(color) : c
          ),
        },
      }));
    },
    []
  );

  const handleGradientToggle = useCallback((enabled: boolean) => {
    setTheme((prev) => ({
      ...prev,
      backgroundGradient: {
        ...prev.backgroundGradient!,
        enabled,
      },
    }));
  }, []);

  const handleGradientTypeChange = useCallback((type: "linear" | "radial") => {
    setTheme((prev) => ({
      ...prev,
      backgroundGradient: {
        ...prev.backgroundGradient!,
        type,
        direction: type === "linear" ? "to right" : "center",
      },
    }));
  }, []);

  const handleGradientDirectionChange = useCallback((direction: string) => {
    setTheme((prev) => ({
      ...prev,
      backgroundGradient: {
        ...prev.backgroundGradient!,
        direction,
      },
    }));
  }, []);

  const handleButtonPrimaryChange = useCallback((color: RGBAValue) => {
    setTheme((prev) => ({ ...prev, buttonPrimary: rgbaToHex(color) }));
  }, []);

  const handleButtonSecondaryChange = useCallback((color: RGBAValue) => {
    setTheme((prev) => ({ ...prev, buttonSecondary: rgbaToHex(color) }));
  }, []);

  const handleLinkColorChange = useCallback((color: RGBAValue) => {
    setTheme((prev) => ({ ...prev, linkColor: rgbaToHex(color) }));
  }, []);

  const handleTextColorChange = useCallback((color: RGBAValue) => {
    setTheme((prev) => ({ ...prev, textColor: rgbaToHex(color) }));
  }, []);

  const handleLinkUpdate = useCallback(
    (id: string, updates: Partial<LinkItem>) => {
      setLinks((prev) =>
        prev.map((link) => (link.id === id ? { ...link, ...updates } : link))
      );
    },
    []
  );

  const handleLinkDelete = useCallback((id: string) => {
    setLinks((prev) => prev.filter((link) => link.id !== id));
  }, []);

  const handleAddLink = useCallback(() => {
    const newLink: LinkItem = {
      id: Date.now().toString(),
      title: "New Link",
      url: "https://example.com",
      icon: "🔗",
      visible: true,
      order: links.length + 1,
    };
    setLinks((prev) => [...prev, newLink]);
  }, [links.length]);

  const handleSave = useCallback(() => {
    console.log("Saving theme:", theme);
    console.log("Saving profile:", profile);
    console.log("Saving links:", links);
  }, [theme, profile, links]);

  const handleReset = useCallback(() => {
    setTheme(defaultTheme);
    setProfile(defaultProfile);
    setLinks(defaultLinks);
  }, []);

  return (
    <div className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Customize Your Profile</h1>
        <p className="text-muted-foreground">
          Personalize your public profile page with colors, content, and link
          organization.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Customization Form */}
        <div className="space-y-6">
          <Tabs defaultValue="appearance" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
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
            </TabsList>

            <TabsContent value="appearance" className="space-y-6">
              <AppearanceTab
                theme={theme}
                handleGradientToggle={handleGradientToggle}
                handleGradientTypeChange={handleGradientTypeChange}
                handleGradientDirectionChange={handleGradientDirectionChange}
                handleGradientColorChange={handleGradientColorChange}
                handleBackgroundChange={handleBackgroundChange}
                handleButtonPrimaryChange={handleButtonPrimaryChange}
                handleButtonSecondaryChange={handleButtonSecondaryChange}
                handleLinkColorChange={handleLinkColorChange}
                handleTextColorChange={handleTextColorChange}
                linearDirections={linearDirections}
                radialPositions={radialPositions}
              />
            </TabsContent>

            <TabsContent value="profile" className="space-y-6">
              <ProfileTab profile={profile} setProfile={setProfile} />
            </TabsContent>

            <TabsContent value="links" className="space-y-6">
              <LinksTab
                links={links}
                handleAddLink={handleAddLink}
                handleLinkUpdate={handleLinkUpdate}
                handleLinkDelete={handleLinkDelete}
              />
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
  );
}
