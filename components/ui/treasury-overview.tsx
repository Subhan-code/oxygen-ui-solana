"use client"

import * as React from "react"
import { Shield, Key, DollarSign, ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"

export interface TreasuryOverviewProps extends React.HTMLAttributes<HTMLDivElement> {
  multisigName?: string
  thresholdRequired?: number
  totalSigners?: number
  totalBalanceUsd?: string
  solBalance?: string
  usdcBalance?: string
}

export function TreasuryOverview({
  multisigName = "Oxygen Core Squads Vault",
  thresholdRequired = 3,
  totalSigners = 5,
  totalBalanceUsd = "$4,820,950",
  solBalance = "24,500 SOL",
  usdcBalance = "1,180,000 USDC",
  className,
  ...props
}: TreasuryOverviewProps) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-zinc-800 bg-zinc-900 p-5 shadow-2xl backdrop-blur-xl text-left",
        className
      )}
      data-slot="treasury-overview"
      {...props}
    >
      <div className="flex items-center justify-between pb-3 border-b border-zinc-800/80">
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-purple-400" />
          <h3 className="font-bold text-sm text-zinc-100">{multisigName}</h3>
        </div>
        <span className="flex items-center gap-1 rounded-full bg-purple-500/10 px-2.5 py-0.5 text-xs font-mono font-bold text-purple-400 border border-purple-500/20">
          <Key className="h-3 w-3" /> {thresholdRequired} of {totalSigners} Threshold
        </span>
      </div>

      <div className="my-4">
        <span className="text-[10px] text-zinc-500 uppercase tracking-wider block">Total Treasury Holdings</span>
        <h2 className="font-mono text-3xl font-extrabold text-white mt-0.5">{totalBalanceUsd}</h2>
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs font-mono">
        <div className="rounded-xl bg-zinc-950/60 p-3 border border-zinc-800/50">
          <span className="text-zinc-500 text-[10px] block">SOL Reserve</span>
          <span className="font-bold text-zinc-200 text-sm mt-0.5 block">{solBalance}</span>
        </div>
        <div className="rounded-xl bg-zinc-950/60 p-3 border border-zinc-800/50">
          <span className="text-zinc-500 text-[10px] block">USDC Reserve</span>
          <span className="font-bold text-zinc-200 text-sm mt-0.5 block">{usdcBalance}</span>
        </div>
      </div>
    </div>
  )
}
