"use client";

import React from "react";
import { CryptoProjectProgress } from "@/components/ui/crypto-project-progress";

export default function Demo() {
  return (
    <div className="flex min-h-[450px] w-full items-center justify-center p-6 bg-zinc-950 transition-all duration-300">
      <CryptoProjectProgress />
    </div>
  );
}
