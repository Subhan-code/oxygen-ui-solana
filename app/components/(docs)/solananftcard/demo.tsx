"use client";

import React from "react";
import { SolanaNftCard } from "@/components/ui/solana-nft-card";

export default function Demo() {
  return (
    <div className="flex min-h-[500px] w-full items-center justify-center p-6">
      <SolanaNftCard name="Mad Lad #4821" collectionName="Mad Lads" floorPriceSol={142.5} rarityRank={312} />
    </div>
  );
}
