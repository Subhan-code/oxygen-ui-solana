"use client";

import React from "react";
import { TrendBadge } from "@/components/ui/sol/trend-badge";

export default function Demo() {
  return (
    <div className="flex min-h-[450px] w-full items-center justify-center p-6 bg-zinc-950/40 rounded-2xl transition-all duration-300">
      <TrendBadge />
    </div>
  );
}
