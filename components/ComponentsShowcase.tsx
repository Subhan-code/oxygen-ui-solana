"use client";

import React, { useState, useCallback } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowDownUp,
  Check,
  Copy,
  ExternalLink,
  Zap,
  TrendingUp,
  Calendar,
  Layers,
} from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import { cn } from "@/lib/utils";

export default function ComponentsShowcase() {
  // interactive swap state
  const [solAmount, setSolAmount] = useState("2.5");
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);
  const [rsvpState, setRsvpState] = useState(false);
  const [copiedAddr, setCopiedAddr] = useState(false);

  const copyCli = useCallback((slug: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(`npx shadcn@latest add ${slug}`);
    setCopiedSlug(slug);
    setTimeout(() => setCopiedSlug(null), 2000);
  }, []);

  const copyAddress = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText("8xPt...94kx");
    setCopiedAddr(true);
    setTimeout(() => setCopiedAddr(false), 2000);
  }, []);

  const numSol = parseFloat(solAmount) || 0;
  const usdcEstimate = (numSol * 184.2).toFixed(2);

  return (
    <section className="relative w-full max-w-6xl mx-auto px-4 py-16 sm:px-6 md:py-24" suppressHydrationWarning>
      {/* ambient background light */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 size-96 rounded-full bg-gradient-to-tr from-purple-600/10 via-emerald-500/10 to-sky-500/10 blur-3xl pointer-events-none -z-10" />

      <ScrollReveal>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          {/* cell 1: interactive swap terminal (7 cols on desktop) */}
          <div className="lg:col-span-7 flex flex-col justify-between rounded-3xl border border-white/10 bg-zinc-950/80 p-6 sm:p-7 shadow-xl hover:border-white/20 transition-all duration-300 relative overflow-hidden group">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
                  <ArrowDownUp className="size-4" />
                </span>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-white font-runde">
                    Instant Swap Terminal
                  </h3>
                  <span className="text-[11px] font-mono text-zinc-400">
                    Live execution widget
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={(e) => copyCli("crypto-swap-box", e)}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 text-xs text-zinc-300 hover:text-white transition-colors cursor-pointer"
              >
                {copiedSlug === "crypto-swap-box" ? (
                  <>
                    <Check className="size-3 text-emerald-400" />
                    <span className="text-emerald-400 text-[11px]">Copied CLI</span>
                  </>
                ) : (
                  <>
                    <Copy className="size-3" />
                    <span className="text-[11px]">Copy CLI</span>
                  </>
                )}
              </button>
            </div>

            {/* interactive mini swap widget */}
            <div className="space-y-2.5 my-2">
              {/* pay input */}
              <div className="rounded-2xl bg-zinc-900/90 border border-white/5 p-3.5 space-y-1.5">
                <div className="flex justify-between text-[11px] text-zinc-400">
                  <span>You pay</span>
                  <span>Balance: 14.82 SOL</span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <input
                    type="text"
                    value={solAmount}
                    onChange={(e) => setSolAmount(e.target.value)}
                    className="w-full bg-transparent text-xl sm:text-2xl font-bold font-mono text-white focus:outline-none"
                    placeholder="0.00"
                  />
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black border border-white/10 shrink-0 select-none">
                    <span className="size-4 rounded-full bg-gradient-to-r from-purple-500 to-emerald-400" />
                    <span className="text-xs font-bold text-white font-mono">SOL</span>
                  </div>
                </div>
              </div>

              {/* flip button */}
              <div className="flex justify-center -my-1 relative z-10">
                <div className="p-1.5 rounded-full bg-zinc-800 border border-white/10 text-zinc-300 shadow-md">
                  <ArrowDownUp className="size-3.5" />
                </div>
              </div>

              {/* receive output */}
              <div className="rounded-2xl bg-zinc-900/90 border border-white/5 p-3.5 space-y-1.5">
                <div className="flex justify-between text-[11px] text-zinc-400">
                  <span>You receive (estimated)</span>
                  <span>Rate: 1 SOL = $184.20</span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xl sm:text-2xl font-bold font-mono text-emerald-400">
                    {usdcEstimate}
                  </span>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black border border-white/10 shrink-0 select-none">
                    <span className="size-4 rounded-full bg-sky-500 flex items-center justify-center text-[10px] font-bold text-white">
                      $
                    </span>
                    <span className="text-xs font-bold text-white font-mono">USDC</span>
                  </div>
                </div>
              </div>

              {/* swap action */}
              <Link
                href="/components/cryptoswapbox"
                className="w-full h-11 rounded-xl bg-white text-zinc-950 font-bold text-xs sm:text-sm hover:bg-zinc-200 transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <span>Preview Swap in Studio</span>
                <ExternalLink className="size-3.5" />
              </Link>
            </div>

            <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-zinc-400 font-mono">
              <span>Slippage tolerance: 0.5%</span>
              <span className="text-emerald-400">Zero protocol fees</span>
            </div>
          </div>

          {/* cell 2: live identity & wallet card (5 cols on desktop) */}
          <div className="lg:col-span-5 flex flex-col justify-between rounded-3xl border border-white/10 bg-zinc-950/80 p-6 sm:p-7 shadow-xl hover:border-white/20 transition-all duration-300">
            <div className="flex items-center justify-between">
              <span className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                <Zap className="size-4" />
              </span>

              <button
                type="button"
                onClick={(e) => copyCli("solana-identity-card", e)}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 text-xs text-zinc-300 hover:text-white transition-colors cursor-pointer"
              >
                {copiedSlug === "solana-identity-card" ? (
                  <>
                    <Check className="size-3 text-emerald-400" />
                    <span className="text-emerald-400 text-[11px]">Copied CLI</span>
                  </>
                ) : (
                  <>
                    <Copy className="size-3" />
                    <span className="text-[11px]">Copy CLI</span>
                  </>
                )}
              </button>
            </div>

            {/* wallet identity visual presentation */}
            <div className="my-5 p-4 rounded-2xl bg-zinc-900/90 border border-white/5 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-full bg-gradient-to-tr from-purple-500 to-sky-400 p-0.5">
                    <div className="size-full rounded-full bg-black flex items-center justify-center text-xs font-bold text-white">
                      OX
                    </div>
                  </div>
                  <div>
                    <span className="text-sm font-bold text-white block font-runde">
                      solana.oxygen.sol
                    </span>
                    <button
                      type="button"
                      onClick={copyAddress}
                      className="text-[11px] font-mono text-zinc-400 hover:text-white flex items-center gap-1"
                    >
                      <span>8xPt...94kx</span>
                      {copiedAddr ? <Check className="size-3 text-emerald-400" /> : <Copy className="size-3" />}
                    </button>
                  </div>
                </div>

                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-mono text-emerald-400">
                  <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Mainnet
                </span>
              </div>

              <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-mono text-zinc-500 tracking-wider">
                    Total Value
                  </span>
                  <div className="text-xl font-bold font-mono text-white">
                    84.250 <span className="text-xs text-zinc-400">SOL</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase font-mono text-zinc-500 tracking-wider">
                    USD Value
                  </span>
                  <div className="text-sm font-bold font-mono text-emerald-400">
                    $15,518.85
                  </div>
                </div>
              </div>
            </div>

            <Link
              href="/components/solanaidentitycard"
              className="flex items-center justify-between text-xs font-medium text-zinc-300 hover:text-white group/link pt-2"
            >
              <span>Explore Identity Primitives</span>
              <ArrowRight className="size-3.5 transition-transform group-hover/link:translate-x-1" />
            </Link>
          </div>

          {/* cell 3: community & event pass card (6 cols on desktop) */}
          <div className="lg:col-span-6 flex flex-col justify-between rounded-3xl border border-white/10 bg-zinc-950/80 p-6 sm:p-7 shadow-xl hover:border-white/20 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400">
                  <Calendar className="size-4" />
                </span>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-white font-runde">
                    Solana Event Pass
                  </h3>
                  <span className="text-[11px] font-mono text-zinc-400">
                    solana-event-card
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={(e) => copyCli("solana-event-card", e)}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 text-xs text-zinc-300 hover:text-white transition-colors cursor-pointer"
              >
                {copiedSlug === "solana-event-card" ? (
                  <>
                    <Check className="size-3 text-emerald-400" />
                    <span className="text-emerald-400 text-[11px]">Copied CLI</span>
                  </>
                ) : (
                  <>
                    <Copy className="size-3" />
                    <span className="text-[11px]">Copy CLI</span>
                  </>
                )}
              </button>
            </div>

            {/* pass preview */}
            <div className="my-3 p-4 rounded-2xl bg-gradient-to-br from-zinc-900 to-black border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-[10px] font-mono font-semibold">
                  CONFIRMED RSVP
                </span>
                <span className="font-mono text-xs text-zinc-400">
                  DEC 14, 2026
                </span>
              </div>

              <div className="space-y-1">
                <h4 className="text-base font-bold text-white font-runde">
                  Solana Developers Summit
                </h4>
                <p className="text-xs text-zinc-400">
                  San Francisco, CA • Mainstage Access Pass
                </p>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <div className="flex -space-x-2">
                  <div className="size-6 rounded-full bg-purple-500 border border-black" />
                  <div className="size-6 rounded-full bg-emerald-400 border border-black" />
                  <div className="size-6 rounded-full bg-sky-400 border border-black" />
                  <div className="size-6 rounded-full bg-zinc-700 border border-black flex items-center justify-center text-[9px] text-white">
                    +48
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setRsvpState((v) => !v)}
                  className={cn(
                    "px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer",
                    rsvpState
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                      : "bg-white text-zinc-950 hover:bg-zinc-200"
                  )}
                >
                  {rsvpState ? "Joined ✓" : "RSVP Ticket"}
                </button>
              </div>
            </div>

            <Link
              href="/components/solanaeventcard"
              className="flex items-center justify-between text-xs font-medium text-zinc-300 hover:text-white group/link pt-2"
            >
              <span>Inspect Pass in Studio</span>
              <ArrowRight className="size-3.5 transition-transform group-hover/link:translate-x-1" />
            </Link>
          </div>

          {/* cell 4: crypto monsters nft asset (6 cols on desktop) */}
          <div className="lg:col-span-6 flex flex-col justify-between rounded-3xl border border-white/10 bg-zinc-950/80 p-6 sm:p-7 shadow-xl hover:border-white/20 transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400">
                  <Layers className="size-4" />
                </span>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-white font-runde">
                    Crypto Monsters Collection
                  </h3>
                  <span className="text-[11px] font-mono text-zinc-400">
                    Solana NFT Asset Card
                  </span>
                </div>
              </div>

              <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-white text-[10px] font-mono font-medium">
                Verified Asset
              </span>
            </div>

            {/* user reference image card */}
            <div className="my-2 relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-white/10 bg-black group/img">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/showcase/crypto-monsters.jpg"
                alt="Crypto Monsters NFT asset"
                className="size-full object-cover object-center transition-transform duration-500 group-hover/img:scale-105"
                loading="lazy"
              />

              <div className="absolute bottom-2.5 inset-x-2.5 p-3 rounded-xl bg-black/80 backdrop-blur-md border border-white/10 flex items-center justify-between text-xs">
                <div>
                  <span className="text-[10px] text-zinc-400 font-mono block">
                    Floor Price
                  </span>
                  <span className="font-bold text-white font-mono">
                    12.85 SOL
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-zinc-400 font-mono block">
                    24h Volume
                  </span>
                  <span className="font-bold text-emerald-400 font-mono flex items-center gap-0.5">
                    <TrendingUp className="size-3" />
                    +18.4%
                  </span>
                </div>
              </div>
            </div>

            <Link
              href="/components/solananftcard"
              className="flex items-center justify-between text-xs font-medium text-zinc-300 hover:text-white group/link pt-2"
            >
              <span>Explore NFT Cards</span>
              <ArrowRight className="size-3.5 transition-transform group-hover/link:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* centralized bottom link */}
        <div className="mt-12 flex justify-center">
          <Link
            href="/sol"
            className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-white text-zinc-950 font-bold text-xs sm:text-sm hover:bg-zinc-200 transition-all shadow-xl hover:shadow-2xl active:scale-95"
          >
            <span>Browse all 60+ Solana primitives</span>
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </ScrollReveal>
    </section>
  );
}
