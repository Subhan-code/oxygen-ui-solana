"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Check, Zap, ShieldCheck, Cpu, Radio } from "lucide-react";
import { cn } from "@/lib/utils";

const DEFAULT_STEP_ICONS = [
  { icon: Zap, bg: "bg-blue-500 text-white" },
  { icon: ShieldCheck, bg: "bg-sky-400 text-white" },
  { icon: Cpu, bg: "bg-zinc-100 text-zinc-900" },
  { icon: Radio, bg: "bg-indigo-500 text-white" },
  { icon: Check, bg: "bg-emerald-400 text-zinc-950" },
];

export interface StepTrackerWidgetProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart"> {
  title?: string;
  totalSteps?: number;
  initialStep?: number;
  stepsInfo?: string[];
}

export function StepTrackerWidget({
  title = "Solana Txn Pipeline",
  totalSteps = 5,
  initialStep = 3,
  stepsInfo = [
    "Preparing transaction payload...",
    "Simulating contract state...",
    "Requesting wallet signature...",
    "Broadcasting to Solana RPC...",
    "Transaction confirmed on-chain!",
  ],
  className,
  ...props
}: StepTrackerWidgetProps) {
  const reduceMotion = useReducedMotion();
  const [currentStep, setCurrentStep] = useState(initialStep);

  const handleStepClick = (stepIndex: number) => {
    setCurrentStep(stepIndex + 1);
  };

  const visibleCount = Math.min(Math.max(currentStep, 0), totalSteps);
  const visibleIcons = Array.from({ length: visibleCount }).map((_, idx) => ({
    ...DEFAULT_STEP_ICONS[idx % DEFAULT_STEP_ICONS.length],
    id: idx,
  }));

  return (
    <motion.div
      data-slot="step-tracker-widget"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 350, damping: 25 }}
      className={cn(
        "mx-auto w-full max-w-sm rounded-3xl bg-zinc-950 p-6 text-white border border-zinc-800/80 font-sans select-none",
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-between pb-6">
        <h3 className="text-xl font-bold tracking-tight">{title}</h3>
        <div className="flex items-center -space-x-2">
          <AnimatePresence initial={false}>
            {visibleIcons.map((item) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.4, x: -6 }}
                  animate={reduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1, x: 0 }}
                  exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.4, x: -6 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  style={{ zIndex: 40 - item.id }}
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full border-2 border-zinc-950 font-bold text-xs shrink-0",
                    item.bg
                  )}
                >
                  <Icon className="h-4 w-4" />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      <div className="relative my-2 flex items-center justify-between px-1">
        {Array.from({ length: totalSteps }).map((_, idx) => {
          const isCompleted = idx < currentStep;
          const isLast = idx === totalSteps - 1;

          return (
            <React.Fragment key={idx}>
              <motion.button
                type="button"
                onClick={() => handleStepClick(idx)}
                whileTap={reduceMotion ? {} : { scale: 0.9 }}
                className={cn(
                  "relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-300 cursor-pointer z-10",
                  isCompleted
                    ? "bg-blue-500 text-white shadow-[0_0_12px_rgba(59,130,246,0.5)]"
                    : "border-2 border-blue-900 bg-zinc-950 text-blue-900 hover:border-blue-700"
                )}
              >
                <AnimatePresence>
                  {isCompleted && (
                    <motion.span
                      initial={reduceMotion ? { opacity: 0 } : { scale: 0, opacity: 0 }}
                      animate={reduceMotion ? { opacity: 1 } : { scale: 1, opacity: 1 }}
                      exit={reduceMotion ? { opacity: 0 } : { scale: 0, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 450, damping: 25 }}
                      className="flex items-center justify-center"
                    >
                      <Check className="h-5 w-5 stroke-[3]" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>

              {!isLast && (
                <div className="relative h-1 flex-1 mx-1 bg-blue-950 overflow-hidden rounded-full">
                  <motion.div
                    initial={false}
                    animate={{ width: idx < currentStep - 1 ? "100%" : "0%" }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="h-full bg-blue-500"
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      <div className="mt-6 flex items-center justify-between text-sm">
        <span className="font-medium text-zinc-400">
          {stepsInfo[currentStep - 1] || "Processing..."}
        </span>
        <span className="font-semibold text-zinc-500 font-mono">
          {currentStep} of {totalSteps}
        </span>
      </div>
    </motion.div>
  );
}

export default StepTrackerWidget;
