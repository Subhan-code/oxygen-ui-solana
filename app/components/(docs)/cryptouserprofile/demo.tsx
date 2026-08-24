"use client";

import React from "react";
import { CryptoUserProfile } from "@/components/ui/crypto-user-profile";

export default function Demo() {
  return (
    <div className="flex min-h-[500px] w-full items-center justify-center p-6 bg-zinc-950 transition-all duration-300">
      <CryptoUserProfile />
    </div>
  );
}
