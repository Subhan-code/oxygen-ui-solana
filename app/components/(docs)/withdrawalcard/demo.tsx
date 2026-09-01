"use client";

import React from "react";
import { WithdrawalCard } from "@/components/ui/withdrawal-card";

export default function Demo() {
  return (
    <div className="flex min-h-[520px] w-full items-center justify-center p-6 bg-zinc-950 rounded-3xl border border-zinc-800">
      <WithdrawalCard />
    </div>
  );
}
