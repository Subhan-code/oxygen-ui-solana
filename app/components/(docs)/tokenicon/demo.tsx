"use client";

import React from "react";
import { TokenIcon } from "@/components/ui/sol/token-icon";

export default function Demo() {
  return (
    <div className="flex min-h-[300px] w-full items-center justify-center p-6 bg-zinc-950/40 rounded-2xl">
      <TokenIcon src="https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png" />
    </div>
  );
}
