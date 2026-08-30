"use client";

import React from "react";
import { CryptoTvlAnalyticsChart } from "@/components/ui/crypto-tvl-analytics-chart";

export default function Demo() {
  return (
    <div className="flex min-h-[500px] w-full items-center justify-center p-6">
      <CryptoTvlAnalyticsChart />
    </div>
  );
}
