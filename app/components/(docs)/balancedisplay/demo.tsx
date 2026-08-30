"use client";

import React from "react";
import { BalanceDisplay } from "@/components/ui/balance-display";

export default function Demo() {
  return (
    <div className="flex min-h-[420px] w-full items-center justify-center p-6">
      <BalanceDisplay />
    </div>
  );
}
