"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Timer } from "lucide-react";
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

export interface CooldownButtonProps
  extends Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart"
  > {
  cooldownSeconds?: number;
}

export function CooldownButton({
  cooldownSeconds = 5,
  className,
  onClick,
  ...props
}: CooldownButtonProps) {
  const reduceMotion = useReducedMotion();
  const [secondsLeft, setSecondsLeft] = useState(0);
  const isCoolingDown = secondsLeft > 0;
  const remaining = cooldownSeconds > 0 ? secondsLeft / cooldownSeconds : 0;

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const timer = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [secondsLeft]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isCoolingDown) return;
    setSecondsLeft(cooldownSeconds);
    onClick?.(e);
  };

  return (
    <motion.button
      type="button"
      data-slot="cooldown-button"
      whileTap={reduceMotion || isCoolingDown ? undefined : { scale: 0.96 }}
      transition={SPRING_PRESS}
      onClick={handleClick}
      disabled={isCoolingDown}
      aria-busy={isCoolingDown}
      className={cn(
        "relative inline-flex items-center gap-2 overflow-hidden rounded-2xl bg-[#0066FF] px-5 py-3 text-sm font-bold text-white shadow-lg cursor-pointer select-none outline-none",
        "focus-visible:ring-2 focus-visible:ring-[#0066FF]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        isCoolingDown && "cursor-not-allowed bg-zinc-700",
        className,
      )}
      style={{ cornerShape: "squircle" } as React.CSSProperties}
      {...props}
    >
      <motion.span
        aria-hidden="true"
        className="absolute inset-0 origin-left bg-white/15"
        initial={false}
        animate={{ scaleX: isCoolingDown ? remaining : 0 }}
        transition={
          reduceMotion
            ? { duration: 0 }
            : { type: "spring", stiffness: 220, damping: 32 }
        }
        style={{ transformOrigin: "left center" }}
      />
      <Timer className="relative h-4 w-4" />
      <span className="relative inline-flex min-w-[9.5rem] items-center">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={isCoolingDown ? `cd-${secondsLeft}` : "ready"}
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
            transition={reduceMotion ? { duration: 0 } : SPRING_SWAP}
          >
            {isCoolingDown ? `Cooldown (${secondsLeft}s)` : "Submit Action"}
          </motion.span>
        </AnimatePresence>
      </span>
    </motion.button>
  );
}

export default CooldownButton;
