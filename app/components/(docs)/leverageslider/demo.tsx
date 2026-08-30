"use client";

import React from "react";
import { LeverageSlider } from "@/components/ui/leverage-slider";

export default function Demo() {
  return (
    <div className="flex min-h-[640px] w-full items-center justify-center p-6">
      <div className="w-full max-w-md">
        <LeverageSlider max={20} defaultValue={[5]} />
      </div>
    </div>
  );
}