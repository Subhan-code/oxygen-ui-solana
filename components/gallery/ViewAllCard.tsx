"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { SPRING_PRESS } from "@/lib/ease";
import { cn } from "@/lib/utils";

const MotionLink = motion.create(Link);

export default function ViewAllCard({
  count,
  className,
}: {
  count: number;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <MotionLink
      href="/sol"
      whileTap={reduceMotion ? undefined : { scale: 0.97 }}
      transition={SPRING_PRESS}
      className={cn(
        "group relative flex min-h-45 flex-col justify-between overflow-hidden rounded-[32px] bg-[#0066FF] p-6 text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.25)] motion-safe:transition-colors motion-safe:duration-200 motion-safe:ease-out hover:bg-[#0052CC] outline-none focus-visible:ring-2 focus-visible:ring-white/70",
        className,
      )}
      style={{ cornerShape: "squircle" } as React.CSSProperties}
    >
      <img
        src="/logos/Oxygenui-shadow.svg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-20 -right-20 h-80 w-80 opacity-25 [filter:brightness(0)_invert(1)]"
      />

      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        xmlns="http://www.w3.org/2000/svg"
        className="relative h-8 w-8 motion-safe:transition-transform motion-safe:duration-200 motion-safe:ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        aria-hidden="true"
      >
        <path d="M7 17 17 7M8 7h9v9" />
      </svg>

      <span className="lift-on-hover relative font-runde text-2xl font-bold tracking-tight">
        View all
        <br />
        {count} components
      </span>
    </MotionLink>
  );
}
