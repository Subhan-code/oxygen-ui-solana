"use client";

import React, { useState, useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  AlertTriangle,
  Check,
  Copy,
  Sparkles,
  Zap,
  Flame,
  Clock,
  ShieldAlert,
  Loader2,
  SlidersHorizontal,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type EvilButtonsGroupProps = React.HTMLAttributes<HTMLDivElement>;

export function EvilButtonsGroup({
  className,
  ...props
}: EvilButtonsGroupProps) {
  const shouldReduceMotion = useReducedMotion();

  // 1. Hold Button state
  const [holdProgress, setHoldProgress] = useState(0);
  const [holdCompleted, setHoldCompleted] = useState(false);
  const holdIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const startHold = () => {
    if (holdCompleted) {
      setHoldCompleted(false);
      setHoldProgress(0);
      return;
    }
    holdIntervalRef.current = setInterval(() => {
      setHoldProgress((prev) => {
        if (prev >= 100) {
          clearInterval(holdIntervalRef.current!);
          setHoldCompleted(true);
          return 100;
        }
        return prev + 5;
      });
    }, 50);
  };

  const endHold = () => {
    if (holdIntervalRef.current) clearInterval(holdIntervalRef.current);
    if (!holdCompleted) setHoldProgress(0);
  };

  // 2. Cooldown Button state
  const [cooldownTime, setCooldownTime] = useState(0);
  const handleCooldown = () => {
    if (cooldownTime > 0) return;
    setCooldownTime(3);
    const timer = setInterval(() => {
      setCooldownTime((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // 3. Don't Press Button state
  const [pressCount, setPressCount] = useState(0);
  const [isShaking, setIsShaking] = useState(false);
  const handleDontPress = () => {
    setPressCount((p) => p + 1);
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 500);
  };

  // 4. Confetti Button state
  const [confettiActive, setConfettiActive] = useState(false);
  const handleConfetti = () => {
    setConfettiActive(true);
    setTimeout(() => setConfettiActive(false), 1200);
  };

  // 5. Morph Status Button state
  const [morphState, setMorphState] = useState<"idle" | "loading" | "success">("idle");
  const handleMorph = () => {
    if (morphState !== "idle") return;
    setMorphState("loading");
    setTimeout(() => {
      setMorphState("success");
      setTimeout(() => setMorphState("idle"), 2000);
    }, 1500);
  };

  // 6. Copy Button state
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // 7. Toggle Pill Button state
  const [pillActive, setPillActive] = useState(false);

  return (
    <div
      data-slot="evil-buttons-group"
      className={cn(
        "mx-auto flex w-full max-w-3xl flex-col gap-6 rounded-3xl bg-zinc-950 p-6 sm:p-8 text-white shadow-2xl border border-zinc-800/80 font-sans select-none",
        className
      )}
      {...props}
    >
      <div className="flex flex-col gap-1 border-b border-zinc-800/80 pb-4">
        <h3 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-amber-400" />
          Evil Buttons Collection
        </h3>
        <p className="text-xs text-zinc-400">
          A suite of 10 interactive button micro-interactions built with Framer Motion, spring physics, and Apple UI design.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-center justify-items-center">
        {/* 1. Hold Button */}
        <button
          type="button"
          onMouseDown={startHold}
          onMouseUp={endHold}
          onMouseLeave={endHold}
          onTouchStart={startHold}
          onTouchEnd={endHold}
          className="relative flex h-12 w-48 items-center justify-center overflow-hidden rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-semibold text-zinc-200 shadow-md active:scale-95 transition-transform"
        >
          <div
            className="absolute left-0 top-0 bottom-0 bg-amber-500/20 transition-all"
            style={{ width: `${holdProgress}%` }}
          />
          <span className="relative z-10 flex items-center gap-1.5">
            <Flame className="h-4 w-4 text-amber-400" />
            {holdCompleted ? "Unlocked!" : "Hold to Unlock"}
          </span>
        </button>

        {/* 2. Grid Glow Button */}
        <button
          type="button"
          className="group relative flex h-12 w-48 items-center justify-center overflow-hidden rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-semibold text-zinc-200 shadow-md hover:border-emerald-500/50 transition-all"
        >
          <span className="relative z-10 flex items-center gap-1.5">
            <Zap className="h-4 w-4 text-emerald-400" />
            Grid Active
          </span>
        </button>

        {/* 3. Shiny Shimmer Button */}
        <button
          type="button"
          className="group relative flex h-12 w-48 items-center justify-center overflow-hidden rounded-xl bg-zinc-900 border border-zinc-700 text-xs font-semibold text-zinc-100 shadow-md hover:bg-zinc-800 transition-colors"
        >
          <span className="relative z-10 flex items-center gap-1.5">
            <Sparkles className="h-4 w-4 text-indigo-400" />
            Shimmer Effect
          </span>
        </button>

        {/* 4. Cooldown Button */}
        <button
          type="button"
          onClick={handleCooldown}
          disabled={cooldownTime > 0}
          className="relative flex h-12 w-48 items-center justify-center rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-semibold text-zinc-200 shadow-md disabled:opacity-50 transition-all"
        >
          <span className="flex items-center gap-1.5">
            <Clock className="h-4 w-4 text-blue-400" />
            {cooldownTime > 0 ? `Wait ${cooldownTime}s` : "Trigger Cooldown"}
          </span>
        </button>

        {/* 5. Don't Press Button */}
        <motion.button
          type="button"
          onClick={handleDontPress}
          animate={isShaking && !shouldReduceMotion ? { x: [-4, 4, -4, 4, 0] } : {}}
          transition={{ duration: 0.4 }}
          className="relative flex h-12 w-48 items-center justify-center rounded-xl bg-rose-950/40 border border-rose-800/80 text-xs font-semibold text-rose-300 shadow-md hover:bg-rose-900/60 transition-colors"
        >
          <span className="flex items-center gap-1.5">
            <ShieldAlert className="h-4 w-4 text-rose-400" />
            {pressCount === 0
              ? "Don't Press Me!"
              : `Pressed ${pressCount}x!`}
          </span>
        </motion.button>

        {/* 6. Confetti Burst Button */}
        <button
          type="button"
          onClick={handleConfetti}
          className="relative flex h-12 w-48 items-center justify-center overflow-hidden rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-semibold text-zinc-200 shadow-md hover:border-violet-500/50 transition-colors"
        >
          {confettiActive && (
            <motion.div
              initial={{ scale: 0.5, opacity: 1 }}
              animate={{ scale: 1.5, opacity: 0 }}
              className="absolute inset-0 bg-violet-500/30 rounded-xl"
            />
          )}
          <span className="relative z-10 flex items-center gap-1.5">
            <Sparkles className="h-4 w-4 text-violet-400" />
            {confettiActive ? "🎉 Boom!" : "Confetti Burst"}
          </span>
        </button>

        {/* 7. Toggle Pill Button */}
        <button
          type="button"
          onClick={() => setPillActive(!pillActive)}
          className="flex h-12 w-48 items-center justify-between px-4 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-semibold text-zinc-200 shadow-md"
        >
          <span className="flex items-center gap-1.5">
            <SlidersHorizontal className="h-4 w-4 text-teal-400" />
            State: {pillActive ? "ON" : "OFF"}
          </span>
          <div
            className={cn(
              "h-5 w-9 rounded-full p-0.5 transition-colors duration-200",
              pillActive ? "bg-teal-500" : "bg-zinc-700"
            )}
          >
            <div
              className={cn(
                "h-4 w-4 rounded-full bg-white transition-transform duration-200",
                pillActive && "translate-x-4"
              )}
            />
          </div>
        </button>

        {/* 8. Morphing Status Button */}
        <button
          type="button"
          onClick={handleMorph}
          disabled={morphState !== "idle"}
          className="relative flex h-12 w-48 items-center justify-center rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-semibold text-zinc-200 shadow-md transition-all"
        >
          {morphState === "loading" && (
            <Loader2 className="h-4 w-4 animate-spin text-amber-400" />
          )}
          {morphState === "success" && (
            <span className="flex items-center gap-1 text-emerald-400 font-bold">
              <Check className="h-4 w-4" /> Done!
            </span>
          )}
          {morphState === "idle" && <span>Morphing Status</span>}
        </button>

        {/* 9. Copy Link Button */}
        <button
          type="button"
          onClick={handleCopy}
          className="relative flex h-12 w-48 items-center justify-center rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-semibold text-zinc-200 shadow-md hover:bg-zinc-850 transition-colors"
        >
          <span className="flex items-center gap-1.5">
            {copied ? (
              <>
                <Check className="h-4 w-4 text-emerald-400" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 text-zinc-400" />
                Copy Link
              </>
            )}
          </span>
        </button>
      </div>
    </div>
  );
}

export default EvilButtonsGroup;
