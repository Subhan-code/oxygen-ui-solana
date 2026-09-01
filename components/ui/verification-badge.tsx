"use client";

import React from "react";
import { cn } from "@/lib/utils";

export type BadgeVariant = "blue" | "black" | "gold" | "purple" | "emerald" | "silver";
export type BadgeShape = "scallop" | "circle";
export type BadgeSize = "sm" | "md" | "lg" | "xl";

export interface VerificationBadgeProps extends React.SVGProps<SVGSVGElement> {
  variant?: BadgeVariant;
  shape?: BadgeShape;
  size?: BadgeSize;
  title?: string;
}

const SIZE_MAP: Record<BadgeSize, number> = {
  sm: 16,
  md: 22,
  lg: 32,
  xl: 48,
};

export function VerificationBadge({
  variant = "blue",
  shape = "scallop",
  size = "md",
  title = "Verified Account",
  className,
  ...props
}: VerificationBadgeProps) {
  const pixelSize = SIZE_MAP[size];

  const getVariantFills = (varType: BadgeVariant) => {
    switch (varType) {
      case "blue":
        return {
          badge: "fill-[#2A77F2] dark:fill-[#3B82F6]",
          check: "fill-white",
          glow: "shadow-blue-500/30",
        };
      case "black":
        return {
          badge: "fill-zinc-950 dark:fill-zinc-100",
          check: "fill-white dark:fill-zinc-950",
          glow: "shadow-black/40",
        };
      case "gold":
        return {
          badge: "fill-amber-500 dark:fill-amber-400",
          check: "fill-amber-950 dark:fill-zinc-950",
          glow: "shadow-amber-500/40",
        };
      case "purple":
        return {
          badge: "fill-purple-600 dark:fill-purple-500",
          check: "fill-white",
          glow: "shadow-purple-500/40",
        };
      case "emerald":
        return {
          badge: "fill-emerald-500 dark:fill-emerald-400",
          check: "fill-white dark:fill-zinc-950",
          glow: "shadow-emerald-500/30",
        };
      case "silver":
        return {
          badge: "fill-zinc-400 dark:fill-zinc-300",
          check: "fill-zinc-950",
          glow: "shadow-zinc-400/20",
        };
      default:
        return {
          badge: "fill-[#2A77F2]",
          check: "fill-white",
          glow: "shadow-blue-500/30",
        };
    }
  };

  const fills = getVariantFills(variant);

  return (
    <span
      className={cn("inline-flex items-center justify-center shrink-0 select-none", className)}
      title={title}
    >
      <svg
        width={pixelSize}
        height={pixelSize}
        viewBox="0 0 2200 2200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-transform duration-150 hover:scale-105"
        {...props}
      >
        {shape === "circle" ? (
          // SVG Circle Badge from user's verification badges.svg
          <circle className={fills.badge} cx="1100" cy="1100" r="1000" />
        ) : (
          // SVG Scalloped Starburst Seal Badge from user's verification badges.svg
          <path
            className={fills.badge}
            d="M2171.2,1100c0,106.27-133.06,190.2-164.19,286.09c-32.27,99.38,24.92,245.28-35.28,328.01c-60.8,83.54-217.65,73.94-301.19,134.75c-82.72,60.2-121.72,212.66-221.1,244.93c-95.89,31.13-216.62-68.27-322.88-68.27c-106.27,0-226.99,99.4-322.89,68.27c-99.38-32.27-138.38-184.73-221.1-244.93c-83.54-60.81-240.39-51.2-301.19-134.75c-60.2-82.72-3.01-228.62-35.28-328.01C133.06,1290.2,0,1206.27,0,1100s133.06-190.2,164.19-286.09c32.27-99.38-24.92-245.28,35.28-328.01c60.8-83.54,217.65-73.94,301.19-134.75c82.72-60.2,121.72-212.66,221.1-244.93c95.89-31.13,216.62,68.27,322.89,68.27c106.27,0,226.99-99.4,322.88-68.27c99.38,32.27,138.38,184.73,221.1,244.93c83.54,60.81,240.39,51.2,301.19,134.75c60.2,82.72,3.01,228.62,35.28,328.01C2038.14,909.8,2171.2,993.73,2171.2,1100z"
          />
        )}

        {/* Checkmark Polygon from user's verification badges.svg */}
        <polygon
          className={fills.check}
          points="944.18,1590.87 571.05,1251.78 706.59,1102.65 922.39,1298.76 1429.57,676.9 1585.75,804.28"
        />
      </svg>
    </span>
  );
}

export function VerificationBadges({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const variants: BadgeVariant[] = ["blue", "black", "gold", "purple", "emerald", "silver"];

  return (
    <div
      data-slot="verification-badges"
      className={cn(
        "flex flex-wrap items-center justify-center gap-6 p-6 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-xl",
        className
      )}
      {...props}
    >
      {variants.map((v) => (
        <div key={v} className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-3">
            <VerificationBadge variant={v} shape="scallop" size="lg" />
            <VerificationBadge variant={v} shape="circle" size="lg" />
          </div>
          <span className="text-[11px] font-mono font-bold capitalize text-zinc-500 dark:text-zinc-400">
            {v}
          </span>
        </div>
      ))}
    </div>
  );
}

export default VerificationBadge;
