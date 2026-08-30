"use client"

import * as React from "react"
import { ArrowLeftRight } from "lucide-react"
import { cn } from "@/lib/utils"

export interface TokenPairProps extends React.HTMLAttributes<HTMLDivElement> {
  baseSymbol?: string
  baseIcon?: string
  quoteSymbol?: string
  quoteIcon?: string
  rate?: number
  dexName?: string
}

export function TokenPair({
  baseSymbol = "SOL",
  baseIcon = "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png",
  quoteSymbol = "USDC",
  quoteIcon = "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png",
  rate = 148.50,
  dexName = "Orca CLMM",
  className,
  ...props
}: TokenPairProps) {
  const [inverted, setInverted] = React.useState(false)

  const displayRate = inverted ? (1 / rate).toFixed(6) : rate.toFixed(2)
  const displayPair = inverted ? `${quoteSymbol} / ${baseSymbol}` : `${baseSymbol} / ${quoteSymbol}`

  return (
    <div
      className={cn(
        "inline-flex items-center justify-between gap-4 rounded-2xl border border-zinc-800 bg-zinc-900/90 px-4 py-2.5 shadow-xl backdrop-blur-md",
        className
      )}
      data-slot="token-pair"
      {...props}
    >
      <div className="flex items-center gap-3">
        <div className="relative flex items-center">
          <img
            src={baseIcon}
            alt={baseSymbol}
            className="h-8 w-8 rounded-full border-2 border-zinc-900 bg-zinc-800 object-cover z-10"
          />
          <img
            src={quoteIcon}
            alt={quoteSymbol}
            className="-ml-3 h-8 w-8 rounded-full border-2 border-zinc-900 bg-zinc-800 object-cover z-0"
          />
        </div>

        <div>
          <div className="flex items-center gap-1.5 font-bold text-sm text-zinc-100">
            <span>{baseSymbol}</span>
            <span className="text-zinc-500">/</span>
            <span>{quoteSymbol}</span>
          </div>
          {dexName && <span className="text-[11px] text-zinc-500 font-medium">{dexName}</span>}
        </div>
      </div>

      <button
        onClick={() => setInverted(!inverted)}
        className="flex items-center gap-1.5 rounded-xl border border-zinc-800 bg-zinc-950/60 px-2.5 py-1 text-xs font-mono text-zinc-300 hover:border-zinc-700 hover:bg-zinc-800 transition-colors"
      >
        <span>1 {inverted ? quoteSymbol : baseSymbol} = {displayRate} {inverted ? baseSymbol : quoteSymbol}</span>
        <ArrowLeftRight className="h-3 w-3 text-zinc-400" />
      </button>
    </div>
  )
}
