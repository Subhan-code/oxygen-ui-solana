"use client";

import React from "react";
import { PositionTable } from "@/components/ui/sol/position-table";

const SOL_ICON =
  "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png";
const BTC_ICON =
  "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/3NZ9JMVBmGAqocybic2c7LQCJScmgsAZ6vQqTDzcqmJh/logo.png";

export default function Demo() {
  const positions = [
    {
      symbol: "SOL-PERP",
      icon: SOL_ICON,
      side: "long" as const,
      size: "15.0 SOL",
      value: "$2,438.40",
      leverage: "5x",
      entryPrice: "$145.20",
      markPrice: "$162.56",
      liquidationPrice: "$118.40",
      pnl: "+$260.40",
      pnlPercent: "+11.96%",
      pnlTrend: "up" as const,
    },
    {
      symbol: "BTC-PERP",
      icon: BTC_ICON,
      side: "short" as const,
      size: "0.25 BTC",
      value: "$16,125.00",
      leverage: "10x",
      entryPrice: "$65,400.00",
      markPrice: "$64,500.00",
      liquidationPrice: "$71,200.00",
      pnl: "+$225.00",
      pnlPercent: "+1.38%",
      pnlTrend: "up" as const,
    },
  ];

  return (
    <div className="flex min-h-[450px] w-full items-center justify-center p-6 bg-zinc-950/40 rounded-2xl overflow-auto">
      <PositionTable positions={positions} />
    </div>
  );
}
