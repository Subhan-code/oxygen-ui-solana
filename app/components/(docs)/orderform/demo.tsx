"use client";

import React from "react";
import { OrderForm } from "@/components/ui/order-form";

export default function Demo() {
  return (
    <div className="flex min-h-[640px] w-full items-center justify-center p-6">
      <div className="w-full max-w-md">
        <OrderForm title="Limit Order" description="Place a limit order on SOL-PERP" entryPrice={182.45} />
      </div>
    </div>
  );
}