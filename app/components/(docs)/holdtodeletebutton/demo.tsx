"use client";

import React from "react";
import { HoldToDeleteButton } from "@/components/ui/hold-to-delete-button";

export default function Demo() {
  return (
    <div className="flex min-h-[380px] w-full flex-col items-center justify-center p-6">
      <HoldToDeleteButton />
    </div>
  );
}
