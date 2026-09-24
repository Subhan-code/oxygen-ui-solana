"use client";

import React, { useState } from "react";
import { TogglePill } from "@/components/ui/toggle-pill";

export default function Demo() {
  const [checked, setChecked] = useState(true);

  return (
    <div className="flex min-h-[320px] w-full flex-col items-center justify-center gap-6 p-6 select-none font-sans">
      <div className="flex flex-col items-center justify-between rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-900 p-6 shadow-sm text-white max-w-xs w-full">
        <div className="flex items-center justify-between w-full">
          <div className="flex flex-col">
            <span className="text-sm font-bold text-white">Monochrome</span>
            <span className="text-xs text-zinc-400">Black and White</span>
          </div>

          <TogglePill
            variant="monochrome-dark"
            checked={checked}
            onChange={setChecked}
          />
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-zinc-800 pt-3 text-xs font-mono text-zinc-400 w-full">
          <span>State: <strong className="text-white">{checked ? "ACTIVE" : "INACTIVE"}</strong></span>
          <span>Shift: <strong className="text-sky-400">{checked ? "24px" : "0px"}</strong></span>
        </div>
      </div>
    </div>
  );
}
