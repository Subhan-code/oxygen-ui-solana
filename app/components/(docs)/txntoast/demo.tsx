"use client";

import React from "react";
import { txnToast } from "@/components/ui/sol/txn-toast";

export default function Demo() {
  return (
    <div className="flex min-h-[300px] w-full items-center justify-center p-6 bg-zinc-950/40 rounded-2xl">
      <button
        type="button"
        onClick={() => txnToast({ title: "Transaction Confirmed" } as any)}
        className="px-4 py-2 bg-blue-600 text-white font-bold rounded-xl"
      >
        Trigger Transaction Toast
      </button>
    </div>
  );
}
