"use client";

import React from "react";
import { PositionTable } from "@/components/ui/sol/position-table";

export default function Demo() {
  const positions = [
    { id: "1", symbol: "SOL-PERP", side: "long", size: "10 SOL", leverage: 5, entryPrice: 165, markPrice: 180, pnl: 150, pnlPercent: 9.09 }
  ];
  return (
    <div className="flex min-h-[450px] w-full items-center justify-center p-6 bg-zinc-950/40 rounded-2xl">
      <PositionTable positions={positions as any} />
    </div>
  );
}
