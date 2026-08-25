"use client";

import React from "react";
import { LeverageSlider } from "@/components/ui/sol/leverage-slider";

export default function Demo() {
  return (
    <div className="flex min-h-[450px] w-full items-center justify-center p-6 bg-zinc-950/40 rounded-2xl transition-all duration-300">
      <LeverageSlider />
    </div>
  );
}
