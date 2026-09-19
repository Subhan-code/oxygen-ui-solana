"use client";

import React from "react";
import { motion, useReducedMotion } from "motion/react";
import { DigitSwap } from "@/components/motion/digit-swap";
import { cn } from "@/lib/utils";

export type NftDistribution = {
  primary: number;
  secondary: number;
};

export interface SolanaNftCardProps
  extends Omit<
    React.HTMLAttributes<HTMLDivElement>,
    "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart"
  > {
  name?: string;
  collectionName?: string;
  imageUrl?: string;
  rarity?: string;
  price?: string | number;
  currency?: string;
  topBid?: string | number;
  rarityRank?: string | number;
  rarityPercentile?: string;
  lastSale?: string | number;
  avgEarnings?: string;
  distribution?: NftDistribution;
  floorPriceSol?: number;
  authorPfpUrl?: string;
}

export function SolanaNftCard({
  name = "SPHERE #088",
  collectionName = "GENESIS ORBIT",
  imageUrl = "/images/nft-avatar.jpg",
  authorPfpUrl = "/images/author-pfp.jpg",
  rarity = "Uncommon",
  price,
  currency = "SOL",
  topBid = "2.15",
  rarityRank = "#142",
  floorPriceSol,
  className,
  ...props
}: SolanaNftCardProps) {
  const reduceMotion = useReducedMotion();

  const displayPrice =
    price !== undefined
      ? price
      : floorPriceSol !== undefined
        ? floorPriceSol
        : "2.4";

  const displayCurrency =
    price !== undefined ? currency : floorPriceSol !== undefined ? "SOL" : currency;

  return (
    <motion.div
      data-slot="solana-nft-card"
      whileHover={reduceMotion ? {} : { y: -4 }}
      transition={{ type: "spring", stiffness: 350, damping: 24 }}
      className={cn(
        "group relative flex w-full max-w-[340px] flex-col overflow-hidden rounded-[36px] bg-[#0e1013] p-3.5 shadow-2xl ring-1 ring-white/10 select-none",
        className,
      )}
      {...props}
    >
      {/* Artwork container */}
      <div className="relative aspect-square w-full overflow-hidden rounded-[26px] bg-[#1a44c2]">
        <img
          src={imageUrl}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />

        {/* Top rarity pill */}
        {rarity && (
          <div className="absolute top-3 left-1/2 -translate-x-1/2">
            <div className="flex h-7 items-center justify-center rounded-full bg-blue-600/80 px-5 shadow-[0_0_14px_rgba(59,130,246,0.4)] ring-1 ring-blue-300/30 backdrop-blur-md select-none">
              <span className="text-[12px] font-semibold tracking-wide text-white">
                {rarity}
              </span>
            </div>
          </div>
        )}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex items-end">
          {/* Left bottom concave fillet */}
          <svg
            viewBox="0 0 16 16"
            aria-hidden="true"
            className="pointer-events-none -mr-[0.5px] h-4 w-4 shrink-0 fill-[#0e1013]"
          >
            <path d="M 0,16 L 16,16 L 16,0 A 16,16 0 0,1 0,16 Z" />
          </svg>

          {/* Price pill tab */}
          <div className="flex h-9 items-center justify-center rounded-t-[18px] bg-[#0e1013] px-6">
            <span className="inline-flex items-center gap-1.5 text-[15px] font-bold tracking-wide text-white">
              <DigitSwap value={displayPrice} />
              <span>{displayCurrency}</span>
            </span>
          </div>

          {/* Right bottom concave fillet */}
          <svg
            viewBox="0 0 16 16"
            aria-hidden="true"
            className="pointer-events-none -ml-[0.5px] h-4 w-4 shrink-0 fill-[#0e1013]"
          >
            <path d="M 0,0 L 0,16 L 16,16 A 16,16 0 0,1 0,0 Z" />
          </svg>
        </div>
      </div>

      {/* Information section */}
      <div className="px-1.5 pt-4 pb-1">
        <div className="flex items-center gap-3">
          {authorPfpUrl && (
            <img
              src={authorPfpUrl}
              alt={collectionName}
              className="size-11 shrink-0 rounded-xl object-cover ring-2 ring-white/15 shadow-md transition-transform duration-300 group-hover:scale-105"
            />
          )}
          <div className="flex min-w-0 flex-col">
            <h3 className="truncate text-lg font-bold tracking-tight text-white leading-snug">
              {name}
            </h3>
            <span className="truncate text-xs font-semibold tracking-wider text-zinc-400 uppercase">
              {collectionName}
            </span>
          </div>
        </div>

        {/* Useful & aesthetic NFT market stats container */}
        <div className="mt-4 flex items-center justify-between rounded-[22px] bg-gradient-to-b from-[#171920] to-[#121419] px-4 py-3 ring-1 ring-white/[0.06] shadow-inner">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold tracking-wider text-zinc-400 uppercase">
              Top Offer
            </span>
            <div className="mt-1 flex items-baseline gap-1">
              <span className="text-base font-bold text-white tracking-tight tabular-nums inline-flex items-center">
                <DigitSwap value={topBid} />
              </span>
              <span className="text-xs font-bold text-zinc-400">{displayCurrency}</span>
            </div>
          </div>

          <div className="h-7 w-px bg-white/10" />

          <div className="flex flex-col items-end">
            <span className="text-[10px] font-bold tracking-wider text-zinc-400 uppercase">
              Rarity Rank
            </span>
            <div className="mt-1 flex items-center">
              <span className="text-base font-bold text-white tracking-tight tabular-nums inline-flex items-center">
                <DigitSwap value={rarityRank} />
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default SolanaNftCard;
