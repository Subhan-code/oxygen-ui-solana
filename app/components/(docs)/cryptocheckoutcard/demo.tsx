"use client";

import CryptoCheckoutCard from "@/components/ui/crypto-checkout-card";

export function Demo() {
  return (
    <div className="flex min-h-[400px] w-full flex-col items-center justify-center p-6 bg-zinc-50 dark:bg-zinc-950 rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 select-none transition-all duration-300">
      <CryptoCheckoutCard />
    </div>
  );
}
