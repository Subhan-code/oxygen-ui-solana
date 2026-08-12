"use client";

import React from "react";
import { CryptoUpDownChart } from "@/components/ui/crypto-up-down-chart";

export default function Demo() {
  return (
    <div className="flex min-h-[600px] w-full items-center justify-center p-6 bg-zinc-950">
      <CryptoUpDownChart />
    </div>
  );
}
