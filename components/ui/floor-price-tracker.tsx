"use client"

import * as React from "react"
import { TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"

import {
  Metric,
  MetricLabel,
  MetricValue,
} from "@/components/metric"

export interface FloorPriceTrackerProps extends React.HTMLAttributes<HTMLDivElement> {
  collectionName?: string
  magicEdenFloorSol?: number
  tensorFloorSol?: number
  volume24hSol?: number
  listedPercent?: number
  totalListedCount?: number
}

export function FloorPriceTracker({
  collectionName = "Mad Lads",
  magicEdenFloorSol = 142.5,
  tensorFloorSol = 142.2,
  volume24hSol = 4820.5,
  listedPercent = 3.2,
  totalListedCount = 320,
  className,
  ...props
}: FloorPriceTrackerProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-zinc-800 bg-zinc-900/90 p-4 shadow-xl backdrop-blur-xl",
        className
      )}
      data-slot="floor-price-tracker"
      {...props}
    >
      <div className="flex items-center justify-between pb-3 border-b border-zinc-800/80">
        <h3 className="font-bold text-sm text-zinc-100">{collectionName} Stats</h3>
        <span className="flex items-center gap-1 font-mono text-xs text-emerald-400 font-semibold">
          <TrendingUp className="h-3.5 w-3.5" /> Live Marketplace Feeds
        </span>
      </div>

      <dl className="mt-3 grid grid-cols-2 gap-2">
        <Metric className="rounded-xl bg-zinc-950/60 border border-zinc-800/50 p-2.5 gap-1">
          <MetricLabel className="text-[11px] text-zinc-400">Magic Eden Floor</MetricLabel>
          <MetricValue className="font-mono text-sm text-purple-400">{magicEdenFloorSol} SOL</MetricValue>
        </Metric>

        <Metric className="rounded-xl bg-zinc-950/60 border border-zinc-800/50 p-2.5 gap-1">
          <MetricLabel className="text-[11px] text-zinc-400">Tensor Floor</MetricLabel>
          <MetricValue className="font-mono text-sm text-blue-400">{tensorFloorSol} SOL</MetricValue>
        </Metric>

        <Metric className="rounded-xl bg-zinc-950/60 border border-zinc-800/50 p-2.5 gap-1">
          <MetricLabel className="text-[11px] text-zinc-400">24h Volume</MetricLabel>
          <MetricValue className="font-mono text-sm text-zinc-200">{volume24hSol.toLocaleString()} SOL</MetricValue>
        </Metric>

        <Metric className="rounded-xl bg-zinc-950/60 border border-zinc-800/50 p-2.5 gap-1">
          <MetricLabel className="text-[11px] text-zinc-400">Listed Ratio</MetricLabel>
          <MetricValue className="font-mono text-sm text-zinc-200">{totalListedCount} ({listedPercent}%)</MetricValue>
        </Metric>
      </dl>
    </div>
  )
}
