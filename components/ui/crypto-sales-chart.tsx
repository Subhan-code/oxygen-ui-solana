"use client"

import React, { useState } from "react"
import { motion } from "motion/react"
import { BarChart3, Layers, TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"

export interface CryptoSalesChartProps
  extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  salesAmount?: string
  growthPercent?: string
  avgScore?: string
}

export function CryptoSalesChart({
  title = "Solana DEX Volume",
  salesAmount = "$9,134 SOL",
  growthPercent = "2.5%",
  avgScore = "$185,301",
  className,
  ...props
}: CryptoSalesChartProps) {
  const [viewMode, setViewMode] = useState<"candlestick" | "segmented" | "bars">("candlestick")

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
          <span className="text-xs font-medium text-zinc-400">{title}</span>
          <div className="flex items-baseline gap-2 mt-0.5">
            <span className="text-lg font-bold tracking-tight text-white">{salesAmount}</span>
            <span className="text-xs font-semibold text-blue-400">↑ {growthPercent}</span>
          </div>
          <p className="text-[10px] text-zinc-500 mt-0.5">Avg. epoch volume {avgScore}</p>
        </div>

        <div className="flex items-center gap-1 rounded-xl bg-zinc-900 p-1 border border-zinc-800">
          <button
            type="button"
            onClick={() => setViewMode("candlestick")}
            className={cn(
              "p-1.5 rounded-lg transition-colors cursor-pointer active:scale-95",
              viewMode === "candlestick" ? "bg-zinc-800 text-blue-400" : "text-zinc-500 hover:text-zinc-300"
            )}
            title="Candlestick view"
          >
            <TrendingUp className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={() => setViewMode("segmented")}
            className={cn(
              "p-1.5 rounded-lg transition-colors cursor-pointer active:scale-95",
              viewMode === "segmented" ? "bg-zinc-800 text-blue-400" : "text-zinc-500 hover:text-zinc-300"
            )}
            title="Segmented view"
          >
            <Layers className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={() => setViewMode("bars")}
            className={cn(
              "p-1.5 rounded-lg transition-colors cursor-pointer active:scale-95",
              viewMode === "bars" ? "bg-zinc-800 text-blue-400" : "text-zinc-500 hover:text-zinc-300"
            )}
            title="Bar view"
          >
            <BarChart3 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      <div className="h-28 w-full rounded-2xl bg-zinc-900/60 p-3 border border-zinc-800 flex items-center justify-center">
        {viewMode === "candlestick" && (
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
        )}

        {viewMode === "segmented" && (
          <div className="flex flex-col justify-between h-full w-full py-1">
            {[2, 1, 2, 4].map((activeCount, rowIdx) => (
              <div key={rowIdx} className="flex gap-2 w-full">
                {Array.from({ length: 5 }).map((_, colIdx) => (
                  <div
                    key={colIdx}
                    className={cn(
                      "h-3 flex-1 rounded-full transition-all",
                      colIdx < activeCount
                        ? "bg-blue-500"
                        : "bg-zinc-800"
                    )}
                  />
                ))}
              </div>
            ))}
          </div>
        )}

        {viewMode === "bars" && (
          <div className="flex items-end gap-2 h-full w-full justify-between pt-2">
            {[50, 70, 85, 75, 65, 90, 80].map((height, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${height}%` }}
                transition={{ type: "spring", bounce: 0, duration: 0.4, delay: i * 0.03 }}
                className="w-full flex-1 rounded-t-xs bg-blue-600 relative"
              />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}
