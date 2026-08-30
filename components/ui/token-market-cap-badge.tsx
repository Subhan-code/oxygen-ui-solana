"use client"

import * as React from "react"
import { DollarSign, BarChart3, Layers, PieChart } from "lucide-react"
import { cn } from "@/lib/utils"

import {
  Metric,
  MetricLabel,
  MetricValue,
} from "@/components/metric"

export interface TokenMarketCapBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  marketCapUsd?: string
  volume24hUsd?: string
  fdvUsd?: string
  circulatingSupply?: string
}

const METRICS = [
  { label: "Market Cap", key: "marketCapUsd", icon: DollarSign, color: "text-emerald-400" },
  { label: "24h Volume", key: "volume24hUsd", icon: BarChart3, color: "text-purple-400" },
  { label: "FDV", key: "fdvUsd", icon: Layers, color: "text-blue-400" },
  { label: "Circ. Supply", key: "circulatingSupply", icon: PieChart, color: "text-amber-400" },
] as const

export function TokenMarketCapBadge({
  marketCapUsd = "$68.4B",
  volume24hUsd = "$3.2B",
  fdvUsd = "$85.1B",
  circulatingSupply = "468.2M SOL",
  className,
  ...props
}: TokenMarketCapBadgeProps) {
  const values: Record<string, string> = { marketCapUsd, volume24hUsd, fdvUsd, circulatingSupply }

  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-3 rounded-2xl border border-zinc-800 bg-zinc-900/90 p-4 shadow-xl backdrop-blur-xl sm:grid-cols-4",
        className
      )}
      data-slot="token-market-cap-badge"
      {...props}
    >
      {METRICS.map((m) => {
        const Icon = m.icon
        return (
          <Metric key={m.key} className="rounded-xl border border-zinc-800/60 bg-zinc-950/50 p-2.5 gap-1">
            <MetricLabel className="text-[11px] text-zinc-400">
              <span className="flex items-center gap-1.5">
                <Icon className={cn("h-3.5 w-3.5", m.color)} />
                {m.label}
              </span>
            </MetricLabel>
            <MetricValue className="font-mono text-sm text-zinc-100">{values[m.key]}</MetricValue>
          </Metric>
        )
      })}
    </div>
  )
}
