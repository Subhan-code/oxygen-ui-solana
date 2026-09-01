"use client";

import React from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export interface ProgressRingProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
  sublabel?: string;
  showPercent?: boolean;
  colorPreset?: "sky" | "emerald" | "amber" | "purple";
}

const COLOR_MAP = {
  sky: {
    stroke: "stroke-sky-500",
    text: "text-sky-500",
    glow: "shadow-sky-500/20",
    gradientStart: "#0066FF",
    gradientEnd: "#38BDF8",
  },
  emerald: {
    stroke: "stroke-emerald-500",
    text: "text-emerald-500",
    glow: "shadow-emerald-500/20",
    gradientStart: "#10B981",
    gradientEnd: "#34D399",
  },
  amber: {
    stroke: "stroke-amber-500",
    text: "text-amber-500",
    glow: "shadow-amber-500/20",
    gradientStart: "#F59E0B",
    gradientEnd: "#FBBF24",
  },
  purple: {
    stroke: "stroke-purple-500",
    text: "text-purple-500",
    glow: "shadow-purple-500/20",
    gradientStart: "#A855F7",
    gradientEnd: "#C084FC",
  },
};

export function ProgressRing({
  value = 75,
  max = 100,
  size = 140,
  strokeWidth = 10,
  label = "Progress",
  sublabel,
  showPercent = true,
  colorPreset = "sky",
  className,
  ...props
}: ProgressRingProps) {
  const reduceMotion = useReducedMotion();
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const color = COLOR_MAP[colorPreset];

  return (
    <div
      data-slot="progress-ring"
      className={cn("relative inline-flex flex-col items-center justify-center select-none font-sans", className)}
      {...props}
    >
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="rotate-[-90deg]">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
            className="stroke-zinc-200 dark:stroke-zinc-800 fill-none"
          />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            initial={reduceMotion ? { strokeDashoffset } : { strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            strokeLinecap="round"
            className={cn("fill-none transition-colors", color.stroke)}
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-2">
          {showPercent && (
            <motion.span
              initial={reduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-2xl font-bold font-mono tracking-tight text-zinc-900 dark:text-zinc-100"
            >
              {Math.round(percentage)}%
            </motion.span>
          )}
          {label && (
            <span className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400 mt-0.5 max-w-[90px] truncate">
              {label}
            </span>
          )}
          {sublabel && (
            <span className="text-[10px] font-mono text-zinc-400 dark:text-zinc-500">
              {sublabel}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProgressRing;
