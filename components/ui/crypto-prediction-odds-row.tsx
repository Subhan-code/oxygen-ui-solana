"use client"

import React from "react"
import { cn } from "@/lib/utils"

export interface CryptoPredictionOddsRowProps
  extends React.HTMLAttributes<HTMLDivElement> {
  candidateName?: string
  oddsPercent?: number
  volumeUsd?: string
}

export function CryptoPredictionOddsRow({
  candidateName = "Solana Spot ETF Approval",
  oddsPercent = 72,
  volumeUsd = "$4.2M",
  className,
  ...props
}: CryptoPredictionOddsRowProps) {
  return (
    <div
      data-slot="root"
      className={cn(
        "relative mx-auto flex w-full max-w-sm items-center justify-between gap-3 rounded-2xl bg-zinc-900/80 p-3.5 text-white shadow-md border border-zinc-800 font-sans",
        className
      )}
      {...props}
    >
      <div className="flex-1 min-w-0">
        <h4 className="text-xs font-bold text-white truncate">{candidateName}</h4>
        <div className="mt-1.5 flex items-center gap-2">
          <div className="h-2 flex-1 rounded-full bg-zinc-800 overflow-hidden">
            <div
              style={{ width: `${oddsPercent}%` }}
              className="h-full rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.6)]"
            />
          </div>
          <span className="text-xs font-extrabold text-emerald-400">{oddsPercent}%</span>
        </div>
      </div>

      <button
        type="button"
        className="rounded-xl bg-emerald-300 px-4 py-2 text-xs font-black text-zinc-950 hover:bg-emerald-200 transition-colors shadow cursor-pointer shrink-0"
      >
        Vote
      </button>
    </div>
  )
}
