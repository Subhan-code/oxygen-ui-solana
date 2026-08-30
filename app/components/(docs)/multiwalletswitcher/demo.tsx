"use client";

import React from "react";
import { MultiWalletSwitcher } from "@/components/ui/multi-wallet-switcher";

export default function Demo() {
  return (
    <div className="flex min-h-[420px] w-full items-center justify-center p-6">
      <MultiWalletSwitcher />
    </div>
  );
}
