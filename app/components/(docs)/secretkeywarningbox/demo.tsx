"use client";

import React from "react";
import { SecretKeyWarningBox } from "@/components/ui/secret-key-warning-box";

export default function Demo() {
  return (
    <div className="flex min-h-[420px] w-full items-center justify-center p-6">
      <SecretKeyWarningBox />
    </div>
  );
}
