"use client"

import React from "react"
import { motion } from "motion/react"
import { Search, ChevronRight, Bookmark, Info } from "lucide-react"
import { cn } from "@/lib/utils"

export interface CryptoExploreNewsProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export function CryptoExploreNews({ className, ...props }: CryptoExploreNewsProps) {
  const news = [
    { title: "Solana Breakpoint 2026 Announced", time: "2h ago", source: "Solana Foundation" },
    { title: "Jupiter DEX Surpasses $1B Daily Volume", time: "4h ago", source: "Solana Floor" },
  ]

  return (
    <motion.div
      data-slot="root"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", bounce: 0, duration: 0.35 }}
      className={cn(
        "relative mx-auto flex w-full max-w-sm flex-col overflow-hidden rounded-3xl bg-zinc-950 p-4 text-white shadow-xl border border-zinc-800/80 font-sans min-h-[520px]",
        className
      )}
      {...props}
    >
      <div className="mb-4">
        <h2 className="text-sm font-bold text-white mb-2.5">Ecosystem Feed</h2>
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-zinc-500" />
          <input
            type="text"
            placeholder="Search news & updates..."
            className="w-full rounded-xl border border-zinc-800 bg-zinc-900 py-1.5 pl-8 pr-3 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-zinc-700"
          />
        </div>
      </div>

      <div className="space-y-4 flex-1 overflow-y-auto no-scrollbar">
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-zinc-300">
              <Bookmark className="h-3.5 w-3.5 text-zinc-400" />
              <span>Watchlist</span>
            </div>
            <ChevronRight className="h-3.5 w-3.5 text-zinc-500 cursor-pointer" />
          </div>
          <div className="flex items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-900/60 p-3 transition-transform active:scale-98">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-950/60 border border-purple-800/50 text-xs font-bold text-purple-300">
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
          <h3 className="text-xs font-bold text-zinc-300 mb-2">Market Updates</h3>
          <div className="space-y-2">
            {news.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-3 hover:bg-zinc-900 transition-all cursor-pointer active:scale-98"
              >
                <h4 className="text-xs font-semibold text-zinc-200 mb-1 leading-snug">{item.title}</h4>
                <div className="flex items-center justify-between text-[10px] text-zinc-500">
                  <span>{item.source}</span>
                  <span>{item.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-2.5 flex items-start gap-2 text-[11px] text-zinc-400">
          <Info className="h-3.5 w-3.5 text-zinc-500 shrink-0 mt-0.5" />
          <p>Powered by Pyth Network and Solana Foundation updates.</p>
        </div>
      </div>
    </motion.div>
  )
}
