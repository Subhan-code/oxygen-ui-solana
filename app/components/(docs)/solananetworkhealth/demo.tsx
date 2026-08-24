"use client";

import React from "react";
import { SolanaNetworkHealth } from "@/components/ui/solana-network-health";

export default function Demo() {
  return (
    <div className="flex min-h-[500px] w-full items-center justify-center p-6 transition-all duration-300">
      <SolanaNetworkHealth tps={2840} pingMs={18} currentEpoch={642} epochProgressPct={68.4} />
    </div>
  );
}
