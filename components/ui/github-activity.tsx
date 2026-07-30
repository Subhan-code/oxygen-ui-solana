"use client";

import * as React from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Transition,
} from "motion/react";
import { cn } from "@/lib/utils";

export type ContributionLevel = 0 | 1 | 2 | 3 | 4;

export type Contribution = {
  date: string;
  count: number;
  level: ContributionLevel;
};

export type RepoContribution = {
  name: string;
  count: number;
  logo?: React.ReactNode;
  href?: string;
};

const DEFAULT_ACCENT = "#39d353";
const DEFAULT_CELL_SIZE = 11;
const DEFAULT_LABEL = "Top contributions in:";
const STACK_LIMIT = 3;

const EASE_OUT = [0.22, 1, 0.36, 1] as const;
const SPRING = { type: "spring", bounce: 0.2, duration: 0.62 } as const;
const HEADER_SPRING = { ...SPRING, bounce: 0.45 } as const;
const ROW_SPRING = { ...SPRING, bounce: 0.26, delay: 0.08 } as const;
const ROW_OFFSET = 16;
const CELL_FADE = { duration: 0.2, ease: EASE_OUT } as const;
const COLUMN_STAGGER = 0.012;

const LEVELS = [0, 1, 2, 3, 4] as const;

const LEVEL_OPACITY: Record<ContributionLevel, number> = {
  0: 0,
  1: 0.3,
  2: 0.52,
  3: 0.76,
  4: 1,
};

type LevelStyle = { backgroundColor: string; opacity: number };

function toScale(accent: string | string[]): LevelStyle[] {
  if (typeof accent === "string") {
    return LEVELS.map((level) => ({
      backgroundColor: accent,
      opacity: LEVEL_OPACITY[level],
    }));
  }

  const colors = accent.length > 4 ? accent : ["transparent", ...accent];
  return LEVELS.map((level) => {
    const color = colors[level] ?? colors.at(-1) ?? "transparent";
    return { backgroundColor: color, opacity: color === "transparent" ? 0 : 1 };
  });
}

function toWeeks(contributions: Contribution[]) {
  const weeks: Contribution[][] = [];
  for (let i = 0; i < contributions.length; i += 7) {
    weeks.push(contributions.slice(i, i + 7));
  }
  return weeks;
}

const ContributionGrid = ({
  contributions,
  scale,
  cellSize,
  label,
  reduceMotion,
}: {
  contributions: Contribution[];
  scale: LevelStyle[];
  cellSize: number;
  label: string;
  reduceMotion: boolean | null;
}) => {
  const weeks = React.useMemo(() => toWeeks(contributions), [contributions]);
  const gap = Math.max(2, Math.round(cellSize / 4));

  return (
    <div
      data-slot="github-activity-grid"
      role="img"
      aria-label={label}
      className="flex overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      style={{ gap }}
    >
      {weeks.map((week, weekIndex) => (
        <div key={weekIndex} className="flex flex-col" style={{ gap }}>
          {week.map((day) => (
            <motion.div
              key={day.date}
              title={`${day.count} on ${day.date}`}
              className="shrink-0 rounded-[3px] bg-foreground/[0.08]"
              style={{ width: cellSize, height: cellSize }}
              initial={reduceMotion ? false : { opacity: 0, scale: 0.4 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                ...CELL_FADE,
                delay: reduceMotion ? 0 : weekIndex * COLUMN_STAGGER,
              }}
            >
              <div
                className="h-full w-full rounded-[3px]"
                style={scale[day.level] ?? scale[0]}
              />
            </motion.div>
          ))}
        </div>
      ))}
    </div>
  );
};

const Avatar = ({
  repo,
  layoutId,
  transition,
  className,
}: {
  repo: RepoContribution;
  layoutId: string;
  transition: Transition;
  className?: string;
}) => (
  <motion.span
    layoutId={layoutId}
    transition={transition}
    className={cn(
      "grid size-7 shrink-0 place-items-center overflow-hidden rounded-full bg-foreground/10 text-[11px] font-medium uppercase text-foreground/70 ring-2 ring-background",
      "[&_img]:size-full [&_img]:object-cover [&_svg]:size-full",
      className,
    )}
  >
    {repo.logo ?? repo.name.charAt(0)}
  </motion.span>
);

const RepoRow = ({
  repo,
  layoutId,
  transition,
}: {
  repo: RepoContribution;
  layoutId: string;
  transition: Transition;
}) => {
  const className =
    "flex items-center gap-3 rounded-xl mx-2 px-2 py-2 transition-colors hover:bg-foreground/5";

  const content = (
    <>
      <Avatar repo={repo} layoutId={layoutId} transition={transition} />
      <span className="flex-1 truncate text-sm text-foreground">
        {repo.name}
      </span>
      <span className="text-sm tabular-nums text-foreground/70">
        {repo.count}
      </span>
    </>
  );

  return repo.href ? (
    <a href={repo.href} target="_blank" rel="noreferrer" className={className}>
      {content}
    </a>
  ) : (
    <div className={className}>{content}</div>
  );
};

