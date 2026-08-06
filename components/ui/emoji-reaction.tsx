"use client";

import { memo, useCallback, useEffect, useRef, useState } from "react";
import type { ComponentProps, KeyboardEvent } from "react";
import { Slot } from "@radix-ui/react-slot";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { X } from "lucide-react";
import { Emoji, EmojiProvider, type EmojiData } from "react-apple-emojis";
import { cn } from "@/lib/utils";

// only the default set, the full emoji map ships 380kb of json
const DEFAULT_EMOJI_DATA: EmojiData = {
  baseUrl: "https://em-content.zobj.net/source/apple/419/",
  emojis: {
    "smiling-face-with-hearts": "smiling-face-with-hearts_1f970.png",
    "star-struck": "star-struck_1f929.png",
    "confused-face": "confused-face_1f615.png",
    "pleading-face": "pleading-face_1f97a.png",
    "grinning-face-with-smiling-eyes":
      "grinning-face-with-smiling-eyes_1f604.png",
  },
};

const DEFAULT_EMOJIS = Object.keys(DEFAULT_EMOJI_DATA.emojis);

const SURFACE = "bg-[#F4F4F9] dark:bg-[#262626]";

const BURST_COUNT = 5;
const HOLD_INTERVAL = 550;
const MAX_PARTICLES = 60;
const RISE = 450;
const LAUNCH_SPREAD = 6;
const CLIMB_SPREAD = 78;
// soft ease out, roughly 65% of the distance by the halfway point so it keeps moving
const EASE = [0.4, 0.3, 0.5, 1] as const;
const SWAY = [0, 0.3, 0.65, 1];

const GAP = 16;
const EDGE = 8;

const SIZES = {
  sm: {
    trigger: "size-8",
    icon: "size-4",
    emoji: 26,
    pill: "gap-0.5 p-1",
    burst: 26,
  },
  md: {
    trigger: "size-10",
    icon: "size-5",
    emoji: 34,
    pill: "gap-1 p-1.5",
    burst: 34,
  },
  lg: {
    trigger: "size-12",
    icon: "size-6",
    emoji: 42,
    pill: "gap-1.5 p-2",
    burst: 42,
  },
} as const;

type Align = "left" | "center" | "right";

type Placement = { side: "top" | "bottom"; shift: number; tailX: number };

type Particle = {
  id: number;
  name: string;
  originX: number;
  originY: number;
  x: number;
  drift: number;
  tilt: number;
  travel: number;
  scale: number;
  blurRatio: number;
  fadeAt: number;
  duration: number;
  delay: number;
};

function SmileIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
      <path
        d="M21 12a9 9 0 1 1-9-9"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <circle cx="8.9" cy="10" r="1.35" fill="currentColor" />
      <circle cx="15.1" cy="10" r="1.35" fill="currentColor" />
      <path
        d="M8 13.9a4.7 4.7 0 0 0 8 0"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M19 2.5v5M21.5 5h-5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

const rand = (min: number, max: number) => min + Math.random() * (max - min);

const label = (name: string) => name.replaceAll("-", " ");

function getPlacement(
  trigger: DOMRect,
  width: number,
  height: number,
  align: Align,
): Placement {
  const anchored =
    align === "left"
      ? trigger.left
      : align === "right"
        ? trigger.right - width
        : trigger.left + trigger.width / 2 - width / 2;

  const overhangLeft = EDGE - anchored;
  const overhangRight = anchored + width - (window.innerWidth - EDGE);
  const shift =
    overhangLeft > 0 ? overhangLeft : overhangRight > 0 ? -overhangRight : 0;

  return {
    side: trigger.top - height - GAP < EDGE ? "bottom" : "top",
    shift,
    // keeps the tail over the trigger whatever the alignment and shift are
    tailX: trigger.left + trigger.width / 2 - (anchored + shift),
  };
}

