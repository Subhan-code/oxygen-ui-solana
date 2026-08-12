"use client"

import React from "react"
import { cn } from "@/lib/utils"

export interface CryptoTvlSparkbarWidgetProps
  extends React.HTMLAttributes<HTMLDivElement> {
  txCount?: string
  growthPercent?: string
}

export function CryptoTvlSparkbarWidget({
  txCount = "+24.6M",
  growthPercent = "5.2%",
  className,
  ...props
}: CryptoTvlSparkbarWidgetProps) {
  return (
    <div
      data-slot="root"
      className={cn(
        "relative mx-auto flex w-full max-w-sm items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-950 p-4 text-white shadow-xl font-sans",
        className
      )}
      {...props}
    >
      <div>
        <span className="block text-[10px] uppercase font-semibold tracking-wider text-zinc-400">Transactions & TPS</span>
        <div className="flex items-baseline gap-1.5 mt-0.5">
          <span className="text-sm font-bold text-white">{txCount}</span>
          <span className="text-[10px] font-semibold text-emerald-500">↑ {growthPercent}</span>
        </div>
      </div>

      <div className="flex items-end gap-1 h-7">
        {[4, 6, 8, 7, 5, 9, 10].map((h, i) => (
          <div key={i} className="w-1.5 rounded-xs bg-zinc-800 flex flex-col justify-end h-full">
            <div
              style={{ height: `${h * 10}%` }}
              className="w-full bg-emerald-500 rounded-xs"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
