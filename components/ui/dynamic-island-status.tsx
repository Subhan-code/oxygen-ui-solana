"use client";

import React, { useState, useMemo } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  Wallet,
  ArrowRightLeft,
  Timer,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Zap,
  Play,
  RotateCcw,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type DynamicIslandMode = "idle" | "swap" | "timer" | "success";

export interface DynamicIslandStatusProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultMode?: DynamicIslandMode;
  snsDomain?: string;
  balanceSol?: string;
}

const BOUNCE_VARIANTS: Record<string, number> = {
  idle: 0.45,
  swap: 0.35,
  timer: 0.32,
  success: 0.4,
};

export function DynamicIslandStatus({
  defaultMode = "idle",
  snsDomain = "phantom.sol",
  balanceSol = "142.85 SOL",
  className,
  ...props
}: DynamicIslandStatusProps) {
  const [mode, setMode] = useState<DynamicIslandMode>(defaultMode);
  const [timerSeconds, setTimerSeconds] = useState(45);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds]);

  const content = useMemo(() => {
    switch (mode) {
      case "idle":
        return (
          <motion.div
            key="island-idle"
            initial={{ opacity: 0, filter: "blur(4px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(4px)" }}
            transition={{ duration: 0.2 }}
            className="flex items-center justify-between gap-3 px-3 py-1 text-white select-none"
          >
            <div className="flex items-center gap-2">
              <div className="flex size-5 items-center justify-center rounded-full bg-blue-500/20 text-blue-400">
                <Wallet className="size-3" />
              </div>
              <span className="text-xs font-bold tracking-tight">{snsDomain}</span>
            </div>
            <span className="font-mono text-xs font-semibold text-blue-400">{balanceSol}</span>
          </motion.div>
        );

      case "swap":
        return (
          <motion.div
            key="island-swap"
            initial={{ opacity: 0, filter: "blur(4px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(4px)" }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-2.5 p-3 text-white select-none w-[310px]"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-bold text-sky-400">
                <ArrowRightLeft className="size-3.5 animate-pulse" />
                <span>Broadcasting Jupiter Swap</span>
              </div>
              <span className="size-2 rounded-full bg-emerald-400 animate-ping" />
            </div>
            <div className="flex items-center justify-between rounded-xl bg-white/10 p-2 text-xs font-mono">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-white">4.85 SOL</span>
              </div>
              <span className="text-muted-foreground">→</span>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-emerald-400">+945.75 USDC</span>
              </div>
            </div>
          </motion.div>
        );

      case "timer":
        return (
          <motion.div
            key="island-timer"
            initial={{ opacity: 0, filter: "blur(4px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(4px)" }}
            transition={{ duration: 0.2 }}
            className="flex items-center justify-between gap-4 p-3 text-white select-none w-[290px]"
          >
            <div className="flex items-center gap-2.5">
              <div className="flex size-8 items-center justify-center rounded-xl bg-purple-500/20 text-purple-400">
                <Timer className="size-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] font-medium text-white/60">Epoch Staking Lock</span>
                <span className="font-mono text-sm font-bold text-purple-400">
                  00:{timerSeconds < 10 ? `0${timerSeconds}` : timerSeconds}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                className="flex size-7 items-center justify-center rounded-lg bg-white/15 hover:bg-white/25 text-white transition-colors cursor-pointer"
              >
                <Play className="size-3.5" />
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsTimerRunning(false);
                  setTimerSeconds(45);
                }}
                className="flex size-7 items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-colors cursor-pointer"
              >
                <RotateCcw className="size-3" />
              </button>
            </div>
          </motion.div>
        );

      case "success":
        return (
          <motion.div
            key="island-success"
            initial={{ opacity: 0, filter: "blur(4px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(4px)" }}
            transition={{ duration: 0.2 }}
            className="flex items-center justify-between gap-3 px-3.5 py-1.5 text-white select-none w-[270px]"
          >
            <div className="flex items-center gap-2">
              <div className="flex size-5 items-center justify-center rounded-full bg-emerald-500 text-black">
                <CheckCircle2 className="size-3.5 stroke-[3]" />
              </div>
              <span className="text-xs font-bold text-emerald-400">Airdrop Claimed!</span>
            </div>
            <span className="font-mono text-xs font-bold text-white">+500 $OXY</span>
          </motion.div>
        );
    }
  }, [mode, snsDomain, balanceSol, timerSeconds, isTimerRunning]);

  return (
    <div
      data-slot="dynamic-island-status"
      className={cn("flex flex-col items-center justify-center gap-6 w-full max-w-sm select-none", className)}
      {...props}
    >
      {/* Morphing Dynamic Island Capsule */}
      <motion.div
        layout
        transition={{
          type: "spring",
          bounce: shouldReduceMotion ? 0 : BOUNCE_VARIANTS[mode],
          duration: 0.45,
        }}
        className="relative overflow-hidden rounded-[32px] bg-black p-1 shadow-2xl ring-1 ring-white/15"
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {content}
        </AnimatePresence>
      </motion.div>

      {/* Mode Switcher Buttons */}
      <div className="flex items-center gap-1 rounded-full border border-black/10 dark:border-white/10 bg-white/70 dark:bg-[#1c1c1e]/80 backdrop-blur-2xl p-1 shadow-xs">
        {(
          [
            { id: "idle", label: "Idle Pill", icon: Wallet },
            { id: "swap", label: "Swap State", icon: ArrowRightLeft },
            { id: "timer", label: "Lock Timer", icon: Timer },
            { id: "success", label: "Airdrop Claim", icon: Sparkles },
          ] as const
        ).map((m) => {
          const isSelected = mode === m.id;
          const Icon = m.icon;
          return (
            <button
              key={m.id}
              type="button"
              onClick={() => setMode(m.id)}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-tight transition-all duration-140 cursor-pointer outline-none active:scale-[0.94]",
                isSelected
                  ? "bg-foreground text-background font-bold shadow-xs"
                  : "text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/10"
              )}
            >
              <Icon className="size-3" />
              <span>{m.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default DynamicIslandStatus;