function makeParticles(
  name: string,
  seed: number,
  from: DOMRect,
  bar: DOMRect,
): Particle[] {
  const originX = from.left + from.width / 2 - bar.left;
  const originY = from.top + from.height / 2 - bar.top;

  return Array.from({ length: BURST_COUNT }, (_, i) => {
    const lane = rand(-1, 1);
    const dir = lane < 0 ? -1 : 1;
    return {
      id: seed + i,
      name,
      originX,
      originY,
      x: lane * LAUNCH_SPREAD,
      drift: lane * CLIMB_SPREAD,
      tilt: rand(1, 4) * dir,
      travel: RISE * rand(0.86, 1),
      scale: rand(0.78, 1.05),
      blurRatio: rand(0.18, 0.3),
      fadeAt: rand(0.55, 0.88),
      duration: rand(1.4, 1.8),
      delay: i * 0.25,
    };
  });
}

// memo, a parent render restarts the flight and replays its delay
const BurstEmoji = memo(function BurstEmoji({
  particle,
  size,
  onDone,
}: {
  particle: Particle;
  size: number;
  onDone: (id: number) => void;
}) {
  return (
    <motion.span
      className="pointer-events-none absolute z-0 will-change-transform"
      style={{
        left: particle.originX,
        top: particle.originY,
        marginLeft: -size / 2,
        marginTop: -size / 2,
      }}
      initial={{
        x: particle.x,
        y: 0,
        scale: 0.6,
        opacity: 0,
        rotate: 0,
        filter: "blur(0px)",
      }}
      animate={{
        // shares the parent ease with y, any override here bends the path sideways
        x: particle.x + particle.drift,
        y: -particle.travel,
        scale: [
          0.6,
          particle.scale * 1.15,
          particle.scale,
          particle.scale * 0.75,
        ],
        rotate: [0, particle.tilt, -particle.tilt * 0.65, particle.tilt * 0.35],
        opacity: [0, 1, 1, 0],
        filter: [
          "blur(0px)",
          "blur(0px)",
          `blur(${particle.blurRatio * size}px)`,
        ],
      }}
      transition={{
        duration: particle.duration,
        delay: particle.delay,
        ease: EASE,
        // inherit, a per value transition replaces the parent one without it
        rotate: { inherit: true, times: SWAY, ease: "easeInOut" },
        scale: { inherit: true, times: [0, 0.1, 0.22, 1], ease: "easeOut" },
        opacity: {
          inherit: true,
          times: [0, 0.03, particle.fadeAt, 1],
          ease: "linear",
        },
        // no ease override, blur has to track the climb curve or it lags the rise
        filter: { inherit: true, times: [0, 0.12, 1] },
      }}
      onAnimationComplete={() => onDone(particle.id)}
    >
      <Emoji
        name={particle.name}
        width={size}
        height={size}
        draggable={false}
        className="max-w-none"
      />
    </motion.span>
  );
});

export type EmojiReactionProps = ComponentProps<"div"> & {
  emojis?: string[];
  emojiData?: EmojiData;
  onReact?: (name: string) => void;
  size?: keyof typeof SIZES;
  align?: Align;
  asChild?: boolean;
};

