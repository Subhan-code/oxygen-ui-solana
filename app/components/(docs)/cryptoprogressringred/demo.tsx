"use client";

import React from "react";
import { CryptoProgressRingRed } from "@/components/ui/crypto-progress-ring-red";

export default function Demo() {
  return (
    <div className="flex min-h-[400px] w-full items-center justify-center p-6 bg-zinc-950">
      <CryptoProgressRingRed />
    </div>
  );
}
