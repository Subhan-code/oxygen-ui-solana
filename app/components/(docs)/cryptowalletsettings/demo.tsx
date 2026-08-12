"use client";

import React from "react";
import { CryptoWalletSettings } from "@/components/ui/crypto-wallet-settings";

export default function Demo() {
  return (
    <div className="flex min-h-[550px] w-full items-center justify-center p-6 bg-zinc-950">
      <CryptoWalletSettings />
    </div>
  );
}
