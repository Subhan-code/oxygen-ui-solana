"use client";

import React from "react";
import { ActivityFeed } from "@/components/ui/activity-feed";

export default function Demo() {
  return (
    <div className="flex min-h-[640px] w-full items-center justify-center p-6">
      <div className="w-full max-w-md">
        <ActivityFeed
          items={[
            { title: "Swapped SOL for USDC", description: "Jupiter Aggregator", timestamp: new Date("2026-01-01T12:00:00Z"), value: "+$420.50" },
            { title: "Sent 2.5 SOL", description: "To 7xKX...gAsU", timestamp: new Date("2026-01-01T11:00:00Z"), value: "-2.5 SOL" }
          ]}
        />
      </div>
    </div>
  );
}