"use client";

import React from "react";
import { FinancialMetricsGrid } from "@/components/ui/financial-metrics-grid";

export default function Demo() {
  return (
    <div className="flex min-h-[380px] w-full items-center justify-center p-4 sm:p-6">
      <FinancialMetricsGrid />
    </div>
  );
}

export { Demo };
