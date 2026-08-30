"use client";

import React from "react";
import { OrderBook } from "@/components/ui/order-book";

export default function Demo() {
  return (
    <div className="flex min-h-[640px] w-full items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <OrderBook
          bids={[
            { price: 182.45, size: 12.5 },
            { price: 182.40, size: 45.0 }
          ]}
          asks={[
            { price: 182.50, size: 15.2 },
            { price: 182.55, size: 30.0 }
          ]}
        />
      </div>
    </div>
  );
}