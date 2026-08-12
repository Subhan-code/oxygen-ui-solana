"use client"

import React from "react"
import { motion } from "motion/react"
import { BarChart3 } from "lucide-react"
import { cn } from "@/lib/utils"

export interface CryptoSalesVerticalGraphProps
  extends React.HTMLAttributes<HTMLDivElement> {
  salesAmount?: string
  growthPercent?: string
}

export function CryptoSalesVerticalGraph({
  salesAmount = "$9,134 SOL",
  growthPercent = "2.5%",
  className,
  ...props
}: CryptoSalesVerticalGraphProps) {
  return (
    <div
      data-slot="root"
      className={cn(
        "relative mx-auto flex w-full max-w-sm flex-col overflow-hidden rounded-[28px] bg-black p-5 text-white shadow-2xl border border-zinc-800/80 font-sans",
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-between mb-3">
        <div>
          <span className="text-xs font-medium text-zinc-400">Solana Vertical Bar Graph</span>
          <div className="flex items-baseline gap-2 mt-0.5">
            <span className="text-2xl font-black tracking-tight text-white">{salesAmount}</span>
            <span className="text-xs font-bold text-emerald-400">↑ {growthPercent}</span>
          </div>
        </div>
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400">
          <BarChart3 className="h-4 w-4" />
        </div>
      </div>

      <div className="h-28 w-full rounded-2xl bg-zinc-950/80 p-3 border border-zinc-900 flex items-center justify-center">
        <div className="flex items-end gap-2 h-full w-full justify-between pt-2">
          {[50, 70, 85, 75, 65, 90, 80].map((height, i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              animate={{ height: `${height}%` }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="w-full flex-1 rounded-t-sm bg-gradient-to-t from-emerald-950 via-emerald-600 to-emerald-400 relative"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-emerald-200 shadow-[0_0_6px_#5eead4]" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
