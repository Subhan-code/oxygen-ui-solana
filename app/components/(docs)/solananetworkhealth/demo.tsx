"use client";

import React from "react";
import { SolanaNetworkHealth } from "@/components/ui/solana-network-health";

export default function Demo() {
  return (
    <div className="flex min-h-[520px] w-full items-center justify-center p-6 bg-zinc-950/60 transition-all duration-300">
      <SolanaNetworkHealth
        tps={2940}
        pingMs={18}
        currentEpoch={642}
        epochProgressPct={68.4}
        blockTimeMs={410}
        activeValidators={1420}
      />
    </div>
  );
}
