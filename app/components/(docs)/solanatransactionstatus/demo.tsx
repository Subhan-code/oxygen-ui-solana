"use client";

import React from "react";
import { SolanaTransactionStatus } from "@/components/ui/solana-transaction-status";

export default function Demo() {
  return (
    <div className="flex min-h-[500px] w-full items-center justify-center p-6">
      <SolanaTransactionStatus status="finalized" amountSol={1.5} recipient="9aXy...2bCd" />
    </div>
  );
}
