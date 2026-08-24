"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Check, Mail, Globe, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

export interface StepTrackerWidgetProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart"> {
  title?: string;
  totalSteps?: number;
  initialStep?: number;
  stepsInfo?: string[];
}

export function StepTrackerWidget({
  title = "Application Pipeline",
  totalSteps = 5,
  initialStep = 3,
  stepsInfo = [
    "Reviewing application...",
    "Screening phone call...",
    "Writing summary...",
    "Scheduling interview...",
    "Final offer letter...",
  ],
  className,
  ...props
}: StepTrackerWidgetProps) {
  const reduceMotion = useReducedMotion();
  const [currentStep, setCurrentStep] = useState(initialStep);

  const handleStepClick = (stepIndex: number) => {
    setCurrentStep(stepIndex + 1);
  };

  return (
    <motion.div
      data-slot="step-tracker-widget"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 350, damping: 25 }}
      className={cn(
        "mx-auto w-full max-w-sm rounded-3xl bg-zinc-950 p-6 text-white shadow-2xl border border-zinc-800/80 font-sans select-none",
        className
      )}
      {...props}
    >
      {/* Header Row with Overlapped App Icons */}
      <div className="flex items-center justify-between pb-6">
        <h3 className="text-xl font-bold tracking-tight">{title}</h3>
        {/* Overlapped Circle App Badges */}
        <div className="flex items-center -space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-white shadow-md border-2 border-zinc-950 z-30">
            <Mail className="h-4 w-4" />
          </div>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-400 text-white shadow-md border-2 border-zinc-950 z-20">
            <Globe className="h-4 w-4" />
          </div>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-100 text-zinc-900 shadow-md border-2 border-zinc-950 z-10 font-bold text-xs">
            <FileText className="h-4 w-4" />
          </div>
        </div>
      </div>

      {/* Step Node Connector Line */}
      <div className="relative my-2 flex items-center justify-between px-1">
        {Array.from({ length: totalSteps }).map((_, idx) => {
          const isCompleted = idx < currentStep;
          const isLast = idx === totalSteps - 1;

          return (
            <React.Fragment key={idx}>
              {/* Step Circle Node */}
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
                {isCompleted && <Check className="h-5 w-5 stroke-[3]" />}
              </motion.button>

              {/* Connecting Line Segment */}
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

      {/* Footer Info Row */}
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
