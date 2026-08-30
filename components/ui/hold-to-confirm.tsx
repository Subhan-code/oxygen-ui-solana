"use client";

import React, { useRef, useState } from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type AnimationPlaybackControls,
} from "motion/react";
import { AlertTriangle, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const SPRING_PRESS = {
  type: "spring" as const,
  stiffness: 500,
  damping: 30,
  mass: 0.6,
};

const SPRING_SWAP = {
  type: "spring" as const,
  stiffness: 460,
  damping: 30,
  mass: 0.55,
};

export interface HoldToConfirmProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof motion.button>,
    "onAnimationStart"
  > {
  holdDuration?: number;
  label?: string;
  confirmedLabel?: string;
  onConfirm?: () => void;
}

const RING = 2 * Math.PI * 110;

export function HoldToConfirm({
  holdDuration = 1.5,
  label = "Hold to Confirm",
  confirmedLabel = "Action Confirmed",
  onConfirm,
  className,
  ...props
}: HoldToConfirmProps) {
  const reduceMotion = useReducedMotion();
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isHolding, setIsHolding] = useState(false);
  const progress = useMotionValue(0);
  const controlsRef = useRef<AnimationPlaybackControls | null>(null);
  const holdingRef = useRef(false);

  const ringDash = useTransform(progress, [0, 1], [0, RING]);
  const ringOffset = useTransform(ringDash, (d) => RING - d);
  const glowOpacity = useTransform(progress, [0, 1], [0, 0.8]);
  const buttonScale = useTransform(progress, [0, 1], [1, 0.94]);

  const confirm = () => {
    holdingRef.current = false;
    setIsHolding(false);
    setIsConfirmed(true);
    progress.set(1);
    onConfirm?.();
  };

  const startHold = () => {
    if (isConfirmed) return;
    if (reduceMotion) {
      confirm();
      return;
    }
    holdingRef.current = true;
    setIsHolding(true);
    controlsRef.current?.stop();
    controlsRef.current = animate(progress, 1, {
      duration: holdDuration,
      ease: "linear",
      onComplete: confirm,
    });
  };

  const cancelHold = () => {
    if (isConfirmed || !holdingRef.current) return;
    holdingRef.current = false;
    setIsHolding(false);
    controlsRef.current?.stop();
    controlsRef.current = animate(progress, 0, {
      type: "spring",
      stiffness: 380,
      damping: 32,
      mass: 0.7,
    });
  };

  const handleReset = () => {
    controlsRef.current?.stop();
    holdingRef.current = false;
    setIsHolding(false);
    setIsConfirmed(false);
    progress.set(0);
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key !== " " && event.key !== "Enter") return;
    event.preventDefault();
    if (event.repeat) return;
    startHold();
  };

  const onKeyUp = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key !== " " && event.key !== "Enter") return;
    event.preventDefault();
    cancelHold();
  };

  return (
    <div
      data-slot="hold-to-confirm"
      className="relative flex flex-col items-center justify-center select-none"
    >
      <div className="relative flex items-center justify-center">
        <svg
          className="pointer-events-none absolute -inset-6 h-44 w-44 -rotate-90"
          viewBox="0 0 260 260"
          aria-hidden="true"
        >
          <circle
            cx="130"
            cy="130"
            r="110"
            fill="none"
            stroke="currentColor"
            strokeWidth="6"
            className="text-neutral-200 dark:text-neutral-800"
          />
          <motion.circle
            cx="130"
            cy="130"
            r="110"
            fill="none"
            stroke="#34C759"
            strokeWidth="8"
            strokeLinecap="round"
            style={{
              strokeDasharray: RING,
              strokeDashoffset: ringOffset,
            }}
          />
        </svg>

        <motion.div
          style={{ opacity: glowOpacity }}
          className="pointer-events-none absolute h-24 w-48 rounded-full bg-[#34C759]/10"
        />

        <motion.button
          type="button"
          {...props}
          whileTap={reduceMotion || isConfirmed ? undefined : { scale: 0.97 }}
          transition={SPRING_PRESS}
          onPointerDown={startHold}
          onPointerUp={cancelHold}
          onPointerLeave={cancelHold}
          onPointerCancel={cancelHold}
          onKeyDown={onKeyDown}
          onKeyUp={onKeyUp}
          aria-label={
            isConfirmed
              ? confirmedLabel
              : reduceMotion
                ? label
                : `Hold for ${holdDuration} seconds to confirm`
          }
          aria-pressed={isConfirmed}
          aria-busy={isHolding}
          style={reduceMotion ? undefined : { scale: buttonScale }}
          className={cn(
            "relative z-10 flex h-14 min-w-44 items-center justify-center gap-2.5 rounded-full px-6 text-sm font-bold text-white shadow-xl cursor-pointer outline-none",
            "focus-visible:ring-2 focus-visible:ring-[#34C759]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            isConfirmed
              ? "bg-emerald-600 hover:bg-emerald-700"
              : "bg-neutral-900 hover:bg-neutral-800 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200",
            className,
          )}
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {isConfirmed ? (
              <motion.span
                key="confirmed"
                initial={reduceMotion ? false : { opacity: 0, y: 8, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -8, filter: "blur(4px)" }}
                transition={reduceMotion ? { duration: 0 } : SPRING_SWAP}
                className="inline-flex items-center gap-2.5"
              >
                <Check className="h-4 w-4" />
                <span>{confirmedLabel}</span>
              </motion.span>
            ) : (
              <motion.span
                key="idle"
                initial={reduceMotion ? false : { opacity: 0, y: 8, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -8, filter: "blur(4px)" }}
                transition={reduceMotion ? { duration: 0 } : SPRING_SWAP}
                className="inline-flex items-center gap-2.5"
              >
                <AlertTriangle className="h-4 w-4 text-amber-400" />
                <span>{label}</span>
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {isConfirmed ? (
        <button
          type="button"
          onClick={handleReset}
          className="mt-6 text-xs text-muted-foreground hover:underline font-mono cursor-pointer outline-none focus-visible:text-foreground"
        >
          Reset interaction
        </button>
      ) : (
        <p className="mt-6 text-xs text-muted-foreground font-mono">
          {reduceMotion
            ? "Press to confirm"
            : `Press and hold for ${holdDuration}s to trigger`}
        </p>
      )}
    </div>
  );
}

export default HoldToConfirm;
