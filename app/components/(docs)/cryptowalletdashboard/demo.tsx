"use client";

import React from "react";
import { CryptoWalletDashboard } from "@/components/ui/crypto-wallet-dashboard";

export default function Demo() {
  return (
    <div className="flex min-h-[600px] w-full items-center justify-center p-6 bg-zinc-950 transition-all duration-300">
      <CryptoWalletDashboard />
    </div>
  );
}
