"use client"

import React, { useState } from "react"
import { motion } from "motion/react"
import { TrendingUp, Info } from "lucide-react"
import { cn } from "@/lib/utils"

export interface CryptoExploreCategoriesProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export function CryptoExploreCategories({ className, ...props }: CryptoExploreCategoriesProps) {
  const [activeCategory, setActiveCategory] = useState<"Tokens" | "People" | "Sites">("Tokens")

  const trendingTokens = [
    { rank: 1, symbol: "SOL", name: "Solana", price: "$142.50", change: "+4.2%", volume: "$2.4B" },
    { rank: 2, symbol: "JUP", name: "Jupiter", price: "$1.12", change: "+8.5%", volume: "$410M" },
    { rank: 3, symbol: "BONK", name: "Bonk", price: "$0.000024", change: "+12.1%", volume: "$180M" },
    { rank: 4, symbol: "WIF", name: "dogwifhat", price: "$2.45", change: "-1.4%", volume: "$320M" },
  ]

  return (
    <div
      data-slot="root"
      className={cn(
        "relative mx-auto flex w-full max-w-sm flex-col overflow-hidden rounded-3xl bg-zinc-950 p-4 text-white shadow-xl border border-zinc-800 font-sans min-h-[540px]",
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-1 mb-4 rounded-full bg-zinc-900 p-1 border border-zinc-800">
        {(["Tokens", "People", "Sites"] as const).map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActiveCategory(cat)}
            className={cn(
              "relative flex-1 rounded-full py-1.5 text-center text-xs font-bold transition-colors cursor-pointer",
              activeCategory === cat ? "text-zinc-950" : "text-zinc-400 hover:text-white"
            )}
          >
            {activeCategory === cat && (
              <motion.div
                layoutId="exp-cat-pill"
                className="absolute inset-0 rounded-full bg-white"
                transition={{ type: "spring", stiffness: 450, damping: 35 }}
              />
            )}
            <span className="relative z-10">{cat}</span>
          </button>
        ))}
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto no-scrollbar">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-1.5 text-xs font-bold text-zinc-300">
            <TrendingUp className="h-3.5 w-3.5 text-zinc-400" />
            <span>Trending Tokens</span>
          </div>
          <span className="text-xs text-zinc-400 font-medium hover:text-white cursor-pointer">View All</span>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-2 space-y-1">
          {trendingTokens.map((token) => (
            <div key={token.symbol} className="flex items-center justify-between p-2 rounded-xl hover:bg-zinc-900 transition-colors">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-zinc-500 w-4">{token.rank}</span>
                <div>
                  <h4 className="text-xs font-bold text-white">{token.symbol} <span className="text-[10px] font-normal text-zinc-400">{token.name}</span></h4>
                  <span className="text-[10px] text-zinc-500">Vol: {token.volume}</span>
                </div>
              </div>
              <div className="text-right">
                <span className="block text-xs font-bold text-white">{token.price}</span>
                <span className={cn("text-[10px] font-bold", token.change.startsWith("+") ? "text-emerald-500" : "text-rose-500")}>
                  {token.change}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-2.5 flex items-start gap-2 text-[11px] text-zinc-400">
          <Info className="h-3.5 w-3.5 text-zinc-500 shrink-0 mt-0.5" />
          <p>Real-time token prices powered by Pyth Network oracle feeds.</p>
        </div>
      </div>
    </div>
  )
}
