"use client";

import React from "react";
import { motion, useReducedMotion } from "motion/react";
import { SPRING_PRESS } from "@/lib/ease";
import ScrollReveal from "./ScrollReveal";
import { cn } from "@/lib/utils";
import { Copy, Check, Zap, Sparkles, Activity, ShieldCheck } from "lucide-react";

const MOTION_BLOCKS = [
  {
    kicker: "01 / GESTURE UI",
    title: "Interruptible Spring Physics",
    description: "1:1 touch tracking for Solana wallet drawers and swap sheets. Fluid spring damping with mid-flight gesture interruption.",
    command: "npx shadcn add @oxygen/drawer",
    pills: ["1:1 Drag", "Spring Damping", "Interruptible"],
    bgClass: "bg-[#EAF4FF] dark:bg-[#0E2038]",
    tagBg: "bg-blue-500/10 text-blue-800 dark:bg-blue-400/15 dark:text-blue-200 border-blue-200/50 dark:border-blue-800/40",
    icon: Zap,
  },
  {
    kicker: "02 / 60 FPS GPU",
    title: "Off-Main-Thread Composite Motion",
    description: "Zero layout recalculations or reflows. Built strictly on composite-only transform and opacity channels for 60 FPS on mobile dApps.",
    command: "npx shadcn add @oxygen/stat-card",
    pills: ["60 FPS", "Composite Only", "Zero Reflow"],
    bgClass: "bg-[#E9FBF3] dark:bg-[#0C2A1E]",
    tagBg: "bg-emerald-500/10 text-emerald-800 dark:bg-emerald-400/15 dark:text-emerald-200 border-emerald-200/50 dark:border-emerald-800/40",
    icon: Activity,
  },
  {
    kicker: "03 / LAYOUT MORPHS",
    title: "Continuous Curvature & LayoutId",
    description: "Apple squircle geometry combined with smooth shared-element layout transitions across dialogs, modals, and tabs.",
    command: "npx shadcn add @oxygen/qr-code",
    pills: ["Apple Squircles", "LayoutId", "Shared Elements"],
    bgClass: "bg-[#FFF4EA] dark:bg-[#2B1B0E]",
    tagBg: "bg-amber-500/10 text-amber-800 dark:bg-amber-400/15 dark:text-amber-200 border-amber-200/50 dark:border-amber-800/40",
    icon: Sparkles,
  },
  {
    kicker: "04 / ACCESSIBILITY",
    title: "Prefers-Reduced-Motion Native",
    description: "Every Solana primitive ships with instant accessible fallbacks for motion sensitivity, respecting system settings seamlessly.",
    command: "npx shadcn add @oxygen/txn-status",
    pills: ["prefers-reduced-motion", "MotionConfig", "A11y First"],
    bgClass: "bg-[#F1EAFF] dark:bg-[#1E1438]",
    tagBg: "bg-purple-500/10 text-purple-800 dark:bg-purple-400/15 dark:text-purple-200 border-purple-200/50 dark:border-purple-800/40",
    icon: ShieldCheck,
  },
];

export default function MotionSkillsSection() {
  const shouldReduceMotion = useReducedMotion();
  const [copiedIdx, setCopiedIdx] = React.useState<number | null>(null);

  const copyCommand = (cmd: string, idx: number) => {
    navigator.clipboard.writeText(cmd);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <section className="relative w-full px-4 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-200/80 pb-6 dark:border-white/10">
          <div>
            <span className="font-mono text-[11px] font-semibold tracking-wide text-[#0066FF] dark:text-[#0A84FF]">
              MOTION ENGINE
            </span>
            <h2 className="mt-2 max-w-2xl font-runde text-2xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-3xl md:text-4xl">
              Crafted with Animations on the Web Motion Physics
            </h2>
            <p className="mt-2 max-w-xl text-xs sm:text-sm font-medium text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Grounded in Emil Kowalski&apos;s motion principles: spring physics, composite-only GPU layers, interruptible touch gestures, and accessible reduced-motion fallbacks.
            </p>
          </div>
          <span className="font-mono text-[11px] font-semibold text-zinc-400 select-none">
            60 FPS ENGINE
          </span>
        </header>

        <ScrollReveal>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {MOTION_BLOCKS.map((block, idx) => {
              const Icon = block.icon;
              return (
                <motion.div
                  key={block.title}
                  whileTap={shouldReduceMotion ? undefined : { scale: 0.99 }}
                  transition={SPRING_PRESS}
                  className="flex flex-col justify-between rounded-[32px] border border-zinc-200/90 dark:border-white/10 bg-white dark:bg-zinc-900/90 p-3 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  style={{ cornerShape: "squircle" } as React.CSSProperties}
                >
                  <div
                    className={cn(
                      "flex flex-col justify-between rounded-[24px] p-6 space-y-6 min-h-[240px] transition-colors duration-300",
                      block.bgClass
                    )}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[11px] font-semibold tracking-wider text-zinc-500 dark:text-zinc-400">
                          {block.kicker}
                        </span>
                        <div className="flex size-8 items-center justify-center rounded-xl bg-white/80 dark:bg-white/10 border border-black/5 dark:border-white/10 backdrop-blur-md text-zinc-800 dark:text-zinc-200">
                          <Icon className="size-4" />
                        </div>
                      </div>

                      <h3 className="font-runde text-xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-2xl">
                        {block.title}
                      </h3>
                      <p className="text-xs sm:text-sm font-medium text-zinc-600 dark:text-zinc-300 leading-relaxed">
                        {block.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {block.pills.map((pill) => (
                        <span
                          key={pill}
                          className={cn(
                            "rounded-lg px-2.5 py-1 text-[11px] font-semibold border backdrop-blur-md transition-colors",
                            block.tagBg
                          )}
                        >
                          {pill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between px-4 py-3 pt-4">
                    <code className="font-mono text-xs text-zinc-700 dark:text-zinc-300 truncate">
                      {block.command}
                    </code>
                    <button
                      type="button"
                      onClick={() => copyCommand(block.command, idx)}
                      className="inline-flex size-8 items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-800/80 border border-black/5 dark:border-white/10 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-900 hover:text-white dark:hover:bg-white dark:hover:text-zinc-900 transition-colors"
                      title="Copy CLI command"
                    >
                      {copiedIdx === idx ? (
                        <Check className="size-3.5 text-emerald-500" />
                      ) : (
                        <Copy className="size-3.5" />
                      )}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
