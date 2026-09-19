"use client";

import React from "react";
import { MultiChainSwap } from "@/components/ui/multi-chain-swap";

export default function Demo() {
  return (
    <div className="flex min-h-[640px] w-full items-center justify-center p-4">
      <MultiChainSwap />
    </div>
  );
}
