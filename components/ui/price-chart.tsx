"use client";

import * as React from "react";
import { XAxis, YAxis } from "recharts";

import LineChart, { Line } from "@/components/charts/line-chart";
import Grid from "@/components/charts/grid";
import { ChartTooltip } from "@/components/charts/tooltip";
import {
  Metric,
  MetricLabel,
  MetricChange,
  MetricValue,
} from "@/components/metric";
import { cn } from "@/lib/utils";

interface PriceChartProps {
  title?: string;
  description?: string;
  change?: number | null;
  series: { time: string; value: number }[];
  className?: string;
}

const PriceChart = ({ title, description, change = null, series, className }: PriceChartProps) => {
  if (!series.length) return null;

  const firstValue = series[0].value;
  const lastValue = series[series.length - 1].value;
  const isPositive = lastValue >= firstValue;
  const lineColor = isPositive
    ? "var(--chart-line-primary)"
    : "hsl(0 84% 67%)";

  const minValue = Math.min(...series.map((s) => s.value));
  const maxValue = Math.max(...series.map((s) => s.value));
  const padding = (maxValue - minValue) * 0.1;

  return (
    <div
      className={cn(
        "flex min-h-0 flex-1 flex-col gap-4 rounded-xl border bg-card p-4 overflow-hidden",
        className
      )}
    >
      {(title || description) && (
        <Metric>
          <MetricLabel>
            {title ?? description}
            <MetricChange value={change} />
          </MetricLabel>
          <MetricValue>
            {lastValue >= 1
              ? `$${lastValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
              : `$${lastValue.toFixed(6)}`}
          </MetricValue>
        </Metric>
      )}

      <LineChart
        data={series.map((s) => ({ ...s, date: s.time }))}
        margin={{ top: 8, right: 16, bottom: 32, left: 16 }}
        className="min-h-[250px]"
      >
        <Grid horizontal />
        <XAxis
          dataKey="time"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(v: string) => {
            const d = new Date(v);
            return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
          }}
        />
        <YAxis
          domain={[minValue - padding, maxValue + padding]}
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          width={60}
          tickFormatter={(v: number) =>
            v >= 1
              ? `$${v.toLocaleString(undefined, { maximumFractionDigits: 0 })}`
              : `$${v.toFixed(4)}`
          }
        />
        <Line dataKey="value" stroke={lineColor} strokeWidth={2} />
        <ChartTooltip />
      </LineChart>
    </div>
  );
};

export type { PriceChartProps };
export { PriceChart };
