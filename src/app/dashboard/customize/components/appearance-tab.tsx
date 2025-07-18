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
import { Label } from "@/components/ui/label";
import { ColorButton, ColorPickerModal } from "./color-picker-modal";
import { ButtonConfig, RGBAValue, ThemeColors } from "@/lib/types";
import { rgbaToHex } from "@/lib/utils";
import { useCallback } from "react";

type AppearanceTabProps = {
  theme: ThemeColors;
  setTheme: React.Dispatch<React.SetStateAction<ThemeColors>>;
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

export default function AppearanceTab({ theme, setTheme }: AppearanceTabProps) {
  const handleBackgroundChange = useCallback(
    (color: RGBAValue) => {
      setTheme((prev) => ({ ...prev, background: rgbaToHex(color) }));
    },
    [setTheme]
  );

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
    [setTheme]
  );

  const handleGradientToggle = useCallback(
    (enabled: boolean) => {
      setTheme((prev) => ({
        ...prev,
        backgroundGradient: {
          ...prev.backgroundGradient!,
          enabled,
        },
      }));
    },
    [setTheme]
  );

  const handleGradientTypeChange = useCallback(
    (type: "linear" | "radial") => {
      setTheme((prev) => ({
        ...prev,
        backgroundGradient: {
          ...prev.backgroundGradient!,
          type,
          direction: type === "linear" ? "to right" : "center",
        },
      }));
    },
    [setTheme]
  );

  const handleGradientDirectionChange = useCallback(
    (direction: string) => {
      setTheme((prev) => ({
        ...prev,
        backgroundGradient: {
          ...prev.backgroundGradient!,
          direction,
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

  const handleLinkColorChange = useCallback(
    (color: RGBAValue) => {
      setTheme((prev) => ({
        ...prev,
        linkColor: rgbaToHex(color),
      }));
    },
    [setTheme]
  );

  const handleTextColorChange = useCallback(
    (color: RGBAValue) => {
      setTheme((prev) => ({
        ...prev,
        textColor: rgbaToHex(color),
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
                  onChange={(color) => handleGradientColorChange(0, color)}>
                  <ColorButton
                    onClick={() => {}}
                    color={theme.backgroundGradient.colors[0]}
                    label="First Color"
                  />
                </ColorPickerModal>
                <ColorPickerModal
                  title="Second Gradient Color"
                  value={theme.backgroundGradient.colors[1]}
                  onChange={(color) => handleGradientColorChange(1, color)}>
                  <ColorButton
                    onClick={() => {}}
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
                onClick={() => {}}
                color={theme.background}
                label="Background Color"
              />
            </ColorPickerModal>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Button Customization</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-xs text-muted-foreground mb-1 block">
                  Background Color
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

              <div>
                <Label className="text-xs text-muted-foreground mb-1 block">
                  Text Color
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

              <div>
                <Label className="text-xs text-muted-foreground mb-1 block">
                  Size
                </Label>
                <Select
                  value={theme.button.size}
                  onValueChange={(value) =>
                    handleButtonChange({
                      ...theme.button,
                      size: value as ButtonConfig["size"],
                    })
                  }>
                  <SelectTrigger className="h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Default</SelectItem>
                    <SelectItem value="sm">Small</SelectItem>
                    <SelectItem value="lg">Large</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-xs text-muted-foreground mb-1 block">
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
                  <SelectTrigger className="h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Default</SelectItem>
                    <SelectItem value="square">Square</SelectItem>
                    <SelectItem value="pill">Pill</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="col-span-2">
                <Label className="text-xs text-muted-foreground mb-1 block">
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
                  <SelectTrigger className="h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Default</SelectItem>
                    <SelectItem value="ghost">Ghost</SelectItem>
                    <SelectItem value="outline">Outline</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Text Colors</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-sm font-medium mb-2 block">Link Color</Label>
            <ColorPickerModal
              title="Link Color"
              value={theme.linkColor}
              onChange={handleLinkColorChange}>
              <ColorButton
                onClick={() => {}}
                color={theme.linkColor}
                label="Link Color"
              />
            </ColorPickerModal>
          </div>

          <div>
            <Label className="text-sm font-medium mb-2 block">Text Color</Label>
            <ColorPickerModal
              title="Text Color"
              value={theme.textColor}
              onChange={handleTextColorChange}>
              <ColorButton
                onClick={() => {}}
                color={theme.textColor}
                label="Text Color"
              />
            </ColorPickerModal>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
