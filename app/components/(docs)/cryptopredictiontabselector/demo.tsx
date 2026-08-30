"use client";

import React from "react";
import { CryptoPredictionTabSelector } from "@/components/ui/crypto-prediction-tab-selector";

export default function Demo() {
  return (
    <div className="flex min-h-[300px] w-full items-center justify-center p-6">
      <CryptoPredictionTabSelector />
    </div>
  );
}
