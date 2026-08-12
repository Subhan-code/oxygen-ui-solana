"use client";

import React from "react";
import { CryptoProjectProgressBar } from "@/components/ui/crypto-project-progress-bar";

export default function Demo() {
  return (
    <div className="flex min-h-[450px] w-full items-center justify-center p-6 bg-zinc-950">
      <CryptoProjectProgressBar />
    </div>
  );
}
