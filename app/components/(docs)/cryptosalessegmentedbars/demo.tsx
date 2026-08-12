"use client";

import React from "react";
import { CryptoSalesSegmentedBars } from "@/components/ui/crypto-sales-segmented-bars";

export default function Demo() {
  return (
    <div className="flex min-h-[400px] w-full items-center justify-center p-6 bg-zinc-950">
      <CryptoSalesSegmentedBars />
    </div>
  );
}
