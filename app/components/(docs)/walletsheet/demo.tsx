"use client";

import React from "react";
import { WalletSheet } from "@/components/ui/wallet-sheet";

export default function Demo() {
  return (
    <div className="flex min-h-[640px] w-full items-center justify-center p-6">
      <WalletSheet address="7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU" balance="42.50 SOL" />
    </div>
  );
}