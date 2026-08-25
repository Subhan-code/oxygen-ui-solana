"use client";

import React from "react";
import { StatCard } from "@/components/ui/sol/stat-card";

export default function Demo() {
  return (
    <div className="flex min-h-[300px] w-full max-w-xs items-center justify-center p-6 bg-zinc-950/40 rounded-2xl">
      <StatCard label="Total Volume" value="$1.24B" trend="up" />
    </div>
  );
}
