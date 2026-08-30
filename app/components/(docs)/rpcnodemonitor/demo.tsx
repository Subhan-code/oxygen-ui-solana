"use client";

import React from "react";
import { RpcNodeMonitor } from "@/components/ui/rpc-node-monitor";

export default function Demo() {
  return (
    <div className="flex min-h-[420px] w-full items-center justify-center p-6">
      <RpcNodeMonitor />
    </div>
  );
}
