"use client";

import React from "react";
import {
  SmoothTabs,
  SmoothTabsList,
  SmoothTabsTab,
  SmoothTabsPanels,
  SmoothTabsPanel,
} from "@/components/ui/smooth-tabs";

export default function Demo() {
  return (
    <div className="flex min-h-[460px] w-full flex-col items-center justify-center p-6 transition-all duration-300">
      <SmoothTabs defaultValue="overview" className="w-full max-w-md items-center">
        <SmoothTabsList ariaLabel="Account sections">
          <SmoothTabsTab value="overview">Overview</SmoothTabsTab>
          <SmoothTabsTab value="analytics">Analytics</SmoothTabsTab>
          <SmoothTabsTab value="settings">Settings</SmoothTabsTab>
        </SmoothTabsList>

        <SmoothTabsPanels>
          <SmoothTabsPanel value="overview">
            <div className="rounded-3xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900 shadow-xl">
              <h4 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
                Workspace Overview
              </h4>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-2 leading-relaxed">
                Seamlessly coordinate state transitions, active pill movement, and directional blur crossfades.
              </p>
            </div>
          </SmoothTabsPanel>

          <SmoothTabsPanel value="analytics">
            <div className="rounded-3xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900 shadow-xl">
              <h4 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
                Live Metrics & Velocity
              </h4>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-2 leading-relaxed">
                Real-time GPU frame rates, animation duration tracking, and memory allocations.
              </p>
            </div>
          </SmoothTabsPanel>

          <SmoothTabsPanel value="settings">
            <div className="rounded-3xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900 shadow-xl">
              <h4 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
                Preferences & Security
              </h4>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-2 leading-relaxed">
                Configure reduced motion fallbacks, spring damping constants, and layout scopes.
              </p>
            </div>
          </SmoothTabsPanel>
        </SmoothTabsPanels>
      </SmoothTabs>
    </div>
  );
}
