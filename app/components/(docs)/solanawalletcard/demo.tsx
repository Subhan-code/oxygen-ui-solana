"use client";

import React from "react";
import { SolanaWalletCard } from "@/components/ui/solana-wallet-card";

export default function Demo() {
  return (
    <div className="flex min-h-[500px] w-full items-center justify-center p-6">
      <SolanaWalletCard
        walletLabel="Main wallet"
        address="0x3ddedt...ac563"
        balanceFiat="$37,521"
        pnlPercent="+17.56%"
      />
    </div>
  );
}
