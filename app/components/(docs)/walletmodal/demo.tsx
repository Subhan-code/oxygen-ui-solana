"use client";

import React from "react";
import { WalletModal } from "@/components/ui/wallet-modal";

export default function Demo() {
  return (
    <div className="flex min-h-[420px] w-full items-center justify-center p-6">
      <WalletModal isOpen={true} onClose={() => {}} />
    </div>
  );
}
