"use client";

import React from "react";
import { PriceChart } from "@/components/ui/sol/price-chart";

export default function Demo() {
  const series = [
    { time: "2026-08-01", value: 160 },
    { time: "2026-08-02", value: 175 },
    { time: "2026-08-03", value: 180.5 }
  ];
  return (
    <div className="flex min-h-[450px] w-full max-w-xl items-center justify-center p-6 bg-zinc-950/40 rounded-2xl">
      <PriceChart series={series as any} />
    </div>
  );
}
