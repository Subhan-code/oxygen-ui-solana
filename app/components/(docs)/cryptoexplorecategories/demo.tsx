"use client";

import React from "react";
import { CryptoExploreCategories } from "@/components/ui/crypto-explore-categories";

export default function Demo() {
  return (
    <div className="flex min-h-[500px] w-full items-center justify-center p-6 bg-zinc-950 transition-all duration-300">
      <CryptoExploreCategories />
    </div>
  );
}
