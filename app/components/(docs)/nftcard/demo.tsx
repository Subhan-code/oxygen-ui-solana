"use client";

import React from "react";
import { NFTCard } from "@/components/ui/sol/nft-card";

export default function Demo() {
  return (
    <div className="flex min-h-[450px] w-full items-center justify-center p-6 bg-zinc-950/40 rounded-2xl">
      <NFTCard name="Mad Lad #420" collection="Mad Lads" image="https://picsum.photos/400/400" price="120 SOL" />
    </div>
  );
}
