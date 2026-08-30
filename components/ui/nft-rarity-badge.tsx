"use client"

import * as React from "react"
import { Crown, Sparkles, ShieldAlert, Award } from "lucide-react"
import { cn } from "@/lib/utils"

export type RarityTier = "mythic" | "legendary" | "rare" | "common"

export interface NftRarityBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  tier?: RarityTier
  percentile?: number // e.g. 0.5%
  rank?: number
}

export function NftRarityBadge({
  tier = "legendary",
  percentile = 1.2,
  rank = 42,
  className,
  ...props
}: NftRarityBadgeProps) {
  const configs: Record<RarityTier, { label: string; icon: any; style: string }> = {
    mythic: { label: "Mythic", icon: Crown, style: "bg-amber-500/10 text-amber-400 border-amber-500/30 shadow-amber-500/10" },
    legendary: { label: "Legendary", icon: Sparkles, style: "bg-purple-500/10 text-purple-400 border-purple-500/30 shadow-purple-500/10" },
    rare: { label: "Rare", icon: Award, style: "bg-blue-500/10 text-blue-400 border-blue-500/30 shadow-blue-500/10" },
    common: { label: "Common", icon: ShieldAlert, style: "bg-zinc-800/80 text-zinc-400 border-zinc-700" },
  }

  const config = configs[tier]
  const Icon = config.icon

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-mono font-bold shadow-md backdrop-blur-md",
        config.style,
        className
      )}
      data-slot="nft-rarity-badge"
      {...props}
    >
      <Icon className="h-3.5 w-3.5" />
      <span>{config.label}</span>
      <span className="opacity-60 text-[10px]">#{rank} ({percentile}%)</span>
    </div>
  )
}
