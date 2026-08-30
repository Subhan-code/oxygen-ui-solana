"use client";

import React from "react";
import { SecurityAlertBanner } from "@/components/ui/security-alert-banner";

export default function Demo() {
  return (
    <div className="flex min-h-[420px] w-full items-center justify-center p-6">
      <SecurityAlertBanner />
    </div>
  );
}
