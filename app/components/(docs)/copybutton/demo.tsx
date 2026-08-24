"use client";

import { CopyButton } from "@/components/ui/copy-button";

export function Demo() {
  return (
    <div className="flex min-h-[360px] w-full flex-col items-center justify-center p-6 bg-zinc-50 dark:bg-zinc-950 rounded-3xl border border-zinc-200 dark:border-zinc-800">
      <CopyButton />
    </div>
  );
}
