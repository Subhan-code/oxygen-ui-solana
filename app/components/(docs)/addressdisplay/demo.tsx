"use client";

import React from "react";
import { AddressDisplay, CopyButton } from "@/components/ui/address-display";

export default function Demo() {
  return (
    <div className="flex min-h-[500px] w-full flex-col items-center justify-center gap-6 p-6 select-none font-sans">
      <div className="flex flex-col items-center gap-3">
        <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Address Display</span>
        <AddressDisplay address="7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU" explorerUrl="https://solscan.io/account" />
      </div>

      <div className="flex flex-col items-center gap-3 pt-4 border-t border-zinc-200 dark:border-zinc-800 w-full max-w-sm">
        <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Copy Button</span>
        <CopyButton textToCopy="7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU" label="Copy Wallet Address" />
      </div>
    </div>
  );
}