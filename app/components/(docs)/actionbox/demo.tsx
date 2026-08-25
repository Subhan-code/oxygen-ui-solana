"use client";

import React from "react";
import { ActionBox } from "@/components/ui/sol/action-box";

const SOL_ICON =
  "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png";
const USDC_ICON =
  "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png";

export default function Demo() {
  return (
    <div className="flex min-h-[450px] w-full items-center justify-center p-6 bg-zinc-950/40 rounded-2xl">
      <ActionBox
        tokens={[
          { icon: SOL_ICON, symbol: "SOL" },
          { icon: USDC_ICON, symbol: "USDC" },
        ]}
        defaultToken="SOL"
        balance="24.58"
        label="Stake"
        details={[
          { label: "APY", value: "7.2%", className: "text-emerald-400 font-semibold" },
          { label: "Annual Rewards", value: "~1.77 SOL" },
          { label: "Validator", value: "Helius" },
        ]}
        submitLabel="Stake SOL"
      />
    </div>
  );
}
