"use client"

import * as React from "react"
import { ShieldCheck, ShieldAlert, Lock, AlertTriangle, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"

export interface TokenSafetyScoreProps extends React.HTMLAttributes<HTMLDivElement> {
  score?: number // 0 - 100
  mintAuthDisabled?: boolean
  freezeAuthDisabled?: boolean
  lpBurnedPercent?: number
  topHoldersPercent?: number
}

export function TokenSafetyScore({
  score = 92,
  mintAuthDisabled = true,
  freezeAuthDisabled = true,
  lpBurnedPercent = 100,
  topHoldersPercent = 8.4,
  className,
  ...props
}: TokenSafetyScoreProps) {
  const getScoreColor = (val: number) => {
    if (val >= 80) return "text-emerald-400 bg-emerald-500/10 border-emerald-500/30"
    if (val >= 50) return "text-amber-400 bg-amber-500/10 border-amber-500/30"
    return "text-rose-400 bg-rose-500/10 border-rose-500/30"
  }

  return (
    <div
      className={cn(
        "rounded-2xl border border-zinc-800 bg-zinc-900/90 p-4 shadow-xl backdrop-blur-xl",
        className
      )}
      data-slot="token-safety-score"
      {...props}
    >
      <div className="flex items-center justify-between pb-3 border-b border-zinc-800/80">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-emerald-400" />
          <span className="font-semibold text-sm text-zinc-100">RugCheck Safety Score</span>
        </div>
        <div className={cn("flex items-center gap-1.5 rounded-full px-2.5 py-0.5 border text-xs font-mono font-bold", getScoreColor(score))}>
          <span>{score} / 100</span>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
        <div className="flex items-center justify-between rounded-xl bg-zinc-950/60 p-2.5 border border-zinc-800/50">
          <span className="text-zinc-400">Mint Authority</span>
          {mintAuthDisabled ? (
            <span className="flex items-center gap-1 font-semibold text-emerald-400">
              <CheckCircle2 className="h-3.5 w-3.5" /> Revoked
            </span>
          ) : (
            <span className="flex items-center gap-1 font-semibold text-rose-400">
              <AlertTriangle className="h-3.5 w-3.5" /> Active
            </span>
          )}
        </div>

        <div className="flex items-center justify-between rounded-xl bg-zinc-950/60 p-2.5 border border-zinc-800/50">
          <span className="text-zinc-400">Freeze Authority</span>
          {freezeAuthDisabled ? (
            <span className="flex items-center gap-1 font-semibold text-emerald-400">
              <CheckCircle2 className="h-3.5 w-3.5" /> Disabled
            </span>
          ) : (
            <span className="flex items-center gap-1 font-semibold text-rose-400">
              <AlertTriangle className="h-3.5 w-3.5" /> Active
            </span>
          )}
        </div>

        <div className="flex items-center justify-between rounded-xl bg-zinc-950/60 p-2.5 border border-zinc-800/50">
          <span className="text-zinc-400">LP Lock / Burn</span>
          <span className="flex items-center gap-1 font-mono font-semibold text-emerald-400">
            <Lock className="h-3.5 w-3.5" /> {lpBurnedPercent}%
          </span>
        </div>

        <div className="flex items-center justify-between rounded-xl bg-zinc-950/60 p-2.5 border border-zinc-800/50">
          <span className="text-zinc-400">Top 10 Holders</span>
          <span className="font-mono font-semibold text-zinc-200">{topHoldersPercent}%</span>
        </div>
      </div>
    </div>
  )
}
