"use client";

import React from "react";
import { MorphingThemeSwitcher } from "@/components/ui/morphing-theme-switcher";

export default function Demo() {
  return (
    <div className="flex min-h-[380px] w-full flex-col items-center justify-center p-6">
      <MorphingThemeSwitcher />
    </div>
  );
}
