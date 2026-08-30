"use client";

import React from "react";
import { DynamicIslandStatus } from "@/components/ui/dynamic-island-status";

export default function Demo() {
  return (
    <div className="flex min-h-[380px] w-full flex-col items-center justify-center p-6">
      <DynamicIslandStatus />
    </div>
  );
}
