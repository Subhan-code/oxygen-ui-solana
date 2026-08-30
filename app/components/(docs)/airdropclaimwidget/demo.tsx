"use client";

import React from "react";
import { AirdropClaimWidget } from "@/components/ui/airdrop-claim-widget";

export default function Demo() {
  return (
    <div className="flex min-h-[420px] w-full items-center justify-center p-6">
      <AirdropClaimWidget />
    </div>
  );
}
