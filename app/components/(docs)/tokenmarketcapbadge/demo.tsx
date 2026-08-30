"use client";

import React from "react";
import { TokenMarketCapBadge } from "@/components/ui/token-market-cap-badge";

export default function Demo() {
  return (
    <div className="flex min-h-[420px] w-full items-center justify-center p-6">
      <TokenMarketCapBadge />
    </div>
  );
}
