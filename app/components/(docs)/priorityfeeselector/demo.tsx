"use client";

import React from "react";
import { PriorityFeeSelector } from "@/components/ui/priority-fee-selector";

export default function Demo() {
  return (
    <div className="flex min-h-[420px] w-full items-center justify-center p-6">
      <PriorityFeeSelector />
    </div>
  );
}
