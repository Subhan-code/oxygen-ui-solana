"use client";

import React from "react";
import { SolanaPayButton } from "@/components/ui/solana-pay-button";

export default function Demo() {
  return (
    <div className="flex min-h-[420px] w-full items-center justify-center p-6">
      <SolanaPayButton />
    </div>
  );
}
