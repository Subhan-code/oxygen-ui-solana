"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export type TogglePillVariant =
  | "monochrome-dark"
  | "monochrome-light"
  | "apple-ios"
  | "linear-indigo"
  | "spotify-green"
  | "electric-blue";

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
  "monochrome-dark": {
    name: "Monochrome Dark (Luxe)",
    subtitle: "Minimalist",
    activeTrack: "#ffffff",
    inactiveTrack: "#27272a",
    activeThumb: "#18181b",
    inactiveThumb: "#71717a",
  },
  "monochrome-light": {
    name: "Monochrome Light (Luxe)",
    subtitle: "Minimalist",
    activeTrack: "#18181b",
    inactiveTrack: "#e4e4e7",
    activeThumb: "#ffffff",
    inactiveThumb: "#71717a",
  },
  "apple-ios": {
    name: "Apple iOS Standard",
    subtitle: "Mobile System",
    activeTrack: "#34c759",
    inactiveTrack: "#e9e9ea",
    activeThumb: "#ffffff",
    inactiveThumb: "#ffffff",
  },
  "linear-indigo": {
    name: "Linear App Indigo",
    subtitle: "Modern SaaS",
    activeTrack: "#6366f1",
    inactiveTrack: "#27272a",
    activeThumb: "#ffffff",
    inactiveThumb: "#a1a1aa",
  },
  "spotify-green": {
    name: "Spotify Vibrant Green",
    subtitle: "Media",
    activeTrack: "#1db954",
    inactiveTrack: "#282828",
    activeThumb: "#ffffff",
    inactiveThumb: "#b3b3b3",
  },
  "electric-blue": {
    name: "Electric Blue",
    subtitle: "Modern SaaS",
    activeTrack: "#0066ff",
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

  const profile = TOGGLE_PILL_VARIANTS[variant];
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

  return (
    <div
      data-slot="root"
      className={cn(
        "relative inline-flex items-center justify-center p-[21px] select-none",
        disabled && "opacity-50 pointer-events-none",
        className
      )}
      {...props}
    >
      {/* Visual Alignment Guides */}
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

      {/* 74x28px Track */}
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
          "relative h-[28px] w-[74px] cursor-pointer rounded-[14px] transition-colors duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500",
          useCssTransition && "transition-colors duration-240 ease-out"
        )}
        style={{ backgroundColor: trackColor }}
      >
        {/* 44x22px Thumb Capsule */}
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
    </div>
  );
}
