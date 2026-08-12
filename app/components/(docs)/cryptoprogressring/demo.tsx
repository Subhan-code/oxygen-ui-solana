"use client";

import React from "react";
import { CryptoProgressRing } from "@/components/ui/crypto-progress-ring";

export default function Demo() {
  return (
    <div className="flex min-h-[450px] w-full items-center justify-center p-6 bg-zinc-950">
      <CryptoProgressRing />
    </div>
  );
}
