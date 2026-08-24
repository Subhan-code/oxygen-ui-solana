"use client";

import React, { useState } from "react";

export default function SkeletonReveal() {
  const [isRevealed, setIsRevealed] = useState(false);

  const toggleReveal = () => {
    setIsRevealed(!isRevealed);
  };

  return (
    <div className="flex h-[260px] w-full flex-col items-center justify-center gap-4 p-4">
      <button
        type="button"
        onClick={toggleReveal}
        className="rounded-xl bg-zinc-900 px-4 py-2 text-xs font-semibold text-white shadow-xs transition-transform active:scale-95 dark:bg-white dark:text-zinc-900"
      >
        {isRevealed ? "Reset Skeleton" : "Reveal Content"}
      </button>

      <div
        className={`t-skel relative h-[100px] w-full max-w-sm rounded-2xl border border-zinc-200 bg-white p-4 shadow-xs dark:border-zinc-800 dark:bg-zinc-900 ${
          isRevealed ? "is-revealed" : ""
        }`}
      >
        <div className="t-skel-skeleton is-pulsing flex items-center gap-3">
          <div className="h-12 w-12 rounded-full bg-zinc-200 dark:bg-zinc-800" />
          <div className="flex flex-1 flex-col gap-2">
            <div className="h-4 w-3/4 rounded-md bg-zinc-200 dark:bg-zinc-800" />
            <div className="h-3 w-1/2 rounded-md bg-zinc-200 dark:bg-zinc-800" />
          </div>
        </div>

        <div className="t-skel-content flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600 dark:bg-indigo-500 font-bold text-white text-sm">
            AL
          </div>
          <div className="flex flex-col">
            <h4 className="text-sm font-semibold text-zinc-900 dark:text-white">
              alex.sol
            </h4>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Solana Mainnet · 142.85 SOL
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .t-skel {
          position: relative;
        }
        .t-skel-skeleton,
        .t-skel-content {
          position: absolute;
          inset: 16px;
        }
        .t-skel-skeleton {
          z-index: 1;
          opacity: 1;
          filter: blur(0);
          transition:
            opacity 400ms ease-in-out,
            filter 400ms ease-in-out;
        }
        .t-skel-content {
          z-index: 2;
          opacity: 0;
          filter: blur(2px);
          transition:
            opacity 400ms ease-in-out,
            filter 400ms ease-in-out;
        }
        .t-skel.is-revealed .t-skel-skeleton {
          opacity: 0;
          filter: blur(2px);
        }
        .t-skel.is-revealed .t-skel-content {
          opacity: 1;
          filter: blur(0);
        }
        .t-skel-skeleton.is-pulsing > * {
          animation: t-skel-pulse 1000ms ease-in-out infinite;
        }
        @keyframes t-skel-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @media (prefers-reduced-motion: reduce) {
          .t-skel-skeleton, .t-skel-content {
            transition: none !important;
          }
          .t-skel-skeleton.is-pulsing > * { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
