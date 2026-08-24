"use client";

import ErrorStateShake from "@/components/ui/error-state-shake";

export default function ErrorStateShakeDemo() {
  return (
    <div className="relative flex h-full min-h-[300px] w-full flex-col items-center justify-center p-6 transition-all duration-300">
      <ErrorStateShake />
    </div>
  );
}
