"use client";

import React, { useState } from "react";
import { RefreshCw } from "lucide-react";
import { HeroTextTransition } from "@/components/ui/hero-text-transition";

export default function Demo() {
  const [key, setKey] = useState(0);

  return (
    <div className="flex min-h-[500px] w-full flex-col items-center justify-center gap-8 p-6">
      <HeroTextTransition
        key={key}
        headline="Craft Premium Solana Frontends in Minutes."
        sub="Oxygen UI is an open-source React component library built for Solana applications. Integrate wallet account interfaces, token displays, transaction status flows, and network states seamlessly."
      >
        <button
          type="button"
          onClick={() => setKey((k) => k + 1)}
          className="flex items-center gap-2 rounded-2xl bg-black/90 px-5 py-2.5 text-xs font-semibold text-white shadow-xs transition-transform active:scale-95 dark:bg-white dark:text-zinc-900"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          <span>Replay Entrance Animation</span>
        </button>
      </HeroTextTransition>
    </div>
  );
}
