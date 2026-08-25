"use client";

import React from "react";
import { TradeBox } from "@/components/ui/sol/trade-box";

export default function Demo() {
  return (
    <div className="flex min-h-[450px] w-full items-center justify-center p-6 bg-zinc-950/40 rounded-2xl">
      <TradeBox tokens={[{"symbol":"SOL","icon":"https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png","balance":"24.5","price":180.5,"mint":"So11111111111111111111111111111111111111112"},{"symbol":"USDC","icon":"https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png","balance":"1250.0","price":1,"mint":"EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"}] as any} />
    </div>
  );
}
