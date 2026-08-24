"use client"

import React, { useState } from "react"
import { motion } from "motion/react"
import { Search, ChevronRight, Bookmark, TrendingUp, Info } from "lucide-react"
import { cn } from "@/lib/utils"

export interface CryptoExploreHubProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart"> {
  onSelectCategory?: (category: string) => void
}

export function CryptoExploreHub({
  onSelectCategory,
  className,
  ...props
}: CryptoExploreHubProps) {
  const [activeCategory, setActiveCategory] = useState<"Tokens" | "People" | "Sites">("Tokens")

  const trendingTokens = [
    { rank: 1, symbol: "SOL", name: "Solana", price: "$142.50", change: "+4.2%", volume: "$2.4B" },
    { rank: 2, symbol: "JUP", name: "Jupiter", price: "$1.12", change: "+8.5%", volume: "$410M" },
    { rank: 3, symbol: "BONK", name: "Bonk", price: "$0.000024", change: "+12.1%", volume: "$180M" },
    { rank: 4, symbol: "WIF", name: "dogwifhat", price: "$2.45", change: "-1.4%", volume: "$320M" },
  ]

  const solanaNews = [
    { title: "Solana Breakpoint 2026 Announced", time: "2h ago", source: "Solana Foundation" },
    { title: "Jupiter DEX Surpasses $1B Daily Volume", time: "4h ago", source: "Solana Floor" },
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
        <h2 className="text-base font-bold text-white mb-2.5">Explore Solana</h2>
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-zinc-500" />
          <input
            type="text"
            placeholder="Search tokens, handles, or dApps..."
            className="w-full rounded-full border border-zinc-800 bg-zinc-900 py-1.5 pl-8 pr-3 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-zinc-700"
          />
        </div>
      </div>

      <div className="flex items-center gap-1 mb-4 rounded-full bg-zinc-900 p-1 border border-zinc-800">
        {(["Tokens", "People", "Sites"] as const).map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => {
              setActiveCategory(cat)
              onSelectCategory?.(cat)
            }}
            className={cn(
              "relative flex-1 rounded-full py-1 text-center text-xs font-bold transition-colors cursor-pointer active:scale-95 duration-100",
              activeCategory === cat ? "text-zinc-950" : "text-zinc-400 hover:text-white"
            )}
          >
            {activeCategory === cat && (
              <motion.div
                layoutId="explore-cat-pill-hub"
                className="absolute inset-0 rounded-full bg-white"
                transition={{ type: "spring", bounce: 0, duration: 0.35 }}
              />
            )}
            <span className="relative z-10">{cat}</span>
          </button>
        ))}
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto pr-1 no-scrollbar pb-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1 text-xs font-bold text-zinc-300">
              <Bookmark className="h-3.5 w-3.5 text-blue-400" />
              <span>Watchlist</span>
            </div>
            <ChevronRight className="h-3.5 w-3.5 text-zinc-500 cursor-pointer" />
          </div>
          <div className="flex items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-900/60 p-3 transition-transform active:scale-98">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-950/60 border border-blue-800/50 text-xs font-bold text-blue-300">
                SOL
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Solana</h4>
                <span className="text-[11px] text-zinc-400">142.5 SOL</span>
              </div>
            </div>
            <div className="text-right">
              <span className="block text-xs font-bold text-white">$142.50</span>
              <span className="text-[11px] font-semibold text-blue-400">+4.2%</span>
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1 text-xs font-bold text-zinc-300">
              <TrendingUp className="h-3.5 w-3.5 text-purple-400" />
              <span>Trending SPL Tokens</span>
            </div>
            <span className="text-xs text-blue-400 font-semibold cursor-pointer">View All</span>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-2 space-y-1">
            {trendingTokens.map((token) => (
              <div key={token.symbol} className="flex items-center justify-between p-2 rounded-xl hover:bg-zinc-800/60 transition-colors cursor-pointer active:scale-98">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-zinc-500 w-4">{token.rank}</span>
                  <div>
                    <h4 className="text-xs font-bold text-white">{token.symbol} <span className="text-[10px] font-normal text-zinc-400">{token.name}</span></h4>
                    <span className="text-[10px] text-zinc-500">Vol: {token.volume}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="block text-xs font-bold text-white">{token.price}</span>
                  <span className={cn("text-[10px] font-bold", token.change.startsWith("+") ? "text-blue-400" : "text-purple-400")}>
                    {token.change}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xs font-bold text-zinc-300 mb-2">Solana Ecosystem Updates</h3>
          <div className="space-y-2">
            {solanaNews.map((news) => (
              <div key={news.title} className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-3 hover:bg-zinc-900 transition-colors cursor-pointer active:scale-98">
                <h4 className="text-xs font-semibold text-zinc-200 mb-1">{news.title}</h4>
                <div className="flex items-center justify-between text-[10px] text-zinc-500">
                  <span>{news.source}</span>
                  <span>{news.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-3 flex items-start gap-2 text-[11px] text-zinc-400">
          <Info className="h-3.5 w-3.5 text-blue-400 shrink-0 mt-0.5" />
          <p>Solana prices provided by Pyth Network oracle. Verify transactions on Solscan.</p>
        </div>
      </div>
    </div>
  )
}
