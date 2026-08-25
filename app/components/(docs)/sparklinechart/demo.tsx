"use client";

import React from "react";
import { SparklineChart } from "@/components/ui/sol/sparkline-chart";

export default function Demo() {
  const series = [{ time: "1", value: 10 }, { time: "2", value: 15 }, { time: "3", value: 12 }, { time: "4", value: 20 }];
  return (
    <div className="flex min-h-[300px] w-full max-w-xs items-center justify-center p-6 bg-zinc-950/40 rounded-2xl">
      <SparklineChart series={series as any} />
    </div>
  );
}
