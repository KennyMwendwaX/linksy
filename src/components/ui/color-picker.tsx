"use client";

import Color from "color";
import { PipetteIcon } from "lucide-react";
import * as Slider from "@radix-ui/react-slider";
import {
  type ComponentProps,
  createContext,
  type HTMLAttributes,
  memo,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

// Types
type ColorValue = Parameters<typeof Color>[0];
type RGBAValue = [number, number, number, number];
type ColorMode = "hex" | "rgb" | "css" | "hsl";

interface ColorPickerContextValue {
  hue: number;
  saturation: number;
  lightness: number;
  alpha: number;
  mode: ColorMode;
  setHue: (hue: number) => void;
  setSaturation: (saturation: number) => void;
  setLightness: (lightness: number) => void;
  setAlpha: (alpha: number) => void;
  setMode: (mode: ColorMode) => void;
}

// Context
const ColorPickerContext = createContext<ColorPickerContextValue | undefined>(
  undefined
);

export const useColorPicker = (): ColorPickerContextValue => {
  const context = useContext(ColorPickerContext);
  if (!context) {
    throw new Error("useColorPicker must be used within a ColorPicker");
  }
  return context;
};

// Main ColorPicker Component
export interface ColorPickerProps {
  value?: ColorValue;
  defaultValue?: ColorValue;
  onChange?: (value: RGBAValue) => void;
  children?: ReactNode;
  className?: string;
}

export const ColorPicker = memo<
  ColorPickerProps &
    Omit<HTMLAttributes<HTMLDivElement>, "defaultValue" | "onChange">
>(
  ({
    value,
    defaultValue = "#000000",
    onChange,
    className,
    children,
    ...props
  }) => {
    const selectedColor = useMemo(() => (value ? Color(value) : null), [value]);
    const defaultColor = useMemo(() => Color(defaultValue), [defaultValue]);

    // Use refs to track if we're in a controlled update to prevent loops
    const isControlledUpdate = useRef(false);
    const lastEmittedValue = useRef<string | null>(null);

    const [hue, setHue] = useState<number>(
      selectedColor?.hue() || defaultColor.hue() || 0
    );
    const [saturation, setSaturation] = useState<number>(
      selectedColor?.saturationl() || defaultColor.saturationl() || 100
    );
    const [lightness, setLightness] = useState<number>(
      selectedColor?.lightness() || defaultColor.lightness() || 50
    );
    const [alpha, setAlpha] = useState<number>(
      (selectedColor?.alpha() || defaultColor.alpha() || 1) * 100
    );
    const [mode, setMode] = useState<ColorMode>("hex");

    // Stable onChange callback that doesn't change on every render
    const onChangeRef = useRef(onChange);
    onChangeRef.current = onChange;

    // Memoize callbacks to prevent unnecessary re-renders
    const handleSetHue = useCallback((newHue: number) => {
      setHue(newHue);
    }, []);

    const handleSetSaturation = useCallback((newSaturation: number) => {
      setSaturation(newSaturation);
    }, []);

    const handleSetLightness = useCallback((newLightness: number) => {
      setLightness(newLightness);
    }, []);

    const handleSetAlpha = useCallback((newAlpha: number) => {
      setAlpha(newAlpha);
    }, []);

    const handleSetMode = useCallback((newMode: ColorMode) => {
      setMode(newMode);
    }, []);

    // Update internal state when controlled value changes
    useEffect(() => {
      if (value && !isControlledUpdate.current) {
        const color = Color(value);
        const colorString = color.hex();

        // Only update if the color actually changed
        if (lastEmittedValue.current !== colorString) {
          setHue(color.hue() || 0);
          setSaturation(color.saturationl() || 0);
          setLightness(color.lightness() || 0);
          setAlpha((color.alpha() || 1) * 100);
        }
      }
    }, [value]);

    // Emit changes to parent - use a separate effect to avoid circular dependencies
    useEffect(() => {
      if (onChangeRef.current && !isControlledUpdate.current) {
        const color = Color.hsl(hue, saturation, lightness).alpha(alpha / 100);
        const colorString = color.hex();

        // Only emit if the color actually changed
        if (lastEmittedValue.current !== colorString) {
          lastEmittedValue.current = colorString;
          isControlledUpdate.current = true;

          const rgba = color.rgb().array();
          onChangeRef.current([rgba[0], rgba[1], rgba[2], alpha / 100]);

          // Reset the flag after a microtask to allow the parent to update
          Promise.resolve().then(() => {
            isControlledUpdate.current = false;
          });
        }
      }
    }, [hue, saturation, lightness, alpha]);

    const contextValue = useMemo<ColorPickerContextValue>(
      () => ({
        hue,
        saturation,
        lightness,
        alpha,
        mode,
        setHue: handleSetHue,
        setSaturation: handleSetSaturation,
        setLightness: handleSetLightness,
        setAlpha: handleSetAlpha,
        setMode: handleSetMode,
      }),
      [
        hue,
        saturation,
        lightness,
        alpha,
        mode,
        handleSetHue,
        handleSetSaturation,
        handleSetLightness,
        handleSetAlpha,
        handleSetMode,
      ]
    );

    return (
      <ColorPickerContext.Provider value={contextValue}>
        <div className={cn("flex flex-col gap-4", className)} {...props}>
          {children}
        </div>
      </ColorPickerContext.Provider>
    );
  }
);
ColorPicker.displayName = "ColorPicker";

// ColorPickerSelection Component
export const ColorPickerSelection = memo<HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const { hue, saturation, lightness, setSaturation, setLightness } =
      useColorPicker();

    // Calculate position from saturation and lightness
    const positionX = useMemo(() => saturation / 100, [saturation]);
    const positionY = useMemo(() => 1 - lightness / 100, [lightness]);

    const backgroundGradient = useMemo(() => {
      return `linear-gradient(to bottom, transparent, black),
              linear-gradient(to right, white, transparent),
              hsl(${hue}, 100%, 50%)`;
    }, [hue]);

    const handlePointerMove = useCallback(
      (event: PointerEvent) => {
        if (!(isDragging && containerRef.current)) {
          return;
        }

        const rect = containerRef.current.getBoundingClientRect();
        const x = Math.max(
          0,
          Math.min(1, (event.clientX - rect.left) / rect.width)
        );
        const y = Math.max(
          0,
          Math.min(1, (event.clientY - rect.top) / rect.height)
        );

        setSaturation(x * 100);
        setLightness((1 - y) * 100);
      },
      [isDragging, setSaturation, setLightness]
    );

    const handlePointerDown = useCallback(
      (e: React.PointerEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);
        handlePointerMove(e.nativeEvent);
      },
      [handlePointerMove]
    );

    const handlePointerUp = useCallback(() => setIsDragging(false), []);

    useEffect(() => {
      if (isDragging) {
        window.addEventListener("pointermove", handlePointerMove);
        window.addEventListener("pointerup", handlePointerUp);
      }

      return () => {
        window.removeEventListener("pointermove", handlePointerMove);
        window.removeEventListener("pointerup", handlePointerUp);
      };
    }, [isDragging, handlePointerMove, handlePointerUp]);

    const thumbStyle = useMemo(
      () => ({
        left: `${positionX * 100}%`,
        top: `${positionY * 100}%`,
        boxShadow: "0 0 0 1px rgba(0,0,0,0.5), 0 2px 4px rgba(0,0,0,0.25)",
      }),
      [positionX, positionY]
    );

    return (
      <div
        className={cn(
          "relative h-48 w-full cursor-crosshair rounded-lg border",
          className
        )}
        onPointerDown={handlePointerDown}
        ref={containerRef}
        style={{
          background: backgroundGradient,
        }}
        {...props}>
        <div
          className="pointer-events-none absolute h-4 w-4 rounded-full border-2 border-white -translate-x-1/2 -translate-y-1/2 shadow-lg"
          style={thumbStyle}
        />
      </div>
    );
  }
);
ColorPickerSelection.displayName = "ColorPickerSelection";

