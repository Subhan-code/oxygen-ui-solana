"use client";

import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Demo() {
  return (
    <div className="flex min-h-[360px] w-full flex-col items-center justify-center gap-6 p-6">
      <div className="flex w-full max-w-sm flex-col gap-4 rounded-3xl border border-black/10 dark:border-white/12 bg-white/70 dark:bg-[#1c1c1e]/80 backdrop-blur-2xl p-5 shadow-xl">
        <div className="flex items-center gap-3">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="flex flex-1 flex-col gap-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        </div>
        <Skeleton className="h-32 w-full rounded-2xl" />
        <div className="flex items-center justify-between pt-2">
          <Skeleton className="h-8 w-24 rounded-xl" />
          <Skeleton className="h-8 w-20 rounded-xl" />
        </div>
      </div>
    </div>
  );
}
