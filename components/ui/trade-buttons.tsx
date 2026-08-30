"use client";

import React from "react";
import { motion } from "motion/react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";

interface TradeButtonsProps {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  labels?: [string, string];
  className?: string;
}

const TradeButtons = ({
  defaultValue = "long",
  value,
  onValueChange,
  labels = ["Long", "Short"],
  className,
}: TradeButtonsProps) => {
  const [internalValue, setInternalValue] = React.useState(defaultValue);
  const currentValue = value ?? internalValue;

  const handleValueChange = (newValue: string) => {
    if (!newValue) return;
    setInternalValue(newValue);
    onValueChange?.(newValue);
  };

  return (
    <ToggleGroup
      type="single"
      variant="outline"
      spacing={2}
      value={currentValue}
      onValueChange={handleValueChange}
      className={cn("w-full", className)}
    >
      <ToggleGroupItem
        value="long"
        aria-label={`Toggle ${labels[0]}`}
        className={cn(
          "relative flex-1 shrink motion-safe:transition-colors",
          currentValue === "long"
            ? "text-emerald-500 border-emerald-500/25 hover:text-emerald-500 data-[state=on]:text-emerald-500"
            : "hover:bg-muted/80",
        )}
      >
        {currentValue === "long" && (
          <motion.span
            layoutId="trade-buttons-active"
            className="absolute inset-0 bg-emerald-500/15"
            style={{ borderRadius: 6 }}
            transition={{ type: "spring", duration: 0.2, bounce: 0 }}
          />
        )}
        <span className="relative z-10">{labels[0]}</span>
      </ToggleGroupItem>
      <ToggleGroupItem
        value="short"
        aria-label={`Toggle ${labels[1]}`}
        className={cn(
          "relative flex-1 shrink motion-safe:transition-colors",
          currentValue === "short"
            ? "text-red-400 border-red-400/25 hover:text-red-400 data-[state=on]:text-red-400"
            : "hover:bg-muted/80",
        )}
      >
        {currentValue === "short" && (
          <motion.span
            layoutId="trade-buttons-active"
            className="absolute inset-0 bg-red-400/15"
            style={{ borderRadius: 6 }}
            transition={{ type: "spring", duration: 0.2, bounce: 0 }}
          />
        )}
        <span className="relative z-10">{labels[1]}</span>
      </ToggleGroupItem>
    </ToggleGroup>
  );
};

export type { TradeButtonsProps };
export { TradeButtons };