// ColorPickerHue Component
export const ColorPickerHue = memo<ComponentProps<typeof Slider.Root>>(
  ({ className, ...props }) => {
    const { hue, setHue } = useColorPicker();

    const handleValueChange = useCallback(
      ([value]: number[]) => setHue(value),
      [setHue]
    );
    const hueValue = useMemo(() => [hue], [hue]);

    return (
      <Slider.Root
        className={cn("relative flex h-4 w-full touch-none", className)}
        max={360}
        min={0}
        onValueChange={handleValueChange}
        step={1}
        value={hueValue}
        {...props}>
        <Slider.Track className="relative my-0.5 h-3 w-full grow rounded-full bg-[linear-gradient(90deg,#FF0000,#FFFF00,#00FF00,#00FFFF,#0000FF,#FF00FF,#FF0000)]">
          <Slider.Range className="absolute h-full rounded-full" />
        </Slider.Track>
        <Slider.Thumb className="block h-4 w-4 rounded-full border border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" />
      </Slider.Root>
    );
  }
);
ColorPickerHue.displayName = "ColorPickerHue";

// ColorPickerAlpha Component
export const ColorPickerAlpha = memo<ComponentProps<typeof Slider.Root>>(
  ({ className, ...props }) => {
    const { alpha, hue, saturation, lightness, setAlpha } = useColorPicker();

    const gradientColor = useMemo(() => {
      return Color.hsl(hue, saturation, lightness).hex();
    }, [hue, saturation, lightness]);

    const handleValueChange = useCallback(
      ([value]: number[]) => setAlpha(value),
      [setAlpha]
    );
    const alphaValue = useMemo(() => [alpha], [alpha]);

    const trackStyle = useMemo(
      () => ({
        background: `
      linear-gradient(90deg, transparent, ${gradientColor}),
      url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAMUlEQVQ4T2NkYGAQYcAP3uCTZhw1gGGYhAGBZIA/nYDCgBDAm9BGDWAAJyRCgLaBCAAgXwixzAS0pgAAAABJRU5ErkJggg==")
    `,
      }),
      [gradientColor]
    );

    return (
      <Slider.Root
        className={cn("relative flex h-4 w-full touch-none", className)}
        max={100}
        min={0}
        onValueChange={handleValueChange}
        step={1}
        value={alphaValue}
        {...props}>
        <Slider.Track
          className="relative my-0.5 h-3 w-full grow rounded-full"
          style={trackStyle}>
          <Slider.Range className="absolute h-full rounded-full" />
        </Slider.Track>
        <Slider.Thumb className="block h-4 w-4 rounded-full border border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" />
      </Slider.Root>
    );
  }
);
ColorPickerAlpha.displayName = "ColorPickerAlpha";

