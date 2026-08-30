"use client";

import { LogoCarousel } from "@/components/ui/logo-carousel";

export function Demo() {
  const brands = [
    { name: "Next.js", badge: "FRAMEWORK" },
    { name: "Solana", badge: "CHAIN" },
    { name: "React", badge: "LIBRARY" },
    { name: "Tailwind", badge: "CSS" },
    { name: "TypeScript", badge: "LANG" },
    { name: "Framer", badge: "MOTION" },
  ];

  return (
    <div className="flex min-h-[360px] w-full flex-col items-center justify-center p-6">
      <LogoCarousel
        items={brands}
        count={3}
        interval={3000}
      >
        {(item) => (
          <div className="flex items-center gap-2 rounded-2xl bg-white px-5 py-3 shadow-md border border-zinc-200/80 dark:bg-zinc-900 dark:border-zinc-800">
            <span className="text-sm font-bold text-zinc-900 dark:text-white">{item.name}</span>
            <span className="rounded-md bg-blue-100 px-1.5 py-0.5 text-[10px] font-bold text-blue-600 dark:bg-blue-950 dark:text-blue-400">
              {item.badge}
            </span>
          </div>
        )}
      </LogoCarousel>
    </div>
  );
}
