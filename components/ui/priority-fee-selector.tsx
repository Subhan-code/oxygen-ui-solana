"use client"

import * as React from "react"
import { motion } from "motion/react"
import { Zap, Flame, Rocket, Shield, type LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

export type FeeTier = "turbo" | "fast" | "ultra"

export interface PriorityFeeSelectorProps extends React.HTMLAttributes<HTMLDivElement> {
  selectedTier?: FeeTier
  onChangeTier?: (tier: FeeTier) => void
}

export function PriorityFeeSelector({
  selectedTier = "fast",
  onChangeTier,
  className,
  ...props
}: PriorityFeeSelectorProps) {
  const tiers: { id: FeeTier; label: string; icon: LucideIcon; feeSol: string; cuPrice: string; desc: string }[] = [
    { id: "turbo", label: "Turbo", icon: Zap, feeSol: "0.00005 SOL", cuPrice: "50K micro-lamports", desc: "Standard priority" },
    { id: "fast", label: "Fast", icon: Flame, feeSol: "0.0002 SOL", cuPrice: "200K micro-lamports", desc: "Recommended for DEX trades" },
    { id: "ultra", label: "Ultra", icon: Rocket, feeSol: "0.001 SOL", cuPrice: "1M micro-lamports", desc: "Maximum MEV protection" },
  ]

  return (
    <div
      className={cn(
        "rounded-[28px] border border-black/10 dark:border-white/10 bg-white dark:bg-black p-4 sm:p-5 shadow-2xl backdrop-blur-xl text-zinc-900 dark:text-white select-none",
        className
      )}
      data-slot="priority-fee-selector"
      {...props}
    >
      <div className="flex items-center justify-between pb-3 border-b border-black/5 dark:border-white/10 text-xs">
        <span className="flex items-center gap-1.5 font-runde font-bold text-zinc-900 dark:text-white">
          <Shield className="h-4 w-4 text-sky-500 dark:text-sky-400" /> Compute Unit Priority Fee
        </span>
        <span className="font-mono text-zinc-400 text-[11px]">JITO / Priority Engine</span>
      </div>

      <div className="mt-3 grid grid-cols-3 gap-2">
        {tiers.map((t) => {
          const Icon = t.icon
          const isSelected = t.id === selectedTier
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => onChangeTier?.(t.id)}
              className={cn(
                "relative flex flex-col items-start gap-1 rounded-2xl border p-3 text-left motion-safe:transition-colors motion-safe:duration-150 outline-none focus-visible:ring-2 focus-visible:ring-sky-500/40 motion-safe:active:scale-[0.97] cursor-pointer",
                isSelected
                  ? "border-sky-500/50 dark:border-sky-500/50 bg-sky-500/10 text-zinc-900 dark:text-white"
                  : "border-black/5 dark:border-white/10 bg-zinc-100/80 dark:bg-[#0a0a0a] text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-[#141414] hover:text-zinc-900 dark:hover:text-white"
              )}
            >
              <div className="relative z-10 flex items-center gap-1.5 font-runde font-bold text-xs">
                <Icon className={cn("h-3.5 w-3.5", isSelected ? "text-sky-500 dark:text-sky-400" : "text-zinc-400")} />
                <span>{t.label}</span>
              </div>
              <span className="relative z-10 font-mono text-[11px] font-semibold text-zinc-900 dark:text-zinc-200 mt-1">{t.feeSol}</span>
              <span className="relative z-10 font-runde text-[10px] text-zinc-500 dark:text-zinc-400">{t.desc}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
