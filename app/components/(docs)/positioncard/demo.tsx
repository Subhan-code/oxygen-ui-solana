"use client";

import React from "react";
import { PositionCard } from "@/components/ui/sol/position-card";

export default function Demo() {
  return (
    <div className="flex min-h-[450px] w-full items-center justify-center p-6 bg-zinc-950/40 rounded-2xl">
      <PositionCard symbol="SOL-PERP" icon="https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png" amount="10 SOL" value="$1,800" />
    </div>
  );
}
