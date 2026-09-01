"use client";

import React from "react";
import { VerificationBadge, VerificationBadges } from "@/components/ui/verification-badge";

export default function Demo() {
  return (
    <div className="flex min-h-[400px] w-full flex-col items-center justify-center gap-8 p-6 bg-zinc-950 rounded-3xl border border-zinc-800">
      <div className="space-y-1 text-center">
        <h3 className="text-base font-bold text-zinc-100 flex items-center justify-center gap-2">
          <span>Verification Badges</span>
          <VerificationBadge variant="blue" size="md" />
        </h3>
        <p className="text-xs text-zinc-400">
          Available in Scalloped Seal and Circle shapes across Blue, Black, Gold, Purple, Emerald, and Silver styles.
        </p>
      </div>

      <VerificationBadges />
    </div>
  );
}
