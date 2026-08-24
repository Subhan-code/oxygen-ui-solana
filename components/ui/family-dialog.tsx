"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, type Transition } from "motion/react";
import { X, ArrowLeft, ChevronRight, Shield, Bell, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FamilyDialogProps
  extends React.HTMLAttributes<HTMLDivElement> {
  triggerText?: string;
}

const springTransition: Transition = {
  type: "spring",
  stiffness: 400,
  damping: 22,
};

export function FamilyDialog({
  triggerText = "Account Settings",
  className,
}: FamilyDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState<"menu" | "security">("menu");

  const close = () => {
    setIsOpen(false);
    setTimeout(() => setCurrentStep("menu"), 300);
  };

  return (
    <div data-slot="family-dialog" className={cn("inline-flex items-center", className)}>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="rounded-2xl bg-neutral-900 px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-neutral-800 active:scale-95 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200 cursor-pointer shadow-md"
      >
        {triggerText}
      </button>

      <AnimatePresence>
        {isOpen ? (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={close}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />

            {/* Morphing Dialog Card */}
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.92, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 15 }}
              transition={springTransition}
              className="relative w-full max-w-sm overflow-hidden rounded-3xl border border-neutral-200 bg-white p-6 shadow-2xl dark:border-neutral-800 dark:bg-neutral-900 select-none z-10"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                {currentStep !== "menu" ? (
                  <button
                    type="button"
                    onClick={() => setCurrentStep("menu")}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </button>
                ) : (
                  <div className="h-8 w-8 flex items-center justify-center">
                    <Shield className="h-5 w-5 text-emerald-500" />
                  </div>
                )}

                <span className="text-sm font-bold capitalize">
                  {currentStep === "menu" ? "Preferences" : "Security"}
                </span>

                <button
                  type="button"
                  onClick={close}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* View Content */}
              <AnimatePresence mode="wait">
                {currentStep === "menu" ? (
                  <motion.div
                    key="menu"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.15 }}
                    className="flex flex-col gap-2"
                  >
                    <button
                      type="button"
                      onClick={() => setCurrentStep("security")}
                      className="flex items-center justify-between p-3.5 rounded-2xl bg-neutral-50 hover:bg-neutral-100 dark:bg-neutral-800/60 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <Lock className="h-4 w-4 text-emerald-500" />
                        <div className="text-left">
                          <p className="text-xs font-semibold">Security & Keys</p>
                          <p className="text-[11px] text-muted-foreground">Manage multi-factor login</p>
                        </div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </button>

                    <div className="flex items-center justify-between p-3.5 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60">
                      <div className="flex items-center gap-3">
                        <Bell className="h-4 w-4 text-amber-500" />
                        <div className="text-left">
                          <p className="text-xs font-semibold">Notifications</p>
                          <p className="text-[11px] text-muted-foreground">Push notifications enabled</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-emerald-500 font-bold">Active</span>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="security"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.15 }}
                    className="flex flex-col gap-3"
                  >
                    <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
                      <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400">Passkey Authentication</p>
                      <p className="text-[11px] text-muted-foreground mt-0.5">Biometric FaceID hardware key is linked</p>
                    </div>

                    <button
                      type="button"
                      onClick={close}
                      className="w-full py-2.5 rounded-xl bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 text-xs font-bold transition-transform active:scale-95 cursor-pointer mt-1"
                    >
                      Done
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
