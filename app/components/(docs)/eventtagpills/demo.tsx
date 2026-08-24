"use client";

import { EventTagPills } from "@/components/ui/event-tag-pills";

export function Demo() {
  return (
    <div className="flex min-h-[360px] w-full flex-col items-center justify-center p-6 bg-white dark:bg-zinc-950 rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 transition-all duration-300">
      <EventTagPills />
    </div>
  );
}
