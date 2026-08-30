"use client";

import React from "react";
import { TrendBadge } from "@/components/ui/trend-badge";

export default function Demo() {
  return (
    <div className="flex min-h-[640px] w-full items-center justify-center gap-4 p-6">
      <TrendBadge trend="up">+14.2%</TrendBadge>
      <TrendBadge trend="down">-5.8%</TrendBadge>
    </div>
  );
}