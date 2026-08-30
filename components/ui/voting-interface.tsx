"use client"

import * as React from "react"
import { CheckCircle2, XCircle, MinusCircle, ShieldCheck, Vote } from "lucide-react"
import { cn } from "@/lib/utils"

export type VoteChoice = "yes" | "no" | "abstain"

export interface VotingInterfaceProps extends React.HTMLAttributes<HTMLDivElement> {
  votingPowerSol?: number
  onCastVote?: (choice: VoteChoice) => void
}

export function VotingInterface({
  votingPowerSol = 1420.5,
  onCastVote,
  className,
  ...props
}: VotingInterfaceProps) {
  const [selected, setSelected] = React.useState<VoteChoice>("yes")
  const [submitted, setSubmitted] = React.useState(false)

  const choices: { id: VoteChoice; label: string; icon: any; color: string; border: string }[] = [
    { id: "yes", label: "For (Yes)", icon: CheckCircle2, color: "text-emerald-400 bg-emerald-500/10", border: "border-emerald-500/30" },
    { id: "no", label: "Against (No)", icon: XCircle, color: "text-rose-400 bg-rose-500/10", border: "border-rose-500/30" },
    { id: "abstain", label: "Abstain", icon: MinusCircle, color: "text-zinc-400 bg-zinc-800/60", border: "border-zinc-700" },
  ]

  const handleSubmit = () => {
    setSubmitted(true)
    onCastVote?.(selected)
  }

  return (
    <div
      className={cn(
        "rounded-3xl border border-zinc-800 bg-zinc-900/90 p-5 shadow-2xl backdrop-blur-xl text-left",
        className
      )}
      data-slot="voting-interface"
      {...props}
    >
      <div className="flex items-center justify-between pb-3 border-b border-zinc-800/80">
        <div className="flex items-center gap-2">
          <Vote className="h-4 w-4 text-purple-400" />
          <h3 className="font-bold text-sm text-zinc-100">Governance Ballot</h3>
        </div>
        <span className="font-mono text-xs text-purple-400 font-semibold">{votingPowerSol.toLocaleString()} Voting Power</span>
      </div>

      {!submitted ? (
        <div className="mt-4 space-y-3">
          <div className="space-y-2">
            {choices.map((c) => {
              const Icon = c.icon
              const isSelected = selected === c.id
              return (
                <button
                  key={c.id}
                  onClick={() => setSelected(c.id)}
                  className={cn(
                    "flex w-full items-center justify-between rounded-2xl border p-3.5 transition-all text-xs font-semibold font-mono",
                    isSelected
                      ? `${c.color} ${c.border} shadow-lg`
                      : "border-zinc-800 bg-zinc-950/60 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200"
                  )}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="h-4 w-4" />
                    <span>{c.label}</span>
                  </div>
                  {isSelected && <span className="text-[10px] uppercase tracking-wider font-bold">Selected</span>}
                </button>
              )
            })}
          </div>

          <button
            onClick={handleSubmit}
            className="w-full rounded-2xl bg-purple-600 py-3 text-xs font-bold text-white shadow-lg shadow-purple-500/25 hover:bg-purple-500 transition-all active:scale-[0.99]"
          >
            Submit Governance Vote
          </button>
        </div>
      ) : (
        <div className="my-6 text-center space-y-2">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <h4 className="font-bold text-sm text-zinc-100">Vote Successfully Recorded</h4>
          <p className="text-xs font-mono text-zinc-400">On-chain transaction confirmed</p>
        </div>
      )}
    </div>
  )
}
