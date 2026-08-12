"use client"

import React from "react"
import { motion } from "motion/react"
import { TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"

export interface CryptoSalesCandlestickChartProps
  extends React.HTMLAttributes<HTMLDivElement> {
  salesAmount?: string
  growthPercent?: string
}

export function CryptoSalesCandlestickChart({
  salesAmount = "$9,134 SOL",
  growthPercent = "2.5%",
  className,
  ...props
}: CryptoSalesCandlestickChartProps) {
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
        <div>
          <span className="text-xs font-medium text-zinc-400">Volume Analytics</span>
          <div className="flex items-baseline gap-2 mt-0.5">
            <span className="text-lg font-bold tracking-tight text-white">{salesAmount}</span>
            <span className="text-xs font-semibold text-blue-400">↑ {growthPercent}</span>
          </div>
        </div>
        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-950/60 border border-blue-800/50 text-blue-300">
          <TrendingUp className="h-4 w-4" />
        </div>
      </div>

      <div className="h-28 w-full rounded-2xl bg-zinc-900/60 p-3 border border-zinc-800 flex items-center justify-center">
        <div className="flex items-end gap-2 h-full w-full justify-between pt-2">
          {[40, 65, 80, 55, 75, 45, 90, 60, 70].map((h, i) => (
            <div key={i} className="flex flex-col items-center flex-1 h-full justify-end">
              <div className="w-[1.5px] h-full bg-zinc-800 relative flex items-center justify-center">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ type: "spring", bounce: 0, duration: 0.4, delay: i * 0.03 }}
                  className="w-2 rounded-xs bg-blue-500"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
