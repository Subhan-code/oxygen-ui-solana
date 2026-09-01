"use client";

import React from "react";
import { Skiper37 } from "@/components/ui/animated-number-flow";

export default function Demo() {
  return (
    <div className="flex min-h-[600px] w-full items-center justify-center p-6 bg-zinc-950 rounded-3xl border border-zinc-800">
      <Skiper37 activeVariant="all" className="max-w-2xl" />
    </div>
  );
}
