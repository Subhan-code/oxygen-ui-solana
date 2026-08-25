"use client";

import React, { useState, useEffect } from "react";
import {
  Check,
  ChevronDown,
  Cpu,
  Zap,
  Activity,
  Radio,
  Clock,
  Server,
  RefreshCw,
} from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import solana from "thesvg/solana";
import { cn } from "@/lib/utils";

export interface SolanaNetworkHealthProps
  extends Omit<
    React.HTMLAttributes<HTMLDivElement>,
    "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart"
  > {
  tps?: number;
  pingMs?: number;
  currentEpoch?: number;
  epochProgressPct?: number;
  blockTimeMs?: number;
  activeValidators?: number;
}

export function SolanaNetworkHealth({
  tps = 2940,
  pingMs = 18,
  currentEpoch = 642,
  epochProgressPct = 68.4,
  blockTimeMs = 410,
  activeValidators = 1420,
  className,
  ...props
}: SolanaNetworkHealthProps) {
  const reduceMotion = useReducedMotion();
  const [selectedCluster, setSelectedCluster] = useState<
    "mainnet-beta" | "devnet" | "testnet"
  >("mainnet-beta");
  const [menuOpen, setMenuOpen] = useState(false);
  const [liveTps, setLiveTps] = useState(tps);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Simulate subtle live network pulse fluctuation
  useEffect(() => {
    const interval = setInterval(() => {
      const delta = Math.floor(Math.random() * 80) - 40;
      setLiveTps((prev) => Math.max(2100, Math.min(4200, prev + delta)));
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const handleManualRefresh = () => {
    setIsRefreshing(true);
    const delta = Math.floor(Math.random() * 120) - 60;
    setLiveTps((prev) => prev + delta);
    setTimeout(() => setIsRefreshing(false), 800);
  };

  const getHealthStatus = (ms: number) => {
    if (ms < 50)
      return {
        label: "Optimal",
        badgeBg: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
        dotColor: "bg-emerald-400",
      };
    if (ms < 150)
      return {
        label: "Fair",
        badgeBg: "bg-amber-500/20 text-amber-300 border-amber-500/30",
        dotColor: "bg-amber-400",
      };
    return {
      label: "Degraded",
      badgeBg: "bg-rose-500/20 text-rose-300 border-rose-500/30",
      dotColor: "bg-rose-400",
    };
  };

  const health = getHealthStatus(pingMs);

  return (
    <motion.div
      data-slot="solana-network-health"
      initial={reduceMotion ? false : { opacity: 0, scale: 0.96, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={cn(
        "relative flex w-full max-w-sm flex-col gap-4 rounded-[36px] border border-blue-500/30 bg-gradient-to-b from-[#081528] via-[#070e1b] to-[#040810] p-5 text-white shadow-2xl shadow-blue-950/60 backdrop-blur-2xl font-sans select-none overflow-hidden",
        className
      )}
      {...props}
    >
      {/* Subtle Grain Noise Overlay */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.06] dark:opacity-[0.10] mix-blend-overlay z-10">
        <svg className="h-full w-full">
          <filter id="net-health-noise">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.75"
              numOctaves="4"
              stitchTiles="stitch"
            />
          </filter>
          <rect width="100%" height="100%" filter="url(#net-health-noise)" />
        </svg>
      </div>

      {/* Top Header */}
      <div className="flex items-center justify-between z-20">
        <div className="flex items-center gap-3">
          {/* Solana Vector Logo Container */}
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-zinc-900 border border-blue-900/50 p-2 shadow-md overflow-hidden [&>svg]:h-full [&>svg]:w-full [&>svg]:object-cover">
            <div
              className="h-full w-full flex items-center justify-center fill-current text-white"
              dangerouslySetInnerHTML={{ __html: solana.svg }}
            />
          </div>

          <div className="flex flex-col">
            <span className="text-sm font-bold text-white leading-tight">
              Solana Network
            </span>
            <div className="flex items-center gap-2 mt-0.5">
              {/* Pulse status indicator */}
              <span className="relative flex h-2 w-2">
                <span
                  className={cn(
                    "absolute inline-flex h-full w-full animate-ping rounded-full opacity-75",
                    health.dotColor
                  )}
                />
                <span
                  className={cn(
                    "relative inline-flex h-2 w-2 rounded-full",
                    health.dotColor
                  )}
                />
              </span>
              <span className="text-xs font-semibold text-zinc-300">
                {health.label} ({pingMs}ms)
              </span>
            </div>
          </div>
        </div>

        {/* Cluster Switcher Dropdown & Manual Refresh */}
        <div className="flex items-center gap-1.5 z-20">
          <motion.button
            type="button"
            onClick={handleManualRefresh}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            title="Refresh network telemetry"
            className="flex h-8 w-8 items-center justify-center rounded-xl bg-zinc-900/90 border border-blue-900/50 text-zinc-300 hover:text-white transition-colors cursor-pointer"
          >
            <RefreshCw
              className={cn(
                "h-3.5 w-3.5 transition-transform duration-500",
                isRefreshing && "rotate-180 text-blue-400"
              )}
            />
          </motion.button>

          <div className="relative">
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center gap-1 rounded-xl border border-blue-900/50 bg-zinc-900/90 px-3 py-1.5 font-mono text-xs font-semibold text-blue-300 transition-colors hover:border-blue-500/50 hover:text-white cursor-pointer"
            >
              <span>{selectedCluster}</span>
              <ChevronDown
                className={cn(
                  "h-3.5 w-3.5 text-zinc-400 transition-transform duration-200",
                  menuOpen && "rotate-180"
                )}
              />
            </button>

            <AnimatePresence>
              {menuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 4, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 4, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full z-30 mt-1.5 w-36 rounded-2xl border border-blue-900/60 bg-zinc-950/95 p-1.5 shadow-2xl backdrop-blur-xl"
                >
                  {(["mainnet-beta", "devnet", "testnet"] as const).map(
                    (cluster) => (
                      <button
                        key={cluster}
                        type="button"
                        onClick={() => {
                          setSelectedCluster(cluster);
                          setMenuOpen(false);
                        }}
                        className={cn(
                          "flex w-full items-center justify-between rounded-xl px-2.5 py-1.5 text-left font-mono text-xs font-semibold transition-colors cursor-pointer",
                          selectedCluster === cluster
                            ? "bg-blue-600/30 text-blue-300 border border-blue-500/30"
                            : "text-zinc-300 hover:bg-blue-950/50"
                        )}
                      >
                        <span>{cluster}</span>
                        {selectedCluster === cluster && (
                          <Check className="h-3.5 w-3.5 text-blue-400" />
                        )}
                      </button>
                    )
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Grid of Key Telemetry Metrics (4 Cards) */}
      <div className="grid grid-cols-2 gap-2.5 z-20">
        {/* Throughput */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="flex flex-col gap-1 rounded-2xl border border-blue-900/50 bg-zinc-900/80 p-3.5 transition-all hover:border-blue-500/40 shadow-sm"
        >
          <div className="flex items-center justify-between text-xs font-semibold text-zinc-400">
            <span className="flex items-center gap-1.5 text-blue-400">
              <Zap className="h-3.5 w-3.5" />
              Throughput
            </span>
          </div>
          <span className="font-mono text-xl font-extrabold text-white mt-1">
            {liveTps.toLocaleString()}{" "}
            <span className="text-xs font-normal text-blue-400">TPS</span>
          </span>
        </motion.div>

        {/* Current Epoch */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="flex flex-col gap-1 rounded-2xl border border-blue-900/50 bg-zinc-900/80 p-3.5 transition-all hover:border-blue-500/40 shadow-sm"
        >
          <div className="flex items-center justify-between text-xs font-semibold text-zinc-400">
            <span className="flex items-center gap-1.5 text-indigo-400">
              <Cpu className="h-3.5 w-3.5" />
              Epoch
            </span>
          </div>
          <span className="font-mono text-xl font-extrabold text-white mt-1">
            #{currentEpoch}
          </span>
        </motion.div>

        {/* Block Time */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="flex flex-col gap-1 rounded-2xl border border-blue-900/50 bg-zinc-900/80 p-3.5 transition-all hover:border-blue-500/40 shadow-sm"
        >
          <div className="flex items-center justify-between text-xs font-semibold text-zinc-400">
            <span className="flex items-center gap-1.5 text-cyan-400">
              <Clock className="h-3.5 w-3.5" />
              Block Time
            </span>
          </div>
          <span className="font-mono text-lg font-extrabold text-white mt-1">
            {blockTimeMs}{" "}
            <span className="text-xs font-normal text-cyan-400">ms</span>
          </span>
        </motion.div>

        {/* Active Validators */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="flex flex-col gap-1 rounded-2xl border border-blue-900/50 bg-zinc-900/80 p-3.5 transition-all hover:border-blue-500/40 shadow-sm"
        >
          <div className="flex items-center justify-between text-xs font-semibold text-zinc-400">
            <span className="flex items-center gap-1.5 text-purple-400">
              <Server className="h-3.5 w-3.5" />
              Validators
            </span>
          </div>
          <span className="font-mono text-lg font-extrabold text-white mt-1">
            {activeValidators.toLocaleString()}
          </span>
        </motion.div>
      </div>

      {/* Epoch Progress Section */}
      <div className="flex flex-col gap-2 rounded-2xl border border-blue-900/50 bg-zinc-900/80 p-3.5 z-20">
        <div className="flex items-center justify-between text-xs font-semibold">
          <span className="text-zinc-400">Epoch Progress</span>
          <span className="font-mono font-bold text-blue-400">
            {epochProgressPct}%
          </span>
        </div>

        {/* Animated Progress Bar */}
        <div className="h-2.5 w-full overflow-hidden rounded-full bg-zinc-950/80 p-0.5 border border-blue-900/40">
          <motion.div
            initial={
              reduceMotion
                ? { width: `${epochProgressPct}%` }
                : { width: "0%" }
            }
            animate={{ width: `${epochProgressPct}%` }}
            transition={{ type: "spring", stiffness: 350, damping: 22 }}
            className="h-full rounded-full bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-400 shadow-md shadow-blue-500/40"
          />
        </div>
      </div>
    </motion.div>
  );
}

export default SolanaNetworkHealth;
