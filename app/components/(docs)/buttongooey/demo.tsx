"use client";

import { ButtonGooey } from "@/components/ui/button-gooey";

export function Demo() {
  return (
    <div className="flex min-h-[360px] w-full flex-col items-center justify-center p-6 bg-zinc-100 dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800">
      <ButtonGooey>Hover me</ButtonGooey>
    </div>
  );
}
