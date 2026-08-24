"use client"

import React from "react"
import { motion } from "motion/react"
import { Vote } from "lucide-react"
import { cn } from "@/lib/utils"

export interface CryptoPredictionCandidateCardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart"> {
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
    <motion.div
      data-slot="root"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", bounce: 0, duration: 0.35 }}
      className={cn(
        "relative mx-auto flex w-full max-w-sm flex-col overflow-hidden rounded-3xl bg-zinc-950 p-5 text-white shadow-xl border border-zinc-800/80 font-sans",
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-zinc-900">
        <div className="flex items-center gap-2">
          <Vote className="h-4 w-4 text-blue-400" />
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Prediction Market</span>
        </div>
        <span className="rounded-full bg-blue-950/60 border border-blue-800/50 px-2 py-0.5 text-[10px] font-semibold text-blue-300">
          Active Pool
        </span>
      </div>

      <h3 className="text-sm font-bold text-white mb-4 leading-snug">{eventTitle}</h3>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="rounded-2xl bg-blue-950/40 p-3.5 border border-blue-800/50 text-center transition-transform active:scale-98">
          <span className="block text-[10px] font-bold text-blue-400 uppercase">YES Odds</span>
          <span className="text-xl font-extrabold text-white mt-1 block">{yesPercent}%</span>
        </div>

        <div className="rounded-2xl bg-purple-950/40 p-3.5 border border-purple-800/50 text-center transition-transform active:scale-98">
          <span className="block text-[10px] font-bold text-purple-300 uppercase">NO Odds</span>
          <span className="text-xl font-extrabold text-white mt-1 block">{noPercent}%</span>
        </div>
      </div>

      <div className="flex items-center justify-between text-xs text-zinc-400 pt-2 border-t border-zinc-900">
        <span>Pool Volume</span>
        <span className="font-semibold text-zinc-200">{volumeUsd}</span>
      </div>
    </motion.div>
  )
}
