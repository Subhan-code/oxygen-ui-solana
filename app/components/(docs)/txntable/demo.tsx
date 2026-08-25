"use client";

import React from "react";
import { TxnTable } from "@/components/ui/sol/txn-table";

export default function Demo() {
  const txns = [
    { id: "1", type: "Swap", token: "SOL", amount: "5.0", value: "$900", time: "5m ago", status: "success", txHash: "7xKX..." }
  ];
  return (
    <div className="flex min-h-[450px] w-full items-center justify-center p-6 bg-zinc-950/40 rounded-2xl">
      <TxnTable transactions={txns as any} />
    </div>
  );
}
