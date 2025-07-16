"use client";

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
import { useState } from "react";

type RGBAValue = [number, number, number, number];

export default function Customize() {
  const [color, setColor] = useState<RGBAValue>([255, 0, 0, 1]);

  const handleColorChange = (value: RGBAValue) => {
    setColor(value);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Color Picker Demo</h3>
      <ColorPicker
        className="max-w-md rounded-lg border bg-card p-4 shadow-sm"
        defaultValue="#ff0000"
        onChange={handleColorChange}>
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
      <div className="text-sm text-muted-foreground">
        Current color: rgba({color[0]}, {color[1]}, {color[2]},{" "}
        {color[3].toFixed(2)})
      </div>
    </div>
  );
}
