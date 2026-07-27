"use client";

import { Fragment } from "react";
import { motion, useReducedMotion } from "motion/react";

const spring = { type: "spring", stiffness: 300, damping: 22 } as const;

const WORD_STEP = 0.045;

// no opacity in here on purpose: motion serializes the hidden state into the ssr markup, so fading from
// zero would leave the headline and the cta invisible if the bundle never runs
const rise = {
  hidden: { y: 18, filter: "blur(10px)" },
  shown: { y: 0, filter: "blur(0px)" },
};

export default function HeroIntro({
  headline,
  sub,
  children,
}: {
  headline: string;
  sub: string;
  children: React.ReactNode;
}) {
  const reduceMotion = useReducedMotion();
  const words = headline.split(" ");

  const step = (index: number) =>
    reduceMotion ? { duration: 0 } : { ...spring, delay: index * WORD_STEP };

  return (
    <>
      <h1 className="max-w-4xl text-balance font-runde text-4xl font-bold tracking-tight text-black dark:text-white sm:text-5xl md:text-6xl lg:text-7xl">
        {words.map((word, index) => (
          <Fragment key={`${word}-${index}`}>
            <motion.span
              initial={reduceMotion ? false : rise.hidden}
              animate={rise.shown}
              transition={step(index)}
              className="inline-block"
            >
              {word}
            </motion.span>
            {index < words.length - 1 && " "}
          </Fragment>
        ))}
      </h1>

      <motion.p
        initial={reduceMotion ? false : rise.hidden}
        animate={rise.shown}
        transition={step(words.length + 1)}
        className="max-w-xl font-medium text-black/60 dark:text-white/60 sm:text-lg"
      >
        {sub}
      </motion.p>

      <motion.div
        initial={reduceMotion ? false : rise.hidden}
        animate={rise.shown}
        transition={step(words.length + 3)}
      >
        {children}
      </motion.div>
    </>
  );
}
