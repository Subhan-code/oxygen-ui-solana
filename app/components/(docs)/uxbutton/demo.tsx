"use client";

import React, { useState } from "react";
import { UxSolButton, type UxSolButtonVariant, type UxSolButtonSize } from "@/components/uxdotsol/components/button";

export default function Demo() {
  const [selectedVariant, setSelectedVariant] = useState<UxSolButtonVariant>("destructive");
  const [size, setSize] = useState<UxSolButtonSize>("md");

  const variants: UxSolButtonVariant[] = [
    "primary",
    "secondary",
    "outline",
    "ghost",
    "destructive",
    "success",
  ];

  return (
    <div className="flex min-h-[360px] w-full flex-col items-center justify-center gap-8 p-6">
      <div className="flex flex-wrap items-center justify-center gap-3">
        {variants.map((v) => (
          <UxSolButton
            key={v}
            variant={v}
            size={size}
            onClick={() => setSelectedVariant(v)}
            className={selectedVariant === v ? "ring-2 ring-emerald-500 ring-offset-2 ring-offset-background" : ""}
          >
            {v.charAt(0).toUpperCase() + v.slice(1)}
            {selectedVariant === v ? " selected" : ""}
          </UxSolButton>
        ))}
      </div>

      <div className="flex items-center gap-2 pt-4 border-t border-black/10 dark:border-white/10">
        <span className="text-xs text-muted-foreground mr-2 font-medium">Size:</span>
        {(["sm", "md", "lg"] as UxSolButtonSize[]).map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setSize(s)}
            className={`px-3 py-1 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
              size === s
                ? "bg-foreground text-background font-bold shadow-xs"
                : "bg-black/5 dark:bg-white/10 text-muted-foreground hover:bg-black/10 dark:hover:bg-white/15 hover:text-foreground"
            }`}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}
