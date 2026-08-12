"use client"

import React from "react"
import { ArrowUp, ArrowDown } from "lucide-react"
import { cn } from "@/lib/utils"

export interface CryptoUpDownTargetLineProps
  extends React.HTMLAttributes<HTMLDivElement> {
  targetPrice?: number
  currentPrice?: number
}

export function CryptoUpDownTargetLine({
  targetPrice = 142.50,
  currentPrice = 142.85,
  className,
  ...props
}: CryptoUpDownTargetLineProps) {
  return (
    <div
      data-slot="root"
      className={cn(
        "relative mx-auto flex w-full max-w-sm flex-col overflow-hidden rounded-2xl bg-zinc-950 p-4 text-white shadow-xl border border-zinc-800 font-sans",
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-bold text-zinc-400">Target Line Level</span>
        <span className="text-xs font-mono font-bold text-emerald-400">Threshold: ${targetPrice.toFixed(2)}</span>
      </div>

      <div className="relative h-20 w-full my-1 rounded-xl bg-black/60 p-2 border border-zinc-900 flex items-center justify-center">
        <svg className="h-full w-full overflow-visible" viewBox="0 0 250 60">
          <line x1="0" y1="30" x2="250" y2="30" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 3" />
          <text x="5" y="24" fill="#ef4444" fontSize="10" fontWeight="bold">Target Threshold</text>
          <circle cx="180" cy="18" r="4" fill="#34d399" />
          <text x="190" y="22" fill="#34d399" fontSize="10" fontWeight="bold">${currentPrice.toFixed(2)}</text>
        </svg>
      </div>

      <div className="flex items-center justify-between text-xs text-zinc-400 pt-2 border-t border-zinc-900">
        <span>Outcome Multiplier</span>
        <span className="font-extrabold text-white">1.90x Payout</span>
      </div>
    </div>
  )
}
