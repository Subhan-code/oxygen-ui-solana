"use client";

import React from "react";
import { SolanaSwapCard } from "@/components/ui/solana-swap-card";

export default function Demo() {
  return (
    <div className="flex min-h-[500px] w-full items-center justify-center p-6 transition-all duration-300">
      <SolanaSwapCard defaultPayToken="SOL" defaultReceiveToken="USDC" slippagePct={0.5} />
    </div>
  );
}
