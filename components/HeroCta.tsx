"use client";

import Link from "next/link";
import { Squircle } from "@squircle-js/react";
import { motion, useReducedMotion } from "motion/react";
import { useStarCount } from "@/lib/use-star-count";
import { cn } from "@/lib/utils";

function formatStars(count: number): string {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k`;
  }
  return count.toLocaleString();
}

export default function HeroCta({
  className,
  stars,
}: {
  className?: string;
  stars?: number | null;
}) {
  const reduceMotion = useReducedMotion();
  const liveStars = useStarCount(stars);
  const displayStars = liveStars ?? stars ?? 3;

  const hoverSpring = reduceMotion
    ? undefined
    : { scale: 1.03, y: -1 };

  const tapSpring = reduceMotion
    ? undefined
    : { scale: 0.97, y: 0 };

  const springTransition = {
    type: "spring" as const,
    stiffness: 400,
    damping: 25,
  };

  return (
    <div
      className={cn(
        "mt-6 flex flex-wrap items-center justify-center gap-3.5",
        className
      )}
    >
      <motion.div
        initial={false}
        whileHover={hoverSpring}
        whileTap={tapSpring}
        transition={springTransition}
        className="group relative cursor-pointer"
      >
        <Squircle asChild cornerRadius={16} cornerSmoothing={1}>
          <div className="absolute inset-0 bg-[#0066FF] shadow-[0_0_24px_rgba(0,102,255,0.4)] transition-all duration-300 ease-out group-hover:bg-[#0055d6] group-hover:shadow-[0_0_36px_rgba(0,102,255,0.7)]" />
        </Squircle>

        <a
          href="https://github.com/Subhan-code/oxygen-ui-solana"
          target="_blank"
          rel="noreferrer"
          aria-label="Oxygen UI on GitHub"
          className="relative flex h-12 items-center gap-2.5 px-6 text-sm font-semibold font-runde text-white outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0066FF]"
        >
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-4 shrink-0 transition-transform duration-200 ease-out group-hover:scale-110"
            aria-hidden="true"
          >
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
          </svg>

          <span>GitHub Repo</span>

          <span className="flex items-center gap-1 rounded-full bg-white/20 px-2 py-0.5 text-xs font-mono font-bold text-white shadow-2xs transition-colors duration-200 group-hover:bg-white/30">
            <span className="tabular-nums">{formatStars(displayStars)}</span>
          </span>
        </a>
      </motion.div>

      <motion.div
        initial={false}
        whileHover={hoverSpring}
        whileTap={tapSpring}
        transition={springTransition}
        className="group relative cursor-pointer"
      >
        <Squircle asChild cornerRadius={16} cornerSmoothing={1}>
          <div className="absolute inset-0 bg-black/95 border border-white/20 shadow-lg shadow-black/50 transition-all duration-300 ease-out group-hover:border-white/40 group-hover:shadow-[0_0_25px_rgba(255,255,255,0.15)]" />
        </Squircle>

        <Link
          href="/components"
          className="relative flex h-12 items-center gap-2 px-6 text-sm font-semibold font-runde text-white outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
        >
          <span>Explore components</span>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-3.5 text-white/70 transition-transform duration-200 ease-out group-hover:translate-x-1 group-hover:text-white"
            aria-hidden="true"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </Link>
      </motion.div>
    </div>
  );
}
