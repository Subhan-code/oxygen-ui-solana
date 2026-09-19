"use client";

import React from "react";
import { SolanaEventCard } from "@/components/ui/solana-event-card";

export default function Demo() {
  return (
    <div className="relative flex min-h-[560px] w-full items-center justify-center overflow-hidden rounded-3xl bg-[#040814] p-6 sm:p-8">
      {/* Electric cobalt & royal blue ambient glow */}
      <div className="pointer-events-none absolute -top-24 -left-24 size-80 rounded-full bg-blue-600/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 size-80 rounded-full bg-indigo-500/20 blur-3xl" />

      <SolanaEventCard
        title="The August Assembly"
        description="New month, new mindset. Building high-throughput dApps & connecting the Solana community."
        date={{ month: "AUG", day: "08", weekday: "Fri" }}
        imageUrl="https://i.pinimg.com/736x/46/a7/ff/46a7fff0f3fc82c400a5db51732bdb35.jpg"
        actionText="RSVP for August"
      />
    </div>
  );
}
