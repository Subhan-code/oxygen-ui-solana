"use client";

import React from "react";
import type { ComponentItem } from "@/lib/components";

export default function LiveComponentPreview({ item }: { item: ComponentItem }) {
  if (item.image) {
    return (
      <img
        src={item.image}
        alt={item.name}
        className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
        loading="lazy"
      />
    );
  }

  const slug = item.registry || "";

  // Static lightweight SVG / CSS previews optimized for 60 FPS scrolling
  if (slug === "event-tag-pills") {
    return (
      <div className="flex h-full w-full flex-wrap items-center justify-center gap-1.5 p-4 bg-zinc-50 dark:bg-zinc-950">
        <span className="rounded-full bg-sky-100 px-2.5 py-1 text-[11px] font-bold text-sky-600 dark:bg-sky-950 dark:text-sky-400">
          📅 March 09 — 16
        </span>
        <span className="rounded-full bg-amber-100 px-2.5 py-1 text-[11px] font-bold text-amber-600 dark:bg-amber-950 dark:text-amber-400">
          🔁 Weekly
        </span>
        <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-[11px] font-bold text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
          📹 Zoom
        </span>
      </div>
    );
  }

  if (slug === "segmented-progress-card") {
    return (
      <div className="flex h-full w-full items-center justify-center p-4 bg-zinc-100 dark:bg-zinc-900">
        <div className="w-52 rounded-2xl bg-white p-3.5 shadow-md border border-zinc-200 dark:bg-zinc-950 dark:border-zinc-800">
          <div className="flex items-center justify-between text-xs font-bold text-zinc-900 dark:text-white">
            <span>Almost There!</span>
            <span className="rounded-full bg-rose-500 px-2 py-0.5 text-[10px] text-white">23%</span>
          </div>
          <div className="my-2.5 flex items-center gap-1">
            {Array.from({ length: 16 }).map((_, i) => (
              <div
                key={i}
                className={`h-4 flex-1 rounded-full ${
                  i < 4 ? "bg-rose-500" : "bg-zinc-200 dark:bg-zinc-800"
                }`}
              />
            ))}
          </div>
          <div className="h-6 w-full rounded-xl bg-zinc-100 dark:bg-zinc-900 text-[10px] font-semibold flex items-center justify-center text-zinc-700 dark:text-zinc-300">
            Go to checklist →
          </div>
        </div>
      </div>
    );
  }

  if (slug === "step-tracker-widget") {
    return (
      <div className="flex h-full w-full items-center justify-center p-4 bg-zinc-900">
        <div className="w-52 rounded-2xl bg-zinc-950 p-3.5 shadow-md border border-zinc-800 text-white">
          <div className="flex items-center justify-between text-xs font-bold mb-3">
            <span>Recruiter</span>
            <span className="flex -space-x-1.5">
              <span className="h-4 w-4 rounded-full bg-blue-500 block border border-zinc-950" />
              <span className="h-4 w-4 rounded-full bg-sky-400 block border border-zinc-950" />
            </span>
          </div>
          <div className="flex items-center justify-between px-1">
            {[true, true, true, false, false].map((done, i) => (
              <React.Fragment key={i}>
                <div
                  className={`h-5 w-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    done ? "bg-blue-500 text-white" : "border border-blue-900 text-blue-900"
                  }`}
                >
                  {done ? "✓" : ""}
                </div>
                {i < 4 && <div className={`h-0.5 flex-1 ${i < 2 ? "bg-blue-500" : "bg-blue-950"}`} />}
              </React.Fragment>
            ))}
          </div>
          <div className="mt-3 flex items-center justify-between text-[10px] text-zinc-400">
            <span>Writing summary...</span>
            <span className="font-mono font-semibold">3 of 5</span>
          </div>
        </div>
      </div>
    );
  }

  if (slug === "financial-metrics-grid") {
    return (
      <div className="flex h-full w-full items-center justify-center p-3 bg-zinc-100 dark:bg-zinc-900">
        <div className="grid grid-cols-2 gap-2 w-56">
          <div className="rounded-xl bg-white p-2 shadow-xs border border-zinc-200 dark:bg-zinc-950 dark:border-zinc-800">
            <span className="text-[9px] text-zinc-400 font-medium">Total hours</span>
            <div className="text-xs font-bold text-zinc-900 dark:text-white font-mono mt-0.5">17.00</div>
          </div>
          <div className="rounded-xl bg-white p-2 shadow-xs border border-zinc-200 dark:bg-zinc-950 dark:border-zinc-800">
            <span className="text-[9px] text-zinc-400 font-medium">Internal costs</span>
            <div className="text-xs font-bold text-zinc-900 dark:text-white font-mono mt-0.5">$611.37</div>
          </div>
          <div className="rounded-xl bg-white p-2 shadow-xs border border-zinc-200 dark:bg-zinc-950 dark:border-zinc-800">
            <span className="text-[9px] text-zinc-400 font-medium">Remaining</span>
            <div className="text-xs font-bold text-blue-600 font-mono mt-0.5">8.00 32%</div>
          </div>
          <div className="rounded-xl bg-white p-2 shadow-xs border border-zinc-200 dark:bg-zinc-950 dark:border-zinc-800 flex items-center justify-center bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 text-[10px] font-bold">
            + Invoice
          </div>
        </div>
      </div>
    );
  }

  if (slug === "liquid-radio") {
    return (
      <div className="flex h-full w-full items-center justify-center p-4 bg-zinc-50 dark:bg-zinc-950">
        <div className="inline-flex h-8 rounded-lg bg-zinc-200/60 p-0.5 dark:bg-zinc-800/60 font-semibold text-xs text-zinc-700 dark:text-zinc-300">
          <span className="px-3 py-1 bg-white dark:bg-zinc-900 rounded-md shadow-xs text-zinc-900 dark:text-white">Test</span>
          <span className="px-3 py-1 opacity-60">Prod</span>
        </div>
      </div>
    );
  }

  if (slug === "qr-code") {
    return (
      <div className="flex h-full w-full items-center justify-center p-4 bg-zinc-950">
        <div className="h-24 w-24 rounded-2xl bg-zinc-900 p-2 border border-zinc-800 flex flex-col items-center justify-center gap-1.5 shadow-inner">
          <div className="grid grid-cols-4 gap-1 w-full h-full">
            {Array.from({ length: 16 }).map((_, i) => (
              <div
                key={i}
                className={`rounded-xs ${
                  i % 3 === 0 ? "bg-white" : "bg-zinc-800"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Optimized lightweight visual fallback thumbnail for all other components
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-zinc-50 dark:bg-zinc-950 p-4 select-none">
      <div className="flex flex-col items-center gap-2 text-center">
        <div className="h-10 w-10 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400 border border-blue-500/20 font-bold text-base shadow-xs">
          {item.name.charAt(0)}
        </div>
        <span className="font-semibold text-xs tracking-tight text-zinc-900 dark:text-zinc-100">
          {item.name}
        </span>
        <span className="rounded-full bg-zinc-200/60 dark:bg-zinc-800/60 px-2.5 py-0.5 text-[10px] font-mono text-zinc-500">
          {item.registry || "component"}
        </span>
      </div>
    </div>
  );
}
