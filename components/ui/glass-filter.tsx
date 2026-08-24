"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface GlassFilterProps extends React.SVGAttributes<SVGSVGElement> {
  id?: string;
  baseFrequency?: string;
  stdDeviation?: number;
  scale?: number;
  className?: string;
}

export function GlassFilter({
  id = "radio-glass",
  baseFrequency = "0.05 0.05",
  stdDeviation = 2,
  scale = 30,
  className,
  ...props
}: GlassFilterProps) {
  return (
    <svg
      aria-hidden="true"
      data-slot="glass-filter"
      className={cn("hidden pointer-events-none absolute w-0 h-0 overflow-hidden", className)}
      {...props}
    >
      <defs>
        <filter
          id={id}
          x="0%"
          y="0%"
          width="100%"
          height="100%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency={baseFrequency}
            numOctaves="1"
            seed="1"
            result="turbulence"
          />
          <feGaussianBlur in="turbulence" stdDeviation={stdDeviation} result="blurredNoise" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="blurredNoise"
            scale={scale}
            xChannelSelector="R"
            yChannelSelector="B"
            result="displaced"
          />
          <feGaussianBlur in="displaced" stdDeviation={stdDeviation} result="finalBlur" />
          <feComposite in="finalBlur" in2="finalBlur" operator="over" />
        </filter>
      </defs>
    </svg>
  );
}
