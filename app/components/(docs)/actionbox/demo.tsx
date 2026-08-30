"use client";

import React from "react";
import { ActionBox } from "@/components/ui/action-box";

export default function Demo() {
  return (
    <div className="flex min-h-[640px] w-full items-center justify-center p-6">
      <div className="w-full max-w-md">
        <ActionBox
          tokens={[
            { icon: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png", symbol: "SOL" },
            { icon: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png", symbol: "USDC" }
          ]}
          defaultToken="SOL"
          balance="42.50"
          label="Deposit Collateral"
          submitLabel="Confirm Deposit"
          details={[
            { label: "Protocol Fee", value: "0.0005 SOL" },
            { label: "Est. Health Factor", value: "1.95", className: "text-emerald-400 font-semibold" }
          ]}
        />
      </div>
    </div>
  );
}