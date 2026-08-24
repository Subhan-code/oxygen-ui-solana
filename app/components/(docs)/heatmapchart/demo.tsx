"use client";

import React from "react";
import { HeatmapChart } from "@/components/ui/heatmap-chart";

export default function Demo() {
  return (
    <div className="flex min-h-[500px] w-full flex-col items-center justify-center p-4 transition-all duration-300">
      <HeatmapChart weeks={28} />
    </div>
  );
}
