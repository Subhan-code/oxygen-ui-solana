"use client";

import React from "react";
import { PositionCard } from "@/components/ui/position-card";

export default function Demo() {
  return (
    <div className="flex min-h-[640px] w-full items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <PositionCard symbol="SOL" icon="https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png" amount="45.5 SOL" value="$8,295.50" apy="12.4%" trend="up" />
      </div>
    </div>
  );
}