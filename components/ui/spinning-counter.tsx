"use client";

import React, { useState } from "react";

export default function SpinningCounter() {
  const [count, setCount] = useState(1284);

  const increment = () => setCount((c) => c + 1);
  const decrement = () => setCount((c) => Math.max(0, c - 1));
  const random = () => setCount(Math.floor(1000 + Math.random() * 9000));

  const digits = String(count).padStart(4, "0").split("");

  return (
    <div className="flex h-[260px] w-full flex-col items-center justify-center gap-4 p-4">
      <div className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
        Live Solana Network TPS
      </div>
      <div className="t-reel flex items-center justify-center rounded-2xl border border-zinc-200 bg-white px-6 py-4 text-3xl font-bold tracking-tight leading-tight text-zinc-900 shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:text-white">
        {digits.map((digit, index) => {
          const digitNum = parseInt(digit, 10);
          return (
            <div key={index} className="t-reel-col relative mx-0.5 h-[36px] w-[24px] overflow-hidden">
              <div
                className="t-reel-strip transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{
                  transform: `translateY(-${digitNum * 36}px)`,
                }}
              >
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                  <div key={num} className="t-reel-digit flex h-[36px] items-center justify-center">
                    {num}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={decrement}
          className="rounded-lg bg-zinc-200 px-3 py-1.5 text-xs font-semibold text-zinc-800 hover:bg-zinc-300 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
        >
          - 1
        </button>
        <button
          type="button"
          onClick={increment}
          className="rounded-lg bg-zinc-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
        >
          + 1
        </button>
        <button
          type="button"
          onClick={random}
          className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-500"
        >
          Random
        </button>
      </div>

      <style jsx>{`
        .t-reel-col {
          -webkit-mask-image: linear-gradient(to bottom, transparent 0%, #000 20%, #000 80%, transparent 100%);
          mask-image: linear-gradient(to bottom, transparent 0%, #000 20%, #000 80%, transparent 100%);
        }
      `}</style>
    </div>
  );
}