// ColorPickerEyeDropper Component
export const ColorPickerEyeDropper = memo<ComponentProps<typeof Button>>(
  ({ className, ...props }) => {
    const { setHue, setSaturation, setLightness, setAlpha } = useColorPicker();

    const handleEyeDropper = useCallback(async () => {
      try {
        // @ts-expect-error - EyeDropper API is experimental
        if (!window.EyeDropper) {
          throw new Error("EyeDropper API is not supported in this browser");
        }

        // @ts-expect-error - EyeDropper API is experimental
        const eyeDropper = new window.EyeDropper();
        const result = await eyeDropper.open();

        const color = Color(result.sRGBHex);
        setHue(color.hue() || 0);
        setSaturation(color.saturationl() || 0);
        setLightness(color.lightness() || 0);
        setAlpha(100);
      } catch (error) {
        console.error("EyeDropper failed:", error);
      }
    }, [setHue, setSaturation, setLightness, setAlpha]);

    return (
      <Button
        className={cn("shrink-0 text-muted-foreground", className)}
        onClick={handleEyeDropper}
        size="icon"
        variant="outline"
        type="button"
        {...props}>
        <PipetteIcon size={16} />
      </Button>
    );
  }
);
ColorPickerEyeDropper.displayName = "ColorPickerEyeDropper";

// ColorPickerOutput Component
const formats: ColorMode[] = ["hex", "rgb", "css", "hsl"];

