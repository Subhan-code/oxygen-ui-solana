"use client"

import * as React from "react"
import { GitFork, ArrowRight, Zap, Info } from "lucide-react"
import { cn } from "@/lib/utils"

export interface RouteHop {
  dexName: string
  percent: number
  poolFeePercent: number
  icon?: string
}

export interface RouteSummaryProps extends React.HTMLAttributes<HTMLDivElement> {
  payToken?: string
  receiveToken?: string
  hops?: RouteHop[]
  priceImpactPercent?: number
  minReceivedAmount?: string
}

const DEFAULT_HOPS: RouteHop[] = [
  { dexName: "Raydium CLMM", percent: 60, poolFeePercent: 0.05 },
  { dexName: "Orca Whirlpools", percent: 40, poolFeePercent: 0.03 },
]

export function RouteSummary({
  payToken = "SOL",
  receiveToken = "USDC",
  hops = DEFAULT_HOPS,
  priceImpactPercent = 0.04,
  minReceivedAmount = "1,481.52 USDC",
  className,
  ...props
}: RouteSummaryProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-zinc-800 bg-zinc-900/90 p-4 shadow-xl backdrop-blur-xl",
        className
      )}
      data-slot="route-summary"
      {...props}
    >
      <div className="flex items-center justify-between pb-3 border-b border-zinc-800/80 text-xs">
        <div className="flex items-center gap-2">
          <GitFork className="h-4 w-4 text-purple-400" />
          <span className="font-semibold text-zinc-100">Smart Order Routing</span>
        </div>
        <span className="flex items-center gap-1 font-mono text-emerald-400 font-semibold">
          <Zap className="h-3.5 w-3.5 fill-emerald-400" /> Best Price via Jupiter
        </span>
      </div>

      <div className="my-3 space-y-2">
        {hops.map((hop, idx) => (
          <div key={idx} className="flex items-center justify-between rounded-xl bg-zinc-950/60 p-2.5 border border-zinc-800/50 text-xs">
            <div className="flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-purple-500/10 text-[10px] font-mono font-bold text-purple-400 border border-purple-500/20">
                {idx + 1}
              </span>
              <span className="font-medium text-zinc-200">{hop.dexName}</span>
              <span className="text-[10px] text-zinc-500 font-mono">({hop.poolFeePercent}% fee)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-16 overflow-hidden rounded-full bg-zinc-800">
                <div
                  className="h-full origin-left bg-purple-500 rounded-full"
                  style={{ transform: `scaleX(${Math.max(0, Math.min(1, hop.percent / 100))})` }}
                />
              </div>
              <span className="font-mono text-xs font-semibold text-zinc-300">{hop.percent}%</span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-zinc-800/60 text-xs font-mono text-zinc-400">
        <div className="flex items-center gap-1">
          <Info className="h-3.5 w-3.5 text-zinc-500" />
          <span>Price Impact:</span>
          <span className={cn("font-semibold", priceImpactPercent > 1 ? "text-rose-400" : "text-emerald-400")}>
            {priceImpactPercent}%
          </span>
        </div>
        <div className="flex items-center gap-1">
          <span>Min Received:</span>
          <span className="font-semibold text-zinc-200">{minReceivedAmount}</span>
        </div>
      </div>
    </div>
  )
}
