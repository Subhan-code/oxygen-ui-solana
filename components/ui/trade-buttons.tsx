"use client";

import React from "react";
import { motion, useReducedMotion } from "motion/react";
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
  const reduceMotion = useReducedMotion();

  const handleSelect = (newValue: string) => {
    setInternalValue(newValue);
    onValueChange?.(newValue);
  };

  return (
    <div
      role="group"
      aria-label="Trade direction selector"
      data-slot="trade-buttons"
      className={cn(
        "flex w-full items-center gap-1 rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-black p-1 select-none shadow-xs",
        className
      )}
    >
      {/* Long Button (Green when active) */}
      <button
        type="button"
        role="radio"
        aria-checked={currentValue === "long"}
        onClick={() => handleSelect("long")}
        className={cn(
          "relative flex-1 py-2 px-4 rounded-xl font-runde text-xs font-bold transition-colors duration-150 outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40 cursor-pointer text-center",
          currentValue === "long"
            ? "text-white"
            : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-[#121214]"
        )}
      >
        {currentValue === "long" && (
          <motion.span
            layoutId="trade-btn-active"
            className="absolute inset-0 rounded-xl bg-emerald-500 shadow-sm shadow-emerald-500/25"
            transition={
              reduceMotion
                ? { duration: 0.1 }
                : { type: "spring", stiffness: 500, damping: 32 }
            }
          />
        )}
        <span className="relative z-10">{labels[0]}</span>
      </button>

      {/* Short Button (Red when active) */}
      <button
        type="button"
        role="radio"
        aria-checked={currentValue === "short"}
        onClick={() => handleSelect("short")}
        className={cn(
          "relative flex-1 py-2 px-4 rounded-xl font-runde text-xs font-bold transition-colors duration-150 outline-none focus-visible:ring-2 focus-visible:ring-rose-500/40 cursor-pointer text-center",
          currentValue === "short"
            ? "text-white"
            : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-[#121214]"
        )}
      >
        {currentValue === "short" && (
          <motion.span
            layoutId="trade-btn-active"
            className="absolute inset-0 rounded-xl bg-rose-500 shadow-sm shadow-rose-500/25"
            transition={
              reduceMotion
                ? { duration: 0.1 }
                : { type: "spring", stiffness: 500, damping: 32 }
            }
          />
        )}
        <span className="relative z-10">{labels[1]}</span>
      </button>
    </div>
  );
};

export type { TradeButtonsProps };
export { TradeButtons };
export default TradeButtons;
