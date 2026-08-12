"use client";

import React from "react";
import { CryptoTvlAnalytics } from "@/components/ui/crypto-tvl-analytics";

export default function Demo() {
  return (
    <div className="flex min-h-[500px] w-full items-center justify-center p-6 bg-zinc-950">
      <CryptoTvlAnalytics />
    </div>
  );
}
