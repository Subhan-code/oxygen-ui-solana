"use client";

import React from "react";
import { TokenInput } from "@/components/ui/token-input";

export default function Demo() {
  return (
    <div className="flex min-h-[640px] w-full items-center justify-center p-6">
      <div className="w-full max-w-md">
        <TokenInput
          tokens={[
            { icon: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png", symbol: "SOL" },
            { icon: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png", symbol: "USDC" }
          ]}
          defaultToken="SOL"
          balance="15.20"
        />
      </div>
    </div>
  );
}