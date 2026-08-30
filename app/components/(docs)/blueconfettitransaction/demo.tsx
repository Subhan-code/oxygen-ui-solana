"use client";

import React from "react";
import { BlueConfettiTransaction } from "@/components/ui/blue-confetti-transaction";

export default function Demo() {
  return (
    <div className="flex min-h-[440px] w-full flex-col items-center justify-center p-6">
      <BlueConfettiTransaction />
    </div>
  );
}
