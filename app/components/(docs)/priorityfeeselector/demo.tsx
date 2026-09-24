"use client";

import * as React from "react";
import { PriorityFeeSelector, type FeeTier } from "@/components/ui/priority-fee-selector";

export default function Demo() {
  const [tier, setTier] = React.useState<FeeTier>("medium");

  return (
    <div className="flex min-h-[380px] w-full items-center justify-center p-6 select-none font-sans">
      <div className="w-full max-w-sm">
        <PriorityFeeSelector
          tier={tier}
          onChange={(newTier) => setTier(newTier)}
        />
      </div>
    </div>
  );
}
