"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, type Transition } from "motion/react";
import { Check, X, Loader2, Play } from "lucide-react";
import { cn } from "@/lib/utils";

export type BadgeState = "idle" | "processing" | "success" | "error";

export interface MultiStateBadgeProps
  extends React.HTMLAttributes<HTMLDivElement> {
  state?: BadgeState;
  onStateChange?: (state: BadgeState) => void;
}

const springTransition: Transition = {
  type: "spring",
  stiffness: 500,
  damping: 22,
};

const STATE_CONFIG: Record<
  BadgeState,
  {
    label: string;
    bg: string;
    text: string;
    border: string;
    icon: React.ReactNode;
  }
> = {
  idle: {
    label: "Deploy to Production",
    bg: "bg-neutral-100 dark:bg-neutral-800",
    text: "text-neutral-800 dark:text-neutral-200",
    border: "border-neutral-200 dark:border-neutral-700",
    icon: <Play className="h-3.5 w-3.5 fill-current" />,
  },
  processing: {
    label: "Building container...",
    bg: "bg-sky-50 dark:bg-sky-950/60",
    text: "text-sky-700 dark:text-sky-300",
    border: "border-sky-200 dark:border-sky-800",
    icon: <Loader2 className="h-3.5 w-3.5 animate-spin" />,
  },
  success: {
    label: "Deployed successfully",
    bg: "bg-emerald-50 dark:bg-emerald-950/60",
    text: "text-emerald-700 dark:text-emerald-300",
    border: "border-emerald-200 dark:border-emerald-800",
    icon: <Check className="h-3.5 w-3.5" />,
  },
  error: {
    label: "Build failed (code 1)",
    bg: "bg-rose-50 dark:bg-rose-950/60",
    text: "text-rose-700 dark:text-rose-300",
    border: "border-rose-200 dark:border-rose-800",
    icon: <X className="h-3.5 w-3.5" />,
  },
};

export function MultiStateBadge({
  state: propState,
  onStateChange,
  className,
  ...props
}: MultiStateBadgeProps) {
  const [internalState, setInternalState] = useState<BadgeState>("idle");
  const isControlled = propState !== undefined;
  const state = isControlled ? propState : internalState;

  const current = STATE_CONFIG[state];

  const handleNext = () => {
    const states: BadgeState[] = ["idle", "processing", "success", "error"];
    const nextIdx = (states.indexOf(state) + 1) % states.length;
    const next = states[nextIdx];
    if (!isControlled) setInternalState(next);
    onStateChange?.(next);
  };

  return (
    <div
      data-slot="multi-state-badge"
      className={cn("flex flex-col items-center gap-4 select-none", className)}
      {...props}
    >
      <motion.button
        type="button"
        layout
        onClick={handleNext}
        transition={springTransition}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        className={cn(
          "flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold shadow-xs transition-colors cursor-pointer",
          current.bg,
          current.text,
          current.border
        )}
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={state + "-icon"}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.15 }}
            className="flex items-center justify-center"
          >
            {current.icon}
          </motion.span>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.span
            key={state + "-label"}
            initial={{ opacity: 0, y: 3 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -3 }}
            transition={{ duration: 0.15 }}
            className="whitespace-nowrap"
          >
            {current.label}
          </motion.span>
        </AnimatePresence>
      </motion.button>

      {/* State Switcher Pills */}
      <div className="flex flex-wrap items-center justify-center gap-1.5">
        {(["idle", "processing", "success", "error"] as BadgeState[]).map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => {
              if (!isControlled) setInternalState(s);
              onStateChange?.(s);
            }}
            className={cn(
              "rounded-full px-2.5 py-0.5 text-[11px] font-mono capitalize transition-colors cursor-pointer",
              state === s
                ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 font-bold"
                : "border border-neutral-200 text-neutral-500 hover:bg-neutral-100 dark:border-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-800"
            )}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}
