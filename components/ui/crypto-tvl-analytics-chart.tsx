"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { ArrowUpRight, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CryptoTvlAnalyticsChartProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart"> {
  totalTvl?: string;
  growth?: string;
  inflow?: string;
  outflow?: string;
  netFlow?: string;
}

export function CryptoTvlAnalyticsChart({
  totalTvl = "$1.72B",
  growth = "8.0%",
  inflow = "$392.8M",
  outflow = "$265.4M",
  netFlow = "+$127.4M",
  className,
  ...props
}: CryptoTvlAnalyticsChartProps) {
  const [activeTab, setActiveTab] = useState<"7D" | "30D" | "90D" | "ALL TIME">("7D");
  const [hoverIndex, setHoverIndex] = useState<number | null>(4);

  const dataPoints = [
    { label: "AUG 20", tvl: "$1.42B", txs: "290K", value: 1.42 },
    { label: "AUG 21", tvl: "$1.35B", txs: "275K", value: 1.35 },
    { label: "AUG 22", tvl: "$1.48B", txs: "310K", value: 1.48 },
    { label: "AUG 23", tvl: "$1.52B", txs: "330K", value: 1.52 },
    { label: "AUG 24", tvl: "$1.61B", txs: "356.4K", value: 1.61 },
    { label: "AUG 25", tvl: "$1.72B", txs: "390K", value: 1.72 },
  ];

  // SVG coordinate calculations (Width: 300, Height: 120)
  const minVal = 1.2;
  const maxVal = 1.8;
  const getX = (idx: number) => 20 + idx * 52;
  const getY = (val: number) => 110 - ((val - minVal) / (maxVal - minVal)) * 90;

  const points = dataPoints.map((pt, idx) => ({
    x: getX(idx),
    y: getY(pt.value),
    ...pt,
  }));

  const pathD = points.reduce((acc, pt, i) => {
    return i === 0 ? `M ${pt.x} ${pt.y}` : `${acc} L ${pt.x} ${pt.y}`;
  }, "");

  const areaD = `${pathD} L ${points[points.length - 1].x} 120 L ${points[0].x} 120 Z`;

  const activePoint = hoverIndex !== null ? points[hoverIndex] : points[4];

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
      <div className="relative mb-3 pb-2 border-b border-zinc-900 flex items-center justify-between">
        <div>
          <span className="text-[10px] uppercase tracking-wider text-zinc-400 font-semibold">Total Value Locked</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold tracking-tight leading-tight text-white">{activePoint.tvl}</span>
            <span className="text-xs font-semibold text-blue-400 flex items-center gap-0.5">
              <ArrowUpRight className="h-3.5 w-3.5" />
              {growth}
            </span>
          </div>
          <p className="text-[10px] text-zinc-500 font-mono mt-0.5">{activePoint.label} · Txs: {activePoint.txs}</p>
        </div>

        <div className="flex gap-1 rounded-xl bg-zinc-900 p-1 border border-zinc-800 text-[10px] font-mono">
          {(["7D", "30D", "90D"] as const).map((tab) => (
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

      <div className="relative h-36 w-full my-2">
        <svg className="h-full w-full overflow-visible" viewBox="0 0 300 120">
          <defs>
            <linearGradient id="tvl-gradient-area" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          <path d={areaD} fill="url(#tvl-gradient-area)" />
          <path d={pathD} fill="none" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

          {hoverIndex !== null && (
            <g>
              <line
                x1={points[hoverIndex].x}
                y1="0"
                x2={points[hoverIndex].x}
                y2="120"
                stroke="#3f3f46"
                strokeWidth="1.5"
                strokeDasharray="3 3"
              />
              <circle
                cx={points[hoverIndex].x}
                cy={points[hoverIndex].y}
                r="5"
                fill="#3b82f6"
                stroke="#09090b"
                strokeWidth="2.5"
              />
            </g>
          )}

          {points.map((pt, idx) => (
            <rect
              key={idx}
              x={pt.x - 20}
              y="0"
              width="40"
              height="120"
              fill="transparent"
              className="cursor-pointer"
              onMouseEnter={() => setHoverIndex(idx)}
            />
          ))}
        </svg>
      </div>

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
