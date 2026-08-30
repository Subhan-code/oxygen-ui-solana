"use client"

import * as React from "react"
import { motion } from "motion/react"
import { Sparkles, ShoppingBag } from "lucide-react"
import { cn } from "@/lib/utils"

export interface NftItem {
  id: string
  name: string
  image: string
  rarityRank?: number
  floorPriceSol?: number
  compressed?: boolean
}

export interface NftGalleryGridProps extends React.HTMLAttributes<HTMLDivElement> {
  items?: NftItem[]
  onBuyItem?: (item: NftItem) => void
}

const DEFAULT_NFTS: NftItem[] = [
  { id: "1", name: "Mad Lad #4821", image: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263/logo.png", rarityRank: 142, floorPriceSol: 145.0 },
  { id: "2", name: "Claynosaurz #819", image: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/jtojtomepa8beP8AuQc6eXt5FriJwfFMwQx2v2f9mCL/logo.png", rarityRank: 84, floorPriceSol: 38.5 },
  { id: "3", name: "Famous Fox #1029", image: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/HZ1JovNiVvGrGNiiYvEozEVgZ58xaU3RKwX8eACQBCt3/logo.png", rarityRank: 512, floorPriceSol: 18.2, compressed: true },
]

export function NftGalleryGrid({
  items = DEFAULT_NFTS,
  onBuyItem,
  className,
  ...props
}: NftGalleryGridProps) {
  return (
    <div
      className={cn("grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4", className)}
      data-slot="nft-gallery-grid"
      {...props}
    >
      {items.map((nft) => (
        <motion.div
          key={nft.id}
          whileTap={{ scale: 0.97 }}
          className="group relative overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900/90 p-3 shadow-xl backdrop-blur-xl motion-safe:transition-colors motion-safe:duration-150 hover:border-purple-500/40"
        >
          <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-zinc-950">
            <img src={nft.image} alt={nft.name} className="h-full w-full object-cover motion-safe:transition-transform motion-safe:duration-150 motion-safe:ease-[var(--ease-out-expo)] group-hover:scale-[1.02]" />
            {nft.rarityRank && (
              <span className="absolute top-2.5 left-2.5 flex items-center gap-1 rounded-full bg-zinc-950/80 px-2.5 py-1 text-[10px] font-mono font-bold text-amber-400 border border-amber-500/20 backdrop-blur-md">
                <Sparkles className="h-3 w-3" /> #{nft.rarityRank}
              </span>
            )}
            {nft.compressed && (
              <span className="absolute top-2.5 right-2.5 rounded-full bg-purple-500/90 px-2 py-0.5 text-[9px] font-mono font-bold text-white shadow-md">
                cNFT
              </span>
            )}
          </div>

          <div className="mt-3 flex items-center justify-between px-1 pb-1">
            <div>
              <h4 className="font-bold text-sm text-zinc-100">{nft.name}</h4>
              <span className="font-mono text-xs font-semibold text-purple-400">{nft.floorPriceSol} SOL</span>
            </div>
            <button
              onClick={() => onBuyItem?.(nft)}
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-600 text-white shadow-md shadow-purple-500/20 transition-all hover:bg-purple-500 active:scale-95"
            >
              <ShoppingBag className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
