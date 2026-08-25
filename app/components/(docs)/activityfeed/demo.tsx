"use client";

import React from "react";
import { ActivityFeed } from "@/components/ui/sol/activity-feed";

export default function Demo() {
  const items = [
    { title: "Swapped SOL", description: "Swapped 5 SOL for 900 USDC", timestamp: new Date() },
  ];
  return (
    <div className="flex min-h-[450px] w-full max-w-md items-center justify-center p-6 bg-zinc-950/40 rounded-2xl">
      <ActivityFeed items={items as any} />
    </div>
  );
}
