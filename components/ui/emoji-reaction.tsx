"use client";

import { memo, useCallback, useEffect, useRef, useState } from "react";
import type { ComponentProps } from "react";
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
const SHADOW =
  "shadow-[0_2px_2px_rgb(0_0_0/0.10),0_5px_5px_-3px_rgb(0_0_0/0.24)] dark:shadow-[0_2px_2px_rgb(0_0_0/0.35),0_5px_5px_-3px_rgb(0_0_0/0.55)]";

const BURST_COUNT = 5;
const HOLD_INTERVAL = 550;
const MAX_PARTICLES = 60;
const RISE = 450;
const LAUNCH_SPREAD = 6;
const CLIMB_SPREAD = 78;
// decelerates to a stop, the dissolve over the back half covers the slow down
const EASE = [0.25, 0.55, 0.4, 1] as const;
const SWAY = [0, 0.3, 0.65, 1];

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
      duration: rand(2, 2.4),
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
        scale: 0.72,
        opacity: 0,
        rotate: 0,
        filter: "blur(0px)",
      }}
      animate={{
        // shares the parent ease with y, any override here bends the path sideways
        x: particle.x + particle.drift,
        y: -particle.travel,
        scale: [0.72, particle.scale, particle.scale * 0.75],
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
        scale: { inherit: true, times: [0, 0.12, 1] },
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
};

export function EmojiReaction({
  emojis = DEFAULT_EMOJIS,
  emojiData = DEFAULT_EMOJI_DATA,
  onReact,
  size = "md",
  className,
  ...props
}: EmojiReactionProps) {
  const s = SIZES[size];
  const reduced = useReducedMotion();

  const [open, setOpen] = useState(false);
  const [last, setLast] = useState<string | null>(null);
  const [particles, setParticles] = useState<Particle[]>([]);

  const rootRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const seed = useRef(0);
  const hold = useRef<number | null>(null);

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

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) close();
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, close]);

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

  const burst = particles.map((particle) => (
    <BurstEmoji
      key={particle.id}
      particle={particle}
      size={s.burst}
      onDone={settle}
    />
  ));

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
              className="absolute bottom-full left-1/2 z-30 mb-4"
              initial={{ opacity: 0, y: 10, scale: 0.85, x: "-50%" }}
              animate={{ opacity: 1, y: 0, scale: 1, x: "-50%" }}
              exit={{ opacity: 0, y: 6, scale: 0.9, x: "-50%" }}
              transition={
                reduced
                  ? { duration: 0.15 }
                  : { type: "spring", stiffness: 520, damping: 30 }
              }
              style={{ originY: 1 }}
            >
              <div
                ref={barRef}
                role="menu"
                aria-label="Pick a reaction"
                className={cn(
                  "relative flex items-center rounded-full",
                  SURFACE,
                  SHADOW,
                  s.pill,
                )}
              >
                {burst}

                {emojis.map((name, i) => (
                  <motion.button
                    key={name}
                    type="button"
                    role="menuitem"
                    aria-label={label(name)}
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
                      stiffness: 600,
                      damping: 22,
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
                  "absolute -bottom-1 left-1/2 size-3 -translate-x-1/2 rounded-full",
                  SURFACE,
                )}
              />
              <span
                className={cn(
                  "absolute -bottom-4 left-1/2 size-1.5 translate-x-1 rounded-full",
                  SURFACE,
                )}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <button
          type="button"
          aria-haspopup="true"
          aria-expanded={open}
          aria-label={
            open
              ? "Close reactions"
              : last
                ? `Reacted ${label(last)}`
                : "Add a reaction"
          }
          onClick={() => (open ? close() : setOpen(true))}
          className={cn(
            "relative z-10 grid place-items-center rounded-full text-foreground/60 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            SURFACE,
            s.trigger,
          )}
        >
          {open ? (
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
        </button>
      </div>
    </EmojiProvider>
  );
}

export default EmojiReaction;