export function EmojiReaction({
  emojis = DEFAULT_EMOJIS,
  emojiData = DEFAULT_EMOJI_DATA,
  onReact,
  size = "md",
  align = "center",
  asChild = false,
  className,
  children,
  ...props
}: EmojiReactionProps) {
  const s = SIZES[size];
  const reduced = useReducedMotion();

  const [open, setOpen] = useState(false);
  const [last, setLast] = useState<string | null>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [placement, setPlacement] = useState<Placement>({
    side: "top",
    shift: 0,
    tailX: 0,
  });
  const [activeIndex, setActiveIndex] = useState(0);

  const rootRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const seed = useRef(0);
  const hold = useRef<number | null>(null);
  const justOpened = useRef(false);

  // stable, an inline callback detaches every commit and is null when placeBar runs
  const setTriggerRef = useCallback((node: HTMLElement | null) => {
    triggerRef.current = node;
  }, []);

  const stopHold = useCallback(() => {
    if (hold.current === null) return;
    window.clearInterval(hold.current);
    hold.current = null;
  }, []);

  // closing unmounts the copies mid flight, so their completion never fires
  const close = useCallback(() => {
    stopHold();
    setOpen(false);
    setParticles([]);
  }, [stopHold]);

  // a ref callback, not an effect, so measuring cannot cascade an extra render pass
  const placeBar = useCallback(
    (node: HTMLDivElement | null) => {
      barRef.current = node;
      const trigger = triggerRef.current;
      if (!node || !trigger) return;
      setPlacement(
        getPlacement(
          trigger.getBoundingClientRect(),
          node.offsetWidth,
          node.offsetHeight,
          align,
        ),
      );
    },
    [align],
  );

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: globalThis.PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) close();
    };
    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key !== "Escape") return;
      close();
      triggerRef.current?.focus();
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, close]);

  useEffect(() => {
    if (open) itemRefs.current[0]?.focus();
  }, [open]);

  const react = useCallback(
    (name: string, from: DOMRect) => {
      setLast(name);
      onReact?.(name);

      const bar = barRef.current?.getBoundingClientRect();
      if (reduced || !bar) return;
      seed.current += BURST_COUNT;
      setParticles((prev) =>
        [...prev, ...makeParticles(name, seed.current, from, bar)].slice(
          -MAX_PARTICLES,
        ),
      );
    },
    [onReact, reduced],
  );

  const startHold = useCallback(
    (name: string, from: DOMRect) => {
      react(name, from);
      stopHold();
      hold.current = window.setInterval(() => react(name, from), HOLD_INTERVAL);
    },
    [react, stopHold],
  );

  useEffect(() => stopHold, [stopHold]);

  const settle = useCallback((id: number) => {
    setParticles((prev) => prev.filter((particle) => particle.id !== id));
  }, []);

  // press the trigger and drag along the bar, releasing over an emoji picks it
  const onTriggerPointerDown = useCallback(() => {
    if (open) return;
    setOpen(true);
    justOpened.current = true;

    const up = (event: globalThis.PointerEvent) => {
      document.removeEventListener("pointerup", up);

      const target = document.elementFromPoint(
        event.clientX,
        event.clientY,
      ) as HTMLElement | null;

      const picked = target?.closest<HTMLElement>("[data-emoji]");
      if (picked?.dataset.emoji) {
        react(picked.dataset.emoji, picked.getBoundingClientRect());
      }

      // releasing off the trigger fires no click, so nothing else would clear the guard
      if (!triggerRef.current?.contains(target)) justOpened.current = false;
    };

    document.addEventListener("pointerup", up);
  }, [open, react]);

  const onMenuKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      const count = emojis.length;
      let next = activeIndex;

      if (event.key === "ArrowRight") next = (activeIndex + 1) % count;
      else if (event.key === "ArrowLeft")
        next = (activeIndex - 1 + count) % count;
      else if (event.key === "Home") next = 0;
      else if (event.key === "End") next = count - 1;
      else return;

      event.preventDefault();
      setActiveIndex(next);
      itemRefs.current[next]?.focus();
    },
    [activeIndex, emojis.length],
  );

  const burst = particles.map((particle) => (
    <BurstEmoji
      key={particle.id}
      particle={particle}
      size={s.burst}
      onDone={settle}
    />
  ));

  const Trigger = asChild ? Slot : "button";

  const top = placement.side === "top";
  const anchor =
    align === "left" ? "left-0" : align === "right" ? "right-0" : "left-1/2";
  const centering = align === "center" ? "-50%" : 0;
  // right anchored bars pin their right edge, so a left margin cannot move them
  const nudge =
    align === "right"
      ? { marginRight: -placement.shift }
      : { marginLeft: placement.shift };

  return (
    <EmojiProvider data={emojiData}>
      <div
        ref={rootRef}
        data-slot="emoji-reaction"
        className={cn("relative flex w-fit items-center", className)}
        {...props}
      >
        <AnimatePresence>
          {open && (
            <motion.div
              className={cn(
                "absolute z-30",
                anchor,
                top ? "bottom-full mb-4" : "top-full mt-4",
              )}
              initial={{
                opacity: 0,
                y: top ? 10 : -10,
                scale: 0.85,
                x: centering,
              }}
              animate={{ opacity: 1, y: 0, scale: 1, x: centering }}
              exit={{ opacity: 0, y: top ? 6 : -6, scale: 0.9, x: centering }}
              transition={
                reduced
                  ? { duration: 0.15 }
                  : { type: "spring", stiffness: 520, damping: 30 }
              }
              style={{ originY: top ? 1 : 0, ...nudge }}
            >
              <div
                ref={placeBar}
                role="menu"
                aria-label="Pick a reaction"
                aria-orientation="horizontal"
                onKeyDown={onMenuKeyDown}
                className={cn(
                  "relative flex items-center rounded-full",
                  SURFACE,
                  s.pill,
                )}
              >
                {burst}

                {emojis.map((name, i) => (
                  <motion.button
                    key={`${name}-${i}`}
                    ref={(node) => {
                      itemRefs.current[i] = node;
                    }}
                    type="button"
                    role="menuitem"
                    tabIndex={i === activeIndex ? 0 : -1}
                    data-emoji={name}
                    aria-label={label(name)}
                    onFocus={() => setActiveIndex(i)}
                    onPointerDown={(event) =>
                      startHold(
                        name,
                        event.currentTarget.getBoundingClientRect(),
                      )
                    }
                    onPointerUp={stopHold}
                    onPointerLeave={stopHold}
                    onPointerCancel={stopHold}
                    // detail is 0 only for keyboard, pointer already fired above
                    onClick={(event) =>
                      event.detail === 0 &&
                      react(name, event.currentTarget.getBoundingClientRect())
                    }
                    className="relative z-10 rounded-full p-1 outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    initial={reduced ? false : { scale: 0.4, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 800,
                      damping: 25,
                      delay: reduced ? 0 : 0.04 + i * 0.035,
                    }}
                    whileHover={reduced ? undefined : { scale: 1.28, y: -4 }}
                    whileTap={{ scale: 0.92 }}
                  >
                    <Emoji
                      name={name}
                      width={s.emoji}
                      height={s.emoji}
                      draggable={false}
                      className="max-w-none"
                    />
                  </motion.button>
                ))}
              </div>

              <span
                className={cn(
                  "absolute size-3 -translate-x-1/2 rounded-full",
                  SURFACE,
                  top ? "-bottom-1" : "-top-1",
                )}
                style={{ left: placement.tailX }}
              />
              <span
                className={cn(
                  "absolute size-1.5 -translate-x-1/2 rounded-full",
                  SURFACE,
                  top ? "-bottom-4" : "-top-4",
                )}
                style={{ left: placement.tailX + 6 }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <Trigger
          ref={setTriggerRef}
          type={asChild ? undefined : "button"}
          aria-haspopup="true"
          aria-expanded={open}
          aria-label={
            open
              ? "Close reactions"
              : last
                ? `Reacted ${label(last)}`
                : "Add a reaction"
          }
          onPointerDown={onTriggerPointerDown}
          onClick={() => {
            if (justOpened.current) {
              justOpened.current = false;
              return;
            }
            if (open) close();
            else setOpen(true);
          }}
          className={
            asChild
              ? undefined
              : cn(
                  "relative z-10 grid place-items-center rounded-full text-foreground/60 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  SURFACE,
                  s.trigger,
                )
          }
        >
          {asChild ? (
            children
          ) : open ? (
            <X className={s.icon} strokeWidth={2} />
          ) : last ? (
            <Emoji
              name={last}
              width={s.emoji * 0.72}
              height={s.emoji * 0.72}
              draggable={false}
              className="max-w-none"
            />
          ) : (
            <SmileIcon className={s.icon} />
          )}
        </Trigger>
      </div>
    </EmojiProvider>
  );
}

export default EmojiReaction;
