"use client";

import * as React from "react";
import { TrendingDownIcon, TrendingUpIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function Metric({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="metric"
      className={cn("flex flex-col justify-between gap-2 p-4", className)}
      {...props}
    />
  );
}

export function MetricLabel({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <dt
      data-slot="metric-label"
      className={cn(
        "flex items-start justify-between gap-2 text-sm/4 text-muted-foreground",
        className
      )}
      {...props}
    />
  );
}

export type MetricChangeProps = {
  value: number | null;
};

export function MetricChange({ value }: MetricChangeProps) {
  if (value === null) return null;

  const percent = Math.round(value * 10) / 10;
  const Icon = percent > 0 ? TrendingUpIcon : TrendingDownIcon;

  return (
    <span
      data-slot="metric-change"
      className={cn(
        "flex shrink-0 items-center gap-0.5 text-xs/4 tabular-nums",
        percent > 0 && "text-green-700 dark:text-green-500",
        percent < 0 && "text-red-700 dark:text-red-400"
      )}
    >
      {percent !== 0 && (
        <>
          <Icon className="size-3.5" aria-hidden />
          <span className="sr-only">{percent > 0 ? "Up by " : "Down by "}</span>
        </>
      )}
      {Math.abs(percent).toLocaleString("en-US")}%
      <span className="sr-only"> compared to the previous period</span>
    </span>
  );
}

export function MetricValue({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <dd
      data-slot="metric-value"
      className={cn(
        "text-lg leading-none font-semibold tabular-nums",
        className
      )}
      {...props}
    />
  );
}
