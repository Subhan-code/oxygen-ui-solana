"use client";

import React from "react";
import { Gauge } from "@/components/ui/gauge";

export default function Demo() {
  return (
    <div className="flex min-h-[500px] w-full flex-col items-center justify-center p-4 gap-8 transition-all duration-300">
      <Gauge
        value={66}
        centerValue={428000}
        defaultLabel="ARR run rate"
        prefix="$"
        orientation="arc"
      />
    </div>
  );
}
