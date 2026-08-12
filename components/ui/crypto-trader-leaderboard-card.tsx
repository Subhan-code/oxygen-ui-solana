"use client"

import React, { useState } from "react"
import { ChevronRight, ExternalLink, Search, Plus } from "lucide-react"
import { cn } from "@/lib/utils"

export interface CryptoTraderLeaderboardCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  onFollow?: (handle: string) => void
}

export function CryptoTraderLeaderboardCard({
  onFollow,
  className,
  ...props
}: CryptoTraderLeaderboardCardProps) {
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
    <div
      data-slot="root"
      className={cn(
        "relative mx-auto flex w-full max-w-sm flex-col overflow-hidden rounded-3xl bg-zinc-950 p-4 text-white shadow-xl border border-zinc-800 font-sans min-h-[620px]",
        className
      )}
      {...props}
    >
      <div className="flex-1 space-y-5 overflow-y-auto pr-1 no-scrollbar pb-16">
        <div>
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-zinc-900">
            <div className="flex items-center gap-1 text-sm font-bold text-white cursor-pointer">
              <span>Top Traders</span>
              <ChevronRight className="h-4 w-4 text-zinc-400" />
            </div>
            <span className="rounded-full bg-zinc-900 px-2 py-0.5 text-[10px] font-semibold text-zinc-300 border border-zinc-800">
              Mainnet
            </span>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-2.5 space-y-2.5">
            {traders.map((trader) => {
              const isFollowing = followedMap[trader.handle]
              return (
                <div key={trader.handle} className="flex items-center justify-between p-1">
                  <div className="flex items-center gap-2.5">
                    <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-zinc-800 border border-zinc-700 font-bold text-white text-xs">
                      <span>⚡</span>
                      <span className="absolute -bottom-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-white text-[9px] font-bold text-zinc-950">
                        {trader.rank}
                      </span>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white leading-tight">{trader.handle}</h4>
                      <p className="text-[11px] font-semibold text-emerald-500">{trader.return}</p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleFollow(trader.handle)}
                    className={cn(
                      "rounded-full px-3 py-1 text-xs font-bold transition-all cursor-pointer",
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
          <div className="flex items-center gap-1 text-sm font-bold text-white mb-2 cursor-pointer">
            <span>Trending dApps</span>
            <ChevronRight className="h-4 w-4 text-zinc-400" />
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-2.5 space-y-2">
            {sites.map((site) => (
              <div key={site.name} className="flex items-center justify-between p-1 cursor-pointer group">
                <div className="flex items-center gap-2.5">
                  <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-800 border border-zinc-700 font-bold text-xs text-white">
                    <span>🌐</span>
                    <span className="absolute -bottom-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-white text-[9px] font-bold text-zinc-950">
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

                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-zinc-900 text-zinc-400 group-hover:bg-zinc-800 transition-colors">
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
            className="w-full rounded-full border border-zinc-800 bg-zinc-900 py-1.5 pl-8 pr-3 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none"
          />
        </div>
        <button
          type="button"
          className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-zinc-950 hover:bg-zinc-200 transition-colors cursor-pointer"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
