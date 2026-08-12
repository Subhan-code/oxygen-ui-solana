"use client"

import React, { useState } from "react"
import { motion } from "motion/react"
import { Clock, Search, Vote } from "lucide-react"
import { cn } from "@/lib/utils"

export interface CryptoPredictionMarketsProps
  extends React.HTMLAttributes<HTMLDivElement> {
  onPredict?: (marketId: string, choice: string) => void
}

export function CryptoPredictionMarkets({
  onPredict,
  className,
  ...props
}: CryptoPredictionMarketsProps) {
  const [activeTab, setActiveTab] = useState<"5m Markets" | "Ecosystem Events">("5m Markets")

  const quickMarkets = [
    { id: "sol-5m", pair: "SOL / USD", target: "$142.80", yesOdds: "64%", noOdds: "36%", timeLeft: "03:42" },
    { id: "jup-5m", pair: "JUP / USD", target: "$1.15", yesOdds: "52%", noOdds: "48%", timeLeft: "01:15" },
    { id: "bonk-5m", pair: "BONK / USD", target: "$0.000025", yesOdds: "78%", noOdds: "22%", timeLeft: "04:10" },
  ]

  const ecosystemEvents = [
    { title: "Solana Spot ETF Approval in 2026?", yes: "72%", no: "28%", volume: "$4.2M" },
    { title: "Jupiter DEX Surpasses $2B Daily Volume by Q4?", yes: "58%", no: "42%", volume: "$1.8M" },
  ]

  return (
    <div
      data-slot="root"
      className={cn(
        "relative mx-auto flex w-full max-w-sm flex-col overflow-hidden rounded-[36px] bg-black p-4 text-white shadow-2xl border border-zinc-800/80 font-sans min-h-[640px]",
        className
      )}
      {...props}
    >
      <div className="mb-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Vote className="h-5 w-5 text-emerald-400" />
            <h2 className="text-xl font-extrabold text-white">Solana Predictions</h2>
          </div>
          <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-400">
            Live Markets
          </span>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
          <input
            type="text"
            placeholder="Search Solana prediction markets..."
            className="w-full rounded-2xl border border-zinc-800 bg-zinc-900 py-2 pl-9 pr-3 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none"
          />
        </div>
      </div>

      <div className="flex items-center gap-1.5 mb-4 rounded-full bg-zinc-900/80 p-1 border border-zinc-800">
        {(["5m Markets", "Ecosystem Events"] as const).map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={cn(
              "relative flex-1 rounded-full py-1.5 text-center text-xs font-bold transition-colors cursor-pointer",
              activeTab === tab ? "text-black" : "text-zinc-400 hover:text-white"
            )}
          >
            {activeTab === tab && (
              <motion.div
                layoutId="pred-tab-pill"
                className="absolute inset-0 rounded-full bg-emerald-300"
                transition={{ type: "spring", stiffness: 450, damping: 35 }}
              />
            )}
            <span className="relative z-10">{tab}</span>
          </button>
        ))}
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto pr-1 no-scrollbar pb-4">
        {activeTab === "5m Markets" && (
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
                  <span>Pool Odds</span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => onPredict?.(m.id, "Yes")}
                    className="rounded-xl bg-emerald-500/20 border border-emerald-500/40 p-2 text-center transition-all hover:bg-emerald-500/30 cursor-pointer"
                  >
                    <span className="block text-[10px] font-bold text-emerald-400">HIGHER</span>
                    <span className="text-sm font-extrabold text-white">{m.yesOdds}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onPredict?.(m.id, "No")}
                    className="rounded-xl bg-rose-500/20 border border-rose-500/40 p-2 text-center transition-all hover:bg-rose-500/30 cursor-pointer"
                  >
                    <span className="block text-[10px] font-bold text-rose-400">LOWER</span>
                    <span className="text-sm font-extrabold text-white">{m.noOdds}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "Ecosystem Events" && (
          <div className="space-y-3">
            {ecosystemEvents.map((ev) => (
              <div key={ev.title} className="rounded-2xl border border-zinc-800/80 bg-zinc-900/60 p-3.5 space-y-3">
                <h4 className="text-xs font-bold text-white leading-snug">{ev.title}</h4>
                <div className="flex items-center gap-2">
                  <div className="flex-1 rounded-lg bg-emerald-500/20 p-2 text-center border border-emerald-500/30">
                    <span className="block text-[10px] font-bold text-emerald-400">YES</span>
                    <span className="text-sm font-extrabold text-white">{ev.yes}</span>
                  </div>
                  <div className="flex-1 rounded-lg bg-rose-500/20 p-2 text-center border border-rose-500/30">
                    <span className="block text-[10px] font-bold text-rose-400">NO</span>
                    <span className="text-sm font-extrabold text-white">{ev.no}</span>
                  </div>
                </div>
                <div className="text-[10px] text-zinc-500 text-right">Volume: {ev.volume}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
