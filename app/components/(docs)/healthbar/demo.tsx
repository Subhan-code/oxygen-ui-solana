"use client";

import React from "react";
import { HealthBar } from "@/components/ui/sol/health-bar";

export default function Demo() {
  return (
    <div className="flex min-h-[300px] w-full max-w-md items-center justify-center p-6 bg-zinc-950/40 rounded-2xl">
      <HealthBar value={78} />
    </div>
  );
}
