"use client";

import React from "react";
import { CommandPalette } from "@/components/ui/command-palette";

export default function Demo() {
  return (
    <div className="flex min-h-[460px] w-full flex-col items-center justify-center p-6 gap-4 transition-all duration-300">
      <CommandPalette />
      <p className="text-xs text-muted-foreground font-mono">Press ⌘K or click to open the palette</p>
    </div>
  );
}
