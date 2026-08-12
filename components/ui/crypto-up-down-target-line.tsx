"use client"

import React from "react"
import { motion } from "motion/react"
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
    <motion.div
      data-slot="root"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", bounce: 0, duration: 0.35 }}
      className={cn(
        "relative mx-auto flex w-full max-w-sm flex-col overflow-hidden rounded-2xl bg-zinc-950 p-4 text-white shadow-xl border border-zinc-800/80 font-sans",
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-bold text-zinc-400">Target Line</span>
        <span className="text-xs font-mono font-bold text-blue-400">Threshold: ${targetPrice.toFixed(2)}</span>
      </div>

      <div className="relative h-20 w-full my-1 rounded-xl bg-zinc-900/60 p-2 border border-zinc-800 flex items-center justify-center">
        <svg className="h-full w-full overflow-visible" viewBox="0 0 250 60">
          <line x1="0" y1="30" x2="250" y2="30" stroke="#a855f7" strokeWidth="1.5" strokeDasharray="3 3" />
          <text x="5" y="24" fill="#a855f7" fontSize="10" fontWeight="bold">Target Level</text>
          <circle cx="180" cy="18" r="4" fill="#3b82f6" />
          <text x="190" y="22" fill="#3b82f6" fontSize="10" fontWeight="bold">${currentPrice.toFixed(2)}</text>
        </svg>
      </div>

      <div className="flex items-center justify-between text-xs text-zinc-400 pt-2 border-t border-zinc-900">
        <span>Multiplier</span>
        <span className="font-bold text-white">1.90x Payout</span>
      </div>
    </motion.div>
  )
}
