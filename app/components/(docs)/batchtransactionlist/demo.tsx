"use client";

import React from "react";
import { BatchTransactionList } from "@/components/ui/batch-transaction-list";

export default function Demo() {
  return (
    <div className="flex min-h-[420px] w-full items-center justify-center p-6">
      <BatchTransactionList />
    </div>
  );
}
