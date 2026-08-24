"use client";

import React, { useMemo } from "react";
import { cn } from "@/lib/utils";

export type MarqueeDirection = "left" | "right" | "up" | "down";

export interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  duration?: number;
  pauseOnHover?: boolean;
  direction?: MarqueeDirection;
  fade?: boolean;
  fadeAmount?: number;
  className?: string;
}

export function Marquee({
  children,
  duration = 20,
  pauseOnHover = false,
  direction = "left",
  fade = true,
  fadeAmount = 10,
  className,
  style: styleAttribute,
  ...props
}: MarqueeProps) {
  const isVertical = direction === "up" || direction === "down";
  const safeDuration = Math.max(duration, 0.01);
  const clampedFadeAmount = Math.min(Math.max(fadeAmount, 0), 50);

  const maskImage = useMemo(() => {
    if (!fade) return "";
    const start = clampedFadeAmount;
    const end = 100 - clampedFadeAmount;
    return isVertical
      ? `linear-gradient(to bottom, transparent 0%, black ${start}%, black ${end}%, transparent 100%)`
      : `linear-gradient(to right, transparent 0%, black ${start}%, black ${end}%, transparent 100%)`;
  }, [fade, clampedFadeAmount, isVertical]);

  return (
    <div
      data-slot="marquee"
      {...props}
      className={cn("group flex w-full overflow-hidden", isVertical && "flex-col", className)}
      style={{
        ...(maskImage
          ? {
              maskImage,
              WebkitMaskImage: maskImage,
            }
          : {}),
        ...styleAttribute,
      }}
    >
      <div
        className={cn(
          "spell-marquee__scroller",
          isVertical
            ? "spell-marquee__scroller--vertical"
            : "spell-marquee__scroller--horizontal",
          `spell-marquee__scroller--${direction}`,
          pauseOnHover && "spell-marquee__scroller--pause-on-hover"
        )}
        style={{
          ["--spell-marquee-duration" as string]: `${safeDuration}s`,
        }}
      >
        <div
          className={cn(
            "spell-marquee__segment",
            isVertical
              ? "spell-marquee__segment--vertical"
              : "spell-marquee__segment--horizontal"
          )}
        >
          {children}
        </div>
        <div
          aria-hidden="true"
          className={cn(
            "spell-marquee__segment",
            isVertical
              ? "spell-marquee__segment--vertical"
              : "spell-marquee__segment--horizontal"
          )}
        >
          {children}
        </div>
      </div>

      <style jsx global>{`
        @keyframes spell-marquee-scroll-x {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        @keyframes spell-marquee-scroll-x-reverse {
          from {
            transform: translateX(-50%);
          }
          to {
            transform: translateX(0);
          }
        }
        @keyframes spell-marquee-scroll-y {
          from {
            transform: translateY(0);
          }
          to {
            transform: translateY(-50%);
          }
        }
        @keyframes spell-marquee-scroll-y-reverse {
          from {
            transform: translateY(-50%);
          }
          to {
            transform: translateY(0);
          }
        }
        .spell-marquee__scroller {
          display: flex;
          flex-shrink: 0;
          width: max-content;
          animation-duration: var(--spell-marquee-duration);
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          will-change: transform;
        }
        .spell-marquee__scroller--horizontal {
          flex-direction: row;
        }
        .spell-marquee__scroller--vertical {
          flex-direction: column;
          height: max-content;
        }
        .spell-marquee__scroller--left {
          animation-name: spell-marquee-scroll-x;
        }
        .spell-marquee__scroller--right {
          animation-name: spell-marquee-scroll-x-reverse;
        }
        .spell-marquee__scroller--up {
          animation-name: spell-marquee-scroll-y;
        }
        .spell-marquee__scroller--down {
          animation-name: spell-marquee-scroll-y-reverse;
        }
        .group:hover .spell-marquee__scroller--pause-on-hover {
          animation-play-state: paused;
        }
        .spell-marquee__segment {
          display: flex;
          flex-shrink: 0;
        }
        .spell-marquee__segment--horizontal {
          flex-direction: row;
          align-items: center;
        }
        .spell-marquee__segment--vertical {
          flex-direction: column;
          width: 100%;
        }
      `}</style>
    </div>
  );
}

export default Marquee;
