"use client";

import React from "react";
import { CryptoMobileBrowserBar } from "@/components/ui/crypto-mobile-browser-bar";

export default function Demo() {
  return (
    <div className="flex min-h-[350px] w-full items-center justify-center p-6 bg-zinc-950 transition-all duration-300">
      <CryptoMobileBrowserBar />
    </div>
  );
}
