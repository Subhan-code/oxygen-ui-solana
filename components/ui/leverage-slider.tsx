"use client";

import React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/lib/utils";

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center cursor-pointer",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
      <SliderPrimitive.Range className="absolute h-full bg-sky-500" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-sky-500 bg-white ring-offset-white transition-transform active:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:bg-zinc-950 dark:ring-offset-zinc-950 shadow-md cursor-grab active:cursor-grabbing" />
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

interface LeverageSliderProps {
  min?: number;
  max?: number;
  step?: number;
  value?: number[];
  defaultValue?: number[];
  onValueChange?: (value: number[]) => void;
  className?: string;
}

const LeverageSlider = ({
  min = 1,
  max = 100,
  step = 1,
  value,
  defaultValue = [1],
  onValueChange,
  className,
}: LeverageSliderProps) => {
  const [displayValue, setDisplayValue] = React.useState(
    defaultValue?.[0] ?? min ?? 1
  );

  const currentValue = value?.[0] ?? displayValue;

  const handleValueChange = (newValue: number[]) => {
    setDisplayValue(newValue[0]);
    onValueChange?.(newValue);
  };

  const handleMinClick = () => {
    if (min !== undefined) {
      handleValueChange([min]);
    }
  };

  const handleMaxClick = () => {
    if (max !== undefined) {
      handleValueChange([max]);
    }
  };

  return (
    <div className={cn("w-full space-y-3 font-sans select-none", className)}>
      <div className="flex items-center justify-between text-sm">
        <label className="text-zinc-500 dark:text-zinc-400 text-xs font-bold uppercase tracking-wider">Leverage</label>
        <span className="font-mono text-xs font-bold text-sky-500 tabular-nums px-2 py-0.5 rounded-md bg-sky-500/10 border border-sky-500/20">{currentValue}x</span>
      </div>

      <Slider
        min={min}
        max={max}
        step={step}
        value={value ?? [displayValue]}
        onValueChange={handleValueChange}
      />

      {(min !== undefined || max !== undefined) && (
        <div className="flex items-center justify-between text-xs font-mono text-zinc-500 pt-1">
          {min !== undefined && (
            <button
              type="button"
              onClick={handleMinClick}
              className="hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer outline-none"
            >
              {min}x
            </button>
          )}
          {max !== undefined && (
            <button
              type="button"
              onClick={handleMaxClick}
              className="ml-auto hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer outline-none"
            >
              {max}x
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export type { LeverageSliderProps };
export { LeverageSlider };
export default LeverageSlider;
