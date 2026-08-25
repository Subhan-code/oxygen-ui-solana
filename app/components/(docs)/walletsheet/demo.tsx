"use client";

import React from "react";
import { WalletSheet } from "@/components/ui/sol/wallet-sheet";

export default function Demo() {
  return (
    <div className="flex min-h-[450px] w-full items-center justify-center p-6 bg-zinc-950/40 rounded-2xl transition-all duration-300">
      <WalletSheet />
    </div>
  );
}
