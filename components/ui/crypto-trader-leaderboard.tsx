"use client"

import React, { useState } from "react"
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
    { rank: 1, name: "GMGN.ai", category: "Solana Trading", color: "bg-emerald-600 text-white" },
    { rank: 2, name: "pump.fun", category: "Solana Launchpad", color: "bg-teal-500 text-black" },
    { rank: 3, name: "Jupiter", category: "Solana DEX Aggregator", color: "bg-green-600 text-white" },
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
      <div className="flex-1 space-y-6 overflow-y-auto pr-1 no-scrollbar pb-16">
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1 text-base font-extrabold text-white cursor-pointer">
              <span>Top Solana Traders</span>
              <ChevronRight className="h-5 w-5 text-zinc-400" />
            </div>
            <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-400">
              Solana Mainnet
            </span>
          </div>

          <div className="rounded-3xl border border-zinc-800/80 bg-zinc-900/60 p-3 space-y-3">
            {traders.map((trader) => {
              const isFollowing = followedMap[trader.handle]
              return (
                <div key={trader.handle} className="flex items-center justify-between p-1">
                  <div className="flex items-center gap-3">
                    <div className="relative flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-tr from-purple-500 via-teal-400 to-emerald-300 font-bold text-black text-xs">
                      <span>⚡</span>
                      <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-400 text-[10px] font-black text-black">
                        {trader.rank}
                      </span>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white leading-tight">{trader.handle}</h4>
                      <p className="text-xs font-semibold text-emerald-400">{trader.return}</p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleFollow(trader.handle)}
                    className={cn(
                      "rounded-full px-4 py-1.5 text-xs font-bold transition-all cursor-pointer",
                      isFollowing
                        ? "bg-zinc-800 text-zinc-300 border border-zinc-700"
                        : "bg-emerald-300 text-zinc-950 hover:bg-emerald-200"
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
          <div className="flex items-center gap-1 text-base font-extrabold text-white mb-3 cursor-pointer">
            <span>Trending Solana dApps</span>
            <ChevronRight className="h-5 w-5 text-zinc-400" />
          </div>

          <div className="rounded-3xl border border-zinc-800/80 bg-zinc-900/60 p-3 space-y-3">
            {sites.map((site) => (
              <div key={site.name} className="flex items-center justify-between p-1 cursor-pointer group">
                <div className="flex items-center gap-3">
                  <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-zinc-800 font-bold text-sm">
                    <span className="text-lg">🌐</span>
                    <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-400 text-[10px] font-black text-black">
                      {site.rank}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
                      {site.name}
                    </h4>
                    <p className="text-xs text-zinc-400">{site.category}</p>
                  </div>
                </div>

                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-800/80 text-zinc-300 group-hover:bg-zinc-700 transition-colors">
                  <ExternalLink className="h-4 w-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-3 left-3 right-3 bg-black/90 backdrop-blur-md p-2 flex items-center gap-2 rounded-full border border-zinc-800/80">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
          <input
            type="text"
            placeholder="Search traders or dApps..."
            className="w-full rounded-full border border-zinc-800/80 bg-zinc-900/90 py-2 pl-9 pr-3 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none"
          />
        </div>
        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-300 text-zinc-950 hover:bg-emerald-200 transition-colors shadow-lg active:scale-95 cursor-pointer"
        >
          <Plus className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}
