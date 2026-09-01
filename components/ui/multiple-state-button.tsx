"use client";

import React, { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ShieldAlert, ShieldCheck, Loader2, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type ButtonActionState = "idle" | "loading" | "success";

export interface MultipleStateButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  onAction?: () => Promise<void> | void;
}

const animationVariants = {
  initial: { opacity: 0, y: -16, filter: "blur(3px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
  exit: { opacity: 0, y: 16, filter: "blur(3px)" },
};

const springButton = {
  type: "spring" as const,
  stiffness: 480,
  damping: 28,
  mass: 0.6,
};

export function MultipleStateButton({
  onAction,
  className,
  ...props
}: MultipleStateButtonProps) {
  const [state, setState] = useState<ButtonActionState>("idle");
  const shouldReduceMotion = useReducedMotion();

  const handleTrigger = async () => {
    if (state !== "idle") return;
    setState("loading");

    try {
      if (onAction) {
        await onAction();
      } else {
        await new Promise((res) => setTimeout(res, 1800));
      }
      setState("success");
      setTimeout(() => {
        setState("idle");
      }, 3500);
    } catch {
      setState("idle");
    }
  };

  return (
    <div
      data-slot="multiple-state-button"
      className={cn("flex flex-col items-center justify-center gap-4 select-none", className)}
      {...props}
    >
      <motion.button
        type="button"
        whileHover={shouldReduceMotion || state !== "idle" ? undefined : { scale: 1.03 }}
        whileTap={shouldReduceMotion || state !== "idle" ? undefined : { scale: 0.96 }}
        transition={springButton}
        onClick={handleTrigger}
        disabled={state !== "idle"}
        className={cn(
          "relative flex h-12 min-w-[200px] items-center justify-center overflow-hidden rounded-2xl px-5 text-xs font-bold tracking-tight shadow-md motion-safe:transition-colors cursor-pointer outline-none border",
          "focus-visible:ring-2 focus-visible:ring-[#0066FF]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          state === "idle" &&
            "bg-[#0066FF] hover:bg-[#0052CC] text-white border-[#0066FF]/40 shadow-[#0066FF]/25",
          state === "loading" &&
            "bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 border-black/10 dark:border-white/10 opacity-90 cursor-wait",
          state === "success" &&
            "bg-emerald-600 text-white border-emerald-500/40 shadow-emerald-500/25"
        )}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {state === "idle" && (
            <motion.span
              key="idle"
              variants={animationVariants}
              initial="initial"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.2 }}
              className="flex items-center gap-2"
            >
              <ShieldAlert className="size-4" />
              <span>Secure Vault & Sign</span>
              <ArrowRight className="size-3.5 opacity-60" />
            </motion.span>
          )}

          {state === "loading" && (
            <motion.span
              key="loading"
              variants={animationVariants}
              initial="initial"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.2 }}
              className="flex items-center gap-2"
            >
              <Loader2 className="size-4 animate-spin" />
              <span>Broadcasting Signatures...</span>
            </motion.span>
          )}

          {state === "success" && (
            <motion.span
              key="success"
              variants={animationVariants}
              initial="initial"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.2 }}
              className="flex items-center gap-2"
            >
              <ShieldCheck className="size-4.5 stroke-[2.5]" />
              <span>Vault Secured</span>
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}

export interface CooldownButtonProps extends React.ComponentProps<typeof motion.button> {
  cooldownTime?: number;
  label?: string;
}



export function CooldownButton({
  cooldownTime = 5,
  label = "Request Code",
  className,
  onClick,
  ...props
}: CooldownButtonProps) {
  const [seconds, setSeconds] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  React.useEffect(() => {
    if (seconds <= 0) return;
    const timer = setInterval(() => setSeconds((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [seconds]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (seconds > 0) return;
    setSeconds(cooldownTime);
    onClick?.(e);
  };

  return (
    <motion.button
      type="button"
      whileHover={shouldReduceMotion || seconds > 0 ? undefined : { scale: 1.02 }}
      whileTap={shouldReduceMotion || seconds > 0 ? undefined : { scale: 0.97 }}
      transition={springButton}
      onClick={handleClick}
      disabled={seconds > 0}
      className={cn(
        "relative flex h-11 items-center justify-center overflow-hidden rounded-xl px-4 text-xs font-bold transition-all cursor-pointer outline-none border font-sans select-none",
        seconds > 0
          ? "bg-zinc-100 dark:bg-zinc-900 text-zinc-400 border-zinc-200 dark:border-zinc-800 cursor-not-allowed"
          : "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/80 shadow-xs",
        className
      )}
      {...props}
    >
      <AnimatePresence mode="wait" initial={false}>
        {seconds > 0 ? (
          <motion.span
            key="cooldown"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? undefined : { opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="flex items-center gap-1.5 font-mono"
          >
            <span>Resend in</span>
            <span className="font-bold text-sky-500">{seconds}s</span>
          </motion.span>
        ) : (
          <motion.span
            key="active"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? undefined : { opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

export default MultipleStateButton;