export const ColorPickerOutput = memo<ComponentProps<typeof SelectTrigger>>(
  ({ className, ...props }) => {
    const { mode, setMode } = useColorPicker();

    return (
      <Select onValueChange={setMode} value={mode}>
        <SelectTrigger
          className={cn("h-8 w-20 shrink-0 text-xs", className)}
          {...props}>
          <SelectValue placeholder="Mode" />
        </SelectTrigger>
        <SelectContent>
          {formats.map((format) => (
            <SelectItem className="text-xs" key={format} value={format}>
              {format.toUpperCase()}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  }
);
ColorPickerOutput.displayName = "ColorPickerOutput";

// PercentageInput Component
interface PercentageInputProps extends ComponentProps<typeof Input> {
  value: number;
}

const PercentageInput = memo<PercentageInputProps>(
  ({ className, value, ...props }) => {
    const roundedValue = useMemo(() => Math.round(value), [value]);

    return (
      <div className="relative">
        <Input
          readOnly
          type="text"
          value={roundedValue}
          {...props}
          className={cn(
            "h-8 w-[3.25rem] rounded-l-none bg-secondary px-2 text-xs shadow-none",
            className
          )}
        />
        <span className="absolute top-1/2 right-2 -translate-y-1/2 text-muted-foreground text-xs">
          %
        </span>
      </div>
    );
  }
);
PercentageInput.displayName = "PercentageInput";

// ColorPickerFormat Component
export const ColorPickerFormat = memo<HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }) => {
    const { hue, saturation, lightness, alpha, mode } = useColorPicker();
    const color = useMemo(
      () => Color.hsl(hue, saturation, lightness).alpha(alpha / 100),
      [hue, saturation, lightness, alpha]
    );

    const formatContent = useMemo(() => {
      if (mode === "hex") {
        const hex = color.hex();
        return (
          <div className="relative flex w-full items-center rounded-md shadow-sm -space-x-px">
            <Input
              className="h-8 rounded-r-none bg-secondary px-2 text-xs shadow-none flex-1"
              readOnly
              type="text"
              value={hex}
            />
            <PercentageInput value={alpha} />
          </div>
        );
      }

      if (mode === "rgb") {
        const rgb = color
          .rgb()
          .array()
          .map((value) => Math.round(value));
        return (
          <div className="flex items-center rounded-md shadow-sm -space-x-px">
            {rgb.map((value, index) => (
              <Input
                className={cn(
                  "h-8 bg-secondary px-2 text-xs shadow-none w-12",
                  index === 0
                    ? "rounded-r-none"
                    : index === rgb.length - 1
                    ? "rounded-l-none rounded-r-none"
                    : "rounded-none"
                )}
                key={index}
                readOnly
                type="text"
                value={value}
              />
            ))}
            <PercentageInput value={alpha} />
          </div>
        );
      }

      if (mode === "css") {
        const rgb = color
          .rgb()
          .array()
          .map((value) => Math.round(value));
        return (
          <div className="w-full rounded-md shadow-sm">
            <Input
              className="h-8 w-full bg-secondary px-2 text-xs shadow-none"
              readOnly
              type="text"
              value={`rgba(${rgb.join(", ")}, ${(alpha / 100).toFixed(2)})`}
            />
          </div>
        );
      }

      if (mode === "hsl") {
        const hsl = [
          Math.round(hue),
          Math.round(saturation),
          Math.round(lightness),
        ];
        return (
          <div className="flex items-center rounded-md shadow-sm -space-x-px">
            {hsl.map((value, index) => (
              <Input
                className={cn(
                  "h-8 bg-secondary px-2 text-xs shadow-none w-12",
                  index === 0
                    ? "rounded-r-none"
                    : index === hsl.length - 1
                    ? "rounded-l-none rounded-r-none"
                    : "rounded-none"
                )}
                key={index}
                readOnly
                type="text"
                value={value}
              />
            ))}
            <PercentageInput value={alpha} />
          </div>
        );
      }

      return null;
    }, [color, mode, alpha, hue, saturation, lightness]);

    return (
      <div className={cn(className)} {...props}>
        {formatContent}
      </div>
    );
  }
);
ColorPickerFormat.displayName = "ColorPickerFormat";

// ColorPickerPreview Component
export const ColorPickerPreview = memo<HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }) => {
    const { hue, saturation, lightness, alpha } = useColorPicker();
    const color = useMemo(
      () => Color.hsl(hue, saturation, lightness).alpha(alpha / 100),
      [hue, saturation, lightness, alpha]
    );

    const previewStyle = useMemo(
      () => ({
        background: `${color.rgb().string()}`,
      }),
      [color]
    );

    return (
      <div
        className={cn(
          "h-8 w-16 rounded border-2 border-border shadow-sm",
          className
        )}
        style={previewStyle}
        {...props}
      />
    );
  }
);
ColorPickerPreview.displayName = "ColorPickerPreview";

// Usage example with proper debouncing
// "use client";

// import {
//   ColorPicker,
//   ColorPickerAlpha,
//   ColorPickerEyeDropper,
//   ColorPickerFormat,
//   ColorPickerHue,
//   ColorPickerOutput,
//   ColorPickerPreview,
//   ColorPickerSelection,
// } from "@/components/ui/color-picker";
// import { useCallback, useMemo, useState } from "react";
// import { debounce } from "lodash";

// type RGBAValue = [number, number, number, number];

// export default function Customize() {
//   const [color, setColor] = useState<RGBAValue>([255, 0, 0, 1]);
//   // Debounce the color change handler to prevent excessive updates
//   const debouncedSetColor = useMemo(
//     () =>
//       debounce((newColor: RGBAValue) => {
//         setColor(newColor);
//       }, 16), // ~60fps
//     []
//   );

//   const handleColorChange = useCallback(
//     (value: RGBAValue) => {
//       debouncedSetColor(value);
//     },
//     [debouncedSetColor]
//   );

//   return (
//     <div className="space-y-4">
//       <h3 className="text-lg font-semibold">Color Picker Demo</h3>
//       <ColorPicker
//         className="max-w-md rounded-lg border bg-card p-4 shadow-sm"
//         defaultValue="#ff0000"
//         onChange={handleColorChange}>
//         <ColorPickerSelection />
//         <div className="flex items-center gap-2">
//           <ColorPickerEyeDropper />
//           <ColorPickerPreview />
//           <div className="grid w-full gap-2">
//             <ColorPickerHue />
//             <ColorPickerAlpha />
//           </div>
//         </div>
//         <div className="flex items-center gap-2">
//           <ColorPickerOutput />
//           <ColorPickerFormat />
//         </div>
//       </ColorPicker>
//       <div className="text-sm text-muted-foreground">
//         Current color: rgba({color[0]}, {color[1]}, {color[2]},{" "}
//         {color[3].toFixed(2)})
//       </div>
//     </div>
//   );
// }
