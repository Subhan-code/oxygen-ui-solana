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
  projectName = "Validator Pool",
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
        "relative mx-auto flex w-full max-w-sm flex-col overflow-hidden rounded-3xl bg-zinc-950 p-5 text-white shadow-xl border border-zinc-800 font-sans",
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-zinc-900">
        <div>
          <span className="text-xs font-semibold text-zinc-400">Staking Pool Progress</span>
          <h3 className="text-base font-bold text-white mt-0.5">{projectName}</h3>
        </div>
        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 font-bold text-xs">
          ⚡
        </div>
      </div>

      <div className="rounded-2xl bg-zinc-900/80 p-4 border border-zinc-800 space-y-4 mb-4">
        <div>
          <div className="flex items-center justify-between text-xs font-semibold text-zinc-300 mb-2">
            <span>Pool Target</span>
            <span className="text-emerald-500 font-bold">{progressPercent}%</span>
          </div>

          <div className="h-2.5 w-full rounded-full bg-zinc-800 p-0.5 overflow-hidden flex gap-1">
            {Array.from({ length: 10 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: i < Math.floor(progressPercent / 10) ? 1 : 0.2 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className={cn(
                  "h-full flex-1 rounded-xs",
                  i < Math.floor(progressPercent / 10)
                    ? "bg-emerald-500"
                    : "bg-zinc-700"
                )}
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-2 border-t border-zinc-800">
          <div>
            <span className="block text-[10px] font-medium text-zinc-500">Staked SOL</span>
            <span className="text-xs font-bold text-white mt-0.5 block">{currentSolSales.toLocaleString()} SOL</span>
          </div>
          <div>
            <span className="block text-[10px] font-medium text-zinc-500">Target Goal</span>
            <span className="text-xs font-bold text-zinc-300 mt-0.5 block">{targetSolSales.toLocaleString()} SOL</span>
          </div>
        </div>
      </div>

      <div className="rounded-2xl bg-zinc-900/60 p-3 border border-zinc-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-300">
            <TrendingUp className="h-4 w-4" />
          </div>
          <div>
            <span className="block text-xs font-bold text-white">24h Stake Rate</span>
            <span className="text-[11px] text-emerald-500 font-medium">+14.2% daily increase</span>
          </div>
        </div>
        <CheckCircle2 className="h-4 w-4 text-emerald-500" />
      </div>
    </div>
  )
}
