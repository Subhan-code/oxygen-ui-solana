"use client"

import React, { useState } from "react"
import { motion } from "motion/react"
import { TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"

import Grid from "@/components/charts/grid"
import {
  Metric,
  MetricLabel,
  MetricChange,
  MetricValue,
} from "@/components/metric"

export interface CryptoSalesCandlestickChartProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart"> {
  salesAmount?: string
  growthPercent?: number | null
}

interface Candle {
  high: number
  low: number
  open: number
  close: number
  volume: string
}

const CANDLES: Candle[] = [
  { high: 90, low: 25, open: 35, close: 78, volume: "$1.2M" },
  { high: 85, low: 30, open: 78, close: 42, volume: "$950K" },
  { high: 95, low: 40, open: 45, close: 88, volume: "$1.8M" },
  { high: 75, low: 15, open: 68, close: 22, volume: "$820K" },
  { high: 82, low: 30, open: 35, close: 72, volume: "$1.4M" },
  { high: 98, low: 50, open: 55, close: 94, volume: "$2.1M" },
  { high: 92, low: 40, open: 88, close: 48, volume: "$1.1M" },
  { high: 88, low: 32, open: 38, close: 82, volume: "$1.6M" },
]

export function CryptoSalesCandlestickChart({
  salesAmount = "$9,134 SOL",
  growthPercent = 2.5,
  className,
  ...props
}: CryptoSalesCandlestickChartProps) {
  const [hoverIndex, setHoverIndex] = useState<number | null>(5)
  const activeCandle = hoverIndex !== null ? CANDLES[hoverIndex] : CANDLES[5]

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
      <div className="flex items-start justify-between mb-3 pb-2 border-b border-zinc-900">
        <Metric className="p-0">
          <MetricLabel className="text-zinc-400">
            Volume Candlesticks
            <MetricChange value={growthPercent} />
          </MetricLabel>
          <MetricValue className="text-white">{salesAmount}</MetricValue>
          <p className="text-[10px] text-zinc-500 font-mono mt-0.5">
            Vol: {activeCandle.volume} · {activeCandle.close >= activeCandle.open ? "Bullish" : "Bearish"}
          </p>
        </Metric>
        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-950/60 border border-emerald-800/50 text-emerald-300">
          <TrendingUp className="h-4 w-4" />
        </div>
      </div>

      <div className="h-32 w-full rounded-2xl bg-zinc-900/60 p-3 border border-zinc-800 flex items-center justify-center">
        <div className="flex items-end gap-3 h-full w-full justify-between pt-2">
          {CANDLES.map((c, i) => {
            const isUp = c.close >= c.open
            const topVal = Math.max(c.open, c.close)
            const bottomVal = Math.min(c.open, c.close)
            const bodyHeight = Math.max(8, topVal - bottomVal)
            return (
              <div
                key={i}
                onMouseEnter={() => setHoverIndex(i)}
                className="flex flex-col items-center flex-1 h-full justify-end relative cursor-pointer group"
              >
                <div
                  className="absolute w-[1.5px] bg-zinc-600 group-hover:bg-zinc-300 transition-colors"
                  style={{ bottom: `${c.low}%`, height: `${c.high - c.low}%` }}
                />
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${bodyHeight}%` }}
                  transition={{ type: "spring", bounce: 0, duration: 0.4, delay: i * 0.03 }}
                  style={{ bottom: `${bottomVal}%` }}
                  className={cn(
                    "absolute w-3 rounded-xs transition-opacity group-hover:opacity-100",
                    isUp ? "bg-emerald-500 opacity-90" : "bg-rose-500 opacity-90"
                  )}
                />
              </div>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}
