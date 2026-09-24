"use client";

import React from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface MetricItem {
  id?: string;
  label: string;
  value: string;
  change?: string;
  isPositive?: boolean;
}

export interface FinancialMetricsGridProps
  extends React.HTMLAttributes<HTMLDivElement> {
  metrics?: MetricItem[];
  onActionClick?: (metricId: string) => void;
}

const DEFAULT_METRICS: MetricItem[] = [
  {
    id: "tvl",
    label: "Total Value Locked",
    value: "$1.48B",
    change: "+4.2%",
    isPositive: true,
  },
  {
    id: "volume",
    label: "24h Volume",
    value: "$384.2M",
    change: "+12.8%",
    isPositive: true,
  },
  {
    id: "fees",
    label: "Protocol Fees (24h)",
    value: "$412.9K",
    change: "-1.5%",
    isPositive: false,
  },
  {
    id: "apy",
    label: "Network Staking APY",
    value: "7.84%",
    change: "+0.15%",
    isPositive: true,
  },
];

export function FinancialMetricsGrid({
  metrics = DEFAULT_METRICS,
  onActionClick,
  className,
  ...props
}: FinancialMetricsGridProps) {
  return (
    <div
      data-slot="financial-metrics-grid"
      className={cn(
        "grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 select-none font-sans",
        className
      )}
      {...props}
    >
      {metrics.map((item, index) => {
        const isUp = item.isPositive !== false;
        const itemId = item.id ?? `metric-${index}`;

        return (
          <div
            key={itemId}
            onClick={() => onActionClick?.(itemId)}
            className="flex flex-col justify-between rounded-[24px] bg-zinc-950/60 border border-white/[0.08] p-5 backdrop-blur-2xl shadow-[0_1px_0_rgba(255,255,255,0.04)_inset] transition-all duration-200 hover:border-white/[0.14] hover:bg-zinc-950/80"
          >
            {/* Top row: label + change pill */}
            <div className="flex items-center justify-between gap-2">
              <span className="text-[12px] font-medium text-zinc-400 tracking-[-0.01em]">
                {item.label}
              </span>

              {item.change && (
                <span
                  className={cn(
                    "inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[11px] font-mono font-medium tabular-nums border",
                    isUp
                      ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
                      : "text-rose-400 bg-rose-500/10 border-rose-500/20"
                  )}
                >
                  {isUp ? (
                    <ArrowUpRight className="size-3" />
                  ) : (
                    <ArrowDownRight className="size-3" />
                  )}
                  <span>{item.change}</span>
                </span>
              )}
            </div>

            {/* Value */}
            <div className="mt-4">
              <span className="font-mono text-2xl sm:text-[28px] font-bold tabular-nums tracking-tight text-zinc-50">
                {item.value}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default FinancialMetricsGrid;
