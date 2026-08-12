"use client";

import React from "react";
import { CryptoSalesVerticalGraph } from "@/components/ui/crypto-sales-vertical-graph";

export default function Demo() {
  return (
    <div className="flex min-h-[400px] w-full items-center justify-center p-6 bg-zinc-950">
      <CryptoSalesVerticalGraph />
    </div>
  );
}
