"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Trash2, AlertTriangle, CheckCircle2, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

export interface HoldToDeleteButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  holdDurationMs?: number;
  onConfirmDelete?: () => void;
}

export function HoldToDeleteButton({
  holdDurationMs = 2000,
  onConfirmDelete,
  className,
  ...props
}: HoldToDeleteButtonProps) {
  const [progress, setProgress] = useState(0);
  const [isHolding, setIsHolding] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);
  const shouldReduceMotion = useReducedMotion();

  const startHold = () => {
    if (isDeleted) return;
    setIsHolding(true);
    startTimeRef.current = Date.now();

    timerRef.current = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const pct = Math.min(100, (elapsed / holdDurationMs) * 100);
      setProgress(pct);

      if (pct >= 100) {
        if (timerRef.current) clearInterval(timerRef.current);
        setIsHolding(false);
        setIsDeleted(true);
        onConfirmDelete?.();
      }
    }, 20);
  };

  const cancelHold = () => {
    if (isDeleted) return;
    setIsHolding(false);
    setProgress(0);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const handleReset = () => {
    setIsDeleted(false);
    setProgress(0);
    setIsHolding(false);
  };

  const strokeDash = 251.2; // 2 * pi * r (r=40)
  const offset = strokeDash - (progress / 100) * strokeDash;

  return (
    <div
      data-slot="hold-to-delete-button"
      className={cn("flex flex-col items-center justify-center gap-4 w-full max-w-sm select-none", className)}
      {...props}
    >
      {!isDeleted ? (
        <div className="relative flex items-center justify-center">
          {/* Circular SVG Hold Ring */}
          <svg width="110" height="110" className="rotate-[-90deg]">
            <circle cx="55" cy="55" r="44" strokeWidth="4" className="stroke-black/10 dark:stroke-white/10 fill-none" />
            <motion.circle
              cx="55"
              cy="55"
              r="44"
              strokeWidth="4"
              strokeDasharray={strokeDash}
              strokeDashoffset={offset}
              strokeLinecap="round"
              className="stroke-rose-600 fill-none transition-all duration-75"
            />
          </svg>

          {/* Main Press Trigger */}
          <motion.button
            type="button"
            onMouseDown={startHold}
            onMouseUp={cancelHold}
            onMouseLeave={cancelHold}
            onTouchStart={startHold}
            onTouchEnd={cancelHold}
            whileHover={shouldReduceMotion ? undefined : { scale: 1.02 }}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.94 }}
            className={cn(
              "absolute flex size-20 items-center justify-center rounded-full text-white shadow-xl transition-all cursor-pointer outline-none",
              isHolding
                ? "bg-rose-600 shadow-rose-500/40 ring-4 ring-rose-500/30"
                : "bg-rose-500 hover:bg-rose-600 shadow-rose-500/20"
            )}
          >
            <Trash2 className="size-7 stroke-[2.5]" />
          </motion.button>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center gap-3 p-6 rounded-3xl border border-rose-500/30 bg-rose-500/10 text-center w-full"
        >
          <div className="flex size-12 items-center justify-center rounded-2xl bg-rose-500 text-white shadow-md">
            <CheckCircle2 className="size-6 stroke-[3]" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-rose-600 dark:text-rose-400">Vault Item Deleted</h4>
            <p className="text-xs text-muted-foreground mt-0.5">Permanent erasure completed.</p>
          </div>
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-1.5 rounded-xl border border-black/10 dark:border-white/10 bg-white/80 dark:bg-[#1c1c1e]/80 px-3.5 py-1.5 text-xs font-bold text-foreground shadow-xs hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer"
          >
            <RefreshCw className="size-3.5" /> Reset Demo
          </button>
        </motion.div>
      )}

      {!isDeleted && (
        <span className="text-xs font-bold text-muted-foreground font-mono">
          {isHolding ? `Hold... ${Math.round(progress)}%` : "Press & Hold to Purge"}
        </span>
      )}
    </div>
  );
}

export default HoldToDeleteButton;
