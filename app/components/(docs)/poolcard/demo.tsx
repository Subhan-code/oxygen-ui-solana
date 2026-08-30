"use client";

import React from "react";
import { PoolCard } from "@/components/ui/pool-card";

export default function Demo() {
  return (
    <div className="flex min-h-[420px] w-full items-center justify-center p-6">
      <PoolCard
        tokens={[
          { icon: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png", symbol: "SOL" },
          { icon: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png", symbol: "USDC" }
        ]}
        name="SOL / USDC Pool"
        price="$184.20"
        metrics={[
          { label: "APR", value: "42.5%", highlight: true },
          { label: "TVL", value: "$12.4M" },
        ]}
      />
    </div>
  );
}
