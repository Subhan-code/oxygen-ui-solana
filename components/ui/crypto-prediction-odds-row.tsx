"use client"

import React from "react"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"

export interface CryptoPredictionOddsRowProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart"> {
  candidateName?: string
  oddsPercent?: number
}

export function CryptoPredictionOddsRow({
  candidateName = "Solana Spot ETF Approval",
  oddsPercent = 72,
  className,
  ...props
}: CryptoPredictionOddsRowProps) {
  return (
    <motion.div
      data-slot="root"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", bounce: 0, duration: 0.35 }}
      className={cn(
        "relative mx-auto flex w-full max-w-sm items-center justify-between gap-3 rounded-2xl bg-zinc-950 p-3.5 text-white shadow-xl border border-zinc-800/80 font-sans",
        className
      )}
      {...props}
    >
      <div className="flex-1 min-w-0">
        <h4 className="text-xs font-bold text-white truncate">{candidateName}</h4>
        <div className="mt-1.5 flex items-center gap-2">
          <div className="h-1.5 flex-1 rounded-full bg-zinc-800 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${oddsPercent}%` }}
              transition={{ type: "spring", bounce: 0, duration: 0.5 }}
              className="h-full rounded-full bg-blue-500"
            />
          </div>
          <span className="text-xs font-bold text-blue-400">{oddsPercent}%</span>
        </div>
      </div>

      <button
        type="button"
        className="rounded-xl bg-white px-3.5 py-1.5 text-xs font-bold text-zinc-950 hover:bg-zinc-200 transition-colors shadow cursor-pointer shrink-0 active:scale-95"
      >
        Vote
      </button>
    </motion.div>
  )
}
