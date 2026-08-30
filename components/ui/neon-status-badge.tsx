"use client";

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export type NeonBadgeState = "success" | "pending" | "submitted" | "failed";

export interface NeonStatusBadgeProps
  extends React.HTMLAttributes<HTMLDivElement> {
  state?: NeonBadgeState;
  onStateChange?: (state: NeonBadgeState) => void;
}

const CONFIG: Record<
  NeonBadgeState,
  { label: string; bg: string; text: string; border: string; glow: string; icon: React.ReactNode }
> = {
  success: {
    label: "Success",
    bg: "bg-[#09291b]/90",
    text: "text-[#4dffa0]",
    border: "border-[#4dffa0]/50",
    glow: "shadow-[0_0_20px_rgba(77,255,160,0.15)]",
    icon: (
      <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
        <circle cx="9" cy="9" r="8" stroke="#4dffa0" strokeWidth="1.6" />
        <path d="M5.5 9l2.5 2.5 4.5-4.5" stroke="#4dffa0" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  pending: {
    label: "Pending",
    bg: "bg-[#281d00]/90",
    text: "text-[#ffd54f]",
    border: "border-[#ffd54f]/40",
    glow: "shadow-[0_0_20px_rgba(255,213,79,0.15)]",
    icon: (
      <svg width="16" height="16" viewBox="0 0 18 18" fill="none" className="animate-spin" style={{ animationDuration: "2.5s" }}>
        <circle cx="9" cy="9" r="7" stroke="#ffd54f" strokeWidth="1.6" strokeDasharray="4 4" />
        <circle cx="9" cy="3" r="1.5" fill="#ffd54f" />
      </svg>
    ),
  },
  submitted: {
    label: "Submitted",
    bg: "bg-[#0d0d2b]/90",
    text: "text-[#a5b4fc]",
    border: "border-[#6366f1]/50",
    glow: "shadow-[0_0_20px_rgba(99,102,241,0.15)]",
    icon: (
      <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
        <rect x="2" y="4" width="14" height="10" rx="2" stroke="#a5b4fc" strokeWidth="1.6" />
        <path d="M2 7l7 4 7-4" stroke="#a5b4fc" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M13 12l2-2" stroke="#a5b4fc" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
  failed: {
    label: "Failed",
    bg: "bg-[#280013]/90",
    text: "text-[#f472b6]",
    border: "border-[#be185d]/50",
    glow: "shadow-[0_0_20px_rgba(244,114,182,0.15)]",
    icon: (
      <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
        <circle cx="9" cy="9" r="8" stroke="#f472b6" strokeWidth="1.6" />
        <path d="M6 6l6 6M12 6l-6 6" stroke="#f472b6" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
};

const STATES: NeonBadgeState[] = ["success", "pending", "submitted", "failed"];

const springNeon = {
  type: "spring" as const,
  stiffness: 480,
  damping: 28,
  mass: 0.65,
};

export function NeonStatusBadge({
  state: propState,
  onStateChange,
  className,
  ...props
}: NeonStatusBadgeProps) {
  const [internal, setInternal] = useState<NeonBadgeState>("success");
  const isControlled = propState !== undefined;
  const state = isControlled ? propState : internal;
  const cfg = CONFIG[state];
  const shouldReduceMotion = useReducedMotion();

  const handleNext = useCallback(() => {
    const next = STATES[(STATES.indexOf(state) + 1) % STATES.length];
    if (!isControlled) setInternal(next);
    onStateChange?.(next);
  }, [state, isControlled, onStateChange]);

  return (
    <div
      data-slot="neon-status-badge"
      className={cn("flex flex-col items-center gap-4 select-none", className)}
      {...props}
    >
      <motion.button
        type="button"
        layout
        onClick={handleNext}
        whileHover={shouldReduceMotion ? undefined : { scale: 1.025 }}
        whileTap={shouldReduceMotion ? undefined : { scale: 0.96 }}
        transition={springNeon}
        className={cn(
          "flex items-center gap-2.5 rounded-full border px-6 py-2.5 text-sm font-bold tracking-tight cursor-pointer backdrop-blur-md",
          "transition-[background-color,color,border-color,box-shadow] duration-200 outline-none",
          "focus-visible:ring-2 focus-visible:ring-current/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          cfg.bg,
          cfg.text,
          cfg.border,
          cfg.glow
        )}
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={state + "-icon"}
            initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={shouldReduceMotion ? undefined : { opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.14, ease: "easeOut" }}
            className="flex items-center justify-center shrink-0"
          >
            {cfg.icon}
          </motion.span>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.span
            key={state + "-label"}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 2 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? undefined : { opacity: 0, y: -2 }}
            transition={{ duration: 0.14, ease: "easeOut" }}
            className="whitespace-nowrap"
          >
            {cfg.label}
          </motion.span>
        </AnimatePresence>
      </motion.button>

      {/* State Switcher Pills */}
      <div className="flex flex-wrap justify-center gap-1.5">
        {STATES.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => {
              if (!isControlled) setInternal(s);
              onStateChange?.(s);
            }}
            className={cn(
              "rounded-full px-2.5 py-0.5 text-[11px] font-mono capitalize transition-all duration-150 cursor-pointer active:scale-[0.96] outline-none",
              state === s
                ? "bg-white text-zinc-900 font-bold shadow-xs"
                : "border border-zinc-700 text-zinc-400 hover:bg-zinc-800 hover:text-white"
            )}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}

export default NeonStatusBadge;
