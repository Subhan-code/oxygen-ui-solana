"use client";

import React from "react";
import { TxnTable } from "@/components/ui/txn-table";

export default function Demo() {
  return (
    <div className="flex min-h-[640px] w-full items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        <TxnTable
          transactions={[
            { signature: "5K...9A", timestamp: new Date("2026-01-01T12:00:00Z"), action: "Swap", token: "SOL", amount: "5.0" },
            { signature: "3M...7B", timestamp: new Date("2026-01-01T11:00:00Z"), action: "Transfer", token: "USDC", amount: "100.0" }
          ]}
        />
      </div>
    </div>
  );
}