"use client";

import React from "react";
import { FamilyDialog } from "@/components/ui/family-dialog";

export default function Demo() {
  return (
    <div className="flex min-h-[460px] w-full flex-col items-center justify-center p-6 transition-all duration-300">
      <FamilyDialog triggerText="Open Account Modal" />
    </div>
  );
}
