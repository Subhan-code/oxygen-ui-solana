"use client";

import React from "react";
import { PoolTable } from "@/components/ui/pool-table";

export default function Demo() {
  return (
    <div className="flex min-h-[640px] w-full items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        <PoolTable
          columns={[
            { key: "pair", label: "Pool Pair" },
            { key: "tvl", label: "TVL" },
            { key: "apr", label: "APR" }
          ]}
          rows={[
            {
              icons: [
                { src: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png", alt: "SOL" },
                { src: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png", alt: "USDC" }
              ],
              name: "SOL-USDC Pool",
              data: { pair: "SOL / USDC", tvl: "$142.5M", apr: "24.5%" }
            }
          ]}
        />
      </div>
    </div>
  );
}