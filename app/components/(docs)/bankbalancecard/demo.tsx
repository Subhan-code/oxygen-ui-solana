"use client";

import React from "react";
import { BankBalanceCard } from "@/components/ui/bank-balance-card";

export default function Demo() {
  return (
    <div className="flex min-h-[460px] w-full items-center justify-center p-6 bg-zinc-950 rounded-3xl border border-zinc-800">
      <BankBalanceCard />
    </div>
  );
}
