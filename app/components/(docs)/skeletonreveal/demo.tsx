"use client";

import SkeletonReveal from "@/components/ui/skeleton-reveal";

export default function SkeletonRevealDemo() {
  return (
    <div className="flex min-h-[360px] w-full flex-col items-center justify-center p-6">
      <SkeletonReveal />
    </div>
  );
}
