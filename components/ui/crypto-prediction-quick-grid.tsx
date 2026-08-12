"use client"

import React from "react"
import { Clock } from "lucide-react"
import { cn } from "@/lib/utils"

export interface CryptoPredictionQuickGridProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export function CryptoPredictionQuickGrid({ className, ...props }: CryptoPredictionQuickGridProps) {
  const quickMarkets = [
    { id: "sol-5m", pair: "SOL / USD", target: "$142.80", yesOdds: "64%", noOdds: "36%", timeLeft: "03:42" },
    { id: "jup-5m", pair: "JUP / USD", target: "$1.15", yesOdds: "52%", noOdds: "48%", timeLeft: "01:15" },
    { id: "bonk-5m", pair: "BONK / USD", target: "$0.000025", yesOdds: "78%", noOdds: "22%", timeLeft: "04:10" },
  ]

  return (
    <div
      data-slot="root"
      className={cn(
        "relative mx-auto flex w-full max-w-sm flex-col overflow-hidden rounded-[32px] bg-black p-4 text-white shadow-2xl border border-zinc-800/80 font-sans",
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-between mb-3 px-1">
        <h3 className="text-sm font-extrabold text-white">5-Minute Express Markets</h3>
        <span className="text-[11px] font-semibold text-emerald-400">Pyth Oracles</span>
      </div>

      <div className="space-y-3">
        {quickMarkets.map((m) => (
          <div key={m.id} className="rounded-2xl border border-zinc-800/80 bg-zinc-900/60 p-3.5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-extrabold text-white">{m.pair}</span>
              <div className="flex items-center gap-1 text-xs font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                <Clock className="h-3 w-3" />
                <span>{m.timeLeft}</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-zinc-400">
              <span>Target: <strong className="text-white">{m.target}</strong></span>
              <span>Odds</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                className="rounded-xl bg-emerald-500/20 border border-emerald-500/40 p-2 text-center hover:bg-emerald-500/30 transition-colors cursor-pointer"
              >
                <span className="block text-[10px] font-bold text-emerald-400">HIGHER</span>
                <span className="text-sm font-extrabold text-white">{m.yesOdds}</span>
              </button>
              <button
                type="button"
                className="rounded-xl bg-rose-500/20 border border-rose-500/40 p-2 text-center hover:bg-rose-500/30 transition-colors cursor-pointer"
              >
                <span className="block text-[10px] font-bold text-rose-400">LOWER</span>
                <span className="text-sm font-extrabold text-white">{m.noOdds}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
