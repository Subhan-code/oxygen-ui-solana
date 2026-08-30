"use client";

import React from "react";
import { TradeButtons } from "@/components/ui/trade-buttons";

export default function Demo() {
  return (
    <div className="flex min-h-[640px] w-full items-center justify-center p-6">
      <div className="w-64">
        <TradeButtons />
      </div>
    </div>
  );
}