"use client";

import React from "react";
import { MultiStateBadge } from "@/components/ui/multi-state-badge";

export default function Demo() {
  return (
    <div className="flex min-h-[460px] w-full flex-col items-center justify-center p-6 gap-6 transition-all duration-300">
      <MultiStateBadge />
      <p className="text-xs text-muted-foreground font-mono">
        Click badge or state pills to animate between processing, success, and error
      </p>
    </div>
  );
}
