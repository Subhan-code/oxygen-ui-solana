"use client"

import React from "react"
import { Layers } from "lucide-react"
import { cn } from "@/lib/utils"

export interface CryptoSalesSegmentedBarsProps
  extends React.HTMLAttributes<HTMLDivElement> {
  salesAmount?: string
  growthPercent?: string
}

export function CryptoSalesSegmentedBars({
  salesAmount = "$9,134 SOL",
  growthPercent = "2.5%",
  className,
  ...props
}: CryptoSalesSegmentedBarsProps) {
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
          <span className="text-xs font-medium text-zinc-400">Solana Segmented Metrics</span>
          <div className="flex items-baseline gap-2 mt-0.5">
            <span className="text-2xl font-black tracking-tight text-white">{salesAmount}</span>
            <span className="text-xs font-bold text-emerald-400">↑ {growthPercent}</span>
          </div>
        </div>
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400">
          <Layers className="h-4 w-4" />
        </div>
      </div>

      <div className="h-28 w-full rounded-2xl bg-zinc-950/80 p-3 border border-zinc-900 flex items-center justify-center">
        <div className="flex flex-col justify-between h-full w-full py-1">
          {[2, 1, 2, 4].map((activeCount, rowIdx) => (
            <div key={rowIdx} className="flex gap-2 w-full">
              {Array.from({ length: 5 }).map((_, colIdx) => (
                <div
                  key={colIdx}
                  className={cn(
                    "h-3.5 flex-1 rounded-full transition-all",
                    colIdx < activeCount
                      ? "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]"
                      : "bg-zinc-800/60"
                  )}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
