"use client";

import React from "react";
import { CryptoWalletDrawer } from "@/components/ui/crypto-wallet-drawer";

export default function Demo() {
  return (
    <div className="flex min-h-[500px] w-full items-center justify-center p-6 bg-zinc-950">
      <CryptoWalletDrawer />
    </div>
  );
}
