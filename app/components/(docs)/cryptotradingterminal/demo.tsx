"use client";

import React from "react";
import { CryptoTradingTerminal } from "@/components/ui/crypto-trading-terminal";

export default function Demo() {
  return (
    <div className="flex min-h-[600px] w-full items-center justify-center p-6 bg-zinc-950 transition-all duration-300">
      <CryptoTradingTerminal />
    </div>
  );
}
