"use client";

import React from "react";
import { MultiStepWizard } from "@/components/ui/multi-step-wizard";

export default function Demo() {
  return (
    <div className="flex min-h-[440px] w-full flex-col items-center justify-center p-6">
      <MultiStepWizard />
    </div>
  );
}
