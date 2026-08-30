"use client";

import React from "react";
import { SlippageSelector } from "@/components/ui/slippage-selector";

export default function Demo() {
  return (
    <div className="flex min-h-[420px] w-full items-center justify-center p-6">
      <SlippageSelector />
    </div>
  );
}
