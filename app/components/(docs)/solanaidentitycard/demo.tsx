"use client";

import React from "react";
import { SolanaIdentityCard } from "@/components/ui/solana-identity-card";

export default function Demo() {
  return (
    <div className="flex min-h-[500px] w-full items-center justify-center p-6">
      <SolanaIdentityCard
        address="7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU"
        domain="alex.sol"
        balanceSol={24.85}
        verified={true}
        cluster="mainnet-beta"
      />
    </div>
  );
}
