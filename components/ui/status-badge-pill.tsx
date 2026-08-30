"use client";

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export type PastelBadgeState = "add" | "added" | "waiting" | "accepted" | "declined";

export interface StatusBadgePillProps
  extends React.HTMLAttributes<HTMLDivElement> {
  state?: PastelBadgeState;
  onStateChange?: (state: PastelBadgeState) => void;
}

const CONFIG: Record<
  PastelBadgeState,
  { label: string; bg: string; text: string; border: string; icon: React.ReactNode }
> = {
  add: {
    label: "Add",
    bg: "bg-zinc-100/90 dark:bg-zinc-800/80",
    text: "text-zinc-700 dark:text-zinc-200",
    border: "border-zinc-200/80 dark:border-zinc-700/60",
    icon: (
      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-zinc-300 dark:bg-zinc-600 text-zinc-700 dark:text-zinc-200 text-xs font-bold shadow-xs">
        +
      </span>
    ),
  },
  added: {
    label: "Added",
    bg: "bg-blue-500",
    text: "text-white",
    border: "border-blue-600/40",
    icon: (
      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/25 shadow-xs">
        <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
          <path d="M2.5 6l2.5 2.5 4.5-4.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    ),
  },
  waiting: {
    label: "Waiting",
    bg: "bg-orange-50/90 dark:bg-orange-950/40",
    text: "text-orange-600 dark:text-orange-400",
    border: "border-orange-200/70 dark:border-orange-800/40",
    icon: (
      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-white text-[10px] shadow-xs">
        🕐
      </span>
    ),
  },
  accepted: {
    label: "Accepted",
    bg: "bg-emerald-50/90 dark:bg-emerald-950/40",
    text: "text-emerald-600 dark:text-emerald-400",
    border: "border-emerald-200/70 dark:border-emerald-800/40",
    icon: (
      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-white shadow-xs">
        <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
          <path d="M2.5 6l2.5 2.5 4.5-4.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    ),
  },
  declined: {
    label: "Declined",
    bg: "bg-red-50/90 dark:bg-red-950/40",
    text: "text-red-600 dark:text-red-400",
    border: "border-red-200/70 dark:border-red-800/40",
    icon: (
      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white text-[11px] font-bold shadow-xs">
        ✕
      </span>
    ),
  },
};

const STATES: PastelBadgeState[] = ["add", "added", "waiting", "accepted", "declined"];

const springBadge = {
  type: "spring" as const,
  stiffness: 480,
  damping: 28,
  mass: 0.65,
};

export function StatusBadgePill({
  state: propState,
  onStateChange,
  className,
  ...props
}: StatusBadgePillProps) {
  const [internal, setInternal] = useState<PastelBadgeState>("add");
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
      data-slot="status-badge-pill"
      className={cn("flex flex-col items-center gap-4 select-none", className)}
      {...props}
    >
      <motion.button
        type="button"
        layout
        onClick={handleNext}
        whileHover={shouldReduceMotion ? undefined : { scale: 1.025 }}
        whileTap={shouldReduceMotion ? undefined : { scale: 0.96 }}
        transition={springBadge}
        className={cn(
          "flex items-center gap-2.5 rounded-full border px-5 py-2.5 text-sm font-bold tracking-tight cursor-pointer shadow-xs",
          "transition-[background-color,color,border-color,box-shadow] duration-200 backdrop-blur-md outline-none",
          "focus-visible:ring-2 focus-visible:ring-current/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          cfg.bg,
          cfg.text,
          cfg.border
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
                ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 font-bold shadow-xs"
                : "border border-neutral-200 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white"
            )}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}

export default StatusBadgePill;
