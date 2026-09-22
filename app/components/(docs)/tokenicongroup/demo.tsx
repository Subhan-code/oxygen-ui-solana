"use client";

import React from "react";
import { TokenIconGroup } from "@/components/ui/token-icon-group";

export default function Demo() {
  return (
    <div className="flex min-h-[640px] w-full items-center justify-center p-6">
      <TokenIconGroup
        tokens={[
          { src: "/tokens/sol.svg", alt: "SOL" },
          { src: "/tokens/usdc.svg", alt: "USDC" },
        ]}
      />
    </div>
  );
}