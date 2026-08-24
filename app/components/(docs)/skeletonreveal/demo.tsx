"use client";

import SkeletonReveal from "@/components/ui/skeleton-reveal";

export default function SkeletonRevealDemo() {
  return (
    <div className="relative flex h-full min-h-[300px] w-full flex-col items-center justify-center p-6 transition-all duration-300">
      <SkeletonReveal />
    </div>
  );
}
