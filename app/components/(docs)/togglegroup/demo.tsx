"use client";

import React from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export default function Demo() {
  return (
    <div className="flex min-h-[420px] w-full items-center justify-center p-6">
      <ToggleGroup type="single" defaultValue="sol">
        <ToggleGroupItem value="sol">SOL</ToggleGroupItem>
        <ToggleGroupItem value="usdc">USDC</ToggleGroupItem>
        <ToggleGroupItem value="bonk">BONK</ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}
