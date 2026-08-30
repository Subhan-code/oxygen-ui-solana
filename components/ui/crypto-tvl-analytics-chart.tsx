"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
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

export interface CryptoTvlAnalyticsChartProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart"> {
  totalTvl?: string;
  growth?: number | null;
  inflow?: string;
  outflow?: string;
  netFlow?: string;
}

const DATA = [
  { date: "2026-08-20", tvl: 1.42 },
  { date: "2026-08-21", tvl: 1.35 },
  { date: "2026-08-22", tvl: 1.48 },
  { date: "2026-08-23", tvl: 1.52 },
  { date: "2026-08-24", tvl: 1.61 },
  { date: "2026-08-25", tvl: 1.72 },
];

const TABS = ["7D", "30D", "90D"] as const;
type Tab = typeof TABS[number];

export function CryptoTvlAnalyticsChart({
  totalTvl = "$1.72B",
  growth = 8.0,
  inflow = "$392.8M",
  outflow = "$265.4M",
  netFlow = "+$127.4M",
  className,
  ...props
}: CryptoTvlAnalyticsChartProps) {
  const [activeTab, setActiveTab] = useState<Tab>("7D");

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
      <div className="mb-3 pb-2 border-b border-zinc-900 flex items-start justify-between">
        <Metric className="p-0">
          <MetricLabel className="text-zinc-400">
            Total Value Locked
            <MetricChange value={growth} />
          </MetricLabel>
          <MetricValue className="text-2xl text-white">{totalTvl}</MetricValue>
        </Metric>

        <div className="flex gap-1 rounded-xl bg-zinc-900 p-1 border border-zinc-800 text-[10px] font-mono">
          {TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-2 py-1 rounded-lg transition-colors cursor-pointer active:scale-95",
                activeTab === tab ? "bg-blue-600 text-white font-bold" : "text-zinc-400 hover:text-white"
              )}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <LineChart
        data={DATA}
        margin={{ top: 8, right: 8, bottom: 24, left: 8 }}
        className="aspect-auto h-36"
      >
        <Grid horizontal />
        <XAxis
          dataKey="date"
          tickLine={false}
          axisLine={false}
          tickMargin={6}
          tick={{ fill: "rgba(161,161,170,0.7)", fontSize: 9 }}
          tickFormatter={(v: string) => {
            const d = new Date(v);
            return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
          }}
        />
        <Line
          dataKey="tvl"
          stroke="var(--chart-line-primary)"
          strokeWidth={2}
        />
        <ChartTooltip />
      </LineChart>

      <div className="grid grid-cols-3 gap-2 mt-2 pt-3 border-t border-zinc-900 text-center font-mono text-[11px]">
        <div className="rounded-xl bg-zinc-900/60 p-2 border border-zinc-800">
          <span className="block text-[9px] text-zinc-500 uppercase">Inflow</span>
          <span className="font-semibold text-emerald-400">{inflow}</span>
        </div>
        <div className="rounded-xl bg-zinc-900/60 p-2 border border-zinc-800">
          <span className="block text-[9px] text-zinc-500 uppercase">Outflow</span>
          <span className="font-semibold text-rose-400">{outflow}</span>
        </div>
        <div className="rounded-xl bg-zinc-900/60 p-2 border border-zinc-800">
          <span className="block text-[9px] text-zinc-500 uppercase">Net Flow</span>
          <span className="font-semibold text-blue-400">{netFlow}</span>
        </div>
      </div>
    </motion.div>
  );
}

export default CryptoTvlAnalyticsChart;
