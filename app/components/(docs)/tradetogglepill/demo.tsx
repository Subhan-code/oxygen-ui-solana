"use client";

import React, { useState } from "react";
import {
  TradeTogglePill,
  type TradeToggleSide,
  type TradeToggleColorScheme,
} from "@/components/ui/trade-toggle-pill";

export default function Demo() {
  const [side1, setSide1] = useState<TradeToggleSide>("buy");
  const [side2, setSide2] = useState<TradeToggleSide>("sell");
  const [side3, setSide3] = useState<TradeToggleSide>("buy");
  const [activeTab, setActiveTab] = useState<TradeToggleColorScheme>("duo");

  return (
    <div className="flex min-h-[420px] w-full flex-col items-center justify-center gap-8 p-6 select-none">
      {/* Color Scheme Picker Tabs */}
      <div className="flex items-center gap-2 rounded-xl bg-black/5 dark:bg-white/10 p-1 border border-black/10 dark:border-white/10">
        {(["green", "blue", "duo"] as TradeToggleColorScheme[]).map((scheme) => (
          <button
            key={scheme}
            type="button"
            onClick={() => setActiveTab(scheme)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
              activeTab === scheme
                ? "bg-foreground text-background shadow-xs font-bold"
                : "text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5"
            }`}
          >
            {scheme === "duo" ? "Red & Green Mix" : `${scheme} theme`}
          </button>
        ))}
      </div>

      {/* Segmented Mode */}
      <div className="flex flex-col items-center gap-3">
        <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
          Segmented Mode ({activeTab})
        </span>
        <TradeTogglePill
          colorScheme={activeTab}
          value={activeTab === "green" ? side1 : activeTab === "blue" ? side2 : side3}
          onChange={(s) => {
            if (activeTab === "green") setSide1(s);
            else if (activeTab === "blue") setSide2(s);
            else setSide3(s);
          }}
        />
      </div>

      {/* Split Dual Pill Mode */}
      <div className="flex flex-col items-center gap-3">
        <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
          Split Capsule Mode ({activeTab})
        </span>
        <TradeTogglePill
          variant="split"
          colorScheme={activeTab}
          value={activeTab === "green" ? side1 : activeTab === "blue" ? side2 : side3}
          onChange={(s) => {
            if (activeTab === "green") setSide1(s);
            else if (activeTab === "blue") setSide2(s);
            else setSide3(s);
          }}
        />
      </div>
    </div>
  );
}
