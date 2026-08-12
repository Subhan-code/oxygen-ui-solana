"use client";

import React from "react";
import { CryptoTokenDetailsScreen } from "@/components/ui/crypto-token-details-screen";

export default function Demo() {
  return (
    <div className="flex min-h-[600px] w-full items-center justify-center p-6 bg-zinc-950">
      <CryptoTokenDetailsScreen />
    </div>
  );
}
