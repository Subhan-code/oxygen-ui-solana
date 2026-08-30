"use client";

import React from "react";
import { SignatureStatusBadge } from "@/components/ui/signature-status-badge";

export default function Demo() {
  return (
    <div className="flex min-h-[420px] w-full items-center justify-center p-6">
      <SignatureStatusBadge />
    </div>
  );
}
