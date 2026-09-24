"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export type TogglePillVariant =
  | "apple-ios"
  | "monochrome-dark"
  | "linear-indigo";

export const TOGGLE_PILL_VARIANTS: Record<
  TogglePillVariant,
  {
    name: string;
    subtitle: string;
    activeTrack: string;
    inactiveTrack: string;
    activeThumb: string;
    inactiveThumb: string;
  }
> = {
  "apple-ios": {
    name: "Apple iOS Standard",
    subtitle: "Mobile System",
    activeTrack: "#34c759",
    inactiveTrack: "#e9e9ea",
    activeThumb: "#ffffff",
    inactiveThumb: "#ffffff",
  },
  "monochrome-dark": {
    name: "Monochrome Dark",
    subtitle: "Minimalist Luxe",
    activeTrack: "#ffffff",
    inactiveTrack: "#27272a",
    activeThumb: "#18181b",
    inactiveThumb: "#71717a",
  },
  "linear-indigo": {
    name: "Linear App Indigo",
    subtitle: "Modern SaaS",
    activeTrack: "#6366f1",
    inactiveTrack: "#27272a",
    activeThumb: "#ffffff",
    inactiveThumb: "#a1a1aa",
  },
};

export interface TogglePillProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  variant?: TogglePillVariant;
  label?: string;
  description?: string;
  icon?: React.ReactNode;
  showGuides?: boolean;
  useCssTransition?: boolean;
  disabled?: boolean;
  activeTrackColor?: string;
  inactiveTrackColor?: string;
  activeThumbColor?: string;
  inactiveThumbColor?: string;
}

export function TogglePill({
  checked: controlledChecked,
  defaultChecked = false,
  onChange,
  variant = "monochrome-dark",
  label,
  description,
  icon,
  showGuides = false,
  useCssTransition = false,
  disabled = false,
  activeTrackColor,
  inactiveTrackColor,
  activeThumbColor,
  inactiveThumbColor,
  className,
  ...props
}: TogglePillProps) {
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const isChecked = controlledChecked ?? internalChecked;
  const shouldReduceMotion = useReducedMotion();

  const profile = TOGGLE_PILL_VARIANTS[variant] ?? TOGGLE_PILL_VARIANTS["apple-ios"];
  const trackColor = isChecked
    ? activeTrackColor ?? profile.activeTrack
    : inactiveTrackColor ?? profile.inactiveTrack;
  const thumbColor = isChecked
    ? activeThumbColor ?? profile.activeThumb
    : inactiveThumbColor ?? profile.inactiveThumb;

  const handleToggle = () => {
    if (disabled) return;
    const nextState = !isChecked;
    if (controlledChecked === undefined) {
      setInternalChecked(nextState);
    }
    onChange?.(nextState);
  };

  const pillControl = (
    <div
      role="switch"
      aria-checked={isChecked}
      tabIndex={disabled ? -1 : 0}
      onClick={handleToggle}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleToggle();
        }
      }}
      className={cn(
        "relative h-[28px] w-[74px] shrink-0 cursor-pointer rounded-[14px] transition-colors duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 select-none",
        useCssTransition && "transition-colors duration-240 ease-out"
      )}
      style={{ backgroundColor: trackColor }}
    >
      {useCssTransition || shouldReduceMotion ? (
        <div
          className="absolute top-[2.5px] left-[3px] h-[22px] w-[44px] rounded-[11px] shadow-[0_1px_2px_rgba(0,0,0,0.12)] transition-transform transition-colors duration-240 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
          style={{
            backgroundColor: thumbColor,
            transform: `translateX(${isChecked ? 24 : 0}px)`,
          }}
        />
      ) : (
        <motion.div
          animate={{
            x: isChecked ? 24 : 0,
            backgroundColor: thumbColor,
          }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 32,
            mass: 0.8,
          }}
          className="absolute top-[2.5px] left-[3px] h-[22px] w-[44px] rounded-[11px] shadow-[0_1px_2px_rgba(0,0,0,0.12)] touch-none"
        />
      )}
    </div>
  );

  if (label || description || icon) {
    return (
      <div
        data-slot="root"
        className={cn(
          "flex w-full max-w-sm items-center justify-between gap-4 rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 select-none font-sans",
          disabled && "opacity-50 pointer-events-none",
          className
        )}
        {...props}
      >
        <div className="flex items-center gap-3">
          {icon && (
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-purple-600 dark:bg-purple-950/50 dark:text-purple-400">
              {icon}
            </div>
          )}
          <div className="flex flex-col">
            {label && <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{label}</span>}
            {description && <span className="text-xs text-zinc-500 dark:text-zinc-400 leading-snug mt-0.5">{description}</span>}
          </div>
        </div>
        {pillControl}
      </div>
    );
  }

  return (
    <div
      data-slot="root"
      className={cn(
        "relative inline-flex items-center justify-center p-[21px] select-none font-sans",
        disabled && "opacity-50 pointer-events-none",
        className
      )}
      {...props}
    >
      {showGuides && (
        <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-[21px] border border-dashed border-sky-500/40 rounded-2xl">
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-sky-500 text-white font-mono text-[9px] px-1.5 py-0.5 rounded-full">
            Padding: 21px
          </span>
          <span className="absolute left-1 top-1/2 -translate-y-1/2 bg-rose-500 text-white font-mono text-[9px] px-1.5 py-0.5 rounded-full">
            3px
          </span>
          <span className="absolute right-1 top-1/2 -translate-y-1/2 bg-rose-500 text-white font-mono text-[9px] px-1.5 py-0.5 rounded-full">
            3px
          </span>
        </div>
      )}
      {pillControl}
    </div>
  );
}

export default TogglePill;
