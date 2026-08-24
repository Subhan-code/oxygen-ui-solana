"use client";

import { FinancialMetricsGrid } from "@/components/ui/financial-metrics-grid";

export function Demo() {
  return (
    <div className="flex min-h-[460px] w-full flex-col items-center justify-center p-6 bg-zinc-100 dark:bg-zinc-900 rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 transition-all duration-300">
      <FinancialMetricsGrid />
    </div>
  );
}
