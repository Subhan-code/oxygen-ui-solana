"use client";

import React, { useState } from "react";
import { DigitSwap } from "@/components/ui/digit-swap";

export default function Demo() {
  const [value, setValue] = useState(142.5);
  const [direction, setDirection] = useState<"up" | "down">("up");

  const increment = (delta: number) => {
    setDirection(delta > 0 ? "up" : "down");
    setValue((v) => Math.max(0, +(v + delta).toFixed(2)));
  };

  const randomize = () => {
    const next = +(Math.random() * 900 + 100).toFixed(2);
    setDirection(next > value ? "up" : "down");
    setValue(next);
  };

  return (
    <div className="flex min-h-[420px] w-full flex-col items-center justify-center gap-6 rounded-3xl bg-card p-8 text-card-foreground border border-border/50">
      <div className="flex flex-col items-center gap-2">
        <span className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
          Dynamic Value
        </span>
        <div className="flex items-center text-5xl font-extrabold tracking-tight tabular-nums text-foreground">
          <span className="text-muted-foreground mr-1">$</span>
          <DigitSwap value={value.toFixed(2)} direction={direction} duration={0.22} />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => increment(-10.25)}
          className="rounded-xl border border-border bg-background px-3.5 py-2 text-xs font-semibold hover:bg-primary/5 active:scale-95 transition-all"
        >
          - $10.25
        </button>
        <button
          type="button"
          onClick={randomize}
          className="rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/90 active:scale-95 transition-all"
        >
          Randomize
        </button>
        <button
          type="button"
          onClick={() => increment(10.25)}
          className="rounded-xl border border-border bg-background px-3.5 py-2 text-xs font-semibold hover:bg-primary/5 active:scale-95 transition-all"
        >
          + $10.25
        </button>
      </div>
    </div>
  );
}
