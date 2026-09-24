"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export type SignatureStatus = "finalized" | "confirmed" | "pending" | "failed";

export interface SignatureStatusBadgeProps
  extends React.HTMLAttributes<HTMLDivElement> {
  status?: SignatureStatus;
  confirmations?: number;
  confirmationsRequired?: number;
  maxConfirmations?: number;
  className?: string;
}

const styles: Record<SignatureStatus, { badge: string; label: string }> = {
  finalized: {
    badge: "border-emerald-400/25 bg-emerald-400/10 text-emerald-400",
    label: "Finalized",
  },
  confirmed: {
    badge: "border-sky-400/25 bg-sky-400/10 text-sky-400",
    label: "Confirmed",
  },
  pending: {
    badge: "border-amber-400/25 bg-amber-400/10 text-amber-400",
    label: "Pending",
  },
  failed: {
    badge: "border-rose-400/25 bg-rose-400/10 text-rose-400",
    label: "Failed",
  },
};

export function SignatureStatusBadge({
  status = "finalized",
  confirmations,
  confirmationsRequired,
  maxConfirmations,
  className,
  ...props
}: SignatureStatusBadgeProps) {
  const req = confirmationsRequired ?? maxConfirmations;
  const showConf = status === "confirmed" && confirmations != null && req != null;
  const config = styles[status];

  const aria = showConf
    ? `Signature confirmed ${confirmations} of ${req}`
    : `Signature ${config.label.toLowerCase()}`;

  return (
    <div
      data-slot="signature-status-badge"
      role="status"
      aria-label={aria}
      className={cn(
        "inline-flex items-center h-6 rounded-full px-2.5 gap-1.5 text-[11px] font-medium border select-none font-sans",
        config.badge,
        className
      )}
      {...props}
    >
      <span>{config.label}</span>
      {showConf && (
        <span className="font-mono text-[10px] text-current/70 tabular-nums">
          {confirmations}/{req}
        </span>
      )}
    </div>
  );
}

export function SignatureStatusBadgePreview() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 p-6 font-sans select-none">
      <SignatureStatusBadge status="finalized" />
      <SignatureStatusBadge
        status="confirmed"
        confirmations={24}
        confirmationsRequired={32}
      />
      <SignatureStatusBadge status="pending" />
      <SignatureStatusBadge status="failed" />
    </div>
  );
}

export default SignatureStatusBadge;
