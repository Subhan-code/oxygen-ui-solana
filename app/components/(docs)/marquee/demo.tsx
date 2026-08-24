"use client";

import { Marquee } from "@/components/ui/marquee";

export function Demo() {
  const logos = ["Solana", "Ethereum", "Bitcoin", "Aave", "Uniswap", "Polygon", "Base", "Arbitrum"];

  return (
    <div className="flex min-h-[360px] w-full flex-col items-center justify-center gap-8 p-6 transition-all duration-300">
      {/* Horizontal Marquee */}
      <div className="w-full max-w-xl rounded-2xl bg-zinc-100 p-4 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
        <Marquee duration={15} pauseOnHover className="gap-8">
          {logos.map((logo, idx) => (
            <span key={idx} className="mx-4 text-sm font-semibold text-zinc-800 dark:text-zinc-200">
              {logo}
            </span>
          ))}
        </Marquee>
      </div>

      {/* Vertical Marquee */}
      <div className="h-32 w-64 rounded-2xl bg-zinc-100 p-4 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
        <Marquee direction="up" duration={10} pauseOnHover className="gap-2">
          {logos.map((logo, idx) => (
            <div key={idx} className="py-1 text-xs font-semibold text-blue-500">
              ⚡ {logo} Protocol
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  );
}
