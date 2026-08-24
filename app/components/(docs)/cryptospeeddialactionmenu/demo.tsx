"use client";

import React from "react";
import { CryptoSpeedDialActionMenu } from "@/components/ui/crypto-speed-dial-action-menu";

export default function Demo() {
  return (
    <div className="flex min-h-[350px] w-full items-center justify-center p-6 bg-zinc-950 transition-all duration-300">
      <CryptoSpeedDialActionMenu />
    </div>
  );
}
