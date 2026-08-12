"use client"

import React, { useState } from "react"
import { motion } from "motion/react"
import { ChevronRight, ExternalLink, Search, Plus } from "lucide-react"
import { cn } from "@/lib/utils"

export interface CryptoTraderLeaderboardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  onFollow?: (handle: string) => void
}

export function CryptoTraderLeaderboard({
  onFollow,
  className,
  ...props
}: CryptoTraderLeaderboardProps) {
  const [followedMap, setFollowedMap] = useState<Record<string, boolean>>({})

  const toggleFollow = (handle: string) => {
    setFollowedMap((prev) => ({ ...prev, [handle]: !prev[handle] }))
    onFollow?.(handle)
  }

  const traders = [
    { rank: 1, handle: "@sol_whale.sol", return: "+9,124.39%" },
    { rank: 2, handle: "@jup_master", return: "+1,420.64%" },
    { rank: 3, handle: "@bonk_trader.sol", return: "+622.30%" },
  ]

  const sites = [
    { rank: 1, name: "GMGN.ai", category: "Solana Trading" },
    { rank: 2, name: "pump.fun", category: "Solana Launchpad" },
    { rank: 3, name: "Jupiter", category: "Solana DEX Aggregator" },
  ]

  return (
    <motion.div
      data-slot="root"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", bounce: 0, duration: 0.35 }}
      className={cn(
        "relative mx-auto flex w-full max-w-sm flex-col overflow-hidden rounded-3xl bg-zinc-950 p-4 text-white shadow-xl border border-zinc-800/80 font-sans min-h-[600px]",
        className
      )}
      {...props}
    >
      <div className="flex-1 space-y-5 overflow-y-auto pr-1 no-scrollbar pb-16">
        <div>
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-zinc-900">
            <div className="flex items-center gap-1 text-sm font-bold text-white cursor-pointer">
              <span>Top Solana Traders</span>
              <ChevronRight className="h-4 w-4 text-zinc-400" />
            </div>
            <span className="rounded-full bg-blue-950/60 border border-blue-800/50 px-2 py-0.5 text-[10px] font-semibold text-blue-300">
              Solana Mainnet
            </span>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-3 space-y-3">
            {traders.map((trader) => {
              const isFollowing = followedMap[trader.handle]
              return (
                <div key={trader.handle} className="flex items-center justify-between p-1">
                  <div className="flex items-center gap-3">
                    <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-blue-950/60 border border-blue-800/50 font-bold text-blue-300 text-xs">
                      <span>⚡</span>
                      <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-white text-[9px] font-black text-zinc-950">
                        {trader.rank}
                      </span>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white leading-tight">{trader.handle}</h4>
                      <p className="text-xs font-semibold text-blue-400">{trader.return}</p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleFollow(trader.handle)}
                    className={cn(
                      "rounded-full px-3 py-1.5 text-xs font-bold transition-transform active:scale-95 cursor-pointer",
                      isFollowing
                        ? "bg-zinc-800 text-zinc-300 border border-zinc-700"
                        : "bg-white text-zinc-950 hover:bg-zinc-200"
                    )}
                  >
                    {isFollowing ? "Following" : "Follow"}
                  </button>
                </div>
              )
            })}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-1 text-sm font-bold text-white mb-3 cursor-pointer">
            <span>Trending Solana dApps</span>
            <ChevronRight className="h-4 w-4 text-zinc-400" />
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-3 space-y-3">
            {sites.map((site) => (
              <div key={site.name} className="flex items-center justify-between p-1 cursor-pointer group active:scale-98 transition-transform">
                <div className="flex items-center gap-3">
                  <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-900 border border-zinc-800 font-bold text-sm">
                    <span>🌐</span>
                    <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-white text-[9px] font-black text-zinc-950">
                      {site.rank}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white group-hover:text-zinc-300 transition-colors">
                      {site.name}
                    </h4>
                    <p className="text-[10px] text-zinc-400">{site.category}</p>
                  </div>
                </div>

                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 group-hover:bg-zinc-800 transition-colors">
                  <ExternalLink className="h-3.5 w-3.5" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-3 left-3 right-3 bg-zinc-950 p-2 flex items-center gap-2 rounded-full border border-zinc-800 shadow-lg">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-zinc-500" />
          <input
            type="text"
            placeholder="Search traders or dApps..."
            className="w-full rounded-full border border-zinc-800 bg-zinc-900 py-1.5 pl-9 pr-3 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-zinc-700"
          />
        </div>
        <button
          type="button"
          className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-zinc-950 hover:bg-zinc-200 transition-colors shadow-md active:scale-95 cursor-pointer"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
    </motion.div>
  )
}
