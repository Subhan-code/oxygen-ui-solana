"use client"

import React from "react"
import { Vote, Clock } from "lucide-react"
import { cn } from "@/lib/utils"

export interface CryptoPredictionCandidateCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  eventTitle?: string
  yesPercent?: number
  noPercent?: number
  volumeUsd?: string
}

export function CryptoPredictionCandidateCard({
  eventTitle = "Solana Spot ETF Approval in 2026?",
  yesPercent = 72,
  noPercent = 28,
  volumeUsd = "$4,250,000",
  className,
  ...props
}: CryptoPredictionCandidateCardProps) {
  return (
    <div
      data-slot="root"
      className={cn(
        "relative mx-auto flex w-full max-w-sm flex-col overflow-hidden rounded-[32px] bg-black p-5 text-white shadow-2xl border border-zinc-800/80 font-sans",
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Vote className="h-5 w-5 text-emerald-400" />
          <span className="text-xs font-bold uppercase text-zinc-400">Prediction Market</span>
        </div>
        <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-[10px] font-bold text-emerald-400 border border-emerald-500/30">
          Live Pool
        </span>
      </div>

      <h3 className="text-base font-black text-white mb-4 leading-snug">{eventTitle}</h3>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="rounded-2xl bg-emerald-950/40 p-3.5 border border-emerald-500/40 text-center">
          <span className="block text-[10px] font-bold text-emerald-400 uppercase">YES Odds</span>
          <span className="text-2xl font-black text-white mt-1 block">{yesPercent}%</span>
        </div>

        <div className="rounded-2xl bg-rose-950/40 p-3.5 border border-rose-500/40 text-center">
          <span className="block text-[10px] font-bold text-rose-400 uppercase">NO Odds</span>
          <span className="text-2xl font-black text-white mt-1 block">{noPercent}%</span>
        </div>
      </div>

      <div className="flex items-center justify-between text-xs text-zinc-400 pt-2 border-t border-zinc-900">
        <span>Total Pool Volume</span>
        <span className="font-bold text-zinc-200">{volumeUsd}</span>
      </div>
    </div>
  )
}
