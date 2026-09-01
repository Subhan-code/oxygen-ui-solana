"use client";

import React, { useState } from "react";
import { WalletModal } from "@/components/ui/wallet-modal";

export default function Demo() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex min-h-[300px] w-full items-center justify-center p-6">
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="rounded-xl bg-purple-600 px-4 py-2 text-xs font-semibold text-white shadow-md hover:bg-purple-500 transition-colors"
      >
        Open Wallet Modal
      </button>
      <WalletModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}
