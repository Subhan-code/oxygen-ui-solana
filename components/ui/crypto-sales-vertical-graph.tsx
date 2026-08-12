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
        "relative mx-auto flex w-full max-w-sm flex-col overflow-hidden rounded-3xl bg-zinc-950 p-5 text-white shadow-xl border border-zinc-800 font-sans",
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-zinc-900">
        <div>
          <span className="text-xs font-medium text-zinc-400">Vertical Bar Graph</span>
          <div className="flex items-baseline gap-2 mt-0.5">
            <span className="text-xl font-bold tracking-tight text-white">{salesAmount}</span>
            <span className="text-xs font-semibold text-emerald-500">↑ {growthPercent}</span>
          </div>
        </div>
        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300">
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
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="w-full flex-1 rounded-t-xs bg-emerald-500 relative"
            />
          ))}
        </div>
      </div>
    </div>
  )
}
