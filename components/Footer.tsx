import { Fragment } from "react";
import Link from "next/link";
import FluidWave from "./FluidWave";

const GITHUB_URL = "https://github.com/swamimalode07/rare-ui";
const X_URL = "https://x.com/swamimalode";

type FooterLink = { label: string; href: string; external?: boolean };

const LINKS: FooterLink[] = [
  { label: "Home", href: "/" },
  { label: "Components", href: "/components" },
  { label: "GitHub", href: GITHUB_URL, external: true },
  { label: "X / Twitter", href: X_URL, external: true },
];

const UTILITY_LINKS = [
  { label: "Sitemap", href: "/sitemap.xml" },
  { label: "robots.txt", href: "/robots.txt" },
];

const HOVER = "transition-colors duration-150 ease-out hover:text-white";

function NavLink({ label, href, external }: FooterLink) {
  const className = `w-fit text-lg text-white/50 ${HOVER}`;

  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={className}>
        {label}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {label}
    </Link>
  );
}

export default function Footer() {
  return (
    <footer className="relative w-full overflow-hidden bg-black text-white">
      <FluidWave />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-linear-to-b from-black to-transparent" />

      <div className="relative flex min-h-[85svh] flex-col px-6 sm:px-10">
        <div className="h-px w-full bg-white/10" />

        <div className="grid grid-cols-1 gap-8 py-8 sm:grid-cols-3">
          <Link href="/" className="flex h-fit w-fit items-center gap-2">
            <img src="/logos/Rareui.svg" alt="" className="h-5 w-5" />
            <span className="font-runde text-base font-semibold">Rare UI</span>
          </Link>

          <nav className="flex flex-col gap-1">
            {LINKS.map((link) => (
              <NavLink key={link.label} {...link} />
            ))}
          </nav>

          <p className="max-w-xs text-sm text-white/50 sm:justify-self-end sm:text-right">
            A collection of rare, ready-to-use components and animations for
            your next project.
          </p>
        </div>

        <div className="h-px w-full bg-white/10" />

        <div className="flex flex-1 items-center py-16">
          <Link
            href="/components"
            className="font-runde text-[clamp(3rem,12.5vw,10.5rem)] font-bold leading-[0.85] tracking-tight"
          >
            Browse Components
          </Link>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pb-8 text-xs text-white/50">
          <span>Rare UI &copy; {new Date().getFullYear()}</span>
          <span className="flex items-center gap-2.5">
            {UTILITY_LINKS.map((link, index) => (
              <Fragment key={link.href}>
                {index > 0 && (
                  <span aria-hidden="true" className="text-white/25">
                    &middot;
                  </span>
                )}
                <a href={link.href} className={HOVER}>
                  {link.label}
                </a>
              </Fragment>
            ))}
          </span>
        </div>
      </div>
    </footer>
  );
}
