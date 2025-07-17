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
import { RGBAValue, ThemeColors } from "@/lib/types";

type AppearanceTabProps = {
  theme: ThemeColors;
  handleGradientToggle: (enabled: boolean) => void;
  handleGradientTypeChange: (type: "linear" | "radial") => void;
  handleGradientDirectionChange: (direction: string) => void;
  handleGradientColorChange: (index: number, color: RGBAValue) => void;
  handleBackgroundChange: (color: RGBAValue) => void;
  handleButtonPrimaryChange: (color: RGBAValue) => void;
  handleButtonSecondaryChange: (color: RGBAValue) => void;
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
                onClick={() => {}}
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
                onClick={() => {}}
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
