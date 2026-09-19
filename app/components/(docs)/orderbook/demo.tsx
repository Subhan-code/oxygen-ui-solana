"use client";

import React, { useEffect, useRef, useState } from "react";
import { OrderBook } from "@/components/ui/order-book";

type Level = { price: number; size: number };

const BASE = 182.47;
const TICK = 0.01;

function genLevels(side: "bid" | "ask", count = 8): Level[] {
  const sign = side === "ask" ? 1 : -1;
  return Array.from({ length: count }, (_, i) => ({
    price: parseFloat((BASE + sign * (i + 1) * TICK).toFixed(2)),
    size: parseFloat((Math.random() * 80 + 5).toFixed(1)),
  }));
}

function jitter(levels: Level[], maxDelta = 0.12): Level[] {
  return levels.map((l) => ({
    price: l.price,
    size: parseFloat(
      Math.max(0.5, l.size + (Math.random() - 0.5) * maxDelta * l.size).toFixed(1)
    ),
  }));
}

export default function Demo() {
  const [bids, setBids] = useState<Level[]>(() =>
    genLevels("bid").sort((a, b) => b.price - a.price)
  );
  const [asks, setAsks] = useState<Level[]>(() =>
    genLevels("ask").sort((a, b) => a.price - b.price)
  );

  const bidRef = useRef(bids);
  const askRef = useRef(asks);
  bidRef.current = bids;
  askRef.current = asks;

  useEffect(() => {
    const id = setInterval(() => {
      setBids(jitter(bidRef.current));
      setAsks(jitter(askRef.current));
    }, 600);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex min-h-[640px] w-full items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <OrderBook bids={bids} asks={asks} />
      </div>
    </div>
  );
}