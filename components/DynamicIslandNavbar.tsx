"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useStarCount } from "@/lib/use-star-count";
import { cn } from "@/lib/utils";

const LINKS = [
  { label: "Home", href: "/" },
  { label: "Components", href: "/components" },
  { label: "Blocks", href: "/blocks" },
  { label: "Docs", href: "/docs/installation" },
];

const GITHUB_URL = "https://github.com/Subhan-code/oxygen_ui";

function GithubCutoutIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function StarIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 800 800"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path d="M305.105 180.279C347.327 104.538 368.437 66.6667 400 66.6667C431.563 66.6667 452.673 104.537 494.893 180.279L505.817 199.874C517.817 221.398 523.813 232.16 533.17 239.26C542.523 246.361 554.17 248.997 577.47 254.268L598.683 259.068C680.67 277.619 721.667 286.894 731.42 318.258C741.173 349.62 713.227 382.303 657.33 447.663L642.87 464.573C626.987 483.147 619.043 492.433 615.47 503.923C611.9 515.413 613.1 527.803 615.5 552.587L617.687 575.147C626.137 662.353 630.363 705.957 604.83 725.34C579.293 744.723 540.91 727.05 464.143 691.707L444.283 682.56C422.47 672.517 411.563 667.493 400 667.493C388.437 667.493 377.53 672.517 355.717 682.56L335.857 691.707C259.089 727.05 220.706 744.723 195.172 725.34C169.637 705.957 173.863 662.353 182.313 575.147L184.499 552.587C186.901 527.803 188.102 515.413 184.529 503.923C180.956 492.433 173.014 483.147 157.131 464.573L142.67 447.663C86.7749 382.303 58.8272 349.62 68.5806 318.258C78.3339 286.894 119.329 277.619 201.318 259.068L222.53 254.268C245.828 248.997 257.478 246.361 266.831 239.26C276.185 232.16 282.184 221.398 294.182 199.874L305.105 180.279Z" />
    </svg>
  );
}

function SparkleIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 0l2.5 9.5L24 12l-9.5 2.5L12 24l-2.5-9.5L0 12l9.5-2.5L12 0z" />
    </svg>
  );
}

function HalfShadedCircleIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      <path d="M12 3a9 9 0 0 1 0 18V3z" fill="currentColor" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.91-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export default function DynamicIslandNavbar({
  stars,
}: {
  stars?: number | null;
}) {
  const pathname = usePathname();
  const liveStars = useStarCount(stars);
  const { resolvedTheme, setTheme } = useTheme();
  const reduceMotion = useReducedMotion();

  const [mounted, setMounted] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [starHovered, setStarHovered] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
      setExpanded(true);
    }, reduceMotion ? 0 : 280);
    return () => clearTimeout(timer);
  }, [reduceMotion]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const displayStars = liveStars ?? stars ?? 3;
  const isDark = resolvedTheme !== "light";

  const brandSpring = {
    type: "spring",
    stiffness: 280,
    damping: 24,
    mass: 0.8,
  } as const;

  const navSpring = {
    type: "spring",
    stiffness: 250,
    damping: 22,
    bounce: 0.32,
    mass: 0.85,
  } as const;

  const smallSpring = {
    type: "spring",
    stiffness: 320,
    damping: 17,
    bounce: 0.48,
    mass: 0.7,
  } as const;

  const themeSpring = {
    type: "spring",
    stiffness: 340,
    damping: 16,
    bounce: 0.52,
    mass: 0.7,
  } as const;

  const islandPillStyle = { borderRadius: 9999 };

  return (
    <header className="pointer-events-none fixed inset-x-0 top-7 z-50 flex justify-center px-4 sm:top-8">
      <motion.nav
        layout={!reduceMotion}
        animate={{
          scale: scrolled ? 0.98 : 1,
          y: scrolled ? -2 : 0,
        }}
        transition={{ type: "spring", stiffness: 320, damping: 25 }}
        className="pointer-events-auto relative flex items-center justify-center gap-4 sm:gap-6 md:gap-7"
      >
        {/* left island: brand */}
        <motion.div
          layout={!reduceMotion}
          transition={brandSpring}
          whileHover={reduceMotion ? undefined : { scale: 1.02 }}
          whileTap={reduceMotion ? undefined : { scale: 0.98 }}
          style={islandPillStyle}
          className="flex h-12 shrink-0 items-center overflow-hidden bg-black text-white"
        >
          <Link
            href="/"
            className="flex h-full items-center gap-2.5 px-4"
            aria-label="Oxygen-UI Home"
          >
            <Image
              src="/logos/Oxygenui.svg"
              alt=""
              width={20}
              height={20}
              className="h-5 w-5 shrink-0"
              priority
            />
            <span className="font-medium tracking-tight text-sm text-white">
              Oxygen-UI
            </span>
          </Link>
        </motion.div>

        {/* desktop center island: nav */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              key="center-nav"
              layout={!reduceMotion}
              initial={
                reduceMotion
                  ? false
                  : {
                      opacity: 0,
                      scaleX: 0.05,
                      scaleY: 0.6,
                      x: -80,
                      filter: "blur(4px)",
                      transformOrigin: "left center",
                    }
              }
              animate={{
                opacity: 1,
                scaleX: 1,
                scaleY: 1,
                x: 0,
                filter: "blur(0px)",
              }}
              exit={{
                opacity: 0,
                scaleX: 0.05,
                x: -80,
                filter: "blur(4px)",
              }}
              transition={navSpring}
              whileHover={reduceMotion ? undefined : { scale: 1.01 }}
              style={islandPillStyle}
              className="hidden h-12 items-center overflow-hidden bg-black px-2.5 text-white md:flex"
            >
              {LINKS.map((link, idx) => {
                const isExact = pathname === link.href;
                const isSub =
                  link.href !== "/" && pathname.startsWith(link.href);
                const isActive =
                  link.href === "/components"
                    ? pathname === "/components"
                    : isExact || isSub;

                return (
                  <div key={link.label} className="flex items-center">
                    {idx > 0 && (
                      <span
                        className="h-3.5 w-px bg-white/15"
                        aria-hidden="true"
                      />
                    )}
                    <Link
                      href={link.href}
                      className={cn(
                        "px-3.5 text-[13px] font-medium transition-colors duration-150 ease-out whitespace-nowrap",
                        isActive
                          ? "text-white font-semibold"
                          : "text-white/60 hover:text-white",
                      )}
                    >
                      {link.label}
                    </Link>
                  </div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* desktop right cluster: github + x + theme control */}
        <AnimatePresence>
          {expanded && (
            <div className="hidden items-center gap-2 md:flex">
              {/* github pill with star morph animation on hover */}
              <motion.a
                key="right-github"
                layout={!reduceMotion}
                href={GITHUB_URL}
                target="_blank"
                rel="noreferrer"
                aria-label={`GitHub repository, ${displayStars} stars`}
                onMouseEnter={() => setStarHovered(true)}
                onMouseLeave={() => setStarHovered(false)}
                onFocus={() => setStarHovered(true)}
                onBlur={() => setStarHovered(false)}
                initial={
                  reduceMotion
                    ? false
                    : {
                        opacity: 0,
                        scale: 0.2,
                        x: -180,
                        filter: "blur(4px)",
                      }
                }
                animate={{
                  opacity: 1,
                  scale: 1,
                  x: 0,
                  filter: "blur(0px)",
                }}
                exit={{
                  opacity: 0,
                  scale: 0.2,
                  x: -180,
                  filter: "blur(4px)",
                }}
                transition={{ ...smallSpring, delay: 0.05 }}
                whileHover={reduceMotion ? undefined : { scale: 1.04 }}
                whileTap={reduceMotion ? undefined : { scale: 0.96 }}
                style={islandPillStyle}
                className="flex h-12 items-center gap-2 overflow-hidden bg-black px-3.5 text-white"
              >
                <span className="relative flex h-5 w-5 items-center justify-center">
                  <motion.span
                    initial={false}
                    animate={{
                      scale: starHovered ? 0.2 : 1,
                      opacity: starHovered ? 0 : 1,
                      rotate: reduceMotion ? 0 : starHovered ? -60 : 0,
                      filter: starHovered ? "blur(3px)" : "blur(0px)",
                    }}
                    transition={
                      reduceMotion
                        ? { duration: 0 }
                        : { type: "spring", stiffness: 320, damping: 18 }
                    }
                    className="flex items-center justify-center"
                  >
                    <GithubCutoutIcon className="h-4.5 w-4.5 text-white" />
                  </motion.span>

                  <motion.span
                    initial={false}
                    animate={{
                      scale: starHovered ? 1 : 0.2,
                      opacity: starHovered ? 1 : 0,
                      rotate: reduceMotion ? 0 : starHovered ? 0 : -140,
                      filter: starHovered ? "blur(0px)" : "blur(3px)",
                    }}
                    transition={
                      reduceMotion
                        ? { duration: 0 }
                        : { type: "spring", stiffness: 340, damping: 15 }
                    }
                    className="absolute inset-0 flex items-center justify-center text-[#FFC83D]"
                  >
                    <StarIcon className="h-5 w-5" />
                  </motion.span>

                  <motion.span
                    initial={false}
                    animate={{
                      scale: starHovered && !reduceMotion ? 1 : 0,
                      opacity: starHovered ? 1 : 0,
                      rotate: starHovered ? 0 : -90,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 360,
                      damping: 14,
                      delay: 0.08,
                    }}
                    className="pointer-events-none absolute -right-1.5 -top-1 text-[#FFE9A8]"
                  >
                    <SparkleIcon className="h-2 w-2" />
                  </motion.span>

                  <motion.span
                    initial={false}
                    animate={{
                      scale: starHovered && !reduceMotion ? 1 : 0,
                      opacity: starHovered ? 1 : 0,
                      rotate: starHovered ? 0 : 90,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 360,
                      damping: 14,
                      delay: 0.14,
                    }}
                    className="pointer-events-none absolute -bottom-1 -left-1.5 text-[#FFE9A8]"
                  >
                    <SparkleIcon className="h-1.5 w-1.5" />
                  </motion.span>
                </span>

                <span
                  className={cn(
                    "font-medium text-[13px] tabular-nums transition-colors duration-200",
                    starHovered ? "text-[#FFE9A8]" : "text-white",
                  )}
                >
                  {displayStars}
                </span>
              </motion.a>

              {/* X (Twitter) pill */}
              <motion.a
                key="right-x"
                layout={!reduceMotion}
                href="https://x.com/SubhanHQ"
                target="_blank"
                rel="noreferrer"
                aria-label="X (Twitter)"
                initial={
                  reduceMotion
                    ? false
                    : {
                        opacity: 0,
                        scale: 0.2,
                        x: -240,
                        filter: "blur(4px)",
                      }
                }
                animate={{ opacity: 1, scale: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.2, x: -240, filter: "blur(4px)" }}
                transition={{ ...navSpring, delay: 0.08 }}
                whileHover={reduceMotion ? undefined : { scale: 1.06 }}
                whileTap={reduceMotion ? undefined : { scale: 0.94 }}
                style={islandPillStyle}
                className="flex h-12 w-12 items-center justify-center overflow-hidden bg-black text-white"
              >
                <XIcon className="h-4 w-4 text-white" />
              </motion.a>

              {/* theme toggle pill */}
              <motion.button
                key="right-theme"
                layout={!reduceMotion}
                type="button"
                onClick={() => setTheme(isDark ? "light" : "dark")}
                aria-label="Toggle theme"
                initial={
                  reduceMotion
                    ? false
                    : {
                        opacity: 0,
                        scale: 0.2,
                        x: -240,
                        filter: "blur(4px)",
                      }
                }
                animate={{
                  opacity: 1,
                  scale: 1,
                  x: 0,
                  filter: "blur(0px)",
                }}
                exit={{
                  opacity: 0,
                  scale: 0.2,
                  x: -240,
                  filter: "blur(4px)",
                }}
                transition={{ ...themeSpring, delay: 0.1 }}
                whileHover={reduceMotion ? undefined : { scale: 1.08 }}
                whileTap={reduceMotion ? undefined : { scale: 0.92 }}
                style={islandPillStyle}
                className="flex h-12 w-12 items-center justify-center overflow-hidden bg-black text-white"
              >
                <motion.div
                  animate={{ rotate: mounted && !isDark ? 180 : 0 }}
                  transition={{ type: "spring", stiffness: 350, damping: 20 }}
                  className="flex items-center justify-center"
                >
                  <HalfShadedCircleIcon className="h-5 w-5 text-white" />
                </motion.div>
              </motion.button>
            </div>
          )}
        </AnimatePresence>

        {/* mobile actions */}
        <AnimatePresence>
          {expanded && (
            <div className="flex items-center gap-2 md:hidden">
              <motion.a
                layout={!reduceMotion}
                href={GITHUB_URL}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                onMouseEnter={() => setStarHovered(true)}
                onMouseLeave={() => setStarHovered(false)}
                initial={reduceMotion ? false : { opacity: 0, scale: 0.4 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.4 }}
                transition={smallSpring}
                style={islandPillStyle}
                className="flex h-12 items-center gap-1.5 overflow-hidden bg-black px-3 text-white"
              >
                <span className="relative flex h-4 w-4 items-center justify-center">
                  <motion.span
                    initial={false}
                    animate={{
                      scale: starHovered ? 0.2 : 1,
                      opacity: starHovered ? 0 : 1,
                    }}
                    transition={{ duration: 0.15 }}
                    className="flex items-center justify-center"
                  >
                    <GithubCutoutIcon className="h-4 w-4 text-white" />
                  </motion.span>
                  <motion.span
                    initial={false}
                    animate={{
                      scale: starHovered ? 1 : 0.2,
                      opacity: starHovered ? 1 : 0,
                    }}
                    transition={{ duration: 0.15 }}
                    className="absolute inset-0 flex items-center justify-center text-[#FFC83D]"
                  >
                    <StarIcon className="h-4 w-4" />
                  </motion.span>
                </span>
                <span
                  className={cn(
                    "font-medium text-xs tabular-nums transition-colors duration-200",
                    starHovered ? "text-[#FFE9A8]" : "text-white",
                  )}
                >
                  {displayStars}
                </span>
              </motion.a>

              {/* X (Twitter) — mobile */}
              <motion.a
                layout={!reduceMotion}
                href="https://x.com/SubhanHQ"
                target="_blank"
                rel="noreferrer"
                aria-label="X (Twitter)"
                initial={reduceMotion ? false : { opacity: 0, scale: 0.4 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.4 }}
                transition={smallSpring}
                style={islandPillStyle}
                className="flex h-12 w-12 items-center justify-center overflow-hidden bg-black text-white"
              >
                <XIcon className="h-4 w-4 text-white" />
              </motion.a>

              <motion.button
                layout={!reduceMotion}
                type="button"
                onClick={() => setTheme(isDark ? "light" : "dark")}
                aria-label="Toggle theme"
                initial={reduceMotion ? false : { opacity: 0, scale: 0.4 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.4 }}
                transition={themeSpring}
                style={islandPillStyle}
                className="flex h-12 w-12 items-center justify-center overflow-hidden bg-black text-white"
              >
                <HalfShadedCircleIcon className="h-5 w-5 text-white" />
              </motion.button>

              <motion.button
                layout={!reduceMotion}
                type="button"
                onClick={() => setMobileMenuOpen((open) => !open)}
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                initial={reduceMotion ? false : { opacity: 0, scale: 0.4 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.4 }}
                transition={smallSpring}
                style={islandPillStyle}
                className="flex h-12 w-12 items-center justify-center overflow-hidden bg-black text-white"
              >
                <div className="flex h-3.5 w-4 flex-col justify-between">
                  <span
                    className={cn(
                      "h-0.5 w-full bg-white transition-transform duration-200",
                      mobileMenuOpen && "translate-y-1.5 rotate-45",
                    )}
                  />
                  <span
                    className={cn(
                      "h-0.5 w-full bg-white transition-opacity duration-200",
                      mobileMenuOpen && "opacity-0",
                    )}
                  />
                  <span
                    className={cn(
                      "h-0.5 w-full bg-white transition-transform duration-200",
                      mobileMenuOpen && "-translate-y-1.5 -rotate-45",
                    )}
                  />
                </div>
              </motion.button>
            </div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* mobile drawer menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -8, filter: "blur(6px)" }}
            transition={{ type: "spring", stiffness: 320, damping: 24 }}
            className="pointer-events-auto fixed inset-x-4 top-24 z-40 rounded-3xl bg-black/95 p-5 shadow-2xl backdrop-blur-2xl md:hidden"
          >
            <div className="flex flex-col gap-3">
              {LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "rounded-xl px-3 py-2 text-sm font-medium transition-colors",
                    pathname === link.href
                      ? "bg-white/10 text-white font-semibold"
                      : "text-white/70 hover:bg-white/5 hover:text-white",
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
