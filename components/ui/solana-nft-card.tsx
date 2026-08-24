"use client";

import React, { useState } from "react";
import { ExternalLink, Sparkles, Tag, Verified } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export type NftAttribute = {
  traitType: string;
  value: string;
  rarityPct?: number;
};

export interface SolanaNftCardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart"> {
  name?: string;
  collectionName?: string;
  imageUrl?: string;
  floorPriceSol?: number;
  rarityRank?: number;
  attributes?: NftAttribute[];
  verified?: boolean;
  mintAddress?: string;
}

const DEFAULT_ATTRIBUTES: NftAttribute[] = [
  { traitType: "Background", value: "Cyber Purple", rarityPct: 4.2 },
  { traitType: "Eyes", value: "Laser Red", rarityPct: 1.8 },
  { traitType: "Clothes", value: "Solana Hoodie", rarityPct: 8.5 },
  { traitType: "Head", value: "Halo", rarityPct: 2.1 },
];

export function SolanaNftCard({
  name = "Mad Lad #4821",
  collectionName = "Mad Lads",
  imageUrl = "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=500&auto=format&fit=crop&q=80",
  floorPriceSol = 142.5,
  rarityRank = 312,
  attributes = DEFAULT_ATTRIBUTES,
  verified = true,
  mintAddress = "7xKX...gAsU",
  className,
  ...props
}: SolanaNftCardProps) {
  const reduceMotion = useReducedMotion();
  const [showTraits, setShowTraits] = useState(false);

  const solscanUrl = `https://solscan.io/token/${mintAddress}`;

  return (
    <div
      data-slot="solana-nft-card"
      className={cn(
        "relative flex w-full max-w-sm flex-col overflow-hidden rounded-3xl border border-black/5 bg-white/70 shadow-xs backdrop-blur-xl dark:border-white/10 dark:bg-zinc-900/80",
        className
      )}
      {...props}
    >
      <div className="relative aspect-square w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
        <img
          src={imageUrl}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        />

        <div className="absolute top-3 left-3 flex items-center gap-1 rounded-full bg-black/60 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur-md">
          <Sparkles className="h-3 w-3 text-amber-400" />
          <span>Rank #{rarityRank}</span>
        </div>

        <a
          href={solscanUrl}
          target="_blank"
          rel="noreferrer"
          className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md transition-opacity hover:opacity-80"
          title="View Mint on Solscan"
        >
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>

      <div className="flex flex-col gap-3 p-4">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-runde text-base font-bold text-zinc-900 dark:text-white">
                {name}
              </span>
              {verified && (
                <Verified className="h-4 w-4 text-purple-500 fill-purple-500/20" />
              )}
            </div>
            <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
              {collectionName}
            </span>
          </div>

          <div className="flex flex-col items-end">
            <span className="text-[10px] font-medium text-zinc-400 uppercase">
              Floor Price
            </span>
            <span className="font-mono text-sm font-bold text-zinc-900 dark:text-white">
              {floorPriceSol} <span className="text-xs text-purple-500">SOL</span>
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setShowTraits(!showTraits)}
          className="flex items-center justify-between rounded-xl bg-zinc-100/70 px-3 py-2 text-xs font-medium text-zinc-700 transition-colors hover:bg-zinc-200/80 dark:bg-zinc-800/50 dark:text-zinc-300 dark:hover:bg-zinc-800"
        >
          <div className="flex items-center gap-1.5">
            <Tag className="h-3.5 w-3.5 text-purple-500" />
            <span>Attributes &amp; Traits</span>
          </div>
          <span className="font-mono text-[11px] text-purple-600 dark:text-purple-400">
            {showTraits ? "Hide" : "Show"} ({attributes.length})
          </span>
        </button>

        {showTraits && (
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ type: "spring", stiffness: 350, damping: 20 }}
            className="grid grid-cols-2 gap-2 pt-1"
          >
            {attributes.map((attr) => (
              <div
                key={attr.traitType}
                className="flex flex-col gap-0.5 rounded-xl border border-zinc-200/60 bg-white/50 p-2 dark:border-zinc-800 dark:bg-zinc-800/40"
              >
                <span className="text-[10px] font-medium text-zinc-400 uppercase">
                  {attr.traitType}
                </span>
                <span className="font-runde text-xs font-semibold text-zinc-900 dark:text-white">
                  {attr.value}
                </span>
                {attr.rarityPct && (
                  <span className="font-mono text-[10px] text-purple-500">
                    {attr.rarityPct}% have this
                  </span>
                )}
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
