"use client";

import React from "react";
import { CryptoCookieBannerSheet } from "@/components/ui/crypto-cookie-banner-sheet";

export default function Demo() {
  return (
    <div className="flex min-h-[400px] w-full items-center justify-center p-6 bg-zinc-950">
      <CryptoCookieBannerSheet />
    </div>
  );
}
