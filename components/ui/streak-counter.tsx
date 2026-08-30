"use client"

import * as React from "react"
import { Flame, Sparkles, Zap } from "lucide-react"
import { cn } from "@/lib/utils"

export interface StreakCounterProps extends React.HTMLAttributes<HTMLDivElement> {
  currentStreakDays?: number
  xpMultiplier?: string
  totalXpEarned?: number
}

export function StreakCounter({
  currentStreakDays = 14,
  xpMultiplier = "2.5x XP Boost",
  totalXpEarned = 14850,
  className,
  ...props
}: StreakCounterProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-3 rounded-2xl border border-amber-500/30 bg-zinc-900 px-4 py-2.5 shadow-xl backdrop-blur-xl",
        className
      )}
      data-slot="streak-counter"
      {...props}
    >
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
        <Flame className="h-5 w-5 fill-amber-400" />
      </div>

      <div>
        <div className="flex items-center gap-2 font-mono">
          <span className="font-extrabold text-sm text-white">{currentStreakDays} Day Streak</span>
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/20 px-2 py-0.5 text-[10px] font-bold text-amber-300 border border-amber-500/30">
            <Sparkles className="h-2.5 w-2.5" /> {xpMultiplier}
          </span>
        </div>
        <span className="font-mono text-xs text-zinc-400">{totalXpEarned.toLocaleString()} Total XP</span>
      </div>
    </div>
  )
}
