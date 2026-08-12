"use client"

import React from "react"
import { Share2, Settings, ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"

export interface CryptoUserProfileCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  username?: string
  tradeVolumeUsd?: number
  followersCount?: number
  followingCount?: number
}

export function CryptoUserProfileCard({
  username = "alex.sol",
  tradeVolumeUsd = 14250.00,
  followersCount = 1240,
  followingCount = 380,
  className,
  ...props
}: CryptoUserProfileCardProps) {
  return (
    <div
      data-slot="root"
      className={cn(
        "relative mx-auto flex w-full max-w-sm flex-col overflow-hidden rounded-3xl bg-zinc-950 p-5 text-white shadow-xl border border-zinc-800 font-sans",
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-between gap-3 mb-6 pb-3 border-b border-zinc-900">
        <h2 className="text-lg font-bold tracking-tight text-white">{username}</h2>
        <span className="rounded-full bg-zinc-900 px-2.5 py-0.5 text-xs font-semibold text-zinc-300 border border-zinc-800">
          Solana ID
        </span>
      </div>

      <div className="flex items-center justify-between mb-6 px-1">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-zinc-900 border border-zinc-800 text-xl font-bold text-white shadow-sm">
          ⚡
        </div>

        <div className="flex flex-1 justify-around ml-3 text-center">
          <div>
            <span className="block text-[11px] font-medium text-zinc-400 leading-tight">Trade Volume</span>
            <span className="text-sm font-bold text-white mt-1 block">${tradeVolumeUsd.toLocaleString()}</span>
          </div>
          <div>
            <span className="block text-[11px] font-medium text-zinc-400">Followers</span>
            <span className="text-sm font-bold text-white mt-1 block">{followersCount.toLocaleString()}</span>
          </div>
          <div>
            <span className="block text-[11px] font-medium text-zinc-400">Following</span>
            <span className="text-sm font-bold text-white mt-1 block">{followingCount.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-5">
        <button
          type="button"
          className="flex items-center justify-center gap-2 rounded-xl bg-zinc-900 py-2.5 px-3 text-xs font-semibold text-zinc-200 hover:bg-zinc-800 transition-colors border border-zinc-800 cursor-pointer"
        >
          <Settings className="h-3.5 w-3.5 text-zinc-400" />
          <span>Manage Profile</span>
        </button>
        <button
          type="button"
          className="flex items-center justify-center gap-2 rounded-xl bg-zinc-900 py-2.5 px-3 text-xs font-semibold text-zinc-200 hover:bg-zinc-800 transition-colors border border-zinc-800 cursor-pointer"
        >
          <Share2 className="h-3.5 w-3.5 text-zinc-400" />
          <span>Share Profile</span>
        </button>
      </div>

      <div className="pt-3 border-t border-zinc-900">
        <div className="flex items-center justify-between mb-2.5">
          <h3 className="text-xs font-bold text-zinc-300">Recent Activity</h3>
          <span className="text-xs text-zinc-400 hover:text-white flex items-center gap-1 font-medium cursor-pointer">
            <span>View All</span>
            <ExternalLink className="h-3 w-3" />
          </span>
        </div>
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-3 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-zinc-200">Swapped 10 SOL for USDC</span>
            <span className="text-zinc-500">2m ago</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-zinc-200">Staked 50 SOL in Marinade</span>
            <span className="text-zinc-500">1h ago</span>
          </div>
        </div>
      </div>
    </div>
  )
}
