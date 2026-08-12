"use client";

import React from "react";
import { CryptoWalletMenuSheet } from "@/components/ui/crypto-wallet-menu-sheet";

export default function Demo() {
  return (
    <div className="flex min-h-[500px] w-full items-center justify-center p-6 bg-zinc-950">
      <CryptoWalletMenuSheet />
    </div>
  );
}
