"use client";

import { useState } from "react";
import Link from "next/link";
import { Squircle } from "@squircle-js/react";
import { motion, useReducedMotion } from "motion/react";
import useMeasure from "react-use-measure";
import { SPRING_LAYOUT, SPRING_PRESS } from "@/lib/ease";
import { cn } from "@/lib/utils";

const GROW_PX = 18;

function StretchSquircleBg({
  hovered,
  className,
  bgClassName,
}: {
  hovered: boolean;
  className?: string;
  bgClassName: string;
}) {
  const reduceMotion = useReducedMotion();
  const [ref, bounds] = useMeasure();
  const scaleX =
    hovered && !reduceMotion && bounds.width > 0
      ? (bounds.width + GROW_PX) / bounds.width
      : 1;

  return (
    <motion.div
      ref={ref}
      initial={false}
      animate={{ scaleX }}
      transition={SPRING_LAYOUT}
      className={cn("absolute inset-0", className)}
    >
      <Squircle asChild cornerRadius={16} cornerSmoothing={1}>
        <div className={cn("size-full", bgClassName)} />
      </Squircle>
    </motion.div>
  );
}

export default function HeroCta({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={cn(
        "mt-6 flex items-center justify-center",
        className,
      )}
    >
      <motion.div
        initial={false}
        whileTap={reduceMotion ? undefined : { scale: 0.97 }}
        transition={SPRING_PRESS}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        className="group relative cursor-pointer"
      >
        <StretchSquircleBg
          hovered={hovered}
          bgClassName="bg-[#0066FF] shadow-[0_0_20px_rgba(0,102,255,0.35)] transition-all duration-150 ease-out group-hover:bg-[#0052CC] group-hover:shadow-[0_0_25px_rgba(0,102,255,0.5)]"
        />
        <Link
          href="/components"
          className="relative flex h-12 items-center px-8 text-sm font-semibold font-runde text-white outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0066FF]"
        >
          Explore components
        </Link>
      </motion.div>
    </div>
  );
}

