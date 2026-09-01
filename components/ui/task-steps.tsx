"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

const POP = { type: "spring", stiffness: 640, damping: 22, mass: 0.7 } as const;
const CELL = { type: "spring", stiffness: 520, damping: 34, mass: 0.45 } as const;
const STILL = { duration: 0 } as const;

export type TaskStep = {
  id: string;
  label: string;
  meta?: string;
};

export type TaskStepStatus = "pending" | "active" | "done" | "error";

export type UseTaskStepsOptions = {
  steps: TaskStep[];
  current: number;
  failed?: boolean;
};

export function useTaskSteps({ steps, current, failed = false }: UseTaskStepsOptions) {
  const complete = !failed && current >= steps.length;

  const rows = steps.map((step, i) => ({
    ...step,
    status: (i < current
      ? "done"
      : i === current && failed
        ? "error"
        : i === current && !complete
          ? "active"
          : "pending") as TaskStepStatus,
  }));

  const active = rows.find((r) => r.status === "active");
  const sentence = failed
    ? `Failed at ${steps[Math.min(current, steps.length - 1)]?.label ?? "step"}`
    : complete
      ? `All ${steps.length} steps complete`
      : active
        ? `${active.label}, step ${current + 1} of ${steps.length}`
        : "";

  return { rows, complete, failed, sentence };
}

const Tick = (
  <svg viewBox="0 0 256 256" width="11" height="11" fill="none" aria-hidden>
    <polyline
      points="216 72 104 184 48 128"
      stroke="currentColor"
      strokeWidth="26"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Cross = (
  <svg viewBox="0 0 256 256" width="10" height="10" fill="none" aria-hidden>
    <path
      d="M200 56 56 200 M56 56l144 144"
      stroke="currentColor"
      strokeWidth="26"
      strokeLinecap="round"
    />
  </svg>
);

const Arc = ({ spin }: { spin: boolean }) => (
  <motion.svg
    viewBox="0 0 16 16"
    className="size-3"
    aria-hidden
    animate={spin ? { rotate: 360 } : { rotate: 0 }}
    transition={spin ? { duration: 0.8, ease: "linear", repeat: Infinity } : STILL}
  >
    <circle
      cx="8"
      cy="8"
      r="6"
      fill="none"
      stroke="currentColor"
      strokeOpacity="0.25"
      strokeWidth="2"
    />
    <path
      d="M8 2 a6 6 0 0 1 6 6"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </motion.svg>
);

export type TaskStepsProps = UseTaskStepsOptions & {
  label?: string;
  className?: string;
};

export function TaskSteps({
  steps,
  current,
  failed = false,
  label = "Task progress",
  className = "",
}: TaskStepsProps) {
  const { rows, complete, sentence } = useTaskSteps({ steps, current, failed });
  const reduced = useReducedMotion() === true;

  const [spoken, setSpoken] = useState("");
  useEffect(() => {
    if (!sentence) return;
    const t = setTimeout(() => setSpoken(sentence), 500);
    return () => clearTimeout(t);
  }, [sentence]);

  return (
    <div className={cn("w-full font-sans select-none", className)}>
      <ol aria-label={label} className="space-y-0.5">
        {rows.map((row) => {
          const tone =
            row.status === "done"
              ? "text-zinc-600 dark:text-zinc-300 font-medium"
              : row.status === "active"
                ? "font-semibold text-zinc-900 dark:text-zinc-100"
                : row.status === "error"
                  ? "font-semibold text-red-600 dark:text-red-400"
                  : "text-zinc-400 dark:text-zinc-500 font-medium";

          return (
            <li
              key={row.id}
              aria-current={row.status === "active" ? "step" : undefined}
              className="flex h-7 items-center gap-2.5 px-1"
            >
              <span className="relative grid size-4 shrink-0 place-items-center">
                <AnimatePresence initial={false}>
                  {row.status === "done" ? (
                    <motion.span
                      key="done"
                      className="col-start-1 row-start-1 grid size-4 place-items-center rounded-[5px] bg-emerald-500/20 text-emerald-600 dark:bg-emerald-400/20 dark:text-emerald-400"
                      initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.4 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, transition: STILL }}
                      transition={reduced ? STILL : POP}
                    >
                      {Tick}
                    </motion.span>
                  ) : row.status === "error" ? (
                    <motion.span
                      key="error"
                      className="col-start-1 row-start-1 grid size-4 place-items-center rounded-[5px] bg-red-500/20 text-red-600 dark:bg-red-400/20 dark:text-red-400"
                      initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.4 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, transition: STILL }}
                      transition={reduced ? STILL : POP}
                    >
                      {Cross}
                    </motion.span>
                  ) : row.status === "active" ? (
                    <motion.span
                      key="active"
                      className="col-start-1 row-start-1 text-sky-500 dark:text-sky-400"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, transition: STILL }}
                      transition={reduced ? STILL : CELL}
                    >
                      <Arc spin />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="pending"
                      className="col-start-1 row-start-1 size-[5px] rounded-[2px] bg-zinc-300 dark:bg-white/20"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, transition: STILL }}
                      transition={STILL}
                    />
                  )}
                </AnimatePresence>
              </span>

              {row.status === "active" && !reduced ? (
                <motion.span
                  className="min-w-0 flex-1 truncate bg-[linear-gradient(90deg,#71717a_38%,#09090b_50%,#71717a_62%)] bg-clip-text text-xs font-semibold text-transparent [background-size:220%_100%] dark:bg-[linear-gradient(90deg,#a1a1aa_38%,#ffffff_50%,#a1a1aa_62%)]"
                  animate={{ backgroundPosition: ["120% 0", "-120% 0"] }}
                  transition={{ duration: 1.6, ease: "linear", repeat: Infinity }}
                >
                  {row.label}
                </motion.span>
              ) : (
                <span
                  className={cn("min-w-0 flex-1 truncate text-xs transition-colors duration-200", tone)}
                >
                  {row.label}
                </span>
              )}

              {row.meta ? (
                <span
                  className={cn(
                    "shrink-0 font-mono text-[10.5px] tabular-nums transition-opacity duration-200",
                    row.status === "done"
                      ? "text-zinc-400 opacity-100 dark:text-zinc-500"
                      : "opacity-0"
                  )}
                  aria-hidden={row.status !== "done"}
                >
                  {row.meta}
                </span>
              ) : null}
            </li>
          );
        })}
      </ol>
      <span role="status" className="sr-only">
        {spoken}
      </span>
      <span className="sr-only" aria-live={complete || failed ? "polite" : "off"}>
        {complete ? "Run complete" : failed ? "Run failed" : ""}
      </span>
    </div>
  );
}

export default TaskSteps;
