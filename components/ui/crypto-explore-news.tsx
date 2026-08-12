"use client"

import React from "react"
import { Search, ChevronRight, Bookmark, TrendingUp, Info } from "lucide-react"
import { cn } from "@/lib/utils"

export interface CryptoExploreNewsProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export function CryptoExploreNews({ className, ...props }: CryptoExploreNewsProps) {
  const news = [
    { title: "Solana Breakpoint 2026 Announced", time: "2h ago", source: "Solana Foundation" },
    { title: "Jupiter DEX Surpasses $1B Daily Volume", time: "4h ago", source: "Solana Floor" },
  ]

  return (
    <div
      data-slot="root"
      className={cn(
        "relative mx-auto flex w-full max-w-sm flex-col overflow-hidden rounded-[36px] bg-black p-4 text-white shadow-2xl border border-zinc-800/80 font-sans min-h-[580px]",
        className
      )}
      {...props}
    >
      <div className="mb-4">
        <h2 className="text-xl font-extrabold text-white mb-3">Solana Market News</h2>
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
          <input
            type="text"
            placeholder="Search Solana news & feeds..."
            className="w-full rounded-2xl border border-zinc-800 bg-zinc-900 py-2.5 pl-9 pr-3 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none"
          />
        </div>
      </div>

      <div className="space-y-4 flex-1 overflow-y-auto no-scrollbar">
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1 text-sm font-bold text-white">
              <Bookmark className="h-4 w-4 text-emerald-400" />
              <span>Watchlist</span>
            </div>
            <ChevronRight className="h-4 w-4 text-zinc-400 cursor-pointer" />
          </div>
          <div className="flex items-center justify-between rounded-2xl border border-zinc-800/80 bg-zinc-900/60 p-3">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-tr from-purple-600 via-teal-400 to-emerald-300 font-bold text-xs text-black">
                SOL
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Solana</h4>
                <span className="text-xs text-zinc-400">142.5 SOL</span>
              </div>
            </div>
            <div className="text-right">
              <span className="block text-sm font-bold text-white">$142.50</span>
              <span className="text-xs font-semibold text-emerald-400">+4.2%</span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold text-white mb-2">Ecosystem Updates</h3>
          <div className="space-y-2">
            {news.map((item) => (
              <div key={item.title} className="rounded-2xl border border-zinc-800/60 bg-zinc-900/40 p-3 hover:border-zinc-700 transition-colors cursor-pointer">
                <h4 className="text-xs font-semibold text-zinc-100 mb-1">{item.title}</h4>
                <div className="flex items-center justify-between text-[10px] text-zinc-500">
                  <span>{item.source}</span>
                  <span>{item.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-zinc-800/60 bg-zinc-950 p-3 flex items-start gap-2.5 text-[11px] text-zinc-400">
          <Info className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
          <p>Powered by Solana Foundation feed and Pyth Network oracles.</p>
        </div>
      </div>
    </div>
  )
}
