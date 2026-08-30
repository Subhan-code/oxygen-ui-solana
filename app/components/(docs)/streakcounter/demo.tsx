"use client";

import React from "react";
import { StreakCounter } from "@/components/ui/streak-counter";

export default function Demo() {
  return (
    <div className="flex min-h-[420px] w-full items-center justify-center p-6">
      <StreakCounter />
    </div>
  );
}
