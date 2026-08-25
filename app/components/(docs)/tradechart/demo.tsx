"use client";

import React from "react";
import { TradeChart } from "@/components/ui/sol/trade-chart";

export default function Demo() {
  const data = [
    { time: "2026-08-01", open: 160, high: 165, low: 158, close: 164 },
    { time: "2026-08-02", open: 164, high: 172, low: 163, close: 170 }
  ];
  return (
    <div className="flex min-h-[450px] w-full max-w-xl items-center justify-center p-6 bg-zinc-950/40 rounded-2xl">
      <TradeChart data={data as any} />
    </div>
  );
}
