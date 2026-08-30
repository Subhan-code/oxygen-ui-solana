"use client";

import React from "react";
import { TokenCombobox } from "@/components/ui/token-combobox";

export default function Demo() {
  return (
    <div className="flex min-h-[640px] w-full items-center justify-center p-6">
      <div className="w-64">
        <TokenCombobox
          tokens={[
            { icon: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png", symbol: "SOL" },
            { icon: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png", symbol: "USDC" }
          ]}
        />
      </div>
    </div>
  );
}