"use client";

import React from "react";
import { CryptoPredictionMarkets } from "@/components/ui/crypto-prediction-markets";

export default function Demo() {
  return (
    <div className="flex min-h-[600px] w-full items-center justify-center p-6 bg-zinc-950">
      <CryptoPredictionMarkets />
    </div>
  );
}
