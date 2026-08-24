"use client";

import { StepTrackerWidget } from "@/components/ui/step-tracker-widget";

export function Demo() {
  return (
    <div className="flex min-h-[360px] w-full flex-col items-center justify-center p-6 bg-gradient-to-br from-blue-900 to-indigo-950 rounded-3xl border border-blue-800/80 transition-all duration-300">
      <StepTrackerWidget />
    </div>
  );
}
