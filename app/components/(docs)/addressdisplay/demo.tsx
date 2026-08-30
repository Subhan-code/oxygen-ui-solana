"use client";

import React from "react";
import { AddressDisplay } from "@/components/ui/address-display";

export default function Demo() {
  return (
    <div className="flex min-h-[640px] w-full items-center justify-center p-6">
      <AddressDisplay address="7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU" />
    </div>
  );
}