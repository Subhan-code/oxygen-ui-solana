"use client";

import React from "react";
import { TokenSafetyScore } from "@/components/ui/token-safety-score";

export default function Demo() {
  return (
    <div className="flex min-h-[420px] w-full items-center justify-center p-6">
      <TokenSafetyScore />
    </div>
  );
}
