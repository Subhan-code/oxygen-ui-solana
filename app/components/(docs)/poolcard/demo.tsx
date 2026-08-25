"use client";

import React from "react";
import { PoolCard } from "@/components/ui/sol/pool-card";
import { TrendBadge } from "@/components/ui/sol/trend-badge";
import { Button } from "@/components/ui/sol-primitives/button";

const SOL_ICON =
  "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png";
const USDC_ICON =
  "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png";

export default function Demo() {
  return (
    <div className="flex min-h-[450px] w-full items-center justify-center p-6 bg-zinc-950/40 rounded-2xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-3xl">
        <PoolCard
          tokens={[{ icon: SOL_ICON, symbol: "SOL" }]}
          name="Solana"
          price="$162.56"
          description="6.82% APY"
          series={[
            { time: "2026-01-01", value: 148.2 },
            { time: "2026-01-02", value: 151.4 },
            { time: "2026-01-03", value: 149.8 },
            { time: "2026-01-04", value: 153.6 },
            { time: "2026-01-05", value: 156.1 },
            { time: "2026-01-06", value: 154.3 },
            { time: "2026-01-07", value: 158.9 },
            { time: "2026-01-08", value: 157.2 },
            { time: "2026-01-09", value: 160.4 },
            { time: "2026-01-10", value: 162.56 },
          ]}
        >
          <TrendBadge trend="up">+9.69%</TrendBadge>
        </PoolCard>
        <PoolCard
          tokens={[
            { icon: SOL_ICON, symbol: "SOL" },
            { icon: USDC_ICON, symbol: "USDC" },
          ]}
          metrics={[
            { label: "TVL", value: "$245.8M" },
            { label: "Volume (24h)", value: "$18.2M" },
            { label: "APY", value: "12.4%", className: "text-emerald-400 font-semibold" },
            { label: "Fee", value: "0.25%" },
          ]}
        >
          <Button variant="outline" size="sm" className="w-full border-white/20 hover:bg-white/10">
            Add Liquidity
          </Button>
        </PoolCard>
      </div>
    </div>
  );
}
