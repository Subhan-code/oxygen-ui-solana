"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

const RAMP = 0.19;
const SETTLE = 0.16;
const MAX_COPIES = 14;

export type MarqueeDirection = "left" | "right";

export type UseLogoMarqueeOptions = {
  speed?: number;
  direction?: MarqueeDirection;
  gap?: number;
  paused?: boolean;
};

function fold(x: number, loop: number) {
  const m = x % loop;
  return m > 0 ? m - loop : m;
}

function clamp(x: number, min: number, max: number) {
  return x < min ? min : x > max ? max : x;
}

export function useLogoMarquee({
  speed = 44,
  direction = "left",
  gap = 40,
  paused = false,
}: UseLogoMarqueeOptions = {}) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<HTMLUListElement>(null);

  const [copies, setCopies] = useState(4);
  const [held, setHeld] = useState(false);
  const [near, setNear] = useState(true);

  const reduced = useReducedMotion() === true;
  const stopped = held || paused;

  const reducedRef = useRef(reduced);
  reducedRef.current = reduced;
  const movingRef = useRef(false);
  movingRef.current = !stopped && !reduced;

  const offset = useRef(0);
  const nudge = useRef(0);
  const rate = useRef(0);
  const span = useRef(0);

  const paint = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const x = reducedRef.current ? 0 : offset.current - span.current;
    track.style.transform = `translate3d(${x.toFixed(2)}px, 0, 0)`;
  }, []);

  useEffect(() => {
    const viewport = viewportRef.current;
    const group = groupRef.current;
    if (!viewport || !group) return;

    const measure = () => {
      const width = group.getBoundingClientRect().width;
      const loop = width > 0 ? width + gap : 0;
      const room = viewport.getBoundingClientRect().width;
      span.current = loop;
      offset.current = loop > 0 ? clamp(offset.current, -loop, loop) : 0;
      paint();

      const next =
        reduced || loop <= 0
          ? 4
          : clamp(Math.ceil(room / loop) + 3, 4, MAX_COPIES);
      setCopies((prev) => (prev === next ? prev : next));
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(viewport);
    observer.observe(group);
    return () => observer.disconnect();
  }, [gap, paint, reduced]);

  useEffect(() => {
    if (reduced || !near) return;

    let frame = 0;
    let last = 0;
    const sign = direction === "right" ? 1 : -1;

    const tick = (now: number) => {
      frame = requestAnimationFrame(tick);

      const dt = last ? Math.min((now - last) / 1000, 0.05) : 0;
      last = now;

      const loop = span.current;
      if (loop <= 0) return;

      rate.current +=
        ((movingRef.current ? 1 : 0) - rate.current) * (1 - Math.exp(-dt / RAMP));

      const pull = nudge.current * (1 - Math.exp(-dt / SETTLE));
      nudge.current -= pull;

      let x = offset.current + sign * speed * rate.current * dt + pull;
      if (rate.current > 0.002 && Math.abs(nudge.current) < 0.25) {
        nudge.current = 0;
        x = fold(x, loop);
      } else {
        x = clamp(x, -loop, loop);
      }

      offset.current = x;
      paint();
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [reduced, near, speed, direction, paint]);

  const bind = {
    onPointerEnter: (e: React.PointerEvent) => {
      if (e.pointerType !== "touch") setHeld(true);
    },
    onPointerDown: () => setHeld(true),
    onPointerUp: (e: React.PointerEvent) => {
      if (e.pointerType === "touch") setHeld(false);
    },
    onPointerCancel: () => setHeld(false),
    onPointerLeave: () => setHeld(false),
    onFocus: () => setHeld(true),
    onBlur: () => setHeld(false),
  };

  return {
    viewportRef,
    trackRef,
    groupRef,
    copies,
    paused: stopped,
    reduced,
    bind,
  };
}

export type LogoMarqueeItem = {
  id: string;
  label: string;
  href?: string;
  mark?: React.ReactNode;
};

export type LogoMarqueeProps = {
  items: LogoMarqueeItem[];
  label?: string;
  speed?: number;
  direction?: MarqueeDirection;
  gap?: number;
  paused?: boolean;
  onSelect?: (item: LogoMarqueeItem) => void;
  className?: string;
};

const FACE =
  "inline-flex h-10 shrink-0 items-center gap-2 whitespace-nowrap rounded-xl px-3 text-xs font-semibold text-zinc-500 dark:text-zinc-400 select-none";

const HIT =
  "outline-none transition-colors duration-150 hover:text-zinc-900 dark:hover:text-white cursor-pointer";

function face(item: LogoMarqueeItem) {
  if (!item.mark) return item.label;
  return (
    <>
      <span aria-hidden>{item.mark}</span>
      <span className="sr-only">{item.label}</span>
    </>
  );
}

export function LogoMarquee({
  items,
  label = "Logos",
  speed = 44,
  direction = "left",
  gap = 40,
  paused = false,
  onSelect,
  className = "",
}: LogoMarqueeProps) {
  const { viewportRef, trackRef, groupRef, copies, reduced, bind } =
    useLogoMarquee({ speed, direction, gap, paused });

  const groups = reduced ? 1 : copies;
  const live = reduced ? 0 : 1;

  return (
    <section
      aria-label={label}
      className={cn(
        "relative isolate w-full min-w-0 max-w-full overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950 p-2 shadow-xl font-sans",
        className
      )}
      {...bind}
    >
      <div
        ref={viewportRef}
        tabIndex={reduced ? 0 : undefined}
        style={{ overflowX: reduced ? "auto" : "hidden" }}
        className="overflow-y-hidden py-1 outline-none"
      >
        <div
          ref={trackRef}
          style={{ gap, willChange: "transform" }}
          className="flex w-max items-center"
        >
          {Array.from({ length: groups }, (_, copy) => (
            <ul
              key={copy}
              ref={copy === live ? groupRef : undefined}
              aria-hidden={copy === live ? undefined : true}
              style={{ gap }}
              className="flex w-max items-center list-none p-0 m-0"
            >
              {items.map((item) => (
                <li key={item.id} className="shrink-0">
                  {copy !== live ? (
                    <span className={FACE}>{item.mark ?? item.label}</span>
                  ) : item.href ? (
                    <a href={item.href} className={cn(FACE, HIT)}>
                      {face(item)}
                    </a>
                  ) : onSelect ? (
                    <button
                      type="button"
                      onClick={() => onSelect(item)}
                      className={cn(FACE, HIT)}
                    >
                      {face(item)}
                    </button>
                  ) : (
                    <span className={FACE}>{face(item)}</span>
                  )}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-white via-white/80 to-transparent dark:from-zinc-950 dark:via-zinc-950/80"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-white via-white/80 to-transparent dark:from-zinc-950 dark:via-zinc-950/80"
      />
    </section>
  );
}

export default LogoMarquee;
