"use client";

import React from "react";
import { PriceChart } from "@/components/ui/price-chart";

export default function Demo() {
  return (
    <div className="flex min-h-[640px] w-full items-center justify-center p-6">
      <div className="w-full max-w-xl h-72">
        <PriceChart
          title="SOL / USD"
          description="Solana Price History"
          series={[
            { time: "2024-01-01", value: 160 },
            { time: "2024-01-02", value: 168 },
            { time: "2024-01-03", value: 165 },
            { time: "2024-01-04", value: 175 },
            { time: "2024-01-05", value: 182 }
          ]}
        />
      </div>
    </div>
  );
}