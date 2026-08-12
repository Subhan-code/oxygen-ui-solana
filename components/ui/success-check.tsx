"use client";

import React, { useState } from "react";

export default function SuccessCheck() {
  const [state, setState] = useState<"out" | "in">("in");

  const trigger = () => {
    setState("out");
    setTimeout(() => {
      setState("in");
    }, 50);
  };

  return (
    <div className="flex h-[240px] w-full flex-col items-center justify-center gap-6 p-4">
      <button
        type="button"
        onClick={trigger}
        className="rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-md hover:bg-blue-500 active:scale-95"
      >
        Replay Success Check
      </button>

      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-950/40">
        <span className="t-success-check" data-state={state} aria-hidden="true">
          <svg className="h-10 w-10 text-blue-600 dark:text-blue-400" viewBox="0 0 48 48" fill="none">
            <path
              d="M14 24L21 31L34 17"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>

      <style jsx>{`
        .t-success-check {
          display: inline-block;
          transform-origin: center;
          opacity: 0;
          will-change: transform, opacity, filter;
        }
        .t-success-check svg {
          display: block;
          overflow: visible;
        }
        .t-success-check svg path {
          stroke-dasharray: 40;
          stroke-dashoffset: 40;
        }
        .t-success-check[data-state="in"] {
          animation:
            t-check-fade 500ms cubic-bezier(0.22, 1, 0.36, 1) forwards,
            t-check-rotate 500ms cubic-bezier(0.22, 1, 0.36, 1) forwards,
            t-check-blur 500ms cubic-bezier(0.22, 1, 0.36, 1) forwards,
            t-check-bob 500ms cubic-bezier(0.34, 1.35, 0.64, 1) forwards;
        }
        .t-success-check[data-state="in"] svg path {
          animation: t-check-draw 500ms cubic-bezier(0.22, 1, 0.36, 1) 80ms forwards;
        }
        @keyframes t-check-fade { from { opacity: 0; } to { opacity: 1; } }
        @keyframes t-check-rotate {
          from { transform: rotate(80deg); }
          to { transform: rotate(0deg); }
        }
        @keyframes t-check-blur {
          from { filter: blur(10px); }
          to { filter: blur(0); }
        }
        @keyframes t-check-bob {
          from { translate: 0 40px; }
          to { translate: 0 0; }
        }
        @keyframes t-check-draw { to { stroke-dashoffset: 0; } }
        @media (prefers-reduced-motion: reduce) {
          .t-success-check { animation: none !important; opacity: 1; }
          .t-success-check svg path { animation: none !important; stroke-dashoffset: 0 !important; }
        }
      `}</style>
    </div>
  );
}
