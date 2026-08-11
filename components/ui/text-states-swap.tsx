"use client";

import React, { useState } from "react";

const states = ["Processing...", "Saving changes...", "Syncing data...", "Completed!"];

export default function TextStatesSwap() {
  const [index, setIndex] = useState(0);
  const [animClass, setAnimClass] = useState("");

  const nextState = () => {
    setAnimClass("is-exit");
    setTimeout(() => {
      setIndex((prev) => (prev + 1) % states.length);
      setAnimClass("is-enter-start");
      requestAnimationFrame(() => {
        setAnimClass("");
      });
    }, 150);
  };

  return (
    <div className="flex h-[200px] w-full flex-col items-center justify-center gap-4 p-4">
      <button
        type="button"
        onClick={nextState}
        className="rounded-xl bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-transform active:scale-95 dark:bg-white dark:text-zinc-900"
      >
        <span className={`t-text-swap ${animClass}`}>{states[index]}</span>
      </button>

      <style jsx>{`
        .t-text-swap {
          display: inline-block;
          transform: translateY(0);
          filter: blur(0);
          opacity: 1;
          transition:
            transform 150ms ease-in-out,
            filter 150ms ease-in-out,
            opacity 150ms ease-in-out;
          will-change: transform, filter, opacity;
        }
        .t-text-swap.is-exit {
          transform: translateY(-4px);
          filter: blur(2px);
          opacity: 0;
        }
        .t-text-swap.is-enter-start {
          transform: translateY(4px);
          filter: blur(2px);
          opacity: 0;
          transition: none;
        }
        @media (prefers-reduced-motion: reduce) {
          .t-text-swap { transition: none !important; }
        }
      `}</style>
    </div>
  );
}
