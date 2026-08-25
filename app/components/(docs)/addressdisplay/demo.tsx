"use client";

import React from "react";
import { AddressDisplay } from "@/components/ui/sol/address-display";

export default function Demo() {
  return (
    <div className="flex min-h-[300px] w-full items-center justify-center p-6 bg-zinc-950/40 rounded-2xl">
      <AddressDisplay address="7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU" />
    </div>
  );
}
