"use client";

import * as React from "react";
import { SolanaTransactionStatus, type TransactionStep } from "@/components/ui/solana-transaction-status";

export default function Demo() {
  const [step, setStep] = React.useState<TransactionStep>("confirming");

  const steps: TransactionStep[] = ["sent", "confirming", "finalized", "failed"];

  return (
    <div className="flex flex-col min-h-[420px] w-full items-center justify-center p-6 gap-6 select-none font-runde">
      <SolanaTransactionStatus
        step={step}
        signature="5Kz3x9vLmP8yQ1aR2bCd9eF0"
        amountSol={1.5}
        recipient="9aXy...2bCd"
      />

      <div className="flex items-center gap-1.5 p-1 rounded-full bg-white/[0.04] border border-white/[0.06]">
        {steps.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setStep(s)}
            className={`px-3 py-1 rounded-full text-xs font-medium capitalize transition-colors cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-sky-500/40 ${
              step === s
                ? "bg-white text-zinc-950"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}
