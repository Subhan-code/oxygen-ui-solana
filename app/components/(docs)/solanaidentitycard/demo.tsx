"use client";

import React from "react";
import { SolanaIdentityCard } from "@/components/ui/solana-identity-card";

export default function Demo() {
  return (
    <div className="flex min-h-[640px] w-full items-center justify-center p-6 bg-zinc-950/60 transition-all duration-300">
      <SolanaIdentityCard
        address="7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU"
        handle="@cirmits"
        domain="cirmits.sol"
        totalFiatBalance="$11,581.21"
        dayChangeFiat="+$63.77"
        dayChangePercent="+0.55%"
        solBalance="24.91076 SOL"
        solFiatValue="$6,027.16"
        usdcBalance="5,515.92504 USDC"
        usdcFiatValue="$5,515.93"
        verified={true}
        cluster="mainnet-beta"
      />
    </div>
  );
}
