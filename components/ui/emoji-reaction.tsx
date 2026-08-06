"use client";

import { memo, useCallback, useEffect, useRef, useState } from "react";
import type { ComponentProps } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { SmilePlus, X } from "lucide-react";
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

// order is fixed, consecutive copies must launch on opposite sides to stay apart
const LANES = [-1, 1, -0.42, 0.42];
const BURST_COUNT = LANES.length;
const RISE = 450;
const LAUNCH_SPREAD = 16;
const CLIMB_SPREAD = 58;
// near linear, a front-loaded curve makes the copies stall instead of climbing
const EASE = [0.25, 0.4, 0.45, 1] as const;
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
  sway: number;
  tilt: number;
  travel: number;
  scale: number;
  duration: number;
  delay: number;
};

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
  const mirror = Math.random() < 0.5 ? -1 : 1;

  return LANES.map((lane, i) => {
    const offset = lane * mirror;
    const dir = offset < 0 ? -1 : 1;
    return {
      id: seed + i,
      name,
      originX,
      originY,
      x: offset * LAUNCH_SPREAD + rand(-3, 3),
      drift: offset * (CLIMB_SPREAD - LAUNCH_SPREAD),
      sway: rand(9, 16) * dir,
      tilt: rand(4, 8) * dir,
      travel: RISE * rand(0.88, 1),
      scale: rand(0.72, 1.05),
      duration: rand(2, 2.3),
      delay: i * 0.3,
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
      initial={{ x: particle.x, y: 0, scale: 0.72, opacity: 0, rotate: 0 }}
      animate={{
        x: [
          particle.x,
          particle.x + particle.drift * 0.3 + particle.sway,
          particle.x + particle.drift * 0.65 - particle.sway * 0.65,
          particle.x + particle.drift + particle.sway * 0.35,
        ],
        y: -particle.travel,
        scale: particle.scale,
        rotate: [0, particle.tilt, -particle.tilt * 0.65, particle.tilt * 0.35],
        opacity: [0, 1, 1, 0],
      }}
      transition={{
        duration: particle.duration,
        delay: particle.delay,
        ease: EASE,
        // inherit, a per value transition replaces the parent one without it
        x: { inherit: true, times: SWAY, ease: "easeInOut" },
        rotate: { inherit: true, times: SWAY, ease: "easeInOut" },
        opacity: { inherit: true, times: [0, 0.03, 0.68, 1], ease: "linear" },
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

  // closing unmounts the copies mid flight, so their completion never fires
  const close = useCallback(() => {
    setOpen(false);
    setParticles([]);
  }, []);

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
      setParticles((prev) => [
        ...prev,
        ...makeParticles(name, seed.current, from, bar),
      ]);
    },
    [onReact, reduced],
  );

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
                  "relative flex items-center rounded-full bg-card shadow-lg ring-1 ring-black/5 dark:ring-white/10",
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
                    onClick={(event) =>
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

              <span className="absolute -bottom-1 left-1/2 size-3 -translate-x-1/2 rounded-full bg-card shadow-lg ring-1 ring-black/5 dark:ring-white/10" />
              <span className="absolute -bottom-4 left-1/2 size-1.5 translate-x-1 rounded-full bg-card ring-1 ring-black/5 dark:ring-white/10" />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
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
          whileTap={{ scale: 0.9 }}
          className={cn(
            "relative z-10 grid place-items-center rounded-full bg-card text-foreground/60 ring-1 ring-black/5 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring dark:ring-white/10",
            s.trigger,
          )}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={open ? "close" : (last ?? "idle")}
              className="grid place-items-center"
              initial={
                reduced ? false : { scale: 0.4, opacity: 0, rotate: -90 }
              }
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={
                reduced
                  ? { opacity: 0 }
                  : { scale: 0.4, opacity: 0, rotate: 90 }
              }
              transition={{ type: "spring", stiffness: 600, damping: 26 }}
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
                <SmilePlus className={s.icon} strokeWidth={1.75} />
              )}
            </motion.span>
          </AnimatePresence>
        </motion.button>
      </div>
    </EmojiProvider>
  );
}

export default EmojiReaction;
