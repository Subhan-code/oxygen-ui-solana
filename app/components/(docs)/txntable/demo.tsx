"use client";

import React from "react";
import { TxnTable } from "@/components/ui/sol/txn-table";

const SOL_ICON =
  "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png";
const USDC_ICON =
  "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png";

export default function Demo() {
  const transactions = [
    {
      signature: "5UfDq3kPmE8yR4vN7bXjT2wZcA9fGhL6nKpQrS1dM8xY",
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      action: "Swap SOL to USDC",
      token: "SOL",
      tokenIcon: SOL_ICON,
      amount: "5.0 SOL",
      value: "$812.80",
    },
    {
      signature: "3KjN8bXvP4wZ1cQ9mR7vT2yL5fGhJ4nKpQrS9dM3xW",
      timestamp: new Date(Date.now() - 35 * 60 * 1000),
      action: "Deposit USDC",
      token: "USDC",
      tokenIcon: USDC_ICON,
      amount: "1,500.00 USDC",
      value: "$1,500.00",
    },
  ];

  return (
    <div className="flex min-h-[450px] w-full items-center justify-center p-6 bg-zinc-950/40 rounded-2xl overflow-auto">
      <TxnTable transactions={transactions} />
    </div>
  );
}
