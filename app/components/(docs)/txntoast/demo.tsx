"use client";

import React from "react";
import { Toaster } from "sonner";
import { txnToast } from "@/components/ui/txn-toast";

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

  const triggerErrorToast = () => {
    txnToast({
      status: "error",
      title: "Transaction Failed",
      description: "Slippage tolerance exceeded (0.5%).",
    });
  };

  return (
    <div className="flex flex-col min-h-[420px] w-full items-center justify-center p-8 gap-6">
      <Toaster position="top-right" theme="dark" />

      <div className="text-center max-w-sm">
        <h3 className="text-lg font-bold text-white tracking-tight">Solana Transaction Toast</h3>
        <p className="text-xs text-zinc-400 mt-1">
          Click any state button below to trigger dynamic interactive toast notifications with real-time status updates.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={triggerPendingToast}
          className="px-4 py-2 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 rounded-xl text-xs font-semibold shadow-lg transition-all cursor-pointer"
        >
          ⏳ Simulate Async Txn
        </button>

        <button
          type="button"
          onClick={triggerSuccessToast}
          className="px-4 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 rounded-xl text-xs font-semibold shadow-lg transition-all cursor-pointer"
        >
          ✅ Success Toast
        </button>

        <button
          type="button"
          onClick={triggerErrorToast}
          className="px-4 py-2 bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30 rounded-xl text-xs font-semibold shadow-lg transition-all cursor-pointer"
        >
          ❌ Error Toast
        </button>
      </div>
    </div>
  );
}