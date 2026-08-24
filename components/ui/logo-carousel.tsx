"use client";

import React, { useState, useEffect, useMemo } from "react";
import { cn } from "@/lib/utils";

export interface LogoCarouselProps<T> extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  items: T[];
  children: (item: T, index: number) => React.ReactNode;
  stagger?: number;
  count?: number;
  duration?: number;
  interval?: number;
  initialDelay?: number;
  className?: string;
}

export function LogoCarousel<T>({
  items,
  children,
  stagger = 0.14,
  count,
  duration = 600,
  interval = 2500,
  initialDelay = 500,
  className,
  ...props
}: LogoCarouselProps<T>) {
  const groups = useMemo(() => {
    if (!items || items.length === 0) return [] as T[][];
    const groupSize = count && count > 0 ? count : items.length;
    const result: T[][] = [];
    for (let i = 0; i < items.length; i += groupSize) {
      result.push(items.slice(i, i + groupSize));
    }
    return result;
  }, [items, count]);

  const groupsLength = groups.length;
  const canLoop = groupsLength > 1;

  const [prevLength, setPrevLength] = useState(groupsLength);
  const [index, setIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(groupsLength > 1 ? 1 : 0);
  const [animate, setAnimate] = useState(false);

  if (prevLength !== groupsLength) {
    setPrevLength(groupsLength);
    setIndex(0);
    setNextIndex(groupsLength > 1 ? 1 : 0);
    setAnimate(false);
  }

  useEffect(() => {
    if (!canLoop) return;
    const timeoutId = window.setTimeout(() => {
      setAnimate(true);
    }, initialDelay);
    return () => window.clearTimeout(timeoutId);
  }, [canLoop, initialDelay]);

  useEffect(() => {
    if (!animate || !canLoop) return;
    const intervalId = window.setInterval(() => {
      setIndex((prevIndex) => {
        const newIndex = (prevIndex + 1) % groupsLength;
        setNextIndex((newIndex + 1) % groupsLength);
        return newIndex;
      });
    }, interval);
    return () => window.clearInterval(intervalId);
  }, [animate, canLoop, groupsLength, interval]);

  if (groupsLength === 0) return null;

  return (
    <div
      data-slot="logo-carousel"
      className="grid w-full max-w-[720px] place-items-center select-none"
      {...props}
    >
      {groups.map((group, groupIndex) => {
        const isCurrent = groupIndex === index;
        const isNext = canLoop && animate && groupIndex === nextIndex;
        const isVisible = canLoop ? isCurrent || isNext : isCurrent;

        return (
          <div
            key={groupIndex}
            className={cn("flex w-full justify-center gap-10", className)}
            style={{
              gridArea: "1 / 1",
              pointerEvents: isVisible ? "auto" : "none",
            }}
          >
            {group.map((item, itemIndex) => {
              const animClass = animate
                ? isVisible && !isCurrent
                  ? "logo-enter"
                  : isVisible && isCurrent
                  ? "logo-exit"
                  : "logo-hidden"
                : isCurrent
                ? "logo-static"
                : "logo-hidden";

              return (
                <div
                  key={`${groupIndex}-${itemIndex}`}
                  className={animClass}
                  style={{
                    animationDelay: `${itemIndex * stagger}s`,
                    animationDuration: `${duration}ms`,
                    animationFillMode: "both",
                    animationTimingFunction: "ease",
                  }}
                >
                  {children(item, itemIndex)}
                </div>
              );
            })}
          </div>
        );
      })}

      <style jsx global>{`
        @keyframes logos-enter {
          0% {
            transform: translateY(40px);
            filter: blur(4px);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            filter: blur(0);
            opacity: 1;
          }
        }
        @keyframes logos-exit {
          0% {
            transform: translateY(0);
            filter: blur(0);
            opacity: 1;
          }
          100% {
            transform: translateY(-40px);
            filter: blur(4px);
            opacity: 0;
          }
        }
        .logo-enter {
          animation-name: logos-enter;
        }
        .logo-exit {
          animation-name: logos-exit;
        }
        .logo-hidden {
          opacity: 0;
        }
        .logo-static {
          opacity: 1;
        }
      `}</style>
    </div>
  );
}

export default LogoCarousel;
