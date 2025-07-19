import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { VscColorMode } from "react-icons/vsc";
import { Type, Share2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { ColorButton, ColorPickerModal } from "./color-picker-modal";
import { ButtonConfig, RGBAValue, ThemeConfig, Typography } from "@/lib/types";
import { rgbaToHex } from "@/lib/utils";
import { useCallback } from "react";

type AppearanceTabProps = {
  theme: ThemeConfig;
  setTheme: React.Dispatch<React.SetStateAction<ThemeConfig>>;
};

const linearDirections = [
  { value: "to right", label: "Left to Right →" },
  { value: "to bottom", label: "Top to Bottom ↓" },
  { value: "to bottom right", label: "Diagonal ↘" },
  { value: "45deg", label: "45°" },
  { value: "90deg", label: "90°" },
  { value: "135deg", label: "135°" },
];

const radialPositions = [
  { value: "center", label: "Center" },
  { value: "top", label: "Top" },
  { value: "bottom", label: "Bottom" },
  { value: "top left", label: "Top Left" },
  { value: "top right", label: "Top Right" },
  { value: "circle at center", label: "Circle" },
];

const conicalDirections = [
  { value: "0deg", label: "0° (Top)" },
  { value: "45deg", label: "45°" },
  { value: "90deg", label: "90° (Right)" },
  { value: "135deg", label: "135°" },
  { value: "180deg", label: "180° (Bottom)" },
  { value: "225deg", label: "225°" },
  { value: "270deg", label: "270° (Left)" },
  { value: "315deg", label: "315°" },
];

export default function AppearanceTab({ theme, setTheme }: AppearanceTabProps) {
  const handleBackgroundChange = useCallback(
    (color: RGBAValue) => {
      setTheme((prev) => ({
        ...prev,
        background: { color: rgbaToHex(color) },
      }));
    },
    [setTheme]
  );

  const handleGradientColorChange = useCallback(
    (index: number, color: RGBAValue) => {
      setTheme((prev) => ({
        ...prev,
        background: {
          ...prev.background,
          gradient: {
            ...prev.background.gradient!,
            colors: prev.background.gradient!.colors.map((c, i) =>
              i === index ? rgbaToHex(color) : c
            ),
          },
        },
      }));
    },
    [setTheme]
  );

  const handleGradientToggle = useCallback(
    (enabled: boolean) => {
      setTheme((prev) => ({
        ...prev,
        background: {
          ...prev.background,
          gradient: {
            enabled,
            type: prev.background.gradient?.type || "linear",
            direction: prev.background.gradient?.direction || "to right",
            colors: prev.background.gradient?.colors || ["#3b82f6", "#8b5cf6"],
          },
        },
      }));
    },
    [setTheme]
  );

  const handleGradientTypeChange = useCallback(
    (type: "linear" | "radial" | "conic") => {
      setTheme((prev) => ({
        ...prev,
        background: {
          ...prev.background,
          gradient: {
            ...prev.background.gradient!,
            type,
            direction:
              type === "linear"
                ? "to right"
                : type === "radial"
                ? "center"
                : "0deg",
          },
        },
      }));
    },
    [setTheme]
  );

  const handleGradientDirectionChange = useCallback(
    (direction: string) => {
      setTheme((prev) => ({
        ...prev,
        background: {
          ...prev.background,
          gradient: {
            ...prev.background.gradient!,
            direction,
          },
        },
      }));
    },
    [setTheme]
  );

  const handleButtonChange = useCallback(
    (newConfig: ButtonConfig) => {
      setTheme((prev) => ({
        ...prev,
        button: {
          ...prev.button,
          backgroundColor: newConfig.backgroundColor,
          textColor: newConfig.textColor,
          size: newConfig.size,
          shape: newConfig.shape,
          variant: newConfig.variant,
        },
      }));
    },
    [setTheme]
  );

  const handleSocialBackgroundChange = useCallback(
    (color: RGBAValue) => {
      setTheme((prev) => ({
        ...prev,
        socialMedia: {
          ...prev.socialMedia,
          backgroundColor: rgbaToHex(color),
        },
      }));
    },
    [setTheme]
  );

  const handleSocialIconColorChange = useCallback(
    (color: RGBAValue) => {
      setTheme((prev) => ({
        ...prev,
        socialMedia: {
          ...prev.socialMedia,
          iconColor: rgbaToHex(color),
        },
      }));
    },
    [setTheme]
  );

  const handleTextColorChange = useCallback(
    (text: keyof ThemeConfig["text"], color: RGBAValue) => {
      setTheme((prev) => ({
        ...prev,
        text: {
          ...prev.text,
          [text]: {
            ...prev.text[text],
            color: rgbaToHex(color),
          },
        },
      }));
    },
    [setTheme]
  );

  const handleTextSizeChange = useCallback(
    (text: keyof ThemeConfig["text"], size: Typography["size"]) => {
      setTheme((prev) => ({
        ...prev,
        text: {
          ...prev.text,
          [text]: {
            ...prev.text[text],
            size: size,
          },
        },
      }));
    },
    [setTheme]
  );

  return (
    <>
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
              checked={theme.background.gradient?.enabled}
              onCheckedChange={handleGradientToggle}
            />
          </div>

          {theme.background.gradient?.enabled ? (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="mb-2">Gradient Type</Label>
                  <Select
                    value={theme.background.gradient.type}
                    onValueChange={handleGradientTypeChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="linear">
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-sm"></div>
                          Linear
                        </div>
                      </SelectItem>
                      <SelectItem value="radial">
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded-full bg-gradient-radial from-blue-500 to-purple-500"></div>
                          Radial
                        </div>
                      </SelectItem>
                      <SelectItem value="conic">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-4 h-4 rounded-full"
                            style={{
                              background:
                                "conic-gradient(from 0deg, #3b82f6, #8b5cf6, #3b82f6)",
                            }}></div>
                          Conic
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="mb-2">
                    {theme.background.gradient.type === "linear"
                      ? "Direction"
                      : theme.background.gradient.type === "radial"
                      ? "Position"
                      : "Angle"}
                  </Label>
                  <Select
                    value={theme.background.gradient.direction}
                    onValueChange={handleGradientDirectionChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent key={theme.background.gradient.type}>
                      {(theme.background.gradient.type === "linear"
                        ? linearDirections
                        : theme.background.gradient.type === "radial"
                        ? radialPositions
                        : conicalDirections
                      ).map((dir) => (
                        <SelectItem key={dir.value} value={dir.value}>
                          {dir.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-3">
                <Label className="text-sm font-medium">Gradient Colors</Label>
                <div className="grid grid-cols-2 gap-4">
                  <ColorPickerModal
                    title="First Gradient Color"
                    value={theme.background.gradient.colors[0]}
                    onChange={(color) => handleGradientColorChange(0, color)}>
                    <ColorButton
                      onClick={() => {}}
                      color={theme.background.gradient.colors[0]}
                      label="Start Color"
                    />
                  </ColorPickerModal>
                  <ColorPickerModal
                    title="Second Gradient Color"
                    value={theme.background.gradient.colors[1]}
                    onChange={(color) => handleGradientColorChange(1, color)}>
                    <ColorButton
                      onClick={() => {}}
                      color={theme.background.gradient.colors[1]}
                      label="End Color"
                    />
                  </ColorPickerModal>
                </div>
              </div>
            </>
          ) : (
            <div className="space-y-3">
              <Label className="text-sm font-medium">Background Color</Label>
              <ColorPickerModal
                title="Background Color"
                value={theme.background.color}
                onChange={handleBackgroundChange}>
                <ColorButton
                  onClick={() => {}}
                  color={theme.background.color}
                  label="Background Color"
                />
              </ColorPickerModal>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-sm"></div>
            </div>
            Button Customization
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Color Section */}
          <div className="space-y-4">
            <div className="text-sm font-medium text-foreground/90 border-b pb-2">
              Colors
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-xs font-medium text-muted-foreground">
                  Background
                </Label>
                <ColorPickerModal
                  title="Button Background Color"
                  value={theme.button.backgroundColor}
                  onChange={(color) =>
                    handleButtonChange({
                      ...theme.button,
                      backgroundColor: rgbaToHex(color),
                    })
                  }>
                  <ColorButton
                    onClick={() => {}}
                    color={theme.button.backgroundColor}
                    label="Background"
                  />
                </ColorPickerModal>
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-medium text-muted-foreground">
                  Text
                </Label>
                <ColorPickerModal
                  title="Button Text Color"
                  value={theme.button.textColor}
                  onChange={(color) =>
                    handleButtonChange({
                      ...theme.button,
                      textColor: rgbaToHex(color),
                    })
                  }>
                  <ColorButton
                    onClick={() => {}}
                    color={theme.button.textColor}
                    label="Text"
                  />
                </ColorPickerModal>
              </div>
            </div>
          </div>

          {/* Style Section */}
          <div className="space-y-4">
            <div className="text-sm font-medium text-foreground/90 border-b pb-2">
              Style
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-xs font-medium text-muted-foreground">
                  Variant
                </Label>
                <Select
                  value={theme.button.variant}
                  onValueChange={(value) =>
                    handleButtonChange({
                      ...theme.button,
                      variant: value as ButtonConfig["variant"],
                    })
                  }>
                  <SelectTrigger className="h-9 w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-primary rounded-sm"></div>
                        Default
                      </div>
                    </SelectItem>
                    <SelectItem value="ghost">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 border-2 border-dashed border-primary rounded-sm"></div>
                        Ghost
                      </div>
                    </SelectItem>
                    <SelectItem value="outline">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 border-2 border-primary rounded-sm"></div>
                        Outline
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-medium text-muted-foreground">
                  Shape
                </Label>
                <Select
                  value={theme.button.shape}
                  onValueChange={(value) =>
                    handleButtonChange({
                      ...theme.button,
                      shape: value as ButtonConfig["shape"],
                    })
                  }>
                  <SelectTrigger className="h-9 w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-primary rounded"></div>
                        Default
                      </div>
                    </SelectItem>
                    <SelectItem value="square">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-primary"></div>
                        Square
                      </div>
                    </SelectItem>
                    <SelectItem value="pill">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-primary rounded-full"></div>
                        Pill
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Size Section */}
          <div className="space-y-4">
            <div className="text-sm font-medium text-foreground/90 border-b pb-2">
              Size
            </div>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() =>
                  handleButtonChange({
                    ...theme.button,
                    size: "sm",
                  })
                }
                className={`p-2 rounded-md border transition-all ${
                  theme.button.size === "sm"
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border hover:border-primary/50"
                }`}>
                <div className="text-xs font-medium">Small</div>
                <div className="w-full h-6 bg-current/20 rounded mt-1"></div>
              </button>

              <button
                onClick={() =>
                  handleButtonChange({
                    ...theme.button,
                    size: "default",
                  })
                }
                className={`p-2 rounded-md border transition-all ${
                  theme.button.size === "default"
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border hover:border-primary/50"
                }`}>
                <div className="text-xs font-medium">Default</div>
                <div className="w-full h-8 bg-current/20 rounded mt-1"></div>
              </button>

              <button
                onClick={() =>
                  handleButtonChange({
                    ...theme.button,
                    size: "lg",
                  })
                }
                className={`p-2 rounded-md border transition-all ${
                  theme.button.size === "lg"
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border hover:border-primary/50"
                }`}>
                <div className="text-xs font-medium">Large</div>
                <div className="w-full h-10 bg-current/20 rounded mt-1"></div>
              </button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Type className="w-5 h-5" />
            Typography & Colors
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Social Media Section */}
          <div className="space-y-4">
            <div className="text-sm font-medium text-foreground/90 border-b pb-2 flex items-center gap-2">
              <Share2 className="w-4 h-4" />
              Social Media
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-xs font-medium text-muted-foreground">
                  Background
                </Label>
                <ColorPickerModal
                  title="Social Media Background Color"
                  value={theme.socialMedia.backgroundColor || "#ffffff"}
                  onChange={handleSocialBackgroundChange}>
                  <ColorButton
                    onClick={() => {}}
                    color={theme.socialMedia.backgroundColor || "#ffffff"}
                    label="Background"
                  />
                </ColorPickerModal>
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-medium text-muted-foreground">
                  Icons
                </Label>
                <ColorPickerModal
                  title="Social Media Icon Color"
                  value={theme.socialMedia.iconColor || "#000000"}
                  onChange={handleSocialIconColorChange}>
                  <ColorButton
                    onClick={() => {}}
                    color={theme.socialMedia.iconColor || "#000000"}
                    label="Icons"
                  />
                </ColorPickerModal>
              </div>
            </div>
          </div>

          {/* Text Colors Section */}
          <div className="space-y-4">
            <div className="text-sm font-medium text-foreground/90 border-b pb-2 flex items-center gap-2">
              <Type className="w-4 h-4" />
              Text
            </div>
            <div className="grid grid-cols-2 gap-4">
              {/* Profile Name */}
              <div className="space-y-2">
                <Label className="text-xs font-medium text-muted-foreground">
                  Profile Name
                </Label>
                <ColorPickerModal
                  title="Profile Name"
                  value={theme.text.profileName.color}
                  onChange={(color) =>
                    handleTextColorChange("profileName", color)
                  }>
                  <ColorButton
                    onClick={() => {}}
                    color={theme.text.profileName.color}
                    label="Profile Name Color"
                  />
                </ColorPickerModal>
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-medium text-muted-foreground">
                  Text Size
                </Label>
                <Select
                  value={theme.text.profileName.size}
                  onValueChange={(value) =>
                    handleTextSizeChange(
                      "profileName",
                      value as Typography["size"]
                    )
                  }>
                  <SelectTrigger className="h-9 w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="base">Default</SelectItem>
                    <SelectItem value="sm">Small</SelectItem>
                    <SelectItem value="lg">Large</SelectItem>
                    <SelectItem value="xl">XL</SelectItem>
                    <SelectItem value="2xl">2XL</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Profile Username */}
              <div className="space-y-2">
                <Label className="text-xs font-medium text-muted-foreground">
                  Profile Username
                </Label>
                <ColorPickerModal
                  title="Profile Username"
                  value={theme.text.profileUsername.color}
                  onChange={(color) =>
                    handleTextColorChange("profileUsername", color)
                  }>
                  <ColorButton
                    onClick={() => {}}
                    color={theme.text.profileUsername.color}
                    label="Profile Username Color"
                  />
                </ColorPickerModal>
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-medium text-muted-foreground">
                  Text Size
                </Label>
                <Select
                  value={theme.text.profileUsername.size}
                  onValueChange={(value) =>
                    handleTextSizeChange(
                      "profileUsername",
                      value as Typography["size"]
                    )
                  }>
                  <SelectTrigger className="h-9 w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="base">Default</SelectItem>
                    <SelectItem value="sm">Small</SelectItem>
                    <SelectItem value="lg">Large</SelectItem>
                    <SelectItem value="xl">XL</SelectItem>
                    <SelectItem value="2xl">2XL</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Profile Bio */}
              <div className="space-y-2">
                <Label className="text-xs font-medium text-muted-foreground">
                  Profile Bio
                </Label>
                <ColorPickerModal
                  title="Profile Bio"
                  value={theme.text.bio.color}
                  onChange={(color) => handleTextColorChange("bio", color)}>
                  <ColorButton
                    onClick={() => {}}
                    color={theme.text.bio.color}
                    label="Profile Bio Color"
                  />
                </ColorPickerModal>
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-medium text-muted-foreground">
                  Text Size
                </Label>
                <Select
                  value={theme.text.bio.size}
                  onValueChange={(value) =>
                    handleTextSizeChange("bio", value as Typography["size"])
                  }>
                  <SelectTrigger className="h-9 w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="base">Default</SelectItem>
                    <SelectItem value="sm">Small</SelectItem>
                    <SelectItem value="lg">Large</SelectItem>
                    <SelectItem value="xl">XL</SelectItem>
                    <SelectItem value="2xl">2XL</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
