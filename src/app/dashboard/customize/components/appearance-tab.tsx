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

type AppearanceTabProps = {
  theme: ThemeColors;
  handleGradientToggle: (enabled: boolean) => void;
  handleGradientTypeChange: (type: "linear" | "radial") => void;
  handleGradientDirectionChange: (direction: string) => void;
  handleGradientColorChange: (index: number, color: RGBAValue) => void;
  handleBackgroundChange: (color: RGBAValue) => void;
  handleButtonPrimaryChange: (newConfig: ButtonConfig) => void;
  handleButtonSecondaryChange: (newConfig: ButtonConfig) => void;
  handleButtonTertiaryChange: (newConfig: ButtonConfig) => void;
  handleLinkColorChange: (color: RGBAValue) => void;
  handleTextColorChange: (color: RGBAValue) => void;
  linearDirections: { value: string; label: string }[];
  radialPositions: { value: string; label: string }[];
};

export default function AppearanceTab({
  theme,
  handleGradientToggle,
  handleGradientTypeChange,
  handleGradientDirectionChange,
  handleGradientColorChange,
  handleBackgroundChange,
  handleButtonPrimaryChange,
  handleButtonSecondaryChange,
  handleButtonTertiaryChange,
  handleLinkColorChange,
  handleTextColorChange,
  linearDirections,
  radialPositions,
}: AppearanceTabProps) {
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
          {/* Primary Button */}
          <div className="space-y-4">
            <Label className="text-sm font-medium">Primary Button</Label>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-xs text-muted-foreground mb-1 block">
                  Background Color
                </Label>
                <ColorPickerModal
                  title="Primary Button Background Color"
                  value={theme.buttonPrimary.backgroundColor}
                  onChange={(color) =>
                    handleButtonPrimaryChange({
                      ...theme.buttonPrimary,
                      backgroundColor: rgbaToHex(color),
                    })
                  }>
                  <ColorButton
                    onClick={() => {}}
                    color={theme.buttonPrimary.backgroundColor}
                    label="Primary Background"
                  />
                </ColorPickerModal>
              </div>

              <div>
                <Label className="text-xs text-muted-foreground mb-1 block">
                  Text Color
                </Label>
                <ColorPickerModal
                  title="Primary Button Text Color"
                  value={theme.buttonPrimary.textColor}
                  onChange={(color) =>
                    handleButtonPrimaryChange({
                      ...theme.buttonPrimary,
                      textColor: rgbaToHex(color),
                    })
                  }>
                  <ColorButton
                    onClick={() => {}}
                    color={theme.buttonPrimary.textColor}
                    label="Primary Text"
                  />
                </ColorPickerModal>
              </div>

              <div>
                <Label className="text-xs text-muted-foreground mb-1 block">
                  Size
                </Label>
                <Select
                  value={theme.buttonPrimary.size}
                  onValueChange={(value) =>
                    handleButtonPrimaryChange({
                      ...theme.buttonPrimary,
                      size: value as ButtonConfig["size"],
                    })
                  }>
                  <SelectTrigger className="h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sm">Small</SelectItem>
                    <SelectItem value="default">Default</SelectItem>
                    <SelectItem value="lg">Large</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-xs text-muted-foreground mb-1 block">
                  Shape
                </Label>
                <Select
                  value={theme.buttonPrimary.shape}
                  onValueChange={(value) =>
                    handleButtonPrimaryChange({
                      ...theme.buttonPrimary,
                      shape: value as ButtonConfig["shape"],
                    })
                  }>
                  <SelectTrigger className="h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="square">Square</SelectItem>
                    <SelectItem value="rounded">Rounded</SelectItem>
                    <SelectItem value="pill">Pill</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="col-span-2">
                <Label className="text-xs text-muted-foreground mb-1 block">
                  Variant
                </Label>
                <Select
                  value={theme.buttonPrimary.variant}
                  onValueChange={(value) =>
                    handleButtonPrimaryChange({
                      ...theme.buttonPrimary,
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

          {/* Secondary Button */}
          <div className="space-y-4">
            <Label className="text-sm font-medium">Secondary Button</Label>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-xs text-muted-foreground mb-1 block">
                  Background Color
                </Label>
                <ColorPickerModal
                  title="Secondary Button Background Color"
                  value={theme.buttonSecondary.backgroundColor}
                  onChange={(color) =>
                    handleButtonSecondaryChange({
                      ...theme.buttonSecondary,
                      backgroundColor: rgbaToHex(color),
                    })
                  }>
                  <ColorButton
                    onClick={() => {}}
                    color={theme.buttonSecondary.backgroundColor}
                    label="Secondary Background"
                  />
                </ColorPickerModal>
              </div>

              <div>
                <Label className="text-xs text-muted-foreground mb-1 block">
                  Text Color
                </Label>
                <ColorPickerModal
                  title="Secondary Button Text Color"
                  value={theme.buttonSecondary.textColor}
                  onChange={(color) =>
                    handleButtonSecondaryChange({
                      ...theme.buttonSecondary,
                      textColor: rgbaToHex(color),
                    })
                  }>
                  <ColorButton
                    onClick={() => {}}
                    color={theme.buttonSecondary.textColor}
                    label="Secondary Text"
                  />
                </ColorPickerModal>
              </div>

              <div>
                <Label className="text-xs text-muted-foreground mb-1 block">
                  Size
                </Label>
                <Select
                  value={theme.buttonSecondary.size}
                  onValueChange={(value) =>
                    handleButtonSecondaryChange({
                      ...theme.buttonSecondary,
                      size: value as ButtonConfig["size"],
                    })
                  }>
                  <SelectTrigger className="h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sm">Small</SelectItem>
                    <SelectItem value="default">Default</SelectItem>
                    <SelectItem value="lg">Large</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-xs text-muted-foreground mb-1 block">
                  Shape
                </Label>
                <Select
                  value={theme.buttonSecondary.shape}
                  onValueChange={(value) =>
                    handleButtonSecondaryChange({
                      ...theme.buttonSecondary,
                      shape: value as ButtonConfig["shape"],
                    })
                  }>
                  <SelectTrigger className="h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="square">Square</SelectItem>
                    <SelectItem value="rounded">Rounded</SelectItem>
                    <SelectItem value="pill">Pill</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="col-span-2">
                <Label className="text-xs text-muted-foreground mb-1 block">
                  Variant
                </Label>
                <Select
                  value={theme.buttonSecondary.variant}
                  onValueChange={(value) =>
                    handleButtonSecondaryChange({
                      ...theme.buttonSecondary,
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

          {/* Tertiary Button */}
          <div className="space-y-4">
            <Label className="text-sm font-medium">Tertiary Button</Label>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-xs text-muted-foreground mb-1 block">
                  Background Color
                </Label>
                <ColorPickerModal
                  title="Tertiary Button Background Color"
                  value={theme.buttonTertiary.backgroundColor}
                  onChange={(color) =>
                    handleButtonTertiaryChange({
                      ...theme.buttonTertiary,
                      backgroundColor: rgbaToHex(color),
                    })
                  }>
                  <ColorButton
                    onClick={() => {}}
                    color={theme.buttonTertiary.backgroundColor}
                    label="Tertiary Background"
                  />
                </ColorPickerModal>
              </div>

              <div>
                <Label className="text-xs text-muted-foreground mb-1 block">
                  Text Color
                </Label>
                <ColorPickerModal
                  title="Tertiary Button Text Color"
                  value={theme.buttonTertiary.textColor}
                  onChange={(color) =>
                    handleButtonTertiaryChange({
                      ...theme.buttonTertiary,
                      textColor: rgbaToHex(color),
                    })
                  }>
                  <ColorButton
                    onClick={() => {}}
                    color={theme.buttonTertiary.textColor}
                    label="Tertiary Text"
                  />
                </ColorPickerModal>
              </div>

              <div>
                <Label className="text-xs text-muted-foreground mb-1 block">
                  Size
                </Label>
                <Select
                  value={theme.buttonTertiary.size}
                  onValueChange={(value) =>
                    handleButtonTertiaryChange({
                      ...theme.buttonTertiary,
                      size: value as ButtonConfig["size"],
                    })
                  }>
                  <SelectTrigger className="h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sm">Small</SelectItem>
                    <SelectItem value="default">Default</SelectItem>
                    <SelectItem value="lg">Large</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-xs text-muted-foreground mb-1 block">
                  Shape
                </Label>
                <Select
                  value={theme.buttonTertiary.shape}
                  onValueChange={(value) =>
                    handleButtonTertiaryChange({
                      ...theme.buttonTertiary,
                      shape: value as ButtonConfig["shape"],
                    })
                  }>
                  <SelectTrigger className="h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="square">Square</SelectItem>
                    <SelectItem value="rounded">Rounded</SelectItem>
                    <SelectItem value="pill">Pill</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="col-span-2">
                <Label className="text-xs text-muted-foreground mb-1 block">
                  Variant
                </Label>
                <Select
                  value={theme.buttonTertiary.variant}
                  onValueChange={(value) =>
                    handleButtonTertiaryChange({
                      ...theme.buttonTertiary,
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
