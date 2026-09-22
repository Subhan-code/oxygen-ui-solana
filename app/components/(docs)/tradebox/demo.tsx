"use client";

import React from "react";
import { TradeBox } from "@/components/ui/trade-box";

export default function Demo() {
  return (
    <div className="flex min-h-[640px] w-full items-center justify-center p-6">
      <div className="w-full max-w-md">
        <TradeBox
          tokens={[
            { icon: "/tokens/sol.svg", symbol: "SOL" },
            { icon: "/tokens/usdc.svg", symbol: "USDC" },
          ]}
        />
      </div>
    </div>
  );
}