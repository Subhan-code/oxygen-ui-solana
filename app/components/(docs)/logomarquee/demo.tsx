"use client";

import React from "react";
import { LogoMarquee } from "@/components/ui/logo-marquee";

const CUSTOMERS = [
  { id: "vercel", label: "Vercel" },
  { id: "github", label: "GitHub" },
  { id: "stripe", label: "Stripe" },
  { id: "linear", label: "Linear" },
  { id: "raycast", label: "Raycast" },
  { id: "framer", label: "Framer" },
  { id: "solana", label: "Solana" },
  { id: "oxygen", label: "Oxygen UI" },
];

export default function Demo() {
  return (
    <div className="flex min-h-[380px] w-full flex-col items-center justify-center p-6 bg-zinc-950 rounded-3xl border border-zinc-800 font-sans">
      <div className="w-full max-w-xl space-y-4">
        <p className="text-center text-[11px] font-bold uppercase tracking-widest text-zinc-400">
          Trusted by Industry Leaders (Hover to Pause)
        </p>

        <LogoMarquee
          items={CUSTOMERS}
          label="Customers"
          speed={38}
          gap={44}
          direction="left"
        />
      </div>
    </div>
  );
}
