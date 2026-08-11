"use client";

import React, { useState } from "react";

export default function PanelReveal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex h-[320px] w-full flex-col items-center justify-center gap-4 p-4">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-xl bg-zinc-900 px-4 py-2 text-sm font-semibold text-white transition-transform active:scale-95 dark:bg-white dark:text-zinc-900"
      >
        {isOpen ? "Close Panel" : "Open Panel"}
      </button>

      <div className="relative h-[200px] w-full max-w-sm overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="t-panel-slide" data-open={isOpen}>
          <div className="rounded-xl bg-white p-4 shadow-md dark:bg-zinc-950">
            <h4 className="text-base font-semibold text-zinc-900 dark:text-white">
              Panel Reveal
            </h4>
            <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
              Cross-blur & vertical slide transition based on Transitions.dev physics.
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .t-panel-slide {
          --panel-open-dur: 400ms;
          --panel-close-dur: 350ms;
          --panel-translate-y: 93px;
          --panel-blur: 2px;
          --panel-ease: cubic-bezier(0.22, 1, 0.36, 1);
          transform: translateY(var(--panel-translate-y));
          opacity: 0;
          filter: blur(var(--panel-blur));
          pointer-events: none;
          transition:
            transform var(--panel-close-dur) var(--panel-ease),
            opacity var(--panel-close-dur) var(--panel-ease),
            filter var(--panel-close-dur) var(--panel-ease);
          will-change: transform, opacity, filter;
        }
        .t-panel-slide[data-open="true"] {
          transform: translateY(0);
          opacity: 1;
          filter: blur(0);
          pointer-events: auto;
          transition:
            transform var(--panel-open-dur) var(--panel-ease),
            opacity var(--panel-open-dur) var(--panel-ease),
            filter var(--panel-open-dur) var(--panel-ease);
        }
        @media (prefers-reduced-motion: reduce) {
          .t-panel-slide {
            transition: none !important;
          }
        }
      `}</style>
    </div>
  );
}
