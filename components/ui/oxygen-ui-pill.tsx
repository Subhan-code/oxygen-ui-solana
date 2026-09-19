"use client";

import React from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export interface OxygenUiPillProps {
  brandName?: string;
  accentColor?: string;
  className?: string;
  onClick?: () => void;
}

export function OxygenLogoIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 500 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("w-7 h-7", className)}
      aria-hidden="true"
    >
      <path
        d="M146.051 386.223C211.675 310.732 249.813 275.849 249.813 275.849C249.813 275.849 256.967 326.35 249.813 425.79C242.659 525.23 80.426 461.714 146.051 386.223Z"
        fill="#0066FF"
        stroke="white"
        strokeWidth="12"
      />
      <path
        d="M77.0924 267.43C177.237 261.147 229.975 268.512 229.975 268.512C229.975 268.512 198.736 308.958 122.35 373.52C45.9639 438.083 -23.0526 273.713 77.0924 267.43Z"
        fill="#0066FF"
        stroke="white"
        strokeWidth="12"
      />
      <path
        d="M115.047 139.992C189.692 206.682 221.339 249.277 221.339 249.277C221.339 249.277 170.43 255.427 70.5927 246.418C-29.2448 237.408 40.4022 73.3016 115.047 139.992Z"
        fill="#0066FF"
        stroke="white"
        strokeWidth="12"
      />
      <path
        d="M233.098 77.686C237.505 177.38 229.095 229.676 229.095 229.676C229.095 229.676 189.028 197.844 125.575 120.662C62.1228 43.4801 228.691 -22.008 233.098 77.686Z"
        fill="#0066FF"
        stroke="white"
        strokeWidth="12"
      />
      <path
        d="M360.495 117.852C292.023 190.799 248.596 221.453 248.596 221.453C248.596 221.453 243.384 170.718 254.346 71.6213C265.308 -27.4753 428.967 44.9046 360.495 117.852Z"
        fill="#0066FF"
        stroke="white"
        strokeWidth="12"
      />
      <path
        d="M420.889 236.415C320.576 238.896 268.159 229.536 268.159 229.536C268.159 229.536 300.926 190.304 379.733 128.686C458.539 67.0669 521.202 233.935 420.889 236.415Z"
        fill="#0066FF"
        stroke="white"
        strokeWidth="12"
      />
      <path
        d="M378.066 362.326C306.033 292.853 276.043 249.088 276.043 249.088C276.043 249.088 327.152 244.873 426.571 257.662C525.991 270.452 450.099 431.799 378.066 362.326Z"
        fill="#0066FF"
        stroke="white"
        strokeWidth="12"
      />
      <path
        d="M270.13 422.146C269.549 322.357 267.549 268.384 267.549 268.384C267.549 268.384 308.114 307.212 368.56 386.745C429.006 466.277 270.71 521.935 270.13 422.146Z"
        fill="#0066FF"
        stroke="white"
        strokeWidth="12"
      />
    </svg>
  );
}

export function OxygenUiPill({
  brandName = "oxygen ui",
  accentColor = "#0066FF",
  className,
  onClick,
}: OxygenUiPillProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div className={cn("flex items-center justify-center p-4", className)}>
      <motion.button
        type="button"
        onClick={onClick}
        whileHover={reduceMotion ? undefined : { scale: 1.03 }}
        whileTap={reduceMotion ? undefined : { scale: 0.97 }}
        transition={{ type: "spring", stiffness: 420, damping: 26 }}
        className="group relative flex items-center gap-2.5 p-2 rounded-full cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#0066FF] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
        style={{
          backgroundColor: accentColor,
        }}
      >
        {/* Left logo circle */}
        <div className="flex items-center justify-center size-12 sm:size-14 rounded-full bg-[#0A0D14] shrink-0 border border-white/10">
          <motion.div
            whileHover={reduceMotion ? undefined : { rotate: 90 }}
            transition={{ type: "spring", stiffness: 320, damping: 20 }}
            className="flex items-center justify-center"
          >
            <OxygenLogoIcon className="w-7 h-7 sm:w-8 sm:h-8" />
          </motion.div>
        </div>

        {/* Wordmark capsule */}
        <div className="flex items-center justify-center px-6 sm:px-8 py-2.5 sm:py-3.5 rounded-full bg-[#0A0D14] shrink-0 border border-white/10">
          <span className="text-xl sm:text-2xl font-semibold tracking-tight text-white font-sans">
            {brandName}
          </span>
        </div>
      </motion.button>
    </div>
  );
}

export default OxygenUiPill;
