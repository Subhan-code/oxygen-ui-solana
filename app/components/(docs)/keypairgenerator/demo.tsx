"use client";

import React from "react";
import { KeypairGenerator } from "@/components/ui/keypair-generator";

export default function Demo() {
  return (
    <div className="flex min-h-[420px] w-full items-center justify-center p-6">
      <KeypairGenerator />
    </div>
  );
}
