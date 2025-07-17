"use client";

import React, { useState, useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { debounce } from "lodash";
import { GripVertical, Plus, Trash2, User, Palette, Link2 } from "lucide-react";
import { VscColorMode } from "react-icons/vsc";
import {
  ColorPicker,
  ColorPickerAlpha,
  ColorPickerEyeDropper,
  ColorPickerFormat,
  ColorPickerHue,
  ColorPickerOutput,
  ColorPickerPreview,
  ColorPickerSelection,
} from "@/components/ui/color-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type RGBAValue = [number, number, number, number];

interface ThemeColors {
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

interface ProfileData {
  name: string;
  username: string;
  bio: string;
  avatar: string;
}

interface LinkItem {
  id: string;
  title: string;
  url: string;
  icon: string;
  visible: boolean;
  order: number;
}

const defaultTheme: ThemeColors = {
  background: "#ffffff",
  backgroundGradient: {
    enabled: false,
    type: "linear",
    direction: "to bottom right",
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

// Reusable Color Button Component
const ColorButton = ({ color, label }: { color: string; label: string }) => (
  <Button variant="secondary" className="flex items-center gap-2 w-full">
    <div
      className="w-6 h-6 rounded border"
      style={{ backgroundColor: color }}
    />
    <span className="text-sm">{label}</span>
  </Button>
);

// Single Color Picker Modal
const ColorPickerModal = ({
  title,
  value,
  onChange,
  children,
}: {
  title: string;
  value: string;
  onChange: (color: RGBAValue) => void;
  children: React.ReactNode;
}) => {
  const debouncedOnChange = useMemo(
    () => debounce((newColor: RGBAValue) => onChange(newColor), 16),
    [onChange]
  );

  const handleColorChange = useCallback(
    (color: RGBAValue) => {
      debouncedOnChange(color);
    },
    [debouncedOnChange]
  );

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <ColorPicker
            defaultValue={value}
            onChange={handleColorChange}
            className="space-y-3">
            <ColorPickerSelection />
            <div className="flex items-center gap-2">
              <ColorPickerEyeDropper />
              <ColorPickerPreview />
              <div className="grid w-full gap-2">
                <ColorPickerHue />
                <ColorPickerAlpha />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <ColorPickerOutput />
              <ColorPickerFormat />
            </div>
          </ColorPicker>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const ProfilePreview = ({
  theme,
  profile,
  links,
}: {
  theme: ThemeColors;
  profile: ProfileData;
  links: LinkItem[];
}) => {
  console.log("Rendering ProfilePreview with theme:", theme);

  const backgroundStyle = useMemo(() => {
    if (theme.backgroundGradient?.enabled) {
      const { type, direction, colors } = theme.backgroundGradient;
      const gradientType =
        type === "linear" ? "linear-gradient" : "radial-gradient";

      const gradientDirection =
        type === "linear" ? direction : `circle at ${direction}`;

      return {
        background: `${gradientType}(${gradientDirection}, ${colors.join(
          ", "
        )})`,
      };
    }
    return { backgroundColor: theme.background };
  }, [theme]);

  const visibleLinks = links
    .filter((link) => link.visible)
    .sort((a, b) => a.order - b.order);

  return (
    <div
      className="rounded-lg border p-6 space-y-4 min-h-[500px]"
      style={{
        ...backgroundStyle,
        color: theme.textColor,
      }}>
      <div className="text-center space-y-2">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 mx-auto" />
        <h3 className="text-lg font-semibold">{profile.name}</h3>
        <p className="text-sm opacity-80">@{profile.username}</p>
        {profile.bio && (
          <p className="text-sm opacity-90 max-w-xs mx-auto">{profile.bio}</p>
        )}
      </div>

      <div className="space-y-3">
        {visibleLinks.slice(0, 2).map((link) => (
          <button
            key={link.id}
            className="w-full text-white rounded p-2"
            style={{
              backgroundColor:
                link.order === 1 ? theme.buttonPrimary : theme.buttonSecondary,
            }}>
            {link.icon} {link.title}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {visibleLinks.slice(2).map((link) => (
          <a
            key={link.id}
            href="#"
            className="block p-2 rounded hover:opacity-80 transition-opacity"
            style={{ color: theme.linkColor }}>
            {link.icon} {link.title}
          </a>
        ))}
      </div>
    </div>
  );
};

const LinkOrderItem = ({
  link,
  onUpdate,
  onDelete,
}: {
  link: LinkItem;
  onUpdate: (id: string, updates: Partial<LinkItem>) => void;
  onDelete: (id: string) => void;
}) => {
  return (
    <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
      <GripVertical className="w-4 h-4 text-muted-foreground cursor-move" />
      <div className="flex-1 space-y-2">
        <div className="flex items-center gap-2">
          <Input
            value={link.icon}
            onChange={(e) => onUpdate(link.id, { icon: e.target.value })}
            className="w-12 h-8 text-center"
            placeholder="🔗"
          />
          <Input
            value={link.title}
            onChange={(e) => onUpdate(link.id, { title: e.target.value })}
            className="flex-1 h-8"
            placeholder="Link title"
          />
        </div>
        <Input
          value={link.url}
          onChange={(e) => onUpdate(link.id, { url: e.target.value })}
          className="w-full h-8"
          placeholder="https://example.com"
        />
      </div>
      <div className="flex items-center gap-2">
        <Switch
          checked={link.visible}
          onCheckedChange={(checked) => onUpdate(link.id, { visible: checked })}
        />
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDelete(link.id)}
          className="text-destructive hover:text-destructive">
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
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
    <div className="max-w-7xl mx-auto p-6">
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
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <VscColorMode className="w-5 h-5" />
                    Background
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Enable Gradient Background</Label>
                    <Switch
                      checked={theme.backgroundGradient?.enabled}
                      onCheckedChange={handleGradientToggle}
                    />
                  </div>

                  {theme.backgroundGradient?.enabled ? (
                    <>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="mb-2">Gradient Type</Label>
                          <Select
                            value={theme.backgroundGradient.type}
                            onValueChange={handleGradientTypeChange}>
                            <SelectTrigger className="w-full">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="linear">Linear</SelectItem>
                              <SelectItem value="radial">Radial</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label className="mb-2">Direction / Position</Label>
                          <Select
                            value={theme.backgroundGradient.direction}
                            onValueChange={handleGradientDirectionChange}>
                            <SelectTrigger className="w-full">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent key={theme.backgroundGradient.type}>
                              {(theme.backgroundGradient.type === "linear"
                                ? linearDirections
                                : radialPositions
                              ).map((dir) => (
                                <SelectItem key={dir.value} value={dir.value}>
                                  {dir.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <ColorPickerModal
                          title="First Gradient Color"
                          value={theme.backgroundGradient.colors[0]}
                          onChange={(color) =>
                            handleGradientColorChange(0, color)
                          }>
                          <ColorButton
                            color={theme.backgroundGradient.colors[0]}
                            label="First Color"
                          />
                        </ColorPickerModal>
                        <ColorPickerModal
                          title="Second Gradient Color"
                          value={theme.backgroundGradient.colors[1]}
                          onChange={(color) =>
                            handleGradientColorChange(1, color)
                          }>
                          <ColorButton
                            color={theme.backgroundGradient.colors[1]}
                            label="Second Color"
                          />
                        </ColorPickerModal>
                      </div>
                    </>
                  ) : (
                    <ColorPickerModal
                      title="Background Color"
                      value={theme.background}
                      onChange={handleBackgroundChange}>
                      <ColorButton
                        color={theme.background}
                        label="Background Color"
                      />
                    </ColorPickerModal>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Button Colors</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium mb-2 block">
                      Primary Button
                    </Label>
                    <ColorPickerModal
                      title="Primary Button Color"
                      value={theme.buttonPrimary}
                      onChange={handleButtonPrimaryChange}>
                      <ColorButton
                        color={theme.buttonPrimary}
                        label="Primary Button"
                      />
                    </ColorPickerModal>
                  </div>

                  <div>
                    <Label className="text-sm font-medium mb-2 block">
                      Secondary Button
                    </Label>
                    <ColorPickerModal
                      title="Secondary Button Color"
                      value={theme.buttonSecondary}
                      onChange={handleButtonSecondaryChange}>
                      <ColorButton
                        color={theme.buttonSecondary}
                        label="Secondary Button"
                      />
                    </ColorPickerModal>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Text Colors</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium mb-2 block">
                      Link Color
                    </Label>
                    <ColorPickerModal
                      title="Link Color"
                      value={theme.linkColor}
                      onChange={handleLinkColorChange}>
                      <ColorButton color={theme.linkColor} label="Link Color" />
                    </ColorPickerModal>
                  </div>

                  <div>
                    <Label className="text-sm font-medium mb-2 block">
                      Text Color
                    </Label>
                    <ColorPickerModal
                      title="Text Color"
                      value={theme.textColor}
                      onChange={handleTextColorChange}>
                      <ColorButton color={theme.textColor} label="Text Color" />
                    </ColorPickerModal>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="profile" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Display Name</Label>
                    <Input
                      value={profile.name}
                      onChange={(e) =>
                        setProfile((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      placeholder="Your display name"
                    />
                  </div>

                  <div>
                    <Label>Username</Label>
                    <Input
                      value={profile.username}
                      onChange={(e) =>
                        setProfile((prev) => ({
                          ...prev,
                          username: e.target.value,
                        }))
                      }
                      placeholder="username"
                    />
                  </div>

                  <div>
                    <Label>Bio</Label>
                    <Textarea
                      value={profile.bio}
                      onChange={(e) =>
                        setProfile((prev) => ({ ...prev, bio: e.target.value }))
                      }
                      placeholder="Tell people about yourself..."
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="links" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Link Management
                    <Button onClick={handleAddLink} size="sm" className="gap-2">
                      <Plus className="w-4 h-4" />
                      Add Link
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {links.map((link) => (
                      <LinkOrderItem
                        key={link.id}
                        link={link}
                        onUpdate={handleLinkUpdate}
                        onDelete={handleLinkDelete}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
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

        {/* Preview Panel */}
        <div className="lg:sticky lg:top-6">
          <Card>
            <CardHeader>
              <CardTitle>Live Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <ProfilePreview theme={theme} profile={profile} links={links} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
