"use client";

import { useState } from "react";
import Link from "next/link";
import { Squircle } from "@squircle-js/react";
import { motion, useReducedMotion } from "motion/react";
import useMeasure from "react-use-measure";
import CopyButton from "@/components/CopyButton";
import { REGISTRY_REPO } from "@/lib/components";
import { SPRING_LAYOUT, SPRING_PRESS } from "@/lib/ease";
import { cn } from "@/lib/utils";

const FEATURED = "bounce-sidebar";
const INSTALL_COMMAND = `npx shadcn@latest add ${REGISTRY_REPO}/${FEATURED}`;

const spring = SPRING_LAYOUT;

const GROW_PX = 18;
const SIDE_SHIFT = GROW_PX / 2;

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
      transition={spring}
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
  const [hovered, setHovered] = useState<"pill" | "cta" | null>(null);
  const shift = (px: number) => (reduceMotion ? 0 : px);

  return (
    <div
      className={cn(
        "mt-6 flex flex-wrap items-center justify-center gap-3",
        className,
      )}
    >
      <motion.div
        initial={false}
        animate={{ x: hovered === "cta" ? shift(-SIDE_SHIFT) : 0 }}
        whileTap={reduceMotion ? undefined : { scale: 0.97 }}
        transition={hovered === "cta" ? spring : SPRING_PRESS}
        onHoverStart={() => setHovered("pill")}
        onHoverEnd={() => setHovered((h) => (h === "pill" ? null : h))}
        className="relative max-w-full cursor-pointer"
      >
        <StretchSquircleBg
          hovered={hovered === "pill"}
          bgClassName="bg-neutral-900"
        />
        <CopyButton
          value={INSTALL_COMMAND}
          label="Copy command"
          className="relative h-12 max-w-full flex-row-reverse gap-2 pl-4 pr-4 text-white/50 hover:text-white sm:pl-5"
        >
          <code className="overflow-x-auto whitespace-nowrap font-mono text-xs font-semibold text-white sm:text-sm">
            npx shadcn@latest add {REGISTRY_REPO}
            <span className="font-normal text-white/50">/{FEATURED}</span>
          </code>
        </CopyButton>
      </motion.div>

      <motion.div
        initial={false}
        animate={{ x: hovered === "pill" ? shift(SIDE_SHIFT) : 0 }}
        whileTap={reduceMotion ? undefined : { scale: 0.97 }}
        transition={hovered === "pill" ? spring : SPRING_PRESS}
        onHoverStart={() => setHovered("cta")}
        onHoverEnd={() => setHovered((h) => (h === "cta" ? null : h))}
        className="group relative cursor-pointer"
      >
        <StretchSquircleBg
          hovered={hovered === "cta"}
          bgClassName="bg-[#0066FF] shadow-[0_0_20px_rgba(0,102,255,0.35)] transition-all duration-150 ease-out group-hover:bg-[#0052CC] group-hover:shadow-[0_0_25px_rgba(0,102,255,0.5)]"
        />
        <Link
          href="/sol-components"
          className="relative flex h-12 items-center px-6 text-sm font-semibold font-runde text-white outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0066FF]"
        >
          Browse components
        </Link>
      </motion.div>
    </div>
  );
}
