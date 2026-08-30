"use client";

import React from "react";
import { TransactionReceipt } from "@/components/ui/transaction-receipt";

export default function Demo() {
  return (
    <div className="flex min-h-[420px] w-full items-center justify-center p-6">
      <TransactionReceipt />
    </div>
  );
}
