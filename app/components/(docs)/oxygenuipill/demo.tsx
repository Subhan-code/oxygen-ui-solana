"use client";

import React, { useState } from "react";
import { OxygenUiPill } from "@/components/ui/oxygen-ui-pill";

export default function Demo() {
  const [clicked, setClicked] = useState(false);

  return (
    <div className="flex min-h-[380px] w-full flex-col items-center justify-center gap-4 rounded-3xl p-6 sm:p-10">
      <OxygenUiPill
        onClick={() => {
          setClicked(true);
          setTimeout(() => setClicked(false), 1500);
        }}
      />

      {clicked && (
        <span className="text-xs font-mono text-[#0066FF] animate-pulse">
          Oxygen UI Activated!
        </span>
      )}
    </div>
  );
}
