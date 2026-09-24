"use client";

import * as React from "react";
import { Toaster, txnToast } from "@/components/ui/txn-toast";

export default function Demo() {
  const triggerPending = () => {
    txnToast({
      type: "pending",
      title: "Confirming transaction",
      signature: "5Kx9A87zTXJSDpbD5jBkheTqA83TZRuJosgAsU991",
    });
  };

  const triggerSuccess = () => {
    txnToast({
      type: "success",
      title: "Transaction confirmed",
      signature: "4zMm8x9Q2CW87d97TXJSDpbD5jBkheTqA83TZRuJ",
    });
  };

  const triggerError = () => {
    txnToast({
      type: "error",
      title: "Transaction failed",
      signature: "2xY9bM47TXJSDpbD5jBkheTqA83TZRuJosgAs781",
    });
  };

  return (
    <div className="flex flex-col min-h-[380px] w-full items-center justify-center p-8 gap-4 select-none">
      <Toaster position="top-right" theme="dark" />

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={triggerPending}
          className="px-3.5 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.04] text-[13px] text-zinc-300 hover:text-white hover:bg-white/[0.08] transition-colors cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-sky-500/40"
        >
          Pending
        </button>
        <button
          type="button"
          onClick={triggerSuccess}
          className="px-3.5 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.04] text-[13px] text-zinc-300 hover:text-white hover:bg-white/[0.08] transition-colors cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-sky-500/40"
        >
          Success
        </button>
        <button
          type="button"
          onClick={triggerError}
          className="px-3.5 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.04] text-[13px] text-zinc-300 hover:text-white hover:bg-white/[0.08] transition-colors cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-sky-500/40"
        >
          Error
        </button>
      </div>
    </div>
  );
}