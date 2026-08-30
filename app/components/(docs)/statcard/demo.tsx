"use client";

import React from "react";
import { StatCard } from "@/components/ui/stat-card";

export default function Demo() {
  return (
    <div className="flex min-h-[640px] w-full items-center justify-center p-6">
      <div className="w-full max-w-xs">
        <StatCard label="Total Value Locked" value="$482.5M" change="+8.4%" />
      </div>
    </div>
  );
}