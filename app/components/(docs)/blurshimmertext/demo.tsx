"use client";

import React from "react";
import { BlurShimmerText } from "@/components/ui/blur-shimmer-text";

export default function Demo() {
  return (
    <div className="flex min-h-[500px] w-full flex-col items-center justify-center gap-6 p-6">
      <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-4 py-2 text-sm font-semibold shadow-xs backdrop-blur-md dark:border-white/15 dark:bg-white/10">
        <span className="h-2.5 w-2.5 rounded-full bg-purple-500 animate-pulse" />
        <BlurShimmerText
          interval={2.5}
          blur={6}
          texts={[
            "Open-Source Solana UI Library",
            "Craft Premium Solana Frontends",
            "Solana Foundation Grant Recipient",
            "Composable Web3 React Primitives",
          ]}
          className="font-mono text-sm text-zinc-900 dark:text-white"
        />
      </div>
    </div>
  );
}
