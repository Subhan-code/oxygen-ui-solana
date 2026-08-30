"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { BarChart3, Layers, TrendingUp } from "lucide-react";
import { XAxis } from "recharts";
import { cn } from "@/lib/utils";

import LineChart, { Line } from "@/components/charts/line-chart";
import Grid from "@/components/charts/grid";
import { ChartTooltip } from "@/components/charts/tooltip";
import {
  Metric,
  MetricLabel,
  MetricChange,
  MetricValue,
} from "@/components/metric";

export interface CryptoSalesChartProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart"> {
  title?: string;
  salesAmount?: string;
  growthPercent?: number | null;
  avgScore?: string;
}

interface CandleData {
  high: number;
  low: number;
  open: number;
  close: number;
}

const CANDLES: CandleData[] = [
  { high: 88, low: 25, open: 35, close: 78 },
  { high: 82, low: 28, open: 78, close: 42 },
  { high: 95, low: 40, open: 45, close: 88 },
  { high: 75, low: 15, open: 68, close: 22 },
  { high: 82, low: 30, open: 35, close: 72 },
  { high: 98, low: 50, open: 55, close: 94 },
  { high: 92, low: 40, open: 88, close: 48 },
  { high: 88, low: 32, open: 38, close: 82 },
];

const LINE_DATA = CANDLES.map((c, i) => ({
  date: `Day ${i + 1}`,
  close: c.close,
  open: c.open,
}));

const BAR_DATA = [50, 70, 85, 75, 65, 90, 80, 95].map((v, i) => ({
  date: `Day ${i + 1}`,
  volume: v,
}));

export function CryptoSalesChart({
  title = "Solana DEX Volume",
  salesAmount = "$9,134 SOL",
  growthPercent = 2.5,
  avgScore = "$185,301",
  className,
  ...props
}: CryptoSalesChartProps) {
  const [viewMode, setViewMode] = useState<"candlestick" | "segmented" | "bars">("candlestick");

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
            {title}
            <MetricChange value={growthPercent} />
          </MetricLabel>
          <MetricValue className="text-white">{salesAmount}</MetricValue>
          <p className="text-[10px] text-zinc-500 font-mono">Avg. epoch volume {avgScore}</p>
        </Metric>

        <div className="flex items-center gap-1 rounded-xl bg-zinc-900 p-1 border border-zinc-800">
          {(["candlestick", "segmented", "bars"] as const).map((mode) => {
            const Icon = mode === "candlestick" ? TrendingUp : mode === "segmented" ? Layers : BarChart3;
            return (
              <button
                key={mode}
                type="button"
                onClick={() => setViewMode(mode)}
                className={cn(
                  "p-1.5 rounded-lg transition-colors cursor-pointer active:scale-95",
                  viewMode === mode ? "bg-blue-600 text-white" : "text-zinc-400 hover:text-white"
                )}
              >
                <Icon className="h-3.5 w-3.5" />
              </button>
            );
          })}
        </div>
      </div>

      {viewMode === "candlestick" && (
        <div className="h-32 w-full rounded-2xl bg-zinc-900/60 p-3 border border-zinc-800 flex items-center justify-center">
          <div className="flex items-end gap-3 h-full w-full justify-between pt-2">
            {CANDLES.map((c, i) => {
              const isUp = c.close >= c.open;
              const topVal = Math.max(c.open, c.close);
              const bottomVal = Math.min(c.open, c.close);
              const bodyHeight = Math.max(8, topVal - bottomVal);
              return (
                <div key={i} className="flex flex-col items-center flex-1 h-full justify-end relative">
                  <div className="absolute w-[1.5px] bg-zinc-600" style={{ bottom: `${c.low}%`, height: `${c.high - c.low}%` }} />
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${bodyHeight}%` }}
                    transition={{ type: "spring", bounce: 0, duration: 0.4, delay: i * 0.03 }}
                    style={{ bottom: `${bottomVal}%` }}
                    className={cn("absolute w-2.5 rounded-xs", isUp ? "bg-emerald-500" : "bg-rose-500")}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}

      {viewMode === "segmented" && (
        <div className="h-32 w-full rounded-2xl bg-zinc-900/60 p-3 border border-zinc-800">
          <div className="flex flex-col justify-between h-full w-full py-1 gap-2">
            {[4, 2, 3, 5].map((activeCount, rowIdx) => (
              <div key={rowIdx} className="flex gap-2 w-full">
                {Array.from({ length: 6 }).map((_, colIdx) => (
                  <div
                    key={colIdx}
                    className={cn("h-3 flex-1 rounded-full", colIdx < activeCount ? "bg-blue-500" : "bg-zinc-800")}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      {viewMode === "bars" && (
        <LineChart data={BAR_DATA} margin={{ top: 8, right: 8, bottom: 24, left: 8 }} className="h-32 aspect-auto">
          <Grid horizontal />
          <XAxis dataKey="date" tickLine={false} axisLine={false} tick={{ fill: "rgba(161,161,170,0.7)", fontSize: 9 }} tickMargin={6} />
          <Line dataKey="volume" stroke="var(--chart-line-primary)" strokeWidth={2} />
          <ChartTooltip />
        </LineChart>
      )}
    </motion.div>
  );
}

export default CryptoSalesChart;
