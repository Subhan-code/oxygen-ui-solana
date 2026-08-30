"use client"

import * as React from "react"
import { motion } from "motion/react"
import { TrendingUp, TrendingDown } from "lucide-react"
import { cn } from "@/lib/utils"

export interface TickerItem {
  symbol: string
  price: string
  change24h: number
  icon?: string
}

export interface PriceTickerProps extends React.HTMLAttributes<HTMLDivElement> {
  tokens?: TickerItem[]
  speedSeconds?: number
}

const DEFAULT_TICKERS: TickerItem[] = [
  { symbol: "SOL", price: "$148.20", change24h: 5.4, icon: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png" },
  { symbol: "JTO", price: "$2.84", change24h: 12.1, icon: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/jtojtomepa8beP8AuQc6eXt5FriJwfFMwQx2v2f9mCL/logo.png" },
  { symbol: "PYTH", price: "$0.38", change24h: -1.8, icon: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/HZ1JovNiVvGrGNiiYvEozEVgZ58xaU3RKwX8eACQBCt3/logo.png" },
  { symbol: "RAY", price: "$1.92", change24h: 8.7, icon: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R/logo.png" },
  { symbol: "BONK", price: "$0.000021", change24h: 18.5, icon: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263/logo.png" },
  { symbol: "WIF", price: "$1.74", change24h: -3.2, icon: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EKpQGSJtjMFqKZ9KQanSqYXRcF8fBopzLHYxdM65zcjm/logo.png" },
]

export function PriceTicker({
  tokens = DEFAULT_TICKERS,
  speedSeconds = 25,
  className,
  ...props
}: PriceTickerProps) {
  const duplicated = [...tokens, ...tokens, ...tokens]

  return (
    <div
      className={cn(
        "relative flex w-full overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950/80 py-2.5 backdrop-blur-md",
        className
      )}
      data-slot="price-ticker"
      {...props}
    >
      <motion.div
        animate={{ x: ["0%", "-33.333%"] }}
        transition={{ ease: "linear", duration: speedSeconds, repeat: Infinity }}
        className="flex items-center gap-6 whitespace-nowrap"
      >
        {duplicated.map((item, idx) => {
          const isPos = item.change24h >= 0
          return (
            <div key={idx} className="flex items-center gap-2 font-mono text-xs">
              {item.icon && <img src={item.icon} alt={item.symbol} className="h-4 w-4 rounded-full" />}
              <span className="font-bold text-zinc-100">{item.symbol}</span>
              <span className="text-zinc-300">{item.price}</span>
              <span
                className={cn(
                  "flex items-center text-[11px] font-semibold",
                  isPos ? "text-emerald-400" : "text-rose-400"
                )}
              >
                {isPos ? <TrendingUp className="h-3 w-3 mr-0.5" /> : <TrendingDown className="h-3 w-3 mr-0.5" />}
                {isPos ? "+" : ""}{item.change24h}%
              </span>
            </div>
          )
        })}
      </motion.div>
    </div>
  )
}
