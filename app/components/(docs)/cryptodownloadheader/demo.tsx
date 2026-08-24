"use client";

import React from "react";
import { CryptoDownloadHeader } from "@/components/ui/crypto-download-header";

export default function Demo() {
  return (
    <div className="flex min-h-[350px] w-full items-center justify-center p-6 bg-zinc-950 transition-all duration-300">
      <CryptoDownloadHeader />
    </div>
  );
}
