"use client";

import { EvilButtonsGroup } from "@/components/ui/evil-buttons-group";

export function Demo() {
  return (
    <div className="flex min-h-[450px] w-full flex-col items-center justify-center p-6 bg-zinc-50 dark:bg-zinc-950 rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 select-none transition-all duration-300">
      <EvilButtonsGroup />
    </div>
  );
}
