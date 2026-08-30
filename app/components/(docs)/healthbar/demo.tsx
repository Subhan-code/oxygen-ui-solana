"use client";

import React from "react";
import { HealthBar } from "@/components/ui/health-bar";

export default function Demo() {
  return (
    <div className="flex min-h-[640px] w-full items-center justify-center p-6">
      <div className="w-full max-w-sm flex flex-col gap-6">
        <HealthBar value={85} label="Health Factor" />
        <HealthBar value={35} label="At Risk Health Factor" />
      </div>
    </div>
  );
}