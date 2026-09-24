"use client";

import { Marquee } from "@/components/ui/marquee";

export function Demo() {
  const logos = ["Solana", "Ethereum", "Bitcoin", "Aave", "Uniswap", "Polygon", "Base", "Arbitrum"];

  return (
    <div className="flex min-h-[360px] w-full flex-col items-center justify-center p-6 transition-all duration-300">
      <div className="w-full max-w-xl rounded-2xl bg-zinc-100 p-4 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
        <Marquee duration={15} pauseOnHover className="gap-8">
          {logos.map((logo, idx) => (
            <span key={idx} className="mx-4 text-sm font-semibold text-zinc-800 dark:text-zinc-200">
              {logo}
            </span>
          ))}
        </Marquee>
      </div>
    </div>
  );
}
