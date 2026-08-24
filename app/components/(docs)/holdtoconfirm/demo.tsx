"use client";

import React from "react";
import { HoldToConfirm } from "@/components/ui/hold-to-confirm";

export default function Demo() {
  return (
    <div className="flex min-h-[460px] w-full flex-col items-center justify-center p-6 transition-all duration-300">
      <HoldToConfirm
        label="Hold to Delete Server"
        confirmedLabel="Server Terminated"
      />
    </div>
  );
}
