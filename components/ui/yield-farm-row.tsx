"use client"

import * as React from "react"
import { motion } from "motion/react"
import { Sparkles, RefreshCw, Flame, ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"

export interface YieldFarmRowProps extends React.HTMLAttributes<HTMLDivElement> {
  vaultName?: string
  protocol?: string
  tokenPair?: string
  multiplier?: string
  dailyRatePercent?: number
  tvlUsd?: string
  apyPercent?: number
  isAutoCompounding?: boolean
  onDeposit?: () => void
}

export function YieldFarmRow({
  vaultName = "Jito-SOL / SOL Vault",
  protocol = "Kamino Finance",
  tokenPair = "JitoSOL-SOL",
  multiplier = "3.5x Points",
  dailyRatePercent = 0.048,
  tvlUsd = "$42.8M",
  apyPercent = 18.65,
  isAutoCompounding = true,
  onDeposit,
  className,
  ...props
}: YieldFarmRowProps) {
  return (
    <motion.div
      className={cn(
        "flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-zinc-800 bg-zinc-900/90 p-4 shadow-xl backdrop-blur-xl motion-safe:transition-colors motion-safe:duration-150 hover:border-purple-500/40",
        className
      )}
      data-slot="yield-farm-row"
    >
      <div className="flex items-center gap-3.5">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
          <Flame className="h-5 w-5 fill-purple-400/20" />
        </div>

        <div>
          <div className="flex items-center gap-2">
            <h4 className="font-bold text-sm text-zinc-100">{vaultName}</h4>
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2 py-0.5 text-[10px] font-semibold text-amber-400 border border-amber-500/20">
              <Sparkles className="h-2.5 w-2.5" /> {multiplier}
            </span>
          </div>
          <div className="flex items-center gap-2 mt-0.5 text-xs text-zinc-400">
            <span>{protocol}</span>
            <span>•</span>
            <span className="font-mono text-zinc-500">{tokenPair}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-6">
        <div className="text-right">
          <span className="text-[10px] text-zinc-500 uppercase tracking-wider block">Daily Rate</span>
          <span className="font-mono text-xs font-semibold tabular-nums text-emerald-400">+{dailyRatePercent}% / day</span>
        </div>

        <div className="text-right">
          <span className="text-[10px] text-zinc-500 uppercase tracking-wider block">TVL</span>
          <span className="font-mono text-xs font-semibold text-zinc-200">{tvlUsd}</span>
        </div>

        <div className="text-right">
          <span className="text-[10px] text-zinc-500 uppercase tracking-wider flex items-center gap-1">
            APY {isAutoCompounding && <RefreshCw className="h-2.5 w-2.5 text-purple-400" />}
          </span>
          <span className="font-mono text-base font-extrabold tabular-nums text-purple-400">{apyPercent}%</span>
        </div>

        <button
          onClick={onDeposit}
          type="button"
          className="inline-flex h-11 items-center gap-1 rounded-xl bg-purple-600 px-3.5 text-xs font-bold text-white shadow-md shadow-purple-500/20 motion-safe:transition-colors motion-safe:duration-150 hover:bg-purple-500 motion-safe:active:scale-[0.97] outline-none focus-visible:ring-2 focus-visible:ring-purple-400/50"
        >
          Deposit <ArrowUpRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </motion.div>
  )
}
