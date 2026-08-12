"use client"

import React, { useState } from "react"
import { motion } from "motion/react"
import { Heart, Share2, ChevronDown, ChevronRight, SlidersHorizontal } from "lucide-react"
import { cn } from "@/lib/utils"

export interface CryptoTokenDetailsScreenProps
  extends React.HTMLAttributes<HTMLDivElement> {
  tokenName?: string
  priceUsd?: number
  changeUsd?: number
  changePercent?: number
  solBalance?: number
}

export function CryptoTokenDetailsScreen({
  tokenName = "Solana",
  priceUsd = 142.50,
  changeUsd = 4.20,
  changePercent = 3.04,
  solBalance = 142.5,
  className,
  ...props
}: CryptoTokenDetailsScreenProps) {
  const [activeTf, setActiveTf] = useState<"LIVE" | "1D" | "1W" | "1M" | "1Y" | "ALL">("LIVE")
  const [isLiked, setIsLiked] = useState(false)

  return (
    <div
      data-slot="root"
      className={cn(
        "relative mx-auto flex w-full max-w-sm flex-col overflow-hidden rounded-[36px] bg-black p-5 text-white shadow-2xl border border-zinc-800/80 font-sans min-h-[700px]",
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-xs">
          SOL
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsLiked(!isLiked)}
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-full bg-zinc-900 transition-colors cursor-pointer",
              isLiked ? "text-rose-500" : "text-zinc-400 hover:text-white"
            )}
            aria-label="Favorite token"
          >
            <Heart className={cn("h-4 w-4", isLiked && "fill-current")} />
          </button>
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-900 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Share token"
          >
            <Share2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-center gap-1 text-2xl font-black text-white cursor-pointer">
          <span>{tokenName}</span>
          <ChevronDown className="h-5 w-5 text-zinc-400" />
        </div>
        <div className="mt-1 flex items-baseline gap-2">
          <span className="text-4xl font-extrabold tracking-tight text-white">${priceUsd.toFixed(2)}</span>
        </div>
        <div className="mt-1 flex items-center gap-1.5 text-xs font-bold text-emerald-400">
          <span>+${changeUsd.toFixed(2)}</span>
          <span>(+{changePercent.toFixed(2)}%)</span>
        </div>
      </div>

      <div className="relative h-44 w-full my-2">
        <svg className="h-full w-full overflow-visible" viewBox="0 0 300 130">
          <path
            d="M 0 90 L 15 95 L 30 85 L 45 100 L 60 80 L 80 85 L 90 75 L 105 40 L 120 20 L 135 45 L 150 25 L 175 40 L 195 32 L 225 35 L 245 60 L 265 65 L 285 20"
            fill="none"
            stroke="#22c55e"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          <motion.circle
            cx="285"
            cy="20"
            r="4"
            fill="#22c55e"
            animate={{ r: [3, 6, 3] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="drop-shadow-[0_0_8px_#22c55e]"
          />
        </svg>
      </div>

      <div className="flex items-center justify-between gap-1 mb-6 rounded-full bg-zinc-900/60 p-1 border border-zinc-800/80">
        {(["LIVE", "1D", "1W", "1M", "1Y", "ALL"] as const).map((tf) => (
          <button
            key={tf}
            type="button"
            onClick={() => setActiveTf(tf)}
            className={cn(
              "relative rounded-full px-2.5 py-1 text-xs font-bold transition-colors cursor-pointer flex-1 text-center",
              activeTf === tf ? "text-zinc-950" : "text-zinc-400 hover:text-zinc-200"
            )}
          >
            {activeTf === tf && (
              <motion.div
                layoutId="tok-screen-tf-pill"
                className="absolute inset-0 rounded-full bg-white"
                transition={{ type: "spring", stiffness: 450, damping: 35 }}
              />
            )}
            <span className="relative z-10 flex items-center justify-center gap-1">
              {tf === "LIVE" && <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />}
              {tf}
            </span>
          </button>
        ))}
        <button type="button" className="p-1 text-zinc-400 hover:text-white px-2 cursor-pointer" aria-label="Filters">
          <SlidersHorizontal className="h-3.5 w-3.5" />
        </button>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto pr-1 no-scrollbar pb-16">
        <div>
          <h3 className="text-base font-bold text-white mb-2">Your Positions</h3>
          <div className="flex items-center justify-between rounded-2xl border border-zinc-800/80 bg-zinc-900/60 p-3.5 transition-colors hover:bg-zinc-900">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-xs">
                SOL
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">SOL <span className="font-normal text-zinc-400">Solana</span></h4>
                <p className="text-xs text-zinc-400">{solBalance} SOL</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="text-right">
                <span className="block text-xs font-bold text-white">${(solBalance * priceUsd).toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
                <span className="text-[11px] text-emerald-400">+${(solBalance * changeUsd).toFixed(2)}</span>
              </div>
              <ChevronRight className="h-4 w-4 text-zinc-500" />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between py-1 border-t border-zinc-900 pt-3">
          <div className="flex items-center gap-1.5 text-sm font-bold text-white cursor-pointer">
            <span>Solana Community Chat</span>
            <ChevronRight className="h-4 w-4 text-zinc-400" />
          </div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>1,420 online</span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-3 left-3 right-3 bg-zinc-950/90 backdrop-blur-md p-3 flex items-center justify-between rounded-2xl border border-zinc-800/80 shadow-2xl">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-zinc-300">⚡ Solana Network</span>
          <span className="block text-xs font-extrabold text-white">$65.8B market cap</span>
        </div>
        <button
          type="button"
          className="rounded-full bg-emerald-300 px-6 py-2.5 text-sm font-extrabold text-zinc-950 hover:bg-emerald-200 transition-colors shadow-lg active:scale-95 cursor-pointer"
        >
          Trade SOL
        </button>
      </div>
    </div>
  )
}
