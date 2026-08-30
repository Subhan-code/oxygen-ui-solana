"use client"

import * as React from "react"
import { Trophy, CheckCircle2, Circle, ArrowRight, Award } from "lucide-react"
import { cn } from "@/lib/utils"

export interface QuestStep {
  id: string
  title: string
  completed: boolean
}

export interface QuestCardProps extends React.HTMLAttributes<HTMLDivElement> {
  questTitle?: string
  rewardBadge?: string
  xpReward?: number
  steps?: QuestStep[]
  onClaimReward?: () => void
}

const DEFAULT_STEPS: QuestStep[] = [
  { id: "s1", title: "Connect your Solana wallet", completed: true },
  { id: "s2", title: "Execute a swap of at least 1 SOL", completed: true },
  { id: "s3", title: "Stake SOL into JitoSOL liquid vault", completed: false },
]

export function QuestCard({
  questTitle = "Solana DeFi Explorer Quest",
  rewardBadge = "DeFi Master Badge",
  xpReward = 500,
  steps = DEFAULT_STEPS,
  onClaimReward,
  className,
  ...props
}: QuestCardProps) {
  const completedCount = steps.filter((s) => s.completed).length
  const isAllCompleted = completedCount === steps.length

  return (
    <div
      className={cn(
        "rounded-3xl border border-zinc-800 bg-zinc-900/90 p-5 shadow-2xl backdrop-blur-xl text-left",
        className
      )}
      data-slot="quest-card"
      {...props}
    >
      <div className="flex items-center justify-between pb-3 border-b border-zinc-800/80">
        <div className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-amber-400" />
          <h3 className="font-bold text-sm text-zinc-100">{questTitle}</h3>
        </div>
        <span className="font-mono text-xs font-bold text-amber-400">+{xpReward} XP</span>
      </div>

      <div className="my-4 space-y-2.5">
        {steps.map((step) => (
          <div key={step.id} className="flex items-center gap-2.5 text-xs text-zinc-300">
            {step.completed ? (
              <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
            ) : (
              <Circle className="h-4 w-4 text-zinc-600 shrink-0" />
            )}
            <span className={cn(step.completed && "line-through text-zinc-500")}>{step.title}</span>
          </div>
        ))}
      </div>

      <div className="pt-2 border-t border-zinc-800/60 flex items-center justify-between">
        <span className="font-mono text-xs text-zinc-400">
          Progress: <strong className="text-zinc-200">{completedCount}/{steps.length}</strong>
        </span>
        <button
          onClick={onClaimReward}
          disabled={!isAllCompleted}
          className="inline-flex items-center gap-1.5 rounded-xl bg-amber-500 px-3 py-1.5 text-xs font-bold text-zinc-950 shadow-md shadow-amber-500/20 hover:bg-amber-400 transition-all disabled:opacity-40"
        >
          <Award className="h-3.5 w-3.5" /> Claim Reward
        </button>
      </div>
    </div>
  )
}
