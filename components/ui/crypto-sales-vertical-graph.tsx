"use client"

import React from "react"
import { motion } from "motion/react"
import { BarChart3 } from "lucide-react"
import { cn } from "@/lib/utils"

export interface CryptoSalesVerticalGraphProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart"> {
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
          <span className="text-xs font-medium text-zinc-400">Vertical Bar Graph</span>
          <div className="flex items-baseline gap-2 mt-0.5">
            <span className="text-lg font-bold tracking-tight leading-tight text-white">{salesAmount}</span>
            <span className="text-xs font-semibold text-blue-400">↑ {growthPercent}</span>
          </div>
        </div>
        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-950/60 border border-blue-800/50 text-blue-300">
          <BarChart3 className="h-4 w-4" />
        </div>
      </div>

      <div className="h-28 w-full rounded-2xl bg-zinc-900/60 p-3 border border-zinc-800 flex items-center justify-center">
        <div className="flex items-end gap-2 h-full w-full justify-between pt-2">
          {[50, 70, 85, 75, 65, 90, 80].map((height, i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              animate={{ height: `${height}%` }}
              transition={{ type: "spring", bounce: 0, duration: 0.4, delay: i * 0.03 }}
              className="w-full flex-1 rounded-t-xs bg-blue-600"
            />
          ))}
        </div>
      </div>
    </motion.div>
  )
}
