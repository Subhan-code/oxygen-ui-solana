"use client";

import React from "react";
import { TradeBox } from "@/components/ui/trade-box";

export default function Demo() {
  return (
    <div className="flex min-h-[640px] w-full items-center justify-center p-6">
      <div className="w-full max-w-md">
        <TradeBox
          tokens={[
            { icon: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png", symbol: "SOL" }
          ]}
        />
      </div>
    </div>
  );
}