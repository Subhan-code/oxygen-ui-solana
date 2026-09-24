"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

const LINKS = [
  { label: "Home", href: "/" },
  { label: "Solana", href: "/sol" },
  { label: "Docs", href: "/docs/installation" },
];



const GITHUB_URL = "https://github.com/Subhan-code/oxygen-ui-solana";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

function StarIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
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

export interface DynamicIslandNavbarProps {
  stars?: number | null;
}

export default function DynamicIslandNavbar(props: DynamicIslandNavbarProps = {}) {
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();
  const reduceMotion = useReducedMotion();

  const [starHovered, setStarHovered] = useState(false);
  const [liveStars, setLiveStars] = useState<number | null>(null);

  useEffect(() => {
    if (props.stars != null) return;
    fetch("https://api.github.com/repos/Subhan-code/oxygen-ui-solana")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.stargazers_count != null) {
          setLiveStars(data.stargazers_count);
        }
      })
      .catch(() => {});
  }, [props.stars]);

  const effectiveStars = props.stars ?? liveStars;
  const displayStars = effectiveStars != null ? effectiveStars.toLocaleString() : "★";

  const [mounted, setMounted] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [logoHovered, setLogoHovered] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const [xHovered, setXHovered] = useState(false);
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
    <header className="pointer-events-none fixed inset-x-0 top-6 z-50 px-4 sm:px-6 md:px-8 sm:top-7">
      <motion.nav
        layout={!reduceMotion}
        animate={{
          scale: scrolled ? 0.98 : 1,
          y: scrolled ? -2 : 0,
        }}
        transition={{ type: "spring", stiffness: 320, damping: 25 }}
        className="relative flex w-full items-center justify-between"
      >
        {/* left island: brand with logo hover animation */}
        <div className="flex flex-1 items-center justify-start pointer-events-none">
          <motion.div
            layout={!reduceMotion}
            transition={brandSpring}
            whileHover={reduceMotion ? undefined : { scale: 1.02 }}
            whileTap={reduceMotion ? undefined : { scale: 0.98 }}
            onMouseEnter={() => setLogoHovered(true)}
            onMouseLeave={() => setLogoHovered(false)}
            style={islandPillStyle}
            className="group pointer-events-auto flex h-12 shrink-0 items-center overflow-hidden bg-black/95 text-white shadow-xl shadow-black/20 backdrop-blur-2xl transition-all duration-300 hover:shadow-[0_0_24px_rgba(0,102,255,0.25)]"
          >
            <Link
              href="/"
              className="flex h-full items-center gap-2.5 px-4"
              aria-label="Oxygen-UI Home"
            >
              <motion.div
                animate={{
                  rotate: reduceMotion ? 0 : logoHovered ? 180 : 0,
                  scale: reduceMotion ? 1 : logoHovered ? 1.15 : 1,
                }}
                transition={{
                  type: "spring",
                  stiffness: 340,
                  damping: 18,
                }}
                className="relative flex items-center justify-center"
              >
                <Image
                  src="/logos/Oxygenui.svg"
                  alt=""
                  width={20}
                  height={20}
                  className={cn(
                    "h-5 w-5 shrink-0 transition-all duration-300",
                    logoHovered && "drop-shadow-[0_0_10px_rgba(0,102,255,0.85)]",
                  )}
                  priority
                />
              </motion.div>
              <span className="font-medium tracking-tight text-sm text-white transition-colors duration-200 group-hover:text-blue-100">
                Oxygen-UI
              </span>
            </Link>
          </motion.div>
        </div>

        {/* desktop center island: recreated from scratch with physical sliding highlight */}
        <div className="hidden md:flex items-center justify-center pointer-events-none">
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
                        scaleX: 0.3,
                        scaleY: 0.6,
                        y: -10,
                        filter: "blur(6px)",
                      }
                }
                animate={{
                  opacity: 1,
                  scaleX: 1,
                  scaleY: 1,
                  y: 0,
                  filter: "blur(0px)",
                }}
                exit={{
                  opacity: 0,
                  scaleX: 0.3,
                  y: -10,
                  filter: "blur(6px)",
                }}
                transition={navSpring}
                style={islandPillStyle}
                className="pointer-events-auto relative flex h-12 items-center rounded-full bg-black/95 px-2 text-white shadow-xl shadow-black/20 backdrop-blur-2xl"
              >
                {LINKS.map((link) => {
                  const isExact = pathname === link.href;
                  const isSub =
                    link.href !== "/" && pathname.startsWith(link.href);
                  const isActive =
                    link.href === "/components"
                      ? pathname === "/components"
                      : isExact || isSub;
                  const isHovered = hoveredNav === link.href;

                  return (
                    <Link
                      key={link.label}
                      href={link.href}
                      onMouseEnter={() => setHoveredNav(link.href)}
                      onMouseLeave={() => setHoveredNav(null)}
                      onFocus={() => setHoveredNav(link.href)}
                      onBlur={() => setHoveredNav(null)}
                      className={cn(
                        "relative flex h-8 items-center px-3.5 text-[13px] font-medium transition-colors duration-200 select-none whitespace-nowrap",
                        isActive ? "text-white font-semibold" : "text-white/65 hover:text-white",
                      )}
                    >
                      {((hoveredNav && isHovered) || (!hoveredNav && isActive)) && (
                        <motion.span
                          layoutId="center-nav-pill-highlight"
                          transition={{
                            type: "spring",
                            stiffness: 420,
                            damping: 30,
                          }}
                          className={cn(
                            "absolute inset-0 rounded-full",
                            isActive && !hoveredNav
                              ? "bg-white/15"
                              : "bg-white/10",
                          )}
                        />
                      )}
                      <span className="relative z-10">{link.label}</span>
                    </Link>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* right cluster on right viewport edge: x + theme control */}
        <div className="flex flex-1 items-center justify-end pointer-events-none">
          <AnimatePresence>
            {expanded && (
              <div className="pointer-events-auto hidden items-center gap-2 md:flex">
                {/* GitHub star pill */}
                <motion.a
                  key="right-github"
                  layout={!reduceMotion}
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub Repository"
                  onMouseEnter={() => setStarHovered(true)}
                  onMouseLeave={() => setStarHovered(false)}
                  initial={
                    reduceMotion
                      ? false
                      : {
                          opacity: 0,
                          scale: 0.4,
                          x: 20,
                          filter: "blur(4px)",
                        }
                  }
                  animate={{ opacity: 1, scale: 1, x: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 0.4, x: 20, filter: "blur(4px)" }}
                  transition={{ ...navSpring, delay: 0.06 }}
                  whileHover={reduceMotion ? undefined : { scale: 1.05 }}
                  whileTap={reduceMotion ? undefined : { scale: 0.94 }}
                  style={islandPillStyle}
                  className="group flex h-12 items-center gap-2 overflow-hidden rounded-full bg-black/95 px-4 text-white shadow-xl shadow-black/20 backdrop-blur-2xl transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.25)]"
                >
                  <span className="relative flex h-6 w-6 items-center justify-center">
                    <motion.span
                      initial={false}
                      animate={{
                        scale: starHovered ? 0.2 : 1,
                        opacity: starHovered ? 0 : 1,
                      }}
                      transition={{ duration: 0.15 }}
                      className="flex items-center justify-center"
                    >
                      <GithubIcon className="h-5.5 w-5.5 text-white" />
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
                      <StarIcon className="h-5.5 w-5.5" />
                    </motion.span>
                  </span>
                  <span
                    className={cn(
                      "font-mono text-xs font-medium tabular-nums transition-colors duration-200",
                      starHovered ? "text-[#FFE9A8]" : "text-white"
                    )}
                  >
                    {displayStars}
                  </span>
                </motion.a>

                {/* X (Twitter) pill with custom hover animation */}
                <motion.a
                  key="right-x"
                  layout={!reduceMotion}
                  href="https://x.com/SubhanHQ"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="X (Twitter)"
                  onMouseEnter={() => setXHovered(true)}
                  onMouseLeave={() => setXHovered(false)}
                  onFocus={() => setXHovered(true)}
                  onBlur={() => setXHovered(false)}
                  initial={
                    reduceMotion
                      ? false
                      : {
                          opacity: 0,
                          scale: 0.4,
                          x: 20,
                          filter: "blur(4px)",
                        }
                  }
                  animate={{ opacity: 1, scale: 1, x: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 0.4, x: 20, filter: "blur(4px)" }}
                  transition={{ ...navSpring, delay: 0.08 }}
                  whileHover={
                    reduceMotion
                      ? undefined
                      : {
                          scale: 1.1,
                          rotate: 10,
                        }
                  }
                  whileTap={reduceMotion ? undefined : { scale: 0.92 }}
                  style={islandPillStyle}
                  className="group flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-black/95 text-white shadow-xl shadow-black/20 backdrop-blur-2xl transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.25)]"
                >
                  <motion.div
                    animate={{
                      scale: reduceMotion ? 1 : xHovered ? 1.15 : 1,
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 16 }}
                    className="flex items-center justify-center"
                  >
                    <XIcon className="h-4 w-4 text-white transition-colors duration-200" />
                  </motion.div>
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
                          scale: 0.4,
                          x: 20,
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
                    scale: 0.4,
                    x: 20,
                    filter: "blur(4px)",
                  }}
                  transition={{ ...themeSpring, delay: 0.1 }}
                  whileHover={reduceMotion ? undefined : { scale: 1.08 }}
                  whileTap={reduceMotion ? undefined : { scale: 0.92 }}
                  style={islandPillStyle}
                  className="flex h-12 w-12 items-center justify-center overflow-hidden bg-black text-white shadow-lg shadow-black/10"
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

          {/* mobile actions: only GitHub star pill and hamburger button */}
          <AnimatePresence>
            {expanded && (
              <div className="pointer-events-auto flex items-center gap-2 md:hidden">
                {/* GitHub star pill — mobile */}
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
                  className="flex h-12 items-center gap-1.5 overflow-hidden rounded-full bg-black/95 px-3 text-white shadow-xl shadow-black/20"
                >
                  <span className="relative flex h-6 w-6 items-center justify-center">
                    <motion.span
                      initial={false}
                      animate={{
                        scale: starHovered ? 0.2 : 1,
                        opacity: starHovered ? 0 : 1,
                      }}
                      transition={{ duration: 0.15 }}
                      className="flex items-center justify-center"
                    >
                      <GithubIcon className="h-5.5 w-5.5 text-white" />
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
                      <StarIcon className="h-5.5 w-5.5" />
                    </motion.span>
                  </span>
                  <span
                    className={cn(
                      "font-mono text-xs font-medium tabular-nums transition-colors duration-200",
                      starHovered ? "text-[#FFE9A8]" : "text-white"
                    )}
                  >
                    {displayStars}
                  </span>
                </motion.a>

                {/* Hamburger menu button */}
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
                  className="flex h-12 w-12 items-center justify-center overflow-hidden bg-black text-white shadow-xl shadow-black/20"
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
        </div>
      </motion.nav>

      {/* mobile drawer menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -8, filter: "blur(6px)" }}
            transition={{ type: "spring", stiffness: 320, damping: 24 }}
            className="pointer-events-auto fixed inset-x-4 top-20 z-40 rounded-3xl bg-black/95 p-5 shadow-2xl backdrop-blur-2xl md:hidden"
          >
            <div className="flex flex-col gap-2">
              {LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors font-runde",
                    pathname === link.href
                      ? "bg-white/10 text-white font-semibold"
                      : "text-white/70 hover:bg-white/5 hover:text-white",
                  )}
                >
                  {link.label}
                </Link>
              ))}

              <div className="my-2 h-px w-full bg-white/10" />

              <div className="flex items-center justify-between px-1 pt-1">
                <button
                  type="button"
                  onClick={() => setTheme(isDark ? "light" : "dark")}
                  className="flex items-center gap-2.5 rounded-xl px-2.5 py-2 text-xs font-medium text-white/80 transition-colors hover:bg-white/5 hover:text-white"
                >
                  <HalfShadedCircleIcon className="h-4 w-4 text-white" />
                  <span>{isDark ? "Light mode" : "Dark mode"}</span>
                </button>

                <a
                  href="https://x.com/SubhanHQ"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="X (Twitter)"
                  className="flex items-center gap-2 rounded-xl px-2.5 py-2 text-xs font-medium text-white/80 transition-colors hover:bg-white/5 hover:text-white"
                >
                  <XIcon className="h-3.5 w-3.5 text-white" />
                  <span>@SubhanHQ</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
