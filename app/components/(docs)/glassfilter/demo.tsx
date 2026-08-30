"use client";

import { useState } from "react";
import { GlassFilter } from "@/components/ui/glass-filter";
import { Sparkles, ShieldCheck, Cpu } from "lucide-react";

export function Demo() {
  const [variant, setVariant] = useState<"liquid" | "frosted" | "neon" | "aurora">("liquid");

  return (
    <div className="flex min-h-[380px] w-full flex-col items-center justify-center gap-6 p-6 transition-all duration-300">
      {/* Variant selector buttons */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {(["liquid", "frosted", "neon", "aurora"] as const).map((v) => (
          <button
            key={v}
            type="button"
            onClick={() => setVariant(v)}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold capitalize transition-all cursor-pointer ${
              variant === v
                ? "bg-sky-500 text-white shadow-md shadow-sky-500/20 scale-105"
                : "bg-black/5 dark:bg-white/10 text-muted-foreground hover:text-foreground"
            }`}
          >
            {v} Glass
          </button>
        ))}
      </div>

      {/* Glass Filter Card Preview */}
      <GlassFilter variant={variant} className="w-80 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex size-9 items-center justify-center rounded-xl bg-sky-500/10 text-sky-500 border border-sky-500/20">
              <Sparkles className="size-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold tracking-tight">Liquid Glass Filter</h4>
              <p className="text-[11px] font-mono text-muted-foreground">Refraction Surface</p>
            </div>
          </div>
          <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-500 border border-emerald-500/20">
            Active
          </span>
        </div>

        <div className="rounded-2xl bg-black/5 dark:bg-white/5 p-3 text-xs space-y-2 border border-black/5 dark:border-white/5">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="size-3.5" /> Refraction
            </span>
            <span className="font-mono font-semibold text-foreground">Optics Active</span>
          </div>
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Cpu className="size-3.5" /> Surface Style
            </span>
            <span className="font-mono font-semibold text-foreground">Crisp Glass</span>
          </div>
        </div>
      </GlassFilter>
    </div>
  );
}

export default Demo;

