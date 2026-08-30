"use client"

import * as React from "react"
import { ShieldCheck, UserCheck, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

export interface DelegationCardProps extends React.HTMLAttributes<HTMLDivElement> {
  delegateName?: string
  delegateHandle?: string
  delegateAvatar?: string
  votingPowerDelegatedSol?: number
  totalDelegators?: number
  onDelegate?: () => void
}

export function DelegationCard({
  delegateName = "Mert | Helius",
  delegateHandle = "0xmert.sol",
  delegateAvatar = "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png",
  votingPowerDelegatedSol = 48290,
  totalDelegators = 142,
  onDelegate,
  className,
  ...props
}: DelegationCardProps) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-zinc-800 bg-zinc-900/90 p-5 shadow-2xl backdrop-blur-xl text-left",
        className
      )}
      data-slot="delegation-card"
      {...props}
    >
      <div className="flex items-center gap-3 pb-3 border-b border-zinc-800/80">
        <img src={delegateAvatar} alt={delegateName} className="h-10 w-10 rounded-2xl border border-zinc-700 object-cover" />
        <div>
          <div className="flex items-center gap-1.5 font-bold text-sm text-zinc-100">
            <span>{delegateName}</span>
            <ShieldCheck className="h-4 w-4 text-purple-400" />
          </div>
          <span className="font-mono text-xs text-zinc-400">{delegateHandle}</span>
        </div>
      </div>

      <div className="my-4 grid grid-cols-2 gap-2 text-xs font-mono">
        <div className="rounded-xl bg-zinc-950/60 p-2.5 border border-zinc-800/50">
          <span className="text-zinc-500 text-[10px] block">Delegated Power</span>
          <span className="font-bold text-purple-400 text-sm mt-0.5 block">{votingPowerDelegatedSol.toLocaleString()} SOL</span>
        </div>
        <div className="rounded-xl bg-zinc-950/60 p-2.5 border border-zinc-800/50">
          <span className="text-zinc-500 text-[10px] block">Delegators</span>
          <span className="font-bold text-zinc-200 text-sm mt-0.5 block">{totalDelegators} Wallets</span>
        </div>
      </div>

      <button
        onClick={onDelegate}
        className="w-full flex items-center justify-center gap-2 rounded-2xl bg-purple-600 py-2.5 text-xs font-bold text-white shadow-lg shadow-purple-500/20 hover:bg-purple-500 transition-all active:scale-[0.99]"
      >
        <UserCheck className="h-4 w-4" /> Delegate Votes <ArrowRight className="h-3.5 w-3.5" />
      </button>
    </div>
  )
}
