"use client";

import React from "react";
import { CryptoCookieBanner } from "@/components/ui/crypto-cookie-banner";

export default function Demo() {
  return (
    <div className="flex min-h-[450px] w-full items-center justify-center p-6 bg-zinc-950">
      <CryptoCookieBanner />
    </div>
  );
}
