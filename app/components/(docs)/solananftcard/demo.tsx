"use client";

import React from "react";
import { SolanaNftCard } from "@/components/ui/solana-nft-card";

export default function Demo() {
  return (
    <div className="relative flex min-h-[620px] w-full items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-[#1d64e8] via-[#225ad7] to-[#1241aa] p-8">
      {/* Ambient background decoration */}
      <div className="pointer-events-none absolute -top-24 -left-24 size-96 rounded-full bg-blue-400/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 size-96 rounded-full bg-indigo-500/20 blur-3xl" />

      <SolanaNftCard
        name="SPHERE #088"
        collectionName="GENESIS ORBIT"
        imageUrl="/images/nft-avatar.jpg"
        rarity="Uncommon"
        price="2.4"
        currency="SOL"
        topBid="2.15"
        rarityRank="#142"
      />
    </div>
  );
}
