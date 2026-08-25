"use client";

import React from "react";
import { ActivityFeed } from "@/components/ui/sol/activity-feed";

const SOL_ICON =
  "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png";
const USDC_ICON =
  "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png";
const BONK_ICON =
  "https://arweave.net/hQiPZOsRZXGXBJd_82PhVdlM_hACsT_q6wqwf5cSY7I";

export default function Demo() {
  return (
    <div className="flex min-h-[450px] w-full items-center justify-center p-6 bg-zinc-950/40 rounded-2xl">
      <div className="max-w-lg w-full bg-zinc-900/60 p-5 rounded-2xl border border-white/10">
        <ActivityFeed
          items={[
            {
              icon: SOL_ICON,
              title: "Bought SOL",
              description: "Hdg...248",
              timestamp: new Date(Date.now() - 2 * 60 * 1000),
              value: "100 SOL",
            },
            {
              icon: USDC_ICON,
              title: "Sold USDC",
              description: "9dV...8hJ",
              timestamp: new Date(Date.now() - 8 * 60 * 1000),
              value: "5,000 USDC",
            },
            {
              icon: BONK_ICON,
              title: "Bought BONK",
              description: "3kY...2wB",
              timestamp: new Date(Date.now() - 15 * 60 * 1000),
              value: "2.4M BONK",
            },
          ]}
        />
      </div>
    </div>
  );
}
