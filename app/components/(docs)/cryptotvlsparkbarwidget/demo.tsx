"use client";

import React from "react";
import { CryptoTvlSparkbarWidget } from "@/components/ui/crypto-tvl-sparkbar-widget";

export default function Demo() {
  return (
    <div className="flex min-h-[300px] w-full items-center justify-center p-6 bg-zinc-950">
      <CryptoTvlSparkbarWidget />
    </div>
  );
}
