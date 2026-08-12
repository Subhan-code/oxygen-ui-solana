"use client"

import React, { useState } from "react"
import { ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"

export interface CryptoTvlAnalyticsChartProps
  extends React.HTMLAttributes<HTMLDivElement> {
  totalTvl?: string
  growth?: string
  inflow?: string
  outflow?: string
  netFlow?: string
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
  const [activeTab, setActiveTab] = useState<"7D" | "30D" | "90D" | "ALL TIME">("7D")
  const [hoverIndex, setHoverIndex] = useState<number | null>(4)

  const dataPoints = [
    { label: "AUG 20", tvl: "$1.42B", txs: "290K", y: 80 },
    { label: "AUG 21", tvl: "$1.35B", txs: "275K", y: 105 },
    { label: "AUG 22", tvl: "$1.48B", txs: "310K", y: 75 },
    { label: "AUG 23", tvl: "$1.52B", txs: "330K", y: 65 },
    { label: "AUG 24", tvl: "$1.61B", txs: "356.4K", y: 40 },
    { label: "AUG 25", tvl: "$1.72B", txs: "390K", y: 25 },
  ]

  const activePoint = hoverIndex !== null ? dataPoints[hoverIndex] : dataPoints[4]

  return (
    <div
      data-slot="root"
      className={cn(
        "relative mx-auto flex w-full max-w-sm flex-col overflow-hidden rounded-2xl bg-zinc-950 p-5 text-white shadow-xl border border-zinc-800 font-sans",
        className
      )}
      {...props}
    >
      <div className="relative mb-3 pb-2 border-b border-zinc-900">
        <span className="text-[11px] uppercase tracking-wider text-zinc-400 font-semibold">Total Value Locked</span>
        <div className="flex items-baseline gap-2 mt-1">
          <span className="text-2xl font-bold tracking-tight text-white">{totalTvl}</span>
          <span className="text-xs font-semibold text-emerald-500 flex items-center gap-0.5">
            <ArrowUpRight className="h-3.5 w-3.5" />
            {growth}
          </span>
        </div>
      </div>

      <div className="relative h-44 w-full my-2 border-b border-zinc-800/80">
        <svg className="h-full w-full overflow-visible" viewBox="0 0 300 130">
          <path
            d="M 0 80 L 30 105 L 60 75 L 90 65 L 140 40 L 300 25"
            fill="none"
            stroke="#10b981"
            strokeWidth="2"
          />

          {hoverIndex !== null && (
            <g>
              <line
                x1={hoverIndex * 55 + 20}
                y1="0"
                x2={hoverIndex * 55 + 20}
                y2="130"
                stroke="#52525b"
                strokeWidth="1"
                strokeDasharray="2 2"
              />
              <circle
                cx={hoverIndex * 55 + 20}
                cy={dataPoints[hoverIndex].y}
                r="4"
                fill="#10b981"
                stroke="#000000"
                strokeWidth="2"
              />
            </g>
          )}

          {dataPoints.map((pt, idx) => (
            <rect
              key={idx}
              x={idx * 55}
              y="0"
              width="50"
              height="130"
              fill="transparent"
              className="cursor-pointer"
              onMouseEnter={() => setHoverIndex(idx)}
            />
          ))}
        </svg>

        {activePoint && (
          <div className="absolute top-2 right-2 rounded-xl border border-zinc-800 bg-zinc-900 p-2.5 shadow-xl text-[10px] space-y-1">
            <div className="text-zinc-400 font-bold uppercase">{activePoint.label}</div>
            <div className="flex gap-4 pt-1">
              <div>
                <span className="block text-[9px] text-zinc-500 uppercase">TVL</span>
                <span className="font-bold text-white text-xs">{activePoint.tvl}</span>
              </div>
              <div>
                <span className="block text-[9px] text-zinc-500 uppercase">Transactions</span>
                <span className="font-bold text-white text-xs">{activePoint.txs}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-3 gap-2 py-3 border-b border-zinc-900 text-left">
        <div>
          <span className="block text-[10px] uppercase font-medium text-zinc-500">Inflow</span>
          <span className="text-xs font-bold text-zinc-200 mt-0.5 block">{inflow}</span>
        </div>
        <div>
          <span className="block text-[10px] uppercase font-medium text-zinc-500">Outflow</span>
          <span className="text-xs font-bold text-zinc-200 mt-0.5 block">{outflow}</span>
        </div>
        <div>
          <span className="block text-[10px] uppercase font-medium text-zinc-500">Net Flow</span>
          <span className="text-xs font-bold text-emerald-500 mt-0.5 block">{netFlow}</span>
        </div>
      </div>

      <div className="flex items-center justify-between gap-1 pt-3">
        {(["7D", "30D", "90D", "ALL TIME"] as const).map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={cn(
              "flex-1 py-1 text-center text-[10px] font-bold rounded-lg transition-colors cursor-pointer border",
              activeTab === tab
                ? "border-white bg-white text-zinc-950 shadow-sm"
                : "border-zinc-800 text-zinc-400 hover:text-white"
            )}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  )
}
