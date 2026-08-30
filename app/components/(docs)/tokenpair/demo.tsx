"use client";

import React from "react";
import { TokenPair } from "@/components/ui/token-pair";

export default function Demo() {
  return (
    <div className="flex min-h-[420px] w-full items-center justify-center p-6">
      <TokenPair />
    </div>
  );
}
