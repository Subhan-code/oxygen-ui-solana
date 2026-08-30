"use client";

import React, { useState } from "react";
import { StatusBadgePill, type PastelBadgeState } from "@/components/ui/status-badge-pill";

export default function Demo() {
  const [state, setState] = useState<PastelBadgeState>("add");

  return (
    <div className="flex min-h-[360px] w-full flex-col items-center justify-center p-6">
      <StatusBadgePill state={state} onStateChange={setState} />
    </div>
  );
}
