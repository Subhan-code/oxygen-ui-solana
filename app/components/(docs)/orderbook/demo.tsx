"use client";

import React from "react";
import { OrderBook } from "@/components/ui/sol/order-book";

export default function Demo() {
  const bids = [{ price: 180.2, size: 12.5, total: 12.5 }, { price: 180.1, size: 8.0, total: 20.5 }];
  const asks = [{ price: 180.5, size: 15.0, total: 15.0 }, { price: 180.6, size: 22.1, total: 37.1 }];
  return (
    <div className="flex min-h-[450px] w-full max-w-md items-center justify-center p-6 bg-zinc-950/40 rounded-2xl">
      <OrderBook bids={bids as any} asks={asks as any} />
    </div>
  );
}