const Chevron = ({
  open,
  transition,
}: {
  open: boolean;
  transition: Transition;
}) => (
  <motion.svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
    className="size-7 text-[#C4C9CC] dark:text-[#3E4346]"
    initial={false}
    animate={{ rotate: open ? 180 : 0 }}
    transition={transition}
  >
    <circle cx="12" cy="12" r="10" />
    <path d="m16 10-4 4-4-4" />
  </motion.svg>
);

export type GitHubActivityProps = React.ComponentProps<"div"> & {
  contributions?: Contribution[];
  repos?: RepoContribution[];
  year?: number;
  accent?: string | string[];
  cellSize?: number;
  label?: string;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

const GitHubActivity = ({
  className,
  contributions = [],
  repos = [],
  year,
  accent = DEFAULT_ACCENT,
  cellSize = DEFAULT_CELL_SIZE,
  label = DEFAULT_LABEL,
  defaultOpen = false,
  open: openProp,
  onOpenChange,
  ...props
}: GitHubActivityProps) => {
  const reduceMotion = useReducedMotion();
  const uid = React.useId();
  const [openState, setOpenState] = React.useState(defaultOpen);

  const open = openProp ?? openState;
  const toggle = () => {
    if (openProp === undefined) setOpenState(!open);
    onOpenChange?.(!open);
  };

  const scale = React.useMemo(() => toScale(accent), [accent]);
  const transition = reduceMotion ? { duration: 0 } : SPRING;
  const headerTransition = reduceMotion ? { duration: 0 } : HEADER_SPRING;
  const rowTransition = reduceMotion ? { duration: 0 } : ROW_SPRING;

  const kick = reduceMotion ? {} : { x: ROW_OFFSET, y: ROW_OFFSET };
  const listMotion = {
    initial: { opacity: 0, ...kick },
    animate: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, ...kick },
  };

  const total = React.useMemo(
    () => contributions.reduce((sum, day) => sum + day.count, 0),
    [contributions],
  );

  const parsedYear = Number(contributions.at(-1)?.date.slice(0, 4));
  const displayYear = year ?? (Number.isFinite(parsedYear) ? parsedYear : null);
  const heading = `${total} contributions${displayYear ? ` in ${displayYear}` : ""}`;

  return (
    <div
      data-slot="github-activity"
      className={cn(
        "relative w-full max-w-md overflow-hidden rounded-[28px] bg-white p-4 dark:bg-black",
        repos.length > 0 && "pb-[76px]",
        className,
      )}
      {...props}
    >
      <p className="mb-4 text-base font-medium text-foreground px-1.5">
        {heading}
      </p>

      <ContributionGrid
        contributions={contributions}
        scale={scale}
        cellSize={cellSize}
        label={heading}
        reduceMotion={reduceMotion}
      />

      {repos.length > 0 && (
        <motion.div
          layout
          id={`${uid}-panel`}
          data-slot="github-activity-panel"
          data-state={open ? "open" : "closed"}
          className={cn(
            "absolute inset-x-3 bottom-3 overflow-hidden bg-card/90 backdrop-blur-xl",
            open && "top-3",
          )}
          style={{ borderRadius: 18 }}
          transition={transition}
        >
          <motion.div
            layout="position"
            transition={headerTransition}
            className="flex items-center justify-between gap-3 py-3 px-4"
          >
            <span className="truncate text-sm text-foreground">{label}</span>

            <div className="flex items-center gap-3">
              {!open && (
                <div className="flex items-center">
                  {repos.slice(0, STACK_LIMIT).map((repo) => (
                    <Avatar
                      key={repo.name}
                      repo={repo}
                      layoutId={`${uid}-${repo.name}`}
                      transition={transition}
                      className="-ml-2 first:ml-0"
                    />
                  ))}
                </div>
              )}

              <button
                type="button"
                onClick={toggle}
                aria-expanded={open}
                aria-controls={`${uid}-panel`}
                aria-label={
                  open ? "Hide top repositories" : "Show top repositories"
                }
                className="grid size-7 shrink-0 place-items-center rounded-full bg-card"
              >
                <Chevron open={open} transition={transition} />
              </button>
            </div>
          </motion.div>

          <AnimatePresence initial={false} mode="popLayout">
            {open && (
              <motion.ul
                key="list"
                layout="position"
                {...listMotion}
                transition={rowTransition}
                className="px-0.5 pb-1"
              >
                {repos.map((repo) => (
                  <li key={repo.name}>
                    <RepoRow
                      repo={repo}
                      layoutId={`${uid}-${repo.name}`}
                      transition={transition}
                    />
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
};

export { GitHubActivity };
export default GitHubActivity;
