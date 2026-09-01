"use client";

import React from "react";
import { SignatureStatusBadge, EventTagPills } from "@/components/ui/signature-status-badge";

export default function Demo() {
  return (
    <div className="flex min-h-[500px] w-full flex-col items-center justify-center gap-8 p-6 font-sans select-none">
      <div className="flex flex-col items-center gap-3">
        <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Signature Status Badges</span>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <SignatureStatusBadge status="finalized" />
          <SignatureStatusBadge status="confirmed" confirmations={24} maxConfirmations={32} />
          <SignatureStatusBadge status="pending" />
          <SignatureStatusBadge status="failed" />
        </div>
      </div>

      <div className="flex flex-col items-center gap-3 pt-6 border-t border-zinc-200 dark:border-zinc-800 w-full max-w-lg">
        <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Event Tag Pills</span>
        <EventTagPills />
      </div>
    </div>
  );
}
