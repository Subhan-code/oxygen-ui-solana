"use client"

import React, { useState } from "react"
import { motion } from "motion/react"
import { Clock, Search, Vote } from "lucide-react"
import { cn } from "@/lib/utils"

export interface CryptoPredictionMarketsProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart"> {
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
        "relative mx-auto flex w-full max-w-sm flex-col overflow-hidden rounded-3xl bg-zinc-950 p-4 text-white shadow-xl border border-zinc-800/80 font-sans min-h-[640px]",
        className
      )}
      {...props}
    >
      <div className="mb-4">
        <div className="flex items-center justify-between mb-3 pb-2 border-b border-zinc-900">
          <div className="flex items-center gap-2">
            <Vote className="h-4 w-4 text-blue-400" />
            <h2 className="text-base font-bold text-white">Predictions</h2>
          </div>
          <span className="rounded-full bg-blue-950/60 border border-blue-800/50 px-2 py-0.5 text-[10px] font-semibold text-blue-300">
            Live Markets
          </span>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-zinc-500" />
          <input
            type="text"
            placeholder="Search prediction markets..."
            className="w-full rounded-full border border-zinc-800 bg-zinc-900 py-1.5 pl-8 pr-3 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-zinc-700"
          />
        </div>
      </div>

      <div className="flex items-center gap-1 mb-4 rounded-full bg-zinc-900 p-1 border border-zinc-800">
        {(["5m Markets", "Ecosystem Events"] as const).map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={cn(
              "relative flex-1 rounded-full py-1 text-center text-xs font-bold transition-colors cursor-pointer active:scale-95 duration-100",
              activeTab === tab ? "text-zinc-950" : "text-zinc-400 hover:text-white"
            )}
          >
            {activeTab === tab && (
              <motion.div
                layoutId="pred-main-tab-pill"
                className="absolute inset-0 rounded-full bg-white"
                transition={{ type: "spring", bounce: 0, duration: 0.35 }}
              />
            )}
            <span className="relative z-10">{tab}</span>
          </button>
        ))}
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto pr-1 no-scrollbar pb-4">
        {activeTab === "5m Markets" && (
          <div className="space-y-3">
            {quickMarkets.map((m) => (
              <div key={m.id} className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-3 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">{m.pair}</span>
                  <div className="flex items-center gap-1 text-[10px] font-semibold text-zinc-300 bg-zinc-800 px-2 py-0.5 rounded-full border border-zinc-700">
                    <Clock className="h-3 w-3 text-zinc-400" />
                    <span>{m.timeLeft}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-zinc-400">
                  <span>Target: <strong className="text-white">{m.target}</strong></span>
                  <span>Odds</span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => onPredict?.(m.id, "Yes")}
                    className="rounded-xl bg-blue-950/60 border border-blue-800/50 p-2 text-center transition-transform hover:bg-blue-900/60 cursor-pointer active:scale-98"
                  >
                    <span className="block text-[10px] font-bold text-blue-400">HIGHER</span>
                    <span className="text-xs font-extrabold text-white mt-0.5 block">{m.yesOdds}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onPredict?.(m.id, "No")}
                    className="rounded-xl bg-purple-950/60 border border-purple-800/50 p-2 text-center transition-transform hover:bg-purple-900/60 cursor-pointer active:scale-98"
                  >
                    <span className="block text-[10px] font-bold text-purple-300">LOWER</span>
                    <span className="text-xs font-extrabold text-white mt-0.5 block">{m.noOdds}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "Ecosystem Events" && (
          <div className="space-y-3">
            {ecosystemEvents.map((ev) => (
              <div key={ev.title} className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-3 space-y-2.5">
                <h4 className="text-xs font-bold text-white leading-snug">{ev.title}</h4>
                <div className="flex items-center gap-2">
                  <div className="flex-1 rounded-xl bg-blue-950/60 p-2 text-center border border-blue-800/50">
                    <span className="block text-[10px] font-bold text-blue-400">YES</span>
                    <span className="text-xs font-extrabold text-white mt-0.5 block">{ev.yes}</span>
                  </div>
                  <div className="flex-1 rounded-xl bg-purple-950/60 p-2 text-center border border-purple-800/50">
                    <span className="block text-[10px] font-bold text-purple-300">NO</span>
                    <span className="text-xs font-extrabold text-white mt-0.5 block">{ev.no}</span>
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
