"use client";

import React, { useState } from "react";
import { Download, Coins, Layers, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export function CssAnimationSuite({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const [activeTab, setActiveTab] = useState<"coin" | "download" | "card" | "shimmer">("coin");

  return (
    <div
      data-slot="css-animation-suite"
      className={cn("flex flex-col items-center justify-center gap-6 w-full max-w-md select-none", className)}
      {...props}
    >
      {/* Interactive Feature Tabs */}
      <div className="flex items-center gap-1 rounded-full border border-black/10 dark:border-white/10 bg-white/70 dark:bg-[#1c1c1e]/80 p-1 shadow-xs backdrop-blur-md">
        {(
          [
            { id: "coin", label: "3D Coin", icon: Coins },
            { id: "download", label: "Arrow", icon: Download },
            { id: "card", label: "3D Lift", icon: Layers },
            { id: "shimmer", label: "Shimmer", icon: Sparkles },
          ] as const
        ).map((t) => {
          const Icon = t.icon;
          const isSelected = activeTab === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setActiveTab(t.id)}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer outline-none",
                isSelected
                  ? "bg-blue-600 text-white shadow-xs"
                  : "text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/10"
              )}
            >
              <Icon className="size-3.5" />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Display Stage */}
      <div className="relative flex h-[240px] w-full items-center justify-center rounded-3xl border border-black/10 dark:border-white/12 bg-white/80 dark:bg-[#1c1c1e]/90 p-6 shadow-2xl backdrop-blur-2xl overflow-hidden">
        {/* 1. 3D Coin Spin */}
        {activeTab === "coin" && (
          <div className="flex flex-col items-center gap-4">
            <div className="relative size-20 [perspective:1000px]">
              <div className="size-full rounded-full border-4 border-amber-400 bg-gradient-to-tr from-amber-500 to-yellow-300 shadow-xl flex items-center justify-center font-black text-white text-2xl animate-[spin_4s_linear_infinite]">
                $
              </div>
            </div>
            <span className="text-xs font-bold text-muted-foreground font-mono">Pure CSS 3D Rotation</span>
          </div>
        )}

        {/* 2. Download Arrow Pulse */}
        {activeTab === "download" && (
          <div className="flex flex-col items-center gap-4">
            <button
              type="button"
              className="group flex items-center gap-2 rounded-2xl bg-blue-600 px-6 py-3 text-xs font-bold text-white shadow-lg shadow-blue-500/30 transition-transform active:scale-95 cursor-pointer"
            >
              <span>Download Vault</span>
              <Download className="size-4 transition-transform group-hover:translate-y-1 animate-bounce" />
            </button>
            <span className="text-xs font-bold text-muted-foreground font-mono">CSS Bounce Keyframes</span>
          </div>
        )}

        {/* 3. 3D Card Hover Elevation */}
        {activeTab === "card" && (
          <div className="group relative flex h-32 w-56 flex-col justify-between rounded-2xl border border-blue-500/30 bg-gradient-to-br from-blue-600 to-indigo-700 p-4 text-white shadow-xl transition-all duration-300 hover:-translate-y-2 hover:rotate-1 hover:shadow-2xl cursor-pointer">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-200">Solana Card</span>
              <Coins className="size-5 text-amber-300" />
            </div>
            <div className="font-mono text-sm font-bold tracking-widest">•••• 8842</div>
          </div>
        )}

        {/* 4. Text Shimmer Reveal */}
        {activeTab === "shimmer" && (
          <div className="flex flex-col items-center gap-3">
            <h2 className="bg-gradient-to-r from-blue-600 via-sky-400 to-indigo-600 bg-[length:200%_auto] bg-clip-text text-3xl font-black text-transparent animate-[shimmer_3s_linear_infinite] tracking-tight">
              OXYGEN UI SUITE
            </h2>
            <span className="text-xs font-bold text-muted-foreground font-mono">Gradient Text Shimmer</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default CssAnimationSuite;
