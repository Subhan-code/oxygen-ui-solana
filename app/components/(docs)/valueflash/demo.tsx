"use client";

import React, { useState } from "react";
import { ValueFlash, useValueFlash } from "@/components/ui/value-flash";
import { TrendingUp, TrendingDown } from "lucide-react";

export default function Demo() {
  const [val, setVal] = useState(1172);

  const usd = (n: number) => n.toLocaleString("en-US");

  return (
    <div className="flex min-h-[440px] w-full flex-col items-center justify-center p-6 bg-zinc-950 rounded-3xl border border-zinc-800 font-sans select-none">
      <div className="w-full max-w-sm rounded-2xl border border-zinc-800 bg-zinc-900/90 p-5 shadow-2xl space-y-5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-zinc-400">Requests per second</span>
          <ValueFlash value={val} format={usd} label="RPS" hold={1200} />
        </div>

        <div className="grid grid-cols-4 gap-2 pt-2 border-t border-zinc-800">
          <button
            type="button"
            onClick={() => setVal((v) => v - 120)}
            className="flex items-center justify-center py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-xs font-bold font-mono text-red-400 border border-red-500/20 transition-all cursor-pointer"
          >
            -120
          </button>
          <button
            type="button"
            onClick={() => setVal((v) => v - 17)}
            className="flex items-center justify-center py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-xs font-bold font-mono text-red-400 border border-red-500/20 transition-all cursor-pointer"
          >
            -17
          </button>
          <button
            type="button"
            onClick={() => setVal((v) => v + 25)}
            className="flex items-center justify-center py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-xs font-bold font-mono text-emerald-400 border border-emerald-500/20 transition-all cursor-pointer"
          >
            +25
          </button>
          <button
            type="button"
            onClick={() => setVal((v) => v + 140)}
            className="flex items-center justify-center py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-xs font-bold font-mono text-emerald-400 border border-emerald-500/20 transition-all cursor-pointer"
          >
            +140
          </button>
        </div>
      </div>
    </div>
  );
}
