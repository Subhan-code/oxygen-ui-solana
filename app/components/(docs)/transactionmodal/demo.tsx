"use client";

import React from "react";
import { TransactionModal } from "@/components/ui/transaction-modal";

export default function Demo() {
  return (
    <div className="flex min-h-[420px] w-full items-center justify-center p-6">
      <TransactionModal isOpen={true} onClose={() => {}} />
    </div>
  );
}
