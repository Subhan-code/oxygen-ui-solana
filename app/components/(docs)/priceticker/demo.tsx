"use client";

import React from "react";
import { PriceTicker } from "@/components/ui/price-ticker";

export default function Demo() {
  return (
    <div className="flex min-h-[420px] w-full items-center justify-center p-6">
      <PriceTicker />
    </div>
  );
}
