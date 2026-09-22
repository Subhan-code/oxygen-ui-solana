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

const GITHUB_URL = "https://github.com/Subhan-code/oxygen-ui-solana";

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
            className="group pointer-events-auto flex h-12 shrink-0 items-center overflow-hidden bg-black/95 text-white shadow-xl shadow-black/20 ring-1 ring-white/15 backdrop-blur-2xl transition-all duration-300 hover:ring-blue-500/40 hover:shadow-[0_0_24px_rgba(0,102,255,0.25)]"
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
                className="pointer-events-auto relative flex h-12 items-center rounded-full bg-black/95 px-2 text-white shadow-xl shadow-black/20 ring-1 ring-white/15 backdrop-blur-2xl"
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
                              ? "bg-white/15 ring-1 ring-white/20"
                              : "bg-white/10 ring-1 ring-white/10",
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

        {/* right cluster on right viewport edge: github + x + theme control */}
        <div className="flex flex-1 items-center justify-end pointer-events-none">
          <AnimatePresence>
            {expanded && (
              <div className="pointer-events-auto hidden items-center gap-2 md:flex">
                {/* github button without star morph animation */}
                <motion.a
                  key="right-github"
                  layout={!reduceMotion}
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`GitHub repository, ${displayStars} stars`}
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
                  transition={{ ...smallSpring, delay: 0.05 }}
                  whileHover={reduceMotion ? undefined : { scale: 1.04 }}
                  whileTap={reduceMotion ? undefined : { scale: 0.96 }}
                  style={islandPillStyle}
                  className="group relative flex h-12 items-center gap-2 rounded-full bg-black/95 px-3.5 text-white shadow-xl shadow-black/20 ring-1 ring-white/15 backdrop-blur-2xl transition-all duration-200 hover:ring-white/30 hover:bg-black"
                >
                  <GithubCutoutIcon className="h-4.5 w-4.5 text-white transition-opacity duration-200 group-hover:opacity-80" />
                  <span className="font-semibold text-[13px] tabular-nums text-white/90">
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
                  className="group flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-black/95 text-white shadow-xl shadow-black/20 ring-1 ring-white/15 backdrop-blur-2xl transition-all duration-300 hover:ring-white/40 hover:shadow-[0_0_20px_rgba(255,255,255,0.25)]"
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

          {/* mobile actions */}
          <AnimatePresence>
            {expanded && (
              <div className="pointer-events-auto flex items-center gap-2 md:hidden">
                <motion.a
                  layout={!reduceMotion}
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                  initial={reduceMotion ? false : { opacity: 0, scale: 0.4 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.4 }}
                  transition={smallSpring}
                  whileHover={reduceMotion ? undefined : { scale: 1.04 }}
                  whileTap={reduceMotion ? undefined : { scale: 0.96 }}
                  style={islandPillStyle}
                  className="flex h-12 items-center gap-1.5 overflow-hidden rounded-full bg-black/95 px-3 text-white ring-1 ring-white/15"
                >
                  <GithubCutoutIcon className="h-4 w-4 text-white" />
                  <span className="font-semibold text-xs tabular-nums text-white/90">
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
                whileHover={reduceMotion ? undefined : { scale: 1.1, rotate: 10 }}
                whileTap={reduceMotion ? undefined : { scale: 0.92 }}
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
