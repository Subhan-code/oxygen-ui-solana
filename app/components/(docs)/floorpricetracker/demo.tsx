"use client";

import React from "react";
import { FloorPriceTracker } from "@/components/ui/floor-price-tracker";

export default function Demo() {
  return (
    <div className="flex min-h-[420px] w-full items-center justify-center p-6">
      <FloorPriceTracker />
    </div>
  );
}
