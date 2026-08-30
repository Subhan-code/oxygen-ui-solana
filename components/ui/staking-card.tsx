"use client"

import * as React from "react"
import { Coins, Zap, ShieldCheck, ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"

export interface StakingCardProps extends React.HTMLAttributes<HTMLDivElement> {
  tokenSymbol?: string
  tokenName?: string
  tokenIcon?: string
  apyPercent?: number
  mevApyPercent?: number
  validatorFeePercent?: number
  exchangeRate?: string
  stakedBalanceSol?: number
  onStake?: () => void
}

export function StakingCard({
  tokenSymbol = "JitoSOL",
  tokenName = "Jito Liquid Staked SOL",
  tokenIcon = "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/jtojtomepa8beP8AuQc6eXt5FriJwfFMwQx2v2f9mCL/logo.png",
  apyPercent = 7.85,
  mevApyPercent = 1.42,
  validatorFeePercent = 0.0,
  exchangeRate = "1 JitoSOL = 1.084 SOL",
  stakedBalanceSol = 12.5,
  onStake,
  className,
  ...props
}: StakingCardProps) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-zinc-800 bg-zinc-900 p-5 shadow-2xl backdrop-blur-xl",
        className
      )}
      data-slot="staking-card"
      {...props}
    >
      <div className="flex items-center justify-between pb-4 border-b border-zinc-800/80">
        <div className="flex items-center gap-3">
          <img src={tokenIcon} alt={tokenSymbol} className="h-10 w-10 rounded-2xl border border-zinc-700/60 bg-zinc-800 p-1 object-cover" />
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-base text-zinc-100">{tokenSymbol}</h3>
              <span className="rounded-full bg-purple-500/10 px-2 py-0.5 text-[10px] font-semibold text-purple-400 border border-purple-500/20">
                Liquid Staking
              </span>
            </div>
            <p className="text-xs text-zinc-400">{tokenName}</p>
          </div>
        </div>
        <div className="text-right">
          <span className="text-[10px] text-zinc-500 uppercase tracking-wider block">Total APY</span>
          <span className="font-mono text-xl font-extrabold text-emerald-400">{apyPercent}%</span>
        </div>
      </div>

      <div className="my-4 grid grid-cols-2 gap-2 text-xs">
        <div className="rounded-xl border border-zinc-800/60 bg-zinc-950/60 p-3">
          <div className="flex items-center gap-1.5 text-zinc-400">
            <Zap className="h-3.5 w-3.5 text-amber-400" /> MEV Boost APY
          </div>
          <div className="font-mono text-sm font-bold text-amber-400 mt-1">+{mevApyPercent}%</div>
        </div>

        <div className="rounded-xl border border-zinc-800/60 bg-zinc-950/60 p-3">
          <div className="flex items-center gap-1.5 text-zinc-400">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" /> Validator Fee
          </div>
          <div className="font-mono text-sm font-bold text-zinc-200 mt-1">{validatorFeePercent}%</div>
        </div>
      </div>

      <div className="flex items-center justify-between text-xs font-mono text-zinc-400 pb-4">
        <span>Exchange Rate</span>
        <span className="text-zinc-200 font-semibold">{exchangeRate}</span>
      </div>

      <button
        onClick={onStake}
        className="w-full flex items-center justify-center gap-2 rounded-2xl bg-purple-600 py-3 text-sm font-bold text-white shadow-lg transition-all hover:bg-purple-500 active:scale-[0.99]"
      >
        <Coins className="h-4 w-4" /> Stake SOL for {tokenSymbol} <ArrowUpRight className="h-4 w-4" />
      </button>
    </div>
  )
}
