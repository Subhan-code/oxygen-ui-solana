"use client";

import React, { useState } from "react";
import { Check, ChevronDown, Cpu, Network, Zap } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export interface SolanaNetworkHealthProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart"> {
  tps?: number;
  pingMs?: number;
  currentEpoch?: number;
  epochProgressPct?: number;
}

export function SolanaNetworkHealth({
  tps = 2840,
  pingMs = 18,
  currentEpoch = 642,
  epochProgressPct = 68.4,
  className,
  ...props
}: SolanaNetworkHealthProps) {
  const reduceMotion = useReducedMotion();
  const [selectedCluster, setSelectedCluster] = useState<"mainnet-beta" | "devnet" | "testnet">("mainnet-beta");
  const [menuOpen, setMenuOpen] = useState(false);

  const getHealthBadge = (ms: number) => {
    if (ms < 50) return { label: "Optimal", color: "bg-blue-500", text: "text-blue-400" };
    if (ms < 150) return { label: "Fair", color: "bg-amber-500", text: "text-amber-500" };
    return { label: "Degraded", color: "bg-zinc-500", text: "text-zinc-400" };
  };

  const health = getHealthBadge(pingMs);

  return (
    <div
      data-slot="solana-network-health"
      className={cn(
        "relative flex w-full max-w-sm flex-col gap-4 rounded-3xl border border-black/5 bg-white/70 p-5 shadow-xs backdrop-blur-xl dark:border-white/10 dark:bg-zinc-900/80",
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-purple-500/10 text-purple-600 dark:bg-purple-400/15 dark:text-purple-300">
            <Network className="h-4 w-4" />
          </div>
          <div className="flex flex-col">
            <span className="font-runde text-sm font-semibold text-zinc-900 dark:text-white">
              Solana Network
            </span>
            <div className="flex items-center gap-1.5 text-xs">
              <span className={cn("h-2 w-2 rounded-full", health.color)} />
              <span className={cn("font-mono text-[11px] font-medium", health.text)}>
                {health.label} ({pingMs}ms)
              </span>
            </div>
          </div>
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center gap-1 rounded-xl border border-zinc-200 bg-zinc-100/70 px-2.5 py-1 font-mono text-xs font-medium text-zinc-700 transition-colors hover:bg-zinc-200/80 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
          >
            <span>{selectedCluster}</span>
            <ChevronDown className="h-3 w-3 text-zinc-400" />
          </button>

          {menuOpen && (
            <div className="absolute right-0 top-full z-20 mt-1 flex w-36 flex-col rounded-xl border border-zinc-200 bg-white p-1 shadow-lg dark:border-zinc-700 dark:bg-zinc-800">
              {(["mainnet-beta", "devnet", "testnet"] as const).map((cluster) => (
                <button
                  key={cluster}
                  type="button"
                  onClick={() => {
                    setSelectedCluster(cluster);
                    setMenuOpen(false);
                  }}
                  className="flex items-center justify-between rounded-lg px-2.5 py-1.5 font-mono text-xs text-zinc-700 transition-colors hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-700"
                >
                  <span>{cluster}</span>
                  {selectedCluster === cluster && (
                    <Check className="h-3 w-3 text-purple-500" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        <div className="flex flex-col gap-1 rounded-2xl bg-zinc-100/70 p-3 dark:bg-zinc-800/50">
          <div className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400">
            <Zap className="h-3.5 w-3.5 text-amber-500" />
            <span>Throughput</span>
          </div>
          <span className="font-mono text-lg font-bold text-zinc-900 dark:text-white">
            {tps.toLocaleString()}{" "}
            <span className="text-xs font-normal text-zinc-500">TPS</span>
          </span>
        </div>

        <div className="flex flex-col gap-1 rounded-2xl bg-zinc-100/70 p-3 dark:bg-zinc-800/50">
          <div className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400">
            <Cpu className="h-3.5 w-3.5 text-purple-500" />
            <span>Epoch</span>
          </div>
          <span className="font-mono text-lg font-bold text-zinc-900 dark:text-white">
            #{currentEpoch}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between text-xs">
          <span className="text-zinc-500 dark:text-zinc-400">Epoch Progress</span>
          <span className="font-mono font-semibold text-zinc-900 dark:text-white">
            {epochProgressPct}%
          </span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
          <motion.div
            initial={reduceMotion ? { width: `${epochProgressPct}%` } : { width: "0%" }}
            animate={{ width: `${epochProgressPct}%` }}
            transition={{ type: "spring", stiffness: 350, damping: 22 }}
            className="h-full rounded-full bg-purple-600 dark:bg-purple-500"
          />
        </div>
      </div>
    </div>
  );
}
