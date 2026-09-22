"use client";

import React, { useState } from "react";
import { ProgressRing } from "@/components/ui/progress-ring";

export default function Demo() {
  const [val, setVal] = useState(72);

  return (
    <div className="flex min-h-[460px] w-full flex-col items-center justify-center gap-8 p-6 font-sans select-none">
      <div className="flex flex-wrap items-center justify-center gap-8">
        <ProgressRing value={val} label="Epoch Progress" colorPreset="sky" />
        <ProgressRing value={88} label="Validator Sync" colorPreset="emerald" />
        <ProgressRing value={45} label="Staking Quorum" colorPreset="amber" />
      </div>

      <div className="flex items-center gap-3 pt-4 border-t border-zinc-200 dark:border-zinc-800">
        <button
          type="button"
          onClick={() => setVal((prev) => Math.max(prev - 10, 0))}
          className="px-3 py-1.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs font-semibold hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
        >
          - 10%
        </button>
        <button
          type="button"
          onClick={() => setVal((prev) => Math.min(prev + 10, 100))}
          className="px-3 py-1.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs font-semibold hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
        >
          + 10%
        </button>
      </div>
    </div>
  );
}
