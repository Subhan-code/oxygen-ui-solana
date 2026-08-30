"use client";

import React from "react";
import { PositionTable } from "@/components/ui/position-table";

export default function Demo() {
  return (
    <div className="flex min-h-[640px] w-full items-center justify-center p-6">
      <div className="w-full max-w-3xl">
        <PositionTable
          positions={[
            { icon: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png", symbol: "SOL-PERP", side: "long", size: "50 SOL", entryPrice: "$175.20", markPrice: "$182.45", pnl: "+$362.50", leverage: "10x", value: "$9,122.50" }
          ]}
        />
      </div>
    </div>
  );
}