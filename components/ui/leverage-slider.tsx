"use client";

import React from "react";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

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
  min,
  max,
  step,
  value,
  defaultValue,
  onValueChange,
  className,
}: LeverageSliderProps) => {
  const [displayValue, setDisplayValue] = React.useState(
    defaultValue?.[0] ?? min ?? 0,
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
    <div className={cn("w-full space-y-2", className)}>
      <div className="flex items-center justify-between text-sm">
        <label className="text-muted-foreground text-sm font-medium leading-none">Leverage</label>
        <span className="font-medium tabular-nums">{currentValue}x</span>
      </div>
      <Slider
        min={min}
        max={max}
        step={step}
        value={value ?? [displayValue]}
        onValueChange={handleValueChange}
      />
      {(min !== undefined || max !== undefined) && (
        <div className="flex mt-2 text-xs text-muted-foreground">
          {min !== undefined && (
            <button
              type="button"
              onClick={handleMinClick}
              className="min-h-11 hover:text-foreground motion-safe:transition-colors cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#0066FF]/40 rounded-md"
            >
              {min}x
            </button>
          )}
          {max !== undefined && (
            <button
              type="button"
              onClick={handleMaxClick}
              className="ml-auto hover:text-foreground transition-colors cursor-pointer"
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
