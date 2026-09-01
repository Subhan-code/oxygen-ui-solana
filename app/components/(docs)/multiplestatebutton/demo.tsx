"use client";

import React from "react";
import { MultipleStateButton, CooldownButton } from "@/components/ui/multiple-state-button";

export default function Demo() {
  return (
    <div className="flex min-h-[500px] w-full flex-col items-center justify-center gap-8 p-6 font-sans select-none">
      <div className="flex flex-col items-center gap-3">
        <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Multi-State Action Button</span>
        <MultipleStateButton />
      </div>

      <div className="flex flex-col items-center gap-3 pt-6 border-t border-zinc-200 dark:border-zinc-800 w-full max-w-sm">
        <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Cooldown Action Button</span>
        <CooldownButton cooldownTime={8} label="Send Verification Code" />
      </div>
    </div>
  );
}
