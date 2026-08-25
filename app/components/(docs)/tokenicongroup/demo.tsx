"use client";

import React from "react";
import { TokenIconGroup } from "@/components/ui/sol/token-icon-group";

export default function Demo() {
  const tokenIcons = [
    { src: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png", alt: "SOL" },
    { src: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png", alt: "USDC" }
  ];
  return (
    <div className="flex min-h-[300px] w-full items-center justify-center p-6 bg-zinc-950/40 rounded-2xl">
      <TokenIconGroup tokens={tokenIcons as any} />
    </div>
  );
}
