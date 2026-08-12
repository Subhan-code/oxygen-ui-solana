"use client"

import React from "react"
import { motion } from "motion/react"
import { TrendingUp, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"

export interface CryptoProjectProgressBarProps
  extends React.HTMLAttributes<HTMLDivElement> {
  projectName?: string
  progressPercent?: number
  targetSolSales?: number
  currentSolSales?: number
}

export function CryptoProjectProgressBar({
  projectName = "Solana Validator Staking",
  progressPercent = 68,
  targetSolSales = 10000,
  currentSolSales = 6800,
  className,
  ...props
}: CryptoProjectProgressBarProps) {
  return (
    <div
      data-slot="root"
      className={cn(
        "relative mx-auto flex w-full max-w-sm flex-col overflow-hidden rounded-[28px] bg-black p-5 text-white shadow-2xl border border-zinc-800/80 font-sans",
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Solana Milestone</span>
          <h3 className="text-lg font-extrabold text-white mt-0.5">{projectName}</h3>
        </div>
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400 font-bold text-xs">
          ⚡
        </div>
      </div>

      <div className="rounded-2xl bg-zinc-900/80 p-4 border border-zinc-800 space-y-4 mb-4">
        <div>
          <div className="flex items-center justify-between text-xs font-semibold text-zinc-300 mb-1.5">
            <span>Staking Target Completion</span>
            <span className="text-emerald-400 font-bold">{progressPercent}%</span>
          </div>

          <div className="h-3 w-full rounded-full bg-zinc-800 p-0.5 overflow-hidden flex gap-1">
            {Array.from({ length: 10 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: i < Math.floor(progressPercent / 10) ? 1 : 0.2 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className={cn(
                  "h-full flex-1 rounded-sm",
                  i < Math.floor(progressPercent / 10)
                    ? "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]"
                    : "bg-zinc-700"
                )}
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-2 border-t border-zinc-800/60">
          <div>
            <span className="block text-[10px] uppercase font-bold text-zinc-500">Staked SOL</span>
            <span className="text-sm font-extrabold text-white mt-0.5 block">{currentSolSales.toLocaleString()} SOL</span>
          </div>
          <div>
            <span className="block text-[10px] uppercase font-bold text-zinc-500">Target Goal</span>
            <span className="text-sm font-extrabold text-zinc-300 mt-0.5 block">{targetSolSales.toLocaleString()} SOL</span>
          </div>
        </div>
      </div>

      <div className="rounded-2xl bg-gradient-to-r from-emerald-950/60 via-zinc-900 to-black p-3.5 border border-emerald-500/30 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-400 text-zinc-950">
            <TrendingUp className="h-4 w-4" />
          </div>
          <div>
            <span className="block text-xs font-bold text-white">Solana Epoch Momentum</span>
            <span className="text-[11px] text-emerald-400 font-semibold">+14.2% stake increase</span>
          </div>
        </div>
        <CheckCircle2 className="h-4 w-4 text-emerald-400" />
      </div>
    </div>
  )
}
