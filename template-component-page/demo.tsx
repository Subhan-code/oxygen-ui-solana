"use client";

import React, { useState } from "react";
import { SampleComponent } from "./sample-component";

export default function Demo() {
  const [badgeText, setBadgeText] = useState("Live Metric");

  return (
    <div className="flex min-h-[500px] w-full flex-col items-center justify-center gap-6 p-6">
      {/* Interactive Controls Bar */}
      <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-4 py-2 shadow-xs backdrop-blur-md dark:border-white/15 dark:bg-white/10">
        <button
          type="button"
          onClick={() => setBadgeText("Live Metric")}
          className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
            badgeText === "Live Metric"
              ? "bg-sky-500 text-white"
              : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
          }`}
        >
          Default State
        </button>
        <button
          type="button"
          onClick={() => setBadgeText("High Priority")}
          className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
            badgeText === "High Priority"
              ? "bg-sky-500 text-white"
              : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
          }`}
        >
          Custom Badge
        </button>
      </div>

      {/* Component Display */}
      <SampleComponent
        title="Apple Pro Primitive"
        description="A glassmorphic interactive card built with spring physics."
        badgeText={badgeText}
      />
    </div>
  );
}
