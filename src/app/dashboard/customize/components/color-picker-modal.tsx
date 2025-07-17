import { Button } from "@/components/ui/button";
import {
  ColorPicker,
  ColorPickerSelection,
  ColorPickerEyeDropper,
  ColorPickerPreview,
  ColorPickerHue,
  ColorPickerAlpha,
  ColorPickerOutput,
  ColorPickerFormat,
} from "@/components/ui/color-picker";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RGBAValue } from "@/lib/types";
import { debounce } from "lodash";
import { useCallback, useMemo } from "react";

// Reusable Color Button Component
export const ColorButton = ({
  color,
  label,
  onClick,
}: {
  color: string;
  label: string;
  onClick: () => void;
}) => (
  <Button
    variant="secondary"
    className="flex items-center gap-2 w-full"
    onClick={onClick}>
    <div
      className="w-6 h-6 rounded border"
      style={{ backgroundColor: color }}
    />
    <span className="text-sm">{label}</span>
  </Button>
);

// Single Color Picker Modal
export const ColorPickerModal = ({
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
