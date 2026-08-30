"use client";

import React from "react";
import { CryptoSalesCandlestickChart } from "@/components/ui/crypto-sales-candlestick-chart";

export default function Demo() {
  return (
    <div className="flex min-h-[400px] w-full items-center justify-center p-6">
      <CryptoSalesCandlestickChart />
    </div>
  );
}
