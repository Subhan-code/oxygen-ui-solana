"use client"

import * as React from "react"
import { motion } from "motion/react"
import { Vote, CheckCircle2, XCircle, MinusCircle, Clock } from "lucide-react"
import { cn } from "@/lib/utils"

export interface ProposalCardProps extends React.HTMLAttributes<HTMLDivElement> {
  proposalId?: string
  title?: string
  author?: string
  status?: "active" | "passed" | "defeated"
  yesVotesPercent?: number
  noVotesPercent?: number
  quorumPercent?: number
  timeLeft?: string
  onVote?: () => void
}

export function ProposalCard({
  proposalId = "OXY-DAO-042",
  title = "Allocate 50,000 SOL Treasury for Liquidity Mining Incentives",
  author = "subhan.sol",
  status = "active",
  yesVotesPercent = 78.4,
  noVotesPercent = 21.6,
  quorumPercent = 65.0,
  timeLeft = "2 days left",
  onVote,
  className,
  ...props
}: ProposalCardProps) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-zinc-800 bg-zinc-900/90 p-5 shadow-2xl backdrop-blur-xl text-left",
        className
      )}
      data-slot="proposal-card"
      {...props}
    >
      <div className="flex items-center justify-between pb-3 border-b border-zinc-800/80">
        <div className="flex items-center gap-2">
          <Vote className="h-4 w-4 text-purple-400" />
          <span className="font-mono text-xs text-zinc-400 font-semibold">{proposalId}</span>
        </div>
        <span
          className={cn(
            "rounded-full px-2.5 py-0.5 text-[11px] font-mono font-semibold capitalize border",
            status === "active" && "bg-purple-500/10 text-purple-400 border-purple-500/20",
            status === "passed" && "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
            status === "defeated" && "bg-rose-500/10 text-rose-400 border-rose-500/20"
          )}
        >
          {status}
        </span>
      </div>

      <h3 className="mt-3 font-bold text-base text-zinc-100 line-clamp-2">{title}</h3>
      <p className="mt-1 text-xs text-zinc-400 font-mono">Proposed by <span className="text-purple-400 font-semibold">{author}</span></p>

      <div className="my-4 space-y-2 text-xs font-mono">
        <div className="flex justify-between text-zinc-300">
          <span className="flex items-center gap-1 text-emerald-400 font-semibold">
            <CheckCircle2 className="h-3.5 w-3.5" /> Yes ({yesVotesPercent}%)
          </span>
          <span className="flex items-center gap-1 text-rose-400 font-semibold">
            <XCircle className="h-3.5 w-3.5" /> No ({noVotesPercent}%)
          </span>
        </div>

        <div className="flex h-2.5 w-full overflow-hidden rounded-full bg-zinc-950 p-0.5 border border-zinc-800">
          <div className="h-full bg-emerald-500 rounded-l-full" style={{ width: `${yesVotesPercent}%` }} />
          <div className="h-full bg-rose-500 rounded-r-full" style={{ width: `${noVotesPercent}%` }} />
        </div>

        <div className="flex justify-between text-[11px] text-zinc-500 pt-1">
          <span>Quorum Progress: <strong className="text-zinc-300">{quorumPercent}% / 50.0%</strong></span>
          <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {timeLeft}</span>
        </div>
      </div>

      {status === "active" && (
        <button
          onClick={onVote}
          className="w-full rounded-2xl bg-purple-600 py-2.5 text-xs font-bold text-white shadow-lg shadow-purple-500/20 hover:bg-purple-500 transition-all active:scale-[0.99]"
        >
          Cast Vote
        </button>
      )}
    </div>
  )
}
