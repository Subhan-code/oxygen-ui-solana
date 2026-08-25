"use client";

import React from "react";
import { OrderBook } from "@/components/ui/sol/order-book";

export default function Demo() {
  return (
    <div className="flex min-h-[450px] w-full items-center justify-center p-6 bg-zinc-950/40 rounded-2xl">
      <div className="w-full max-w-sm bg-zinc-900/60 p-5 rounded-2xl border border-white/10">
        <OrderBook
          bids={[
            { price: 162.55, size: 12400 },
            { price: 162.53, size: 28100 },
            { price: 162.50, size: 45300 },
            { price: 162.48, size: 18700 },
            { price: 162.45, size: 62500 },
            { price: 162.42, size: 34200 },
            { price: 162.40, size: 51800 },
            { price: 162.38, size: 22300 },
            { price: 162.35, size: 41600 },
            { price: 162.32, size: 58900 },
            { price: 162.29, size: 15200 },
            { price: 162.26, size: 37400 },
          ]}
          asks={[
            { price: 162.57, size: 15800 },
            { price: 162.59, size: 31200 },
            { price: 162.62, size: 42100 },
            { price: 162.65, size: 19500 },
            { price: 162.68, size: 55700 },
            { price: 162.71, size: 28400 },
            { price: 162.74, size: 47600 },
            { price: 162.77, size: 36100 },
            { price: 162.80, size: 22800 },
            { price: 162.83, size: 44500 },
            { price: 162.86, size: 18300 },
            { price: 162.89, size: 39700 },
          ]}
        />
      </div>
    </div>
  );
}
