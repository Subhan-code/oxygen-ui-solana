"use client";

import React, { useState } from "react";
import { NeonStatusBadge, type NeonBadgeState } from "@/components/ui/neon-status-badge";

export default function Demo() {
  const [state, setState] = useState<NeonBadgeState>("success");

  return (
    <div className="flex min-h-[360px] w-full flex-col items-center justify-center p-6">
      <NeonStatusBadge state={state} onStateChange={setState} />
    </div>
  );
}
