"use client"

import React from "react"
import { motion } from "motion/react"
import { Clock } from "lucide-react"
import { cn } from "@/lib/utils"

export type CryptoPredictionQuickGridProps =
  Omit<React.HTMLAttributes<HTMLDivElement>, "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart">;

export function CryptoPredictionQuickGrid({ className, ...props }: CryptoPredictionQuickGridProps) {
  const quickMarkets = [
    { id: "sol-5m", pair: "SOL / USD", target: "$142.80", yesOdds: "64%", noOdds: "36%", timeLeft: "03:42" },
    { id: "jup-5m", pair: "JUP / USD", target: "$1.15", yesOdds: "52%", noOdds: "48%", timeLeft: "01:15" },
    { id: "bonk-5m", pair: "BONK / USD", target: "$0.000025", yesOdds: "78%", noOdds: "22%", timeLeft: "04:10" },
  ]

  return (
    <motion.div
      data-slot="root"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", bounce: 0, duration: 0.35 }}
      className={cn(
        "relative mx-auto flex w-full max-w-sm flex-col overflow-hidden rounded-3xl bg-zinc-950 p-4 text-white shadow-xl border border-zinc-800/80 font-sans",
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-between mb-3 px-1">
        <h3 className="text-xs font-bold text-white">5-Minute Markets</h3>
        <span className="text-[11px] font-medium text-zinc-400">Pyth Oracles</span>
      </div>

      <div className="space-y-3">
        {quickMarkets.map((m) => (
          <div key={m.id} className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-3 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white">{m.pair}</span>
              <div className="flex items-center gap-1 text-[11px] font-medium text-zinc-300 bg-zinc-800 px-2 py-0.5 rounded-full border border-zinc-700">
                <Clock className="h-3 w-3 text-zinc-400" />
                <span>{m.timeLeft}</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] text-zinc-400">
              <span>Target: <strong className="text-zinc-200">{m.target}</strong></span>
              <span>Odds</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                className="rounded-xl bg-blue-950/60 border border-blue-800/50 p-2 text-center hover:bg-blue-900/60 transition-transform active:scale-98 cursor-pointer"
              >
                <span className="block text-[10px] font-bold text-blue-400">HIGHER</span>
                <span className="text-xs font-bold text-white mt-0.5 block">{m.yesOdds}</span>
              </button>
              <button
                type="button"
                className="rounded-xl bg-purple-950/60 border border-purple-800/50 p-2 text-center hover:bg-purple-900/60 transition-transform active:scale-98 cursor-pointer"
              >
                <span className="block text-[10px] font-bold text-purple-300">LOWER</span>
                <span className="text-xs font-bold text-white mt-0.5 block">{m.noOdds}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}
