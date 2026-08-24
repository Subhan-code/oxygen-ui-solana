"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { ShieldCheck, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AnimatedSwitchProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  description?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

export function AnimatedSwitch({
  label = "Priority Mode",
  description = "Enable high performance processing",
  checked: controlledChecked,
  defaultChecked = true,
  disabled = false,
  onCheckedChange,
  className,
  ...props
}: AnimatedSwitchProps) {
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const isControlled = controlledChecked !== undefined;
  const isChecked = isControlled ? controlledChecked : internalChecked;

  const toggle = () => {
    if (disabled) return;
    const next = !isChecked;
    if (!isControlled) setInternalChecked(next);
    onCheckedChange?.(next);
  };

  return (
    <div
      data-slot="animated-switch-container"
      className={cn(
        "flex w-full max-w-sm items-center justify-between gap-4 rounded-3xl border border-zinc-200 bg-white p-4.5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 select-none",
        className
      )}
      {...props}
    >
      <div className="flex items-start gap-3">
        <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-purple-600 dark:bg-purple-950/50 dark:text-purple-400">
          <Zap className="h-4 w-4" />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{label}</span>
          <span className="text-xs text-zinc-500 dark:text-zinc-400 leading-snug mt-0.5">{description}</span>
        </div>
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={isChecked}
        disabled={disabled}
        onClick={toggle}
        className={cn(
          "relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full p-1 transition-colors duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 active:scale-95",
          disabled && "cursor-not-allowed opacity-50",
          isChecked ? "bg-purple-600 dark:bg-purple-500" : "bg-zinc-200 dark:bg-zinc-800"
        )}
      >
        <motion.span
          layout
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className={cn(
            "pointer-events-none block h-5 w-5 rounded-full bg-white shadow-md transition-transform",
            isChecked ? "translate-x-5" : "translate-x-0"
          )}
        />
      </button>
    </div>
  );
}

export default AnimatedSwitch;
