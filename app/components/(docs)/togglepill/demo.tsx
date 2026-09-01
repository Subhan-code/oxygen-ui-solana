"use client";

import React, { useState } from "react";
import {
  TogglePill,
  TOGGLE_PILL_VARIANTS,
  type TogglePillVariant,
} from "@/components/ui/toggle-pill";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "motion/react";

export default function Demo() {
  const [activeTab, setActiveTab] = useState<"pills" | "usecase">("pills");

  // Controlled states for Tab 1 (Three Pills)
  const [pillsState, setPillsState] = useState<Record<TogglePillVariant, boolean>>({
    "apple-ios": true,
    "monochrome-dark": true,
    "linear-indigo": false,
  });

  const settingsRows = [
    {
      title: "Solana Priority Gas Fees",
      desc: "Submit dynamic compute unit price to land transactions fast",
      variant: "linear-indigo" as TogglePillVariant,
      defaultVal: true,
    },
    {
      title: "RPC Cluster Failover",
      desc: "Switch automatically between Helius, Triton, and Alchemy endpoints",
      variant: "apple-ios" as TogglePillVariant,
      defaultVal: true,
    },
    {
      title: "MEV Protection & Jito Bundles",
      desc: "Route swap transactions through private mempool to avoid sandwich attacks",
      variant: "monochrome-dark" as TogglePillVariant,
      defaultVal: false,
    },
  ];

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-8 p-6 md:p-10 select-none items-center justify-center font-sans">
      {/* Header Specs Bar */}
      <header className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
          Toggle Pill
        </h1>
        <p className="max-w-md text-sm text-zinc-500 dark:text-zinc-400">
          Smooth spring animation toggle pills with 21px container padding.
        </p>
      </header>

      {/* 2 Tabs Segmented Control */}
      <div className="flex items-center gap-1 rounded-2xl bg-zinc-100 p-1.5 dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 shadow-xs">
        <button
          type="button"
          onClick={() => setActiveTab("pills")}
          className={cn(
            "relative flex items-center justify-center rounded-xl px-5 py-2 text-xs font-bold transition-all cursor-pointer",
            activeTab === "pills"
              ? "bg-white text-zinc-900 shadow-md dark:bg-zinc-800 dark:text-white"
              : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200"
          )}
        >
          Three Pills
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("usecase")}
          className={cn(
            "relative flex items-center justify-center rounded-xl px-5 py-2 text-xs font-bold transition-all cursor-pointer",
            activeTab === "usecase"
              ? "bg-white text-zinc-900 shadow-md dark:bg-zinc-800 dark:text-white"
              : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200"
          )}
        >
          Example Use Case
        </button>
      </div>

      {/* Tab Content Display */}
      <div className="w-full">
        <AnimatePresence mode="wait">
          {activeTab === "pills" ? (
            <motion.div
              key="tab-pills"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col gap-4 w-full"
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {(Object.keys(TOGGLE_PILL_VARIANTS) as TogglePillVariant[]).map((vKey) => {
                  const item = TOGGLE_PILL_VARIANTS[vKey];
                  const isActive = pillsState[vKey];

                  return (
                    <div
                      key={vKey}
                      className="flex flex-col justify-between rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-900 p-5 shadow-sm text-white"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-white">
                            {item.name}
                          </span>
                          <span className="text-xs text-zinc-400">
                            {item.subtitle}
                          </span>
                        </div>

                        <TogglePill
                          variant={vKey}
                          checked={isActive}
                          onChange={(nextChecked) =>
                            setPillsState((prev) => ({ ...prev, [vKey]: nextChecked }))
                          }
                        />
                      </div>

                      <div className="mt-4 flex items-center justify-between border-t border-zinc-800 pt-3 text-xs font-mono text-zinc-400">
                        <span>State: <strong className="text-white">{isActive ? "ACTIVE" : "INACTIVE"}</strong></span>
                        <span>Shift: <strong className="text-sky-400">{isActive ? "24px" : "0px"}</strong></span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="tab-usecase"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col gap-4 w-full"
            >
              <div className="flex flex-col rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 divide-y divide-zinc-100 dark:divide-zinc-900 shadow-xl overflow-hidden">
                {settingsRows.map((row) => (
                  <div
                    key={row.title}
                    className="flex items-center justify-between gap-4 p-5 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors"
                  >
                    <div className="flex flex-col gap-0.5">
                      <span className="text-sm font-bold text-zinc-900 dark:text-white">
                        {row.title}
                      </span>
                      <span className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                        {row.desc}
                      </span>
                    </div>

                    <TogglePill variant={row.variant} defaultChecked={row.defaultVal} />
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
