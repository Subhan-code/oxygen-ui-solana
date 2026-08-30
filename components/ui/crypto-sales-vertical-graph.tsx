"use client"

import React from "react"
import { motion } from "motion/react"
import { BarChart3 } from "lucide-react"
import { XAxis } from "recharts"
import { cn } from "@/lib/utils"

import LineChart, { Line } from "@/components/charts/line-chart"
import Grid from "@/components/charts/grid"
import { ChartTooltip } from "@/components/charts/tooltip"
import {
  Metric,
  MetricLabel,
  MetricChange,
  MetricValue,
} from "@/components/metric"

export interface CryptoSalesVerticalGraphProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart"> {
  salesAmount?: string
  growthPercent?: number | null
}

const DATA = [50, 70, 85, 75, 65, 90, 80].map((v, i) => ({
  date: `Day ${i + 1}`,
  volume: v,
}))

export function CryptoSalesVerticalGraph({
  salesAmount = "$9,134 SOL",
  growthPercent = 2.5,
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
      <div className="flex items-start justify-between mb-3 pb-2 border-b border-zinc-900">
        <Metric className="p-0">
          <MetricLabel className="text-zinc-400">
            Vertical Bar Graph
            <MetricChange value={growthPercent} />
          </MetricLabel>
          <MetricValue className="text-white">{salesAmount}</MetricValue>
        </Metric>
        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-950/60 border border-blue-800/50 text-blue-300">
          <BarChart3 className="h-4 w-4" />
        </div>
      </div>

      <LineChart
        data={DATA}
        margin={{ top: 8, right: 8, bottom: 24, left: 8 }}
        className="h-28 aspect-auto"
      >
        <Grid horizontal />
        <XAxis
          dataKey="date"
          tickLine={false}
          axisLine={false}
          tick={{ fill: "rgba(161,161,170,0.7)", fontSize: 9 }}
          tickMargin={6}
        />
        <Line
          dataKey="volume"
          stroke="var(--chart-line-primary)"
          strokeWidth={2}
        />
        <ChartTooltip />
      </LineChart>
    </motion.div>
  )
}
