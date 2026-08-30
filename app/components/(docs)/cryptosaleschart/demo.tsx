"use client";

import React from "react";
import { CryptoSalesChart } from "@/components/ui/crypto-sales-chart";

export default function Demo() {
  return (
    <div className="flex min-h-[450px] w-full items-center justify-center p-6">
      <CryptoSalesChart />
    </div>
  );
}
