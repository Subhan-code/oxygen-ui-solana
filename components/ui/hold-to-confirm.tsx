"use client";

import React, { useState, useRef } from "react";
import { motion, useMotionValue, useTransform, animate, type AnimationPlaybackControls } from "motion/react";
import { Check, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

export interface HoldToConfirmProps
  extends Omit<React.ComponentPropsWithoutRef<typeof motion.button>, "onAnimationStart"> {
  holdDuration?: number;
  label?: string;
  confirmedLabel?: string;
  onConfirm?: () => void;
}

export function HoldToConfirm({
  holdDuration = 1.5,
  label = "Hold to Confirm",
  confirmedLabel = "Action Confirmed",
  onConfirm,
  className,
  ...props
}: HoldToConfirmProps) {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const progress = useMotionValue(0);
  const controlsRef = useRef<AnimationPlaybackControls | null>(null);

  const ringDash = useTransform(progress, [0, 1], [0, 754]);
  const glowOpacity = useTransform(progress, [0, 1], [0, 0.8]);
  const buttonScale = useTransform(progress, [0, 1], [1, 0.94]);

  const handlePointerDown = () => {
    if (isConfirmed) return;
    controlsRef.current?.stop();
    controlsRef.current = animate(progress, 1, {
      duration: holdDuration,
      ease: "linear",
      onComplete: () => {
        setIsConfirmed(true);
        onConfirm?.();
      },
    });
  };

  const handlePointerUp = () => {
    if (isConfirmed) return;
    controlsRef.current?.stop();
    controlsRef.current = animate(progress, 0, {
      duration: 0.3,
      ease: "easeOut",
    });
  };

  const handleReset = () => {
    setIsConfirmed(false);
    progress.set(0);
  };

  return (
    <div
      data-slot="hold-to-confirm"
      className="relative flex flex-col items-center justify-center select-none"
    >
      <div className="relative flex items-center justify-center">
        {/* SVG Progress Ring */}
        <svg
          className="pointer-events-none absolute -inset-6 h-44 w-44 -rotate-90"
          viewBox="0 0 260 260"
        >
          {/* Background circle track */}
          <circle
            cx="130"
            cy="130"
            r="110"
            fill="none"
            stroke="currentColor"
            strokeWidth="6"
            className="text-neutral-200 dark:text-neutral-800"
          />
          {/* Animated active stroke */}
          <motion.circle
            cx="130"
            cy="130"
            r="110"
            fill="none"
            stroke="url(#confirm-gradient)"
            strokeWidth="8"
            strokeLinecap="round"
            style={{
              strokeDasharray: "754",
              strokeDashoffset: useTransform(ringDash, (d) => 754 - d),
            }}
          />
          <defs>
            <linearGradient id="confirm-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
          </defs>
        </svg>

        {/* Glow Element */}
        <motion.div
          style={{ opacity: glowOpacity }}
          className="pointer-events-none absolute h-24 w-48 rounded-full bg-emerald-500 blur-2xl"
        />

        {/* Main Hold Button */}
        <motion.button whileTap={{ scale: 0.97 }}
          type="button"
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          style={{ scale: buttonScale }}
          className={cn(
            "relative z-10 flex h-14 min-w-44 items-center justify-center gap-2.5 rounded-full px-6 text-sm font-bold text-white shadow-xl transition-colors cursor-pointer active:cursor-grabbing",
            isConfirmed
              ? "bg-emerald-600 hover:bg-emerald-700"
              : "bg-neutral-900 hover:bg-neutral-800 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200",
            className
          )}
          {...props}
        >
          {isConfirmed ? (
            <>
              <Check className="h-4 w-4" />
              <span>{confirmedLabel}</span>
            </>
          ) : (
            <>
              <AlertTriangle className="h-4 w-4 text-amber-400" />
              <span>{label}</span>
            </>
          )}
        </motion.button>
      </div>

      {isConfirmed ? (
        <button
          type="button"
          onClick={handleReset}
          className="mt-6 text-xs text-muted-foreground hover:underline font-mono cursor-pointer"
        >
          Reset interaction
        </button>
      ) : (
        <p className="mt-6 text-xs text-muted-foreground font-mono">
          Press and hold for {holdDuration}s to trigger
        </p>
      )}
    </div>
  );
}
