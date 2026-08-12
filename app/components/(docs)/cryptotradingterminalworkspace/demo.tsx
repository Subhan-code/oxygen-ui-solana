"use client";

import React from "react";
import { CryptoTradingTerminalWorkspace } from "@/components/ui/crypto-trading-terminal-workspace";

export default function Demo() {
  return (
    <div className="flex min-h-[600px] w-full items-center justify-center p-6 bg-zinc-950">
      <CryptoTradingTerminalWorkspace />
    </div>
  );
}
