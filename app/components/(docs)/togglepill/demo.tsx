"use client";

import React, { useState } from "react";
import {
  TogglePill,
  TOGGLE_PILL_VARIANTS,
  type TogglePillVariant,
} from "@/components/ui/toggle-pill";
import { cn } from "@/lib/utils";

export default function Demo() {
  const [variant, setVariant] = useState<TogglePillVariant>("monochrome-dark");
  const [checked, setChecked] = useState(true);
  const [showGuides, setShowGuides] = useState(false);
  const [useCssTransition, setUseCssTransition] = useState(false);

  // Custom colors state
  const profile = TOGGLE_PILL_VARIANTS[variant];
  const [customActiveTrack, setCustomActiveTrack] = useState(profile.activeTrack);
  const [customInactiveTrack, setCustomInactiveTrack] = useState(profile.inactiveTrack);
  const [customActiveThumb, setCustomActiveThumb] = useState(profile.activeThumb);
  const [customInactiveThumb, setCustomInactiveThumb] = useState(profile.inactiveThumb);

  const handleSelectProfile = (v: TogglePillVariant) => {
    setVariant(v);
    const p = TOGGLE_PILL_VARIANTS[v];
    setCustomActiveTrack(p.activeTrack);
    setCustomInactiveTrack(p.inactiveTrack);
    setCustomActiveThumb(p.activeThumb);
    setCustomInactiveThumb(p.inactiveThumb);
  };

  const htmlStructureOutput = `<div style="padding:21px;margin:0;box-sizing:border-box;">
  <div 
    class="toggle-pill-root" 
    aria-hidden="true" 
    style="width:74px;height:28px;border-radius:14px;background-color:${checked ? customActiveTrack : customInactiveTrack};position:relative;margin:0;box-sizing:border-box;display:flex;align-items:center;cursor:pointer;transition:background-color 0.24s ease;"
  >
    <div 
      class="toggle-pill-thumb" 
      style="width:44px;height:22px;top:2.5px;left:3px;touch-action:none;position:absolute;border-radius:11px;background-color:${checked ? customActiveThumb : customInactiveThumb};box-shadow:0 1px 2px rgba(0,0,0,0.12);box-sizing:border-box;margin:0;transform:translateX(${checked ? "24px" : "0px"});transition:transform 0.24s cubic-bezier(0.34, 1.56, 0.64, 1), background-color 0.24s ease;"
    ></div>
  </div>
</div>`;

  const settingsRows = [
    {
      title: "Solana Priority Gas Fees",
      desc: "Submit dynamic compute unit price to land transactions fast",
      variant: "electric-blue" as TogglePillVariant,
      defaultVal: true,
    },
    {
      title: "RPC Cluster Failover",
      desc: "Switch automatically between Helius, Triton, and Alchemy endpoints",
      variant: "apple-ios" as TogglePillVariant,
      defaultVal: true,
    },
    {
      title: "Auto-Approve Micro-Swaps",
      desc: "Bypass confirmation modal for trades below 0.1 SOL",
      variant: "monochrome-dark" as TogglePillVariant,
      defaultVal: true,
    },
    {
      title: "MEV Protection & Jito Bundles",
      desc: "Route swap transactions through private mempool to avoid sandwich attacks",
      variant: "linear-indigo" as TogglePillVariant,
      defaultVal: false,
    },
    {
      title: "Hardware Ledger Signer",
      desc: "Require Ledger Nano or Keystone biometric signing for transfers",
      variant: "spotify-green" as TogglePillVariant,
      defaultVal: true,
    },
    {
      title: "Real-time WebSocket Streaming",
      desc: "Stream live SPL token account balance updates via Solana Geyser RPC",
      variant: "electric-blue" as TogglePillVariant,
      defaultVal: true,
    },
  ];

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-12 p-6 md:p-10 select-none items-center justify-center transition-all duration-300">
      {/* Header Specs Bar */}
      <header className="flex flex-col items-center gap-3 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-4 py-1.5 text-xs font-semibold shadow-xs backdrop-blur-md dark:border-white/15 dark:bg-white/10 text-sky-500">
          <span className="h-2 w-2 rounded-full bg-sky-500 animate-pulse" />
          74×28px Pill · 44×22px Capsule · 24px Shift
        </div>
        <h1 className="font-runde text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
          Toggle Pill
        </h1>
        <p className="max-w-xl text-balance text-sm font-medium text-zinc-600 dark:text-zinc-400 sm:text-base">
          Fixed Default Geometry: Top 2.5px, Bottom 3.5px, Sides 3px, Outer Padding 21px.
        </p>
      </header>

      {/* Interactive Sandbox */}
      <section className="flex flex-col gap-6 rounded-[32px] border border-black/[0.08] bg-white/80 p-6 backdrop-blur-2xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.08)] dark:border-white/10 dark:bg-neutral-900/80 dark:shadow-none"
        style={{ cornerShape: "squircle" } as React.CSSProperties}
      >
        <div className="flex items-center justify-between border-b border-black/[0.06] pb-4 dark:border-white/[0.08]">
          <h2 className="font-sans text-lg font-semibold tracking-tight text-zinc-900 dark:text-white">
            Interactive Sandbox
          </h2>

          <button
            type="button"
            onClick={() => setShowGuides((v) => !v)}
            className={cn(
              "px-3 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer border",
              showGuides
                ? "bg-sky-500 text-white border-sky-500"
                : "border-black/10 dark:border-white/15 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
            )}
          >
            {showGuides ? "Guides ON" : "Show Guides"}
          </button>
        </div>

        {/* Live Preview Display Box */}
        <div className="relative flex min-h-[220px] w-full flex-col items-center justify-center gap-4 rounded-2xl border border-black/[0.06] bg-zinc-950/90 p-8 text-white">
          <TogglePill
            checked={checked}
            onChange={setChecked}
            variant={variant}
            showGuides={showGuides}
            useCssTransition={useCssTransition}
            activeTrackColor={customActiveTrack}
            inactiveTrackColor={customInactiveTrack}
            activeThumbColor={customActiveThumb}
            inactiveThumbColor={customInactiveThumb}
          />

          <div className="flex items-center gap-4 text-xs font-mono text-zinc-400">
            <span>State: <strong className="text-white">{checked ? "ACTIVE" : "INACTIVE"}</strong></span>
            <span>Shift: <strong className="text-sky-400">{checked ? "24px" : "0px"}</strong></span>
          </div>
        </div>

        {/* Profile Matrix Selector */}
        <div className="flex flex-col gap-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
            Select Exact Color &amp; Styling Profile
          </span>

          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-6">
            {(Object.keys(TOGGLE_PILL_VARIANTS) as TogglePillVariant[]).map((vKey) => {
              const item = TOGGLE_PILL_VARIANTS[vKey];
              const isSelected = variant === vKey;

              return (
                <button
                  key={vKey}
                  type="button"
                  onClick={() => handleSelectProfile(vKey)}
                  className={cn(
                    "flex flex-col gap-1 rounded-2xl border p-3 text-left transition-all cursor-pointer",
                    isSelected
                      ? "border-sky-500 bg-sky-500/10 shadow-xs"
                      : "border-black/10 dark:border-white/10 hover:border-sky-500/50"
                  )}
                >
                  <span className="font-sans text-xs font-semibold text-zinc-900 dark:text-white line-clamp-1">
                    {item.name}
                  </span>
                  <span className="text-[10px] text-zinc-500 dark:text-zinc-400">
                    {item.subtitle}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Physics Mode Toggle */}
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-black/[0.06] bg-zinc-50 p-4 dark:border-white/[0.08] dark:bg-neutral-950/60">
          <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
            Transition Engine: <strong className="text-sky-500">{useCssTransition ? "Pure CSS Transition" : "Framer Motion Spring"}</strong>
          </span>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setUseCssTransition(false)}
              className={cn(
                "px-3 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer border",
                !useCssTransition
                  ? "bg-sky-500 text-white border-sky-500"
                  : "border-black/10 dark:border-white/15 text-zinc-600 dark:text-zinc-400"
              )}
            >
              Framer Motion Spring
            </button>
            <button
              type="button"
              onClick={() => setUseCssTransition(true)}
              className={cn(
                "px-3 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer border",
                useCssTransition
                  ? "bg-sky-500 text-white border-sky-500"
                  : "border-black/10 dark:border-white/15 text-zinc-600 dark:text-zinc-400"
              )}
            >
              Pure CSS
            </button>
          </div>
        </div>

        {/* Color Controls */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-medium text-zinc-500">Active Track Color</label>
            <div className="flex items-center gap-2 rounded-xl border border-black/10 p-2 dark:border-white/10">
              <input
                type="color"
                value={customActiveTrack}
                onChange={(e) => setCustomActiveTrack(e.target.value)}
                className="h-6 w-6 cursor-pointer rounded-md border-0 bg-transparent"
              />
              <span className="font-mono text-xs text-zinc-800 dark:text-zinc-200">{customActiveTrack}</span>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-medium text-zinc-500">Inactive Track Color</label>
            <div className="flex items-center gap-2 rounded-xl border border-black/10 p-2 dark:border-white/10">
              <input
                type="color"
                value={customInactiveTrack}
                onChange={(e) => setCustomInactiveTrack(e.target.value)}
                className="h-6 w-6 cursor-pointer rounded-md border-0 bg-transparent"
              />
              <span className="font-mono text-xs text-zinc-800 dark:text-zinc-200">{customInactiveTrack}</span>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-medium text-zinc-500">Active Thumb Color</label>
            <div className="flex items-center gap-2 rounded-xl border border-black/10 p-2 dark:border-white/10">
              <input
                type="color"
                value={customActiveThumb}
                onChange={(e) => setCustomActiveThumb(e.target.value)}
                className="h-6 w-6 cursor-pointer rounded-md border-0 bg-transparent"
              />
              <span className="font-mono text-xs text-zinc-800 dark:text-zinc-200">{customActiveThumb}</span>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-medium text-zinc-500">Inactive Thumb Color</label>
            <div className="flex items-center gap-2 rounded-xl border border-black/10 p-2 dark:border-white/10">
              <input
                type="color"
                value={customInactiveThumb}
                onChange={(e) => setCustomInactiveThumb(e.target.value)}
                className="h-6 w-6 cursor-pointer rounded-md border-0 bg-transparent"
              />
              <span className="font-mono text-xs text-zinc-800 dark:text-zinc-200">{customInactiveThumb}</span>
            </div>
          </div>
        </div>

        {/* HTML & SCSS Structure Output */}
        <div className="flex flex-col gap-2 pt-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
              Exact HTML &amp; SCSS Structure Output (Fixed Default)
            </span>
            <button
              type="button"
              onClick={() => navigator.clipboard.writeText(htmlStructureOutput)}
              className="px-3 py-1 rounded-full bg-sky-500 text-white text-xs font-medium cursor-pointer hover:bg-sky-600 transition-colors"
            >
              Copy Exact HTML
            </button>
          </div>
          <pre className="no-scrollbar overflow-x-auto rounded-2xl border border-black/10 bg-zinc-950 p-4 font-mono text-xs text-zinc-200 dark:border-white/10">
            {htmlStructureOutput}
          </pre>
        </div>
      </section>

      {/* Color & Styling Variations Matrix */}
      <section className="flex flex-col gap-6">
        <header className="flex flex-col gap-1">
          <h2 className="font-sans text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Color &amp; Styling Variations Matrix
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Demonstrating equal 21px padding, 74×28px track, and 44×22px thumb across authentic design systems.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {(Object.keys(TOGGLE_PILL_VARIANTS) as TogglePillVariant[]).map((vKey) => {
            const item = TOGGLE_PILL_VARIANTS[vKey];
            const isInitialActive = vKey !== "linear-indigo" && vKey !== "electric-blue";

            return (
              <div
                key={vKey}
                className="flex flex-col justify-between rounded-3xl border border-black/[0.08] bg-white/80 p-5 backdrop-blur-2xl dark:border-white/10 dark:bg-neutral-900/80"
                style={{ cornerShape: "squircle" } as React.CSSProperties}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex flex-col">
                    <span className="font-sans text-sm font-semibold text-zinc-900 dark:text-white">
                      {item.name}
                    </span>
                    <span className="text-xs text-zinc-500 dark:text-zinc-400">
                      {item.subtitle}
                    </span>
                  </div>

                  <TogglePill variant={vKey} defaultChecked={isInitialActive} />
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-black/[0.04] pt-3 dark:border-white/[0.06] text-xs font-mono text-zinc-500">
                  <span>State: {isInitialActive ? "ACTIVE" : "INACTIVE"}</span>
                  <span>Shift: {isInitialActive ? "24px" : "0px"}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Settings List Row Integration */}
      <section className="flex flex-col gap-6">
        <header className="flex flex-col gap-1">
          <h2 className="font-sans text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Settings List Row Integration
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Pristine vertical alignment with equal 21px padding container.
          </p>
        </header>

        <div
          className="flex flex-col overflow-hidden rounded-[28px] border border-black/[0.08] bg-white/80 backdrop-blur-2xl divide-y divide-black/[0.06] dark:border-white/10 dark:bg-neutral-900/80 dark:divide-white/[0.08]"
          style={{ cornerShape: "squircle" } as React.CSSProperties}
        >
          {settingsRows.map((row) => (
            <div
              key={row.title}
              className="flex items-center justify-between gap-4 p-5 transition-colors hover:bg-black/[0.02] dark:hover:bg-white/[0.02]"
            >
              <div className="flex flex-col gap-0.5">
                <span className="font-sans text-sm font-semibold text-zinc-900 dark:text-white">
                  {row.title}
                </span>
                <span className="text-xs text-zinc-500 dark:text-zinc-400">
                  {row.desc}
                </span>
              </div>

              <TogglePill variant={row.variant} defaultChecked={row.defaultVal} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
