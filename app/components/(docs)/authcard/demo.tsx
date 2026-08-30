"use client";

import React from "react";
import { AuthCard } from "@/components/ui/auth-card";

export default function Demo() {
  return (
    <div className="flex min-h-[640px] w-full items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <AuthCard title="Connect Wallet" description="Select wallet option" />
      </div>
    </div>
  );
}