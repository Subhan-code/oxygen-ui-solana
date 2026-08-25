"use client";

import React from "react";
import { TokenInput } from "@/components/ui/sol/token-input";

export default function Demo() {
  return (
    <div className="flex min-h-[350px] w-full max-w-sm items-center justify-center p-6 bg-zinc-950/40 rounded-2xl">
      <TokenInput tokens={[{"symbol":"SOL","icon":"https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png","balance":"24.5","price":180.5,"mint":"So11111111111111111111111111111111111111112"},{"symbol":"USDC","icon":"https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png","balance":"1250.0","price":1,"mint":"EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"}] as any} />
    </div>
  );
}
