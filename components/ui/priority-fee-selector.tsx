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
        "rounded-2xl border border-zinc-800 bg-zinc-900/90 p-4 shadow-xl backdrop-blur-xl",
        className
      )}
      data-slot="priority-fee-selector"
      {...props}
    >
      <div className="flex items-center justify-between pb-3 border-b border-zinc-800/80 text-xs">
        <span className="flex items-center gap-1.5 font-semibold text-zinc-100">
          <Shield className="h-4 w-4 text-purple-400" /> Compute Unit Priority Fee
        </span>
        <span className="font-mono text-zinc-400">JITO / Priority Engine</span>
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
                "relative flex flex-col items-start gap-1 rounded-2xl border p-3 text-left motion-safe:transition-colors motion-safe:duration-150 outline-none focus-visible:ring-2 focus-visible:ring-purple-500/40 motion-safe:active:scale-[0.97]",
                isSelected
                  ? "border-purple-500 text-white"
                  : "border-zinc-800 bg-zinc-950/60 text-zinc-400 hover:border-zinc-700"
              )}
            >
              {isSelected && (
                <motion.span
                  layoutId="priority-fee-active"
                  className="absolute inset-0 rounded-2xl bg-purple-500/10 shadow-lg shadow-purple-500/15"
                  style={{ borderRadius: 16 }}
                  transition={{ type: "spring", duration: 0.2, bounce: 0 }}
                />
              )}
              <div className="relative z-10 flex items-center gap-1.5 font-bold text-xs">
                <Icon className={cn("h-3.5 w-3.5", isSelected ? "text-purple-400" : "text-zinc-500")} />
                <span>{t.label}</span>
              </div>
              <span className="relative z-10 font-mono text-[11px] font-semibold text-zinc-200 mt-1">{t.feeSol}</span>
              <span className="relative z-10 text-[10px] text-zinc-500">{t.desc}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
