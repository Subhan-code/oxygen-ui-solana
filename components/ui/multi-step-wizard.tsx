"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Check, ArrowRight, ArrowLeft, ShieldCheck, Wallet, Lock, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export interface MultiStepWizardProps extends React.HTMLAttributes<HTMLDivElement> {
  onComplete?: () => void;
}

const STEPS = [
  { id: 1, title: "Connect Wallet", icon: Wallet, desc: "Choose your Web3 signer" },
  { id: 2, title: "Set Security Vault", icon: Lock, desc: "Configure MEV & recovery" },
  { id: 3, title: "Confirm Deposit", icon: ShieldCheck, desc: "Broadcast initial stake" },
];

const springStep = {
  type: "spring" as const,
  stiffness: 400,
  damping: 30,
};

export function MultiStepWizard({ onComplete, className, ...props }: MultiStepWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState<1 | -1>(1);
  const shouldReduceMotion = useReducedMotion();

  const handleNext = () => {
    if (currentStep < STEPS.length) {
      setDirection(1);
      setCurrentStep((prev) => prev + 1);
    } else {
      onComplete?.();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setDirection(-1);
      setCurrentStep((prev) => prev - 1);
    }
  };

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 40 : -40,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -40 : 40,
      opacity: 0,
    }),
  };

  return (
    <div
      data-slot="multi-step-wizard"
      className={cn("flex flex-col gap-6 w-full max-w-md select-none", className)}
      {...props}
    >
      {/* Progress Bar & Step Indicators */}
      <div className="relative flex items-center justify-between px-2">
        <div className="absolute top-1/2 left-6 right-6 -z-10 h-0.5 -translate-y-1/2 bg-black/10 dark:bg-white/10" />
        <motion.div
          className="absolute top-1/2 left-6 -z-10 h-0.5 -translate-y-1/2 bg-blue-600 transition-all duration-300"
          style={{ width: `${((currentStep - 1) / (STEPS.length - 1)) * 88}%` }}
        />

        {STEPS.map((step) => {
          const isCompleted = currentStep > step.id;
          const isCurrent = currentStep === step.id;
          const Icon = step.icon;

          return (
            <div key={step.id} className="flex flex-col items-center gap-1.5">
              <motion.div
                whileHover={shouldReduceMotion ? undefined : { scale: 1.02 }}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.95 }}
                className={cn(
                  "flex size-10 items-center justify-center rounded-full border-2 transition-all duration-300 font-mono text-xs font-bold shadow-xs",
                  isCompleted
                    ? "bg-blue-600 border-blue-600 text-white"
                    : isCurrent
                    ? "bg-white dark:bg-[#1c1c1e] border-blue-600 text-blue-600 ring-4 ring-blue-500/20"
                    : "bg-white dark:bg-[#1c1c1e] border-black/10 dark:border-white/15 text-muted-foreground"
                )}
              >
                {isCompleted ? <Check className="size-4 stroke-[3]" /> : <Icon className="size-4" />}
              </motion.div>
              <span
                className={cn(
                  "text-[11px] font-bold tracking-tight transition-colors",
                  isCurrent ? "text-blue-600 dark:text-blue-400" : "text-muted-foreground"
                )}
              >
                {step.title}
              </span>
            </div>
          );
        })}
      </div>

      {/* Dynamic Slide Wizard Card */}
      <div className="relative overflow-hidden rounded-3xl border border-black/10 dark:border-white/12 bg-white/80 dark:bg-[#1c1c1e]/90 p-6 shadow-2xl backdrop-blur-2xl min-h-[220px]">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentStep}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={springStep}
            className="flex flex-col gap-4"
          >
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-500">
                Step {currentStep} of {STEPS.length}
              </span>
              <h3 className="text-lg font-extrabold text-foreground tracking-tight mt-0.5">
                {STEPS[currentStep - 1].title}
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">{STEPS[currentStep - 1].desc}</p>
            </div>

            {/* Step 1 Content */}
            {currentStep === 1 && (
              <div className="flex flex-col gap-2.5 pt-1">
                {["Phantom Wallet", "Backpack Signer", "Ledger Hardware"].map((w, idx) => (
                  <div
                    key={w}
                    className={cn(
                      "flex items-center justify-between p-3 rounded-2xl border text-xs font-bold transition-all cursor-pointer",
                      idx === 0
                        ? "border-blue-500/40 bg-blue-500/10 text-blue-600 dark:text-blue-400"
                        : "border-black/5 dark:border-white/5 bg-black/[0.02] dark:bg-white/[0.02] text-foreground hover:bg-black/5 dark:hover:bg-white/10"
                    )}
                  >
                    <span>{w}</span>
                    {idx === 0 && <Check className="size-4" />}
                  </div>
                ))}
              </div>
            )}

            {/* Step 2 Content */}
            {currentStep === 2 && (
              <div className="flex flex-col gap-3 pt-1">
                <div className="flex items-center justify-between rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] p-3 border border-black/5 dark:border-white/5 text-xs">
                  <span className="font-bold text-foreground">MEV Protection Relay</span>
                  <span className="text-emerald-500 font-bold font-mono">Enabled</span>
                </div>
                <div className="flex items-center justify-between rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] p-3 border border-black/5 dark:border-white/5 text-xs">
                  <span className="font-bold text-foreground">Slippage Tolerance</span>
                  <span className="text-blue-500 font-bold font-mono">0.1%</span>
                </div>
              </div>
            )}

            {/* Step 3 Content */}
            {currentStep === 3 && (
              <div className="flex flex-col items-center justify-center gap-3 py-4 text-center">
                <div className="flex size-12 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-500">
                  <Sparkles className="size-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-foreground">Ready to Broadcast</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">0.5 SOL Initial Stake Deposit</p>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          disabled={currentStep === 1}
          onClick={handleBack}
          className={cn(
            "flex items-center gap-1.5 h-11 px-5 rounded-2xl border text-xs font-bold transition-all cursor-pointer outline-none",
            currentStep > 1
              ? "border-black/10 dark:border-white/10 bg-white/80 dark:bg-[#1c1c1e]/80 text-foreground hover:bg-black/5 dark:hover:bg-white/10"
              : "border-transparent opacity-40 cursor-not-allowed text-muted-foreground"
          )}
        >
          <ArrowLeft className="size-4" /> Back
        </button>

        <motion.button
          type="button"
          whileHover={shouldReduceMotion ? undefined : { scale: 1.02 }}
          whileTap={shouldReduceMotion ? undefined : { scale: 0.96 }}
          onClick={handleNext}
          className="flex items-center justify-center gap-2 h-11 px-6 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md shadow-blue-500/25 transition-colors cursor-pointer outline-none"
        >
          <span>{currentStep === STEPS.length ? "Finish Setup" : "Continue"}</span>
          <ArrowRight className="size-4" />
        </motion.button>
      </div>
    </div>
  );
}

export default MultiStepWizard;
