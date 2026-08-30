"use client"

import * as React from "react"
import { motion } from "motion/react"
import { TrendingUp, TrendingDown } from "lucide-react"
import { cn } from "@/lib/utils"

export interface TokenListItemProps extends React.HTMLAttributes<HTMLDivElement> {
  symbol?: string
  name?: string
  icon?: string
  balance?: number
  priceUsd?: number
  change24h?: number
  sparklineData?: number[]
}

export function TokenListItem({
  symbol = "SOL",
  name = "Solana",
  icon = "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png",
  balance = 24.5,
  priceUsd = 148.20,
  change24h = 5.42,
  sparklineData = [140, 142, 139, 145, 144, 147, 148.2],
  className,
  ...props
}: TokenListItemProps) {
  const valueUsd = balance * priceUsd
  const isPositive = change24h >= 0

  // Render SVG mini sparkline path
  const min = Math.min(...sparklineData)
  const max = Math.max(...sparklineData)
  const range = max - min || 1
  const width = 64
  const height = 24
  const points = sparklineData
    .map((val, idx) => {
      const x = (idx / (sparklineData.length - 1)) * width
      const y = height - ((val - min) / range) * height
      return `${x},${y}`
    })
    .join(" ")

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className={cn(
        "flex items-center justify-between rounded-2xl border border-zinc-800/80 bg-zinc-900/60 p-3.5 shadow-lg backdrop-blur-md transition-colors hover:border-zinc-700 hover:bg-zinc-800/50 cursor-pointer",
        className
      )}
      data-slot="token-list-item"
    >
      <div className="flex items-center gap-3">
        <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-800 overflow-hidden border border-zinc-700/50">
          <img src={icon} alt={name} className="h-full w-full object-cover" />
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-sm text-zinc-100">{symbol}</span>
            <span className="text-xs text-zinc-400 font-normal">{name}</span>
          </div>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="font-mono text-xs text-zinc-400">${priceUsd.toFixed(2)}</span>
            <span
              className={cn(
                "flex items-center gap-0.5 text-[11px] font-semibold font-mono",
                isPositive ? "text-emerald-400" : "text-rose-400"
              )}
            >
              {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
              {isPositive ? "+" : ""}{change24h.toFixed(2)}%
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden sm:block">
          <svg width={width} height={height} className="overflow-visible">
            <polyline
              fill="none"
              stroke={isPositive ? "#10b981" : "#f43f5e"}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={points}
            />
          </svg>
        </div>

        <div className="text-right">
          <div className="font-mono font-bold text-sm text-zinc-100">
            ${valueUsd.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div className="font-mono text-xs text-zinc-400">
            {balance} {symbol}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
