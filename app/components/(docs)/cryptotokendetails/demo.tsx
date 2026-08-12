"use client";

import React from "react";
import { CryptoTokenDetails } from "@/components/ui/crypto-token-details";

export default function Demo() {
  return (
    <div className="flex min-h-[600px] w-full items-center justify-center p-6 bg-zinc-950">
      <CryptoTokenDetails />
    </div>
  );
}
