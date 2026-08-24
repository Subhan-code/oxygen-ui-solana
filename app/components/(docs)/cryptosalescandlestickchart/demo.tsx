"use client";

import React from "react";
import { CryptoSalesCandlestickChart } from "@/components/ui/crypto-sales-candlestick-chart";

export default function Demo() {
  return (
    <div className="flex min-h-[400px] w-full items-center justify-center p-6 bg-zinc-950 transition-all duration-300">
      <CryptoSalesCandlestickChart />
    </div>
  );
}
