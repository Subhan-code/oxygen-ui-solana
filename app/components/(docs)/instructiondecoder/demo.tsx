"use client";

import React from "react";
import { InstructionDecoder } from "@/components/ui/instruction-decoder";

export default function Demo() {
  return (
    <div className="flex min-h-[420px] w-full items-center justify-center p-6">
      <InstructionDecoder />
    </div>
  );
}
