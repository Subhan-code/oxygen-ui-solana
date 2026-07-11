"use client";

import { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "motion/react";
import ThemeToggle from "@/components/ThemeToggle";
import { cn } from "@/lib/utils";

const LINKS = [
  { label: "Home", href: "/" },
  { label: "Components", href: "/components" },
];

const GITHUB_URL = "https://github.com/swamimalode07/rare-ui";

const GithubIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.75 2.69 1.25 3.35.95.1-.74.4-1.25.72-1.53-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11.04 11.04 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.42-2.7 5.39-5.26 5.68.41.35.77 1.05.77 2.12 0 1.53-.01 2.76-.01 3.14 0 .3.2.66.8.55A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
  </svg>
);

const pill = "rounded-full bg-neutral-900 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.4)]";

export default function GooeyNavbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const spring = { type: "spring", stiffness: 300, damping: 30 } as const;
  const animateLayout = !reduceMotion;

  return (
    <div className="pointer-events-none fixed inset-x-0 top-5 z-50 flex justify-center px-4 sm:px-6">
      <motion.nav
        layout={animateLayout}
        transition={spring}
        className={cn(
          "flex items-center",
          scrolled ? "gap-2" : "w-full max-w-3xl justify-between",
        )}
      >
        <motion.div layout={animateLayout} transition={spring} className="pointer-events-auto">
          <Link
            href="/"
            className={cn(pill, "flex h-12 items-center gap-2 px-4")}
          >
            <span className="font-[family-name:var(--font-open-runde)] text-lg font-bold text-white">
              R
            </span>
            <span className="font-[family-name:var(--font-open-runde)] text-sm font-semibold text-white">
              Rare UI
            </span>
          </Link>
        </motion.div>

        <motion.div
          layout={animateLayout}
          transition={spring}
          className={cn(pill, "pointer-events-auto flex h-12 items-center px-2")}
        >
          {LINKS.map((link, i) => (
            <Fragment key={link.href}>
              {i > 0 && <span className="h-4 w-px bg-white/15" />}
              <Link
                href={link.href}
                className={cn(
                  "px-3.5 text-sm",
                  pathname === link.href
                    ? "text-white"
                    : "text-white/60 transition-colors duration-150 ease-out hover:text-white",
                )}
              >
                {link.label}
              </Link>
            </Fragment>
          ))}
        </motion.div>

        <motion.div
          layout={animateLayout}
          transition={spring}
          className="pointer-events-auto flex items-center gap-2"
        >
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className={cn(
              pill,
              "flex h-12 w-12 items-center justify-center transition-colors duration-150 ease-out hover:bg-neutral-800",
            )}
          >
            <GithubIcon className="h-6 w-6 text-white" />
          </a>

          <ThemeToggle
            className={cn(
              pill,
              "flex h-12 w-12 items-center justify-center p-0 text-white/80 hover:bg-neutral-800 hover:text-white [&_svg]:h-6 [&_svg]:w-6",
            )}
          />
        </motion.div>
      </motion.nav>
    </div>
  );
}
