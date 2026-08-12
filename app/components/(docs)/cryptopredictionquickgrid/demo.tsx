"use client";

import React from "react";
import { CryptoPredictionQuickGrid } from "@/components/ui/crypto-prediction-quick-grid";

export default function Demo() {
  return (
    <div className="flex min-h-[500px] w-full items-center justify-center p-6 bg-zinc-950">
      <CryptoPredictionQuickGrid />
    </div>
  );
}
