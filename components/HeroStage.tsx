"use client";

import type { CSSProperties, MouseEvent } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { SolanaWalletCard } from "@/components/ui/solana-wallet-card";
import { TrendBadge } from "@/components/ui/trend-badge";
import { SPRING_MOUSE } from "@/lib/ease";

export default function HeroStage() {
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, SPRING_MOUSE);
  const sy = useSpring(y, SPRING_MOUSE);
  const chipX = useSpring(x, { ...SPRING_MOUSE, stiffness: 140 });
  const chipY = useSpring(y, { ...SPRING_MOUSE, stiffness: 140 });
  const chip2X = useSpring(x, { ...SPRING_MOUSE, stiffness: 180, damping: 20 });
  const chip2Y = useSpring(y, { ...SPRING_MOUSE, stiffness: 180, damping: 20 });
  const rotate = useTransform(sx, [-18, 18], [-1.6, 1.6]);

  const onMove = (event: MouseEvent<HTMLDivElement>) => {
    if (reduceMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    x.set(px * 18);
    y.set(py * 12);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative mx-auto flex w-full max-w-[22rem] items-center justify-center sm:max-w-sm lg:max-w-none lg:justify-end"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0066FF]/20 blur-3xl dark:bg-[#0A84FF]/25"
      />

      <motion.div
        style={
          reduceMotion
            ? undefined
            : { x: sx, y: sy, rotate, transformOrigin: "center center" }
        }
        className="relative w-full max-w-sm"
      >
        <SolanaWalletCard className="shadow-2xl border border-black/10 dark:border-white/15" />
      </motion.div>

      {/* Floating Top Right Chip: APY & Solana Mainnet-Beta */}
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 10, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 320, damping: 24, delay: 0.18 }}
        style={
          reduceMotion
            ? undefined
            : { x: chipX, y: chipY, transformOrigin: "center center" }
        }
        className="absolute -right-1 top-6 sm:-right-6 sm:top-8 z-20 pointer-events-none select-none"
      >
        <div
          className="flex items-center gap-2 rounded-full border border-black/10 bg-white/90 px-3.5 py-1.5 shadow-xl backdrop-blur-xl dark:border-white/15 dark:bg-[#1C1C1E]/90"
          style={{ cornerShape: "squircle" } as CSSProperties}
        >
          <TrendBadge trend="up">+18.4% APY</TrendBadge>
          <span className="text-[11px] font-mono font-medium text-zinc-500 dark:text-zinc-400">
            Solana Mainnet-Beta
          </span>
        </div>
      </motion.div>

      {/* Floating Bottom Left Chip: TPS Metric */}
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: -10, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 320, damping: 24, delay: 0.24 }}
        style={
          reduceMotion
            ? undefined
            : { x: chip2X, y: chip2Y, transformOrigin: "center center" }
        }
        className="absolute -left-2 bottom-4 sm:-left-8 sm:bottom-6 z-20 pointer-events-none select-none"
      >
        <div
          className="flex items-center gap-2 rounded-full border border-black/10 bg-white/90 px-3.5 py-1.5 shadow-xl backdrop-blur-xl dark:border-white/15 dark:bg-[#1C1C1E]/90"
          style={{ cornerShape: "squircle" } as CSSProperties}
        >
          <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[11px] font-mono font-bold text-zinc-900 dark:text-zinc-100">
            TPS: 3,420 • 400ms
          </span>
        </div>
      </motion.div>
    </div>
  );
}
