"use client";

import React from "react";
import { CryptoUpDownUpcomingCarousel } from "@/components/ui/crypto-up-down-upcoming-carousel";

export default function Demo() {
  return (
    <div className="flex min-h-[300px] w-full items-center justify-center p-6 bg-zinc-950 transition-all duration-300">
      <CryptoUpDownUpcomingCarousel />
    </div>
  );
}
