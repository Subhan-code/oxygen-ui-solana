"use client";

import NumberFlow from "@number-flow/react";
import { AnimatePresence, motion, useSpring, animate, useMotionValue } from "motion/react";
import { Plus, Play, Pause, RefreshCw } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";

export function AnimatedNumberCountdown() {
  const [isPaused, setIsPaused] = useState(false);
  const [resetTrigger, setResetTrigger] = useState(0);
  const [count, setCount] = useState(60);

  useEffect(() => {
    if (isPaused) return;

    const id = setInterval(() => {
      setCount((c) => {
        if (c === 0) {
          return 60;
        }
        return c - 1;
      });
    }, 1000);

    return () => {
      clearInterval(id);
    };
  }, [isPaused]);

  useEffect(() => {
    setCount(60);
  }, [resetTrigger]);

  const handleReset = () => {
    setResetTrigger((prev) => prev + 1);
  };

  return (
    <div className="relative flex flex-col items-center justify-center py-16 px-4 w-full text-zinc-900 dark:text-zinc-100 select-none">
      <div className="flex flex-col items-center gap-3 text-center mb-6">
        <span className="text-xs uppercase tracking-widest font-mono text-zinc-400 font-bold">
          Countdown with Number Flow
        </span>
      </div>
      <div className="font-mono font-bold text-6xl sm:text-8xl tracking-tight my-6 text-sky-500 dark:text-sky-400">
        <NumberFlow value={count} prefix="0:" format={{ minimumIntegerDigits: 2 }} />
      </div>
      <div className="flex items-center gap-3 mt-4">
        <motion.button
          aria-label="Pause timer"
          onClick={() => setIsPaused((p) => !p)}
          whileTap={{ scale: 0.9 }}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-red-500 hover:bg-red-600 text-white shadow-lg transition-colors cursor-pointer"
        >
          <AnimatePresence initial={false} mode="wait">
            {isPaused ? (
              <motion.span
                key="play"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.1 }}
              >
                <Play className="h-5 w-5 fill-current ml-0.5" />
              </motion.span>
            ) : (
              <motion.span
                key="pause"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.1 }}
              >
                <Pause className="h-5 w-5 fill-current" />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
        <button
          aria-label="Reset timer"
          onClick={handleReset}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 shadow-md transition-colors hover:bg-zinc-300 dark:hover:bg-zinc-700 cursor-pointer"
        >
          <RefreshCw className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

export function AnimatedNumberSpring() {
  const finalCount = 500;
  const [displaySubs, setDisplaySubs] = useState(0);

  const springSubCount = useSpring(0, {
    bounce: 0,
    duration: 1000,
  });

  useEffect(() => {
    const unsub = springSubCount.on("change", (value) => {
      setDisplaySubs(Math.round(value));
    });
    return () => unsub();
  }, [springSubCount]);

  const animateSpring = () => {
    springSubCount.set(finalCount);
  };

  return (
    <div className="relative flex flex-col items-center justify-center py-16 px-4 w-full text-zinc-900 dark:text-zinc-100 select-none">
      <div className="flex flex-col items-center gap-3 text-center mb-6">
        <span className="text-xs uppercase tracking-widest font-mono text-zinc-400 font-bold">
          Spring Animated Viewport Counter
        </span>
      </div>
      <motion.div
        onViewportEnter={animateSpring}
        onViewportLeave={() => {
          springSubCount.set(0);
        }}
        className="font-mono font-bold text-6xl sm:text-8xl tracking-tight my-6 text-purple-500 dark:text-purple-400"
      >
        <NumberFlow value={displaySubs} suffix="+" />
      </motion.div>
    </div>
  );
}

export function AnimatedNumberRandom() {
  const [displayNumber, setDisplayNumber] = useState(1000000);
  const [isAnimating, setIsAnimating] = useState(false);
  const hasAnimated = useRef(false);

  const animateRandom = () => {
    if (hasAnimated.current || isAnimating) return;

    setIsAnimating(true);
    hasAnimated.current = true;

    const steps = 12;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;

      if (currentStep <= steps) {
        const min = 1000000 + currentStep * (1000000 / steps);
        const max = 2200000;
        const randomNum = Math.floor(min + Math.random() * (max - min));
        setDisplayNumber(randomNum);
      } else {
        setDisplayNumber(2146000);
        setIsAnimating(false);
        clearInterval(interval);
      }
    }, 80);
  };

  return (
    <div className="relative flex flex-col items-center justify-center py-16 px-4 w-full text-zinc-900 dark:text-zinc-100 select-none">
      <div className="flex flex-col items-center gap-3 text-center mb-6">
        <span className="text-xs uppercase tracking-widest font-mono text-zinc-400 font-bold">
          Random Stepped Ticker on View
        </span>
      </div>
      <motion.div
        onViewportEnter={animateRandom}
        onViewportLeave={() => {
          setDisplayNumber(1000000);
          hasAnimated.current = false;
          setIsAnimating(false);
        }}
        className="font-mono font-bold text-5xl sm:text-7xl tracking-tight my-6 text-emerald-500 dark:text-emerald-400"
      >
        <NumberFlow value={displayNumber} format={{ style: "currency", currency: "USD", maximumFractionDigits: 0 }} />
      </motion.div>
    </div>
  );
}

export function AnimatedNumberMotionValue() {
  const [displayValue, setDisplayValue] = useState(0);
  const count = useMotionValue(3);
  const { ref, inView } = useInView({ triggerOnce: false });

  useEffect(() => {
    if (inView) {
      const controls = animate(count, 100, {
        duration: 1,
        ease: "easeInOut",
        onUpdate: (latest) => setDisplayValue(Math.round(latest)),
      });
      return () => controls.stop();
    } else {
      setDisplayValue(3);
    }
  }, [inView, count]);

  return (
    <div className="relative flex flex-col items-center justify-center py-16 px-4 w-full text-zinc-900 dark:text-zinc-100 select-none">
      <div className="flex flex-col items-center gap-3 text-center mb-6">
        <span className="text-xs uppercase tracking-widest font-mono text-zinc-400 font-bold">
          Motion Value In View Transition
        </span>
      </div>
      <div ref={ref} className="font-mono font-bold text-6xl sm:text-8xl tracking-tight my-6 text-amber-500 dark:text-amber-400">
        <NumberFlow value={displayValue} prefix="$" suffix="K USD" />
      </div>
    </div>
  );
}

export interface Skiper37Props extends React.HTMLAttributes<HTMLDivElement> {
  activeVariant?: "countdown" | "spring" | "random" | "motion" | "all";
}

export function Skiper37({ activeVariant = "all", className, ...props }: Skiper37Props) {
  return (
    <div
      data-slot="skiper37-animated-number"
      className={cn(
        "relative w-full rounded-3xl bg-[#FAF5F0] dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-2xl p-6 overflow-hidden font-sans",
        className
      )}
      {...props}
    >
      <div className="flex flex-col gap-12 divide-y divide-zinc-200 dark:divide-zinc-800">
        {(activeVariant === "all" || activeVariant === "countdown") && <AnimatedNumberCountdown />}
        {(activeVariant === "all" || activeVariant === "spring") && <AnimatedNumberSpring />}
        {(activeVariant === "all" || activeVariant === "random") && <AnimatedNumberRandom />}
        {(activeVariant === "all" || activeVariant === "motion") && <AnimatedNumberMotionValue />}
      </div>
    </div>
  );
}

export default Skiper37;
