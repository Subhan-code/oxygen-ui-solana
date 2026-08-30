"use client";

import React from "react";
import { NetworkBadge } from "@/components/ui/network-badge";

export default function Demo() {
  return (
    <div className="flex min-h-[420px] w-full items-center justify-center p-6">
      <NetworkBadge />
    </div>
  );
}
