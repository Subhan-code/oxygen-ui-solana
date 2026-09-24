"use client";

import React, { useState } from "react";
import { MultiWalletSwitcher, type WalletOption } from "@/components/ui/multi-wallet-switcher";

export default function Demo() {
  const [selectedWallet, setSelectedWallet] = useState<string>("phantom");

  return (
    <div className="flex min-h-[520px] w-full flex-col items-center justify-center p-6 gap-3">
      <MultiWalletSwitcher
        activeId={selectedWallet}
        onSelectWallet={(w: WalletOption) => setSelectedWallet(w.id)}
      />
    </div>
  );
}
