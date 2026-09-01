"use client"

import React from "react"
import { motion } from "motion/react"
import { X, Share2, Settings, ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"

export interface CryptoUserProfileProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart"> {
  username?: string
  tradeVolumeUsd?: number
  followersCount?: number
  followingCount?: number
  onManageProfile?: () => void
  onShareProfile?: () => void
  onClose?: () => void
}

export function CryptoUserProfile({
  username = "alex.sol",
  tradeVolumeUsd = 14250.00,
  followersCount = 1240,
  followingCount = 380,
  onManageProfile,
  onShareProfile,
  onClose,
  className,
  ...props
}: CryptoUserProfileProps) {
  return (
    <motion.div
      data-slot="crypto-user-profile"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", bounce: 0, duration: 0.35 }}
      className={cn(
        "relative mx-auto flex w-full max-w-sm flex-col overflow-hidden rounded-3xl bg-zinc-950 p-5 text-white shadow-xl border border-zinc-800/80 font-sans",
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-between gap-3 mb-5 pb-3 border-b border-zinc-900">
        <div className="flex items-center gap-2">
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-900 text-zinc-400 hover:text-white transition-colors cursor-pointer motion-safe:active:scale-[0.97]"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          <h2 className="text-base font-bold tracking-tight leading-tight text-white">{username}</h2>
        </div>
        <span className="rounded-full bg-blue-950/60 border border-blue-800/50 px-2.5 py-0.5 text-[11px] font-semibold text-blue-300">
          Solana ID
        </span>
      </div>

      <div className="flex items-center justify-between mb-5 px-1">
        <img
          src="/account-pfp.jpg"
          alt={username}
          className="h-12 w-12 rounded-full object-cover border border-sky-500/50 shadow-md shrink-0"
        />


        <div className="flex flex-1 justify-around ml-3 text-center">
          <div>
            <span className="block text-[11px] font-medium text-zinc-400 leading-tight">Trade Volume</span>
            <span className="text-xs font-bold text-white mt-0.5 block">${tradeVolumeUsd.toLocaleString()}</span>
          </div>
          <div>
            <span className="block text-[11px] font-medium text-zinc-400">Followers</span>
            <span className="text-xs font-bold text-white mt-0.5 block">{followersCount.toLocaleString()}</span>
          </div>
          <div>
            <span className="block text-[11px] font-medium text-zinc-400">Following</span>
            <span className="text-xs font-bold text-white mt-0.5 block">{followingCount.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-5">
        <button
          type="button"
          onClick={onManageProfile}
          className="flex items-center justify-center gap-2 rounded-xl bg-zinc-900 py-2 px-3 text-xs font-semibold text-zinc-200 hover:bg-zinc-800 transition-colors border border-zinc-800 cursor-pointer motion-safe:active:scale-[0.97]"
        >
          <Settings className="h-3.5 w-3.5 text-zinc-400" />
          <span>Manage Profile</span>
        </button>
        <button
          type="button"
          onClick={onShareProfile}
          className="flex items-center justify-center gap-2 rounded-xl bg-zinc-900 py-2 px-3 text-xs font-semibold text-zinc-200 hover:bg-zinc-800 transition-colors border border-zinc-800 cursor-pointer motion-safe:active:scale-[0.97]"
        >
          <Share2 className="h-3.5 w-3.5 text-zinc-400" />
          <span>Share Profile</span>
        </button>
      </div>

      <div className="pt-3 border-t border-zinc-900">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xs font-bold text-zinc-300">Recent Activity</h3>
          <span className="text-xs text-blue-400 hover:underline flex items-center gap-1 font-medium cursor-pointer">
            <span>View All</span>
            <ExternalLink className="h-3 w-3" />
          </span>
        </div>
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-3 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-zinc-200">Swapped 10 SOL for USDC</span>
            <span className="text-zinc-500 text-[10px]">2m ago</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-zinc-200">Staked 50 SOL in Marinade</span>
            <span className="text-zinc-500 text-[10px]">1h ago</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
