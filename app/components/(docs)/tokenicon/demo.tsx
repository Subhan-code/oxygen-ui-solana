"use client";

import React from "react";
import { TokenIcon } from "@/components/ui/token-icon";

export default function Demo() {
  return (
    <div className="flex min-h-[640px] w-full items-center justify-center gap-4 p-6">
      <TokenIcon src="https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png" alt="SOL" />
      <TokenIcon src="https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png" alt="USDC" />
    </div>
  );
}