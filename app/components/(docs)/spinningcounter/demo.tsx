"use client";

import SpinningCounter from "@/components/ui/spinning-counter";

export default function SpinningCounterDemo() {
  return (
    <div className="relative flex h-full min-h-[300px] w-full flex-col items-center justify-center p-6 transition-all duration-300">
      <SpinningCounter />
    </div>
  );
}
