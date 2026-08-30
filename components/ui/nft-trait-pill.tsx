"use client"

import * as React from "react"
import { Tag } from "lucide-react"
import { cn } from "@/lib/utils"

export interface NftTraitPillProps extends React.HTMLAttributes<HTMLDivElement> {
  traitCategory?: string
  traitValue?: string
  rarityPercent?: number
}

export function NftTraitPill({
  traitCategory = "Background",
  traitValue = "Hyperspace Neon",
  rarityPercent = 2.4,
  className,
  ...props
}: NftTraitPillProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-0.5 rounded-2xl border border-zinc-800 bg-zinc-950/60 p-2.5 text-left transition-colors hover:border-zinc-700",
        className
      )}
      data-slot="nft-trait-pill"
      {...props}
    >
      <span className="text-[10px] font-medium tracking-wider text-zinc-500 uppercase flex items-center gap-1">
        <Tag className="h-3 w-3 text-purple-400" /> {traitCategory}
      </span>
      <span className="font-bold text-xs text-zinc-100">{traitValue}</span>
      <span className="font-mono text-[10px] font-semibold text-purple-400 mt-0.5">{rarityPercent}% have this trait</span>
    </div>
  )
}
