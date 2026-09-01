"use client";

import React from "react";
import { Toaster, txnToast, toast } from "@/components/ui/txn-toast";

export default function Demo() {
  const triggerPendingToast = () => {
    const toastId = txnToast({
      status: "pending",
      title: "Confirming Transaction",
      description: "Submitting to Solana TPU pipeline...",
    });

    setTimeout(() => {
      txnToast.update(toastId, {
        status: "confirmed",
        title: "Transaction Confirmed!",
        description: "Block #294012953 finalized in 380ms",
        signature: "5Kx9A87zTXJSDpbD5jBkheTqA83TZRuJosgAsU991",
      });
    }, 2500);
  };

  const triggerSuccessToast = () => {
    txnToast({
      status: "confirmed",
      title: "Swapped 10 SOL for 1,842 USDC",
      signature: "4zMm8x9Q2CW87d97TXJSDpbD5jBkheTqA83TZRuJ",
    });
  };

  const triggerStandardSonnerToast = () => {
    toast("Event Notification", {
      description: "Sunday, December 03, 2023 at 9:00 AM",
      action: {
        label: "Undo",
        onClick: () => console.log("Undo"),
      },
    });
  };

  return (
    <div className="flex flex-col min-h-[460px] w-full items-center justify-center p-8 gap-6 font-sans select-none">
      <Toaster position="top-right" theme="dark" />

      <div className="flex flex-col items-center gap-3 w-full max-w-md">
        <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Web3 Txn Toast</span>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={triggerPendingToast}
            className="px-3.5 py-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 dark:text-amber-300 border border-amber-500/20 rounded-xl text-xs font-semibold shadow-xs transition-all cursor-pointer"
          >
            ⏳ Async Txn
          </button>
          <button
            type="button"
            onClick={triggerSuccessToast}
            className="px-3.5 py-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 border border-emerald-500/20 rounded-xl text-xs font-semibold shadow-xs transition-all cursor-pointer"
          >
            ✅ Success Txn
          </button>
        </div>
      </div>

      <div className="flex flex-col items-center gap-3 pt-6 border-t border-zinc-200 dark:border-zinc-800 w-full max-w-md">
        <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Standard Sonner Toast</span>
        <button
          type="button"
          onClick={triggerStandardSonnerToast}
          className="px-4 py-2 bg-sky-500/10 hover:bg-sky-500/20 text-sky-600 dark:text-sky-300 border border-sky-500/20 rounded-xl text-xs font-semibold shadow-xs transition-all cursor-pointer"
        >
          🔔 Trigger Sonner Toast
        </button>
      </div>
    </div>
  );
}