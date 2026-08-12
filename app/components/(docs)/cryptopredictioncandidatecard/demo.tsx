"use client";

import React from "react";
import { CryptoPredictionCandidateCard } from "@/components/ui/crypto-prediction-candidate-card";

export default function Demo() {
  return (
    <div className="flex min-h-[400px] w-full items-center justify-center p-6 bg-zinc-950">
      <CryptoPredictionCandidateCard />
    </div>
  );
}
