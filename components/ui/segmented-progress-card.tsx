"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ChevronRight, Gift, LifeBuoy } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SegmentedProgressCardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart"> {
  title?: string;
  subtitle?: string;
  totalSteps?: number;
  completedSteps?: number;
  onButtonClick?: () => void;
}

export function SegmentedProgressCard({
  title = "Onboarding Checklist",
  subtitle = "Complete all steps to unlock full feature set",
  totalSteps = 30,
  completedSteps: initialCompleted = 7,
  onButtonClick,
  className,
  ...props
}: SegmentedProgressCardProps) {
  const reduceMotion = useReducedMotion();
  const [completed, setCompleted] = useState(initialCompleted);

  const percentage = Math.round((completed / totalSteps) * 100);

  const handleSegmentClick = (index: number) => {
    setCompleted(index + 1);
  };

  return (
    <motion.div
      data-slot="segmented-progress-card"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 350, damping: 25 }}
      className={cn("mx-auto w-full max-w-sm font-sans select-none p-2", className)}
      {...props}
    >
      <div className="rounded-3xl bg-white p-6 shadow-2xl border border-zinc-200/80 dark:bg-zinc-950 dark:border-zinc-800/80">
        {/* Title & Percentage Pill Row */}
        <div className="flex items-center justify-between">
          <h4 className="text-base font-bold tracking-tight text-zinc-900 dark:text-white">
            {title}
          </h4>
          <span className="rounded-full bg-rose-500 px-2.5 py-0.5 text-xs font-bold text-white shadow-xs">
            {percentage}%
          </span>
        </div>

        {/* Subtitle */}
        <p className="mt-2 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
          {subtitle}
        </p>

        {/* Vertical Bars Segmented Progress Line */}
        <div className="my-5 flex items-center justify-between gap-1 overflow-hidden py-1">
          {Array.from({ length: totalSteps }).map((_, idx) => {
            const isFilled = idx < completed;

            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleSegmentClick(idx)}
                className="group relative flex-1 py-1 cursor-pointer"
              >
                <div
                  className={cn(
                    "h-6 w-full rounded-full transition-all duration-300",
                    isFilled
                      ? "bg-rose-500 shadow-xs"
                      : "bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700"
                  )}
                />
              </button>
            );
          })}
        </div>

        {/* Action Button */}
        <motion.button
          type="button"
          whileTap={reduceMotion ? {} : { scale: 0.97 }}
          onClick={onButtonClick}
          className="flex w-full items-center justify-center gap-1.5 rounded-2xl bg-zinc-100 py-3 text-xs font-semibold text-zinc-900 transition-colors hover:bg-zinc-200 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-800 cursor-pointer"
        >
          <span>Go to checklist</span>
          <ChevronRight className="h-3.5 w-3.5" />
        </motion.button>
      </div>

      {/* Footer User Avatar Bar */}
      <div className="mt-4 flex items-center justify-between px-2 text-zinc-400">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-pink-400 font-bold text-white shadow-sm">
          👩🏽
        </div>
        <div className="flex items-center gap-3">
          <LifeBuoy className="h-5 w-5 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors cursor-pointer" />
          <Gift className="h-5 w-5 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors cursor-pointer" />
        </div>
      </div>
    </motion.div>
  );
}

export default SegmentedProgressCard;
