"use client";

import { useState } from "react";
import { GlassFilter } from "@/components/ui/glass-filter";
import { motion } from "motion/react";

export function Demo() {
  const [active, setActive] = useState(true);

  return (
    <div className="flex min-h-[360px] w-full flex-col items-center justify-center gap-6 p-6 transition-all duration-300">
      <GlassFilter id="demo-radio-glass" scale={35} />

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setActive(!active)}
          className="rounded-full bg-blue-600 px-4 py-2 text-xs font-semibold text-white transition-transform active:scale-95 cursor-pointer shadow-md"
        >
          {active ? "Disable Glass Refraction" : "Enable Glass Refraction"}
        </button>
      </div>

      <motion.div
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.96 }}
        style={{
          filter: active ? "url(#demo-radio-glass)" : "none",
          transition: "filter 200ms ease-out",
        }}
        className="relative flex h-48 w-80 flex-col items-center justify-center rounded-3xl bg-white/75 p-6 text-center text-zinc-950 shadow-2xl border border-white/50 backdrop-blur-xl dark:bg-zinc-900/75 dark:text-white dark:border-zinc-800/80 cursor-pointer select-none"
      >
        <span className="text-xl font-bold tracking-tight leading-tight">
          SVG Glass Refraction
        </span>
        <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400 font-mono">
          Applies optical fractal turbulence displacement filter (`#demo-radio-glass`)
        </p>
      </motion.div>
    </div>
  );
}
