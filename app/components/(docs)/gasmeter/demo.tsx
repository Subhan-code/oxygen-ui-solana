"use client";

import React from "react";
import { GasMeter } from "@/components/ui/gas-meter";

export default function Demo() {
  return (
    <div className="flex min-h-[420px] w-full items-center justify-center p-6">
      <GasMeter />
    </div>
  );
}
