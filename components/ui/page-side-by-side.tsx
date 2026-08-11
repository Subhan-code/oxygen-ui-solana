"use client";

import React, { useState } from "react";

export default function PageSideBySide() {
  const [currentPage, setCurrentPage] = useState<1 | 2>(1);

  return (
    <div className="flex h-[320px] w-full flex-col items-center justify-center gap-4 p-4">
      <div className="flex items-center gap-2 rounded-xl bg-zinc-200 p-1 dark:bg-zinc-800">
        <button
          type="button"
          onClick={() => setCurrentPage(1)}
          className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
            currentPage === 1
              ? "bg-white text-zinc-900 shadow-xs dark:bg-zinc-900 dark:text-white"
              : "text-zinc-600 dark:text-zinc-400"
          }`}
        >
          Page 1
        </button>
        <button
          type="button"
          onClick={() => setCurrentPage(2)}
          className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
            currentPage === 2
              ? "bg-white text-zinc-900 shadow-xs dark:bg-zinc-900 dark:text-white"
              : "text-zinc-600 dark:text-zinc-400"
          }`}
        >
          Page 2
        </button>
      </div>

      <div className="relative h-[200px] w-full max-w-sm overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="t-page-slide" data-page={currentPage}>
          <section className="t-page p-6" data-page-id="1">
            <h4 className="text-base font-semibold text-zinc-900 dark:text-white">
              First Section
            </h4>
            <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400">
              This is page 1 sliding smoothly to the left with blur and fade transitions.
            </p>
          </section>
          <section className="t-page p-6" data-page-id="2">
            <h4 className="text-base font-semibold text-zinc-900 dark:text-white">
              Second Section
            </h4>
            <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400">
              This is page 2 entering from the right with stagger and blur effects.
            </p>
          </section>
        </div>
      </div>

      <style jsx>{`
        .t-page-slide {
          --page-slide-dur: 250ms;
          --page-fade-dur: 250ms;
          --page-slide-distance: 12px;
          --page-blur: 3px;
          --page-stagger: 0ms;
          --page-exit-enabled: 1;
          --page-slide-ease: cubic-bezier(0.22, 1, 0.36, 1);
          --page-fade-ease: cubic-bezier(0.22, 1, 0.36, 1);
          position: relative;
          width: 100%;
          height: 100%;
        }
        .t-page-slide :global(.t-page[data-page-id="1"]) {
          --t-page-from-x: calc(var(--page-slide-distance) * -1);
        }
        .t-page-slide :global(.t-page[data-page-id="2"]) {
          --t-page-from-x: var(--page-slide-distance);
        }
        .t-page-slide :global(.t-page) {
          position: absolute;
          inset: 0;
          opacity: 0;
          pointer-events: none;
          transform: translateX(calc(var(--t-page-from-x, 0px) * var(--page-exit-enabled)));
          filter: blur(calc(var(--page-blur) * var(--page-exit-enabled)));
          transition:
            opacity var(--page-fade-dur) var(--page-fade-ease),
            transform var(--page-slide-dur) var(--page-slide-ease),
            filter var(--page-slide-dur) var(--page-slide-ease);
          will-change: opacity, transform, filter;
        }
        .t-page-slide[data-page="1"] :global(.t-page[data-page-id="1"]),
        .t-page-slide[data-page="2"] :global(.t-page[data-page-id="2"]) {
          opacity: 1;
          pointer-events: auto;
          transform: translateX(0);
          filter: blur(0);
          transition-delay: var(--page-stagger);
        }
        @media (prefers-reduced-motion: reduce) {
          .t-page-slide :global(.t-page) {
            transition: none !important;
          }
        }
      `}</style>
    </div>
  );
}
