import { Fragment } from "react";
import Link from "next/link";
import FluidWave from "./FluidWave";

const GITHUB_URL = "https://github.com/Subhan-code/oxygen-ui-solana";
const X_URL = "https://x.com/SubhanHQ";

type FooterLink = { label: string; href: string; external?: boolean };

const LINKS: FooterLink[] = [
  { label: "Home", href: "/" },
  { label: "Components", href: "/components" },
  { label: "Docs & Installation", href: "/docs/installation" },
  { label: "GitHub", href: GITHUB_URL, external: true },
  { label: "X / Twitter", href: X_URL, external: true },
];

const UTILITY_LINKS = [
  { label: "Sitemap", href: "/sitemap.xml" },
  { label: "robots.txt", href: "/robots.txt" },
];

const HOVER =
  "transition-colors duration-150 ease-out hover:text-white";

const MUTED = "text-white/70";

function NavLink({ label, href, external }: FooterLink) {
  const className = `w-fit text-sm md:text-base ${MUTED} ${HOVER} font-medium tracking-tight`;

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
    <footer className="relative w-full p-1.5 md:p-2.5 my-4" suppressHydrationWarning>
      <div
        className="relative flex min-h-[340px] md:min-h-[400px] w-full flex-col justify-between overflow-hidden rounded-[36px] md:rounded-[45px] border border-white/15 bg-[#09090b] text-white shadow-2xl"
        style={{ cornerShape: "squircle" } as React.CSSProperties}
        suppressHydrationWarning
      >
        {/* Blue fire WebGL fluid wave canvas */}
        <FluidWave />

        <div className="relative z-10 mx-auto flex w-full max-w-[96rem] flex-1 flex-col justify-between px-6 pt-7 sm:px-10 md:pt-9" suppressHydrationWarning>
          {/* Top header navigation */}
          <div suppressHydrationWarning>
            <div className="flex flex-wrap items-center justify-between gap-4 pb-5">
              <Link href="/" className="flex h-fit w-fit items-center gap-2.5">
                <img src="/logos/Oxygenui.svg" alt="" className="h-7 w-7" />
                <span className="font-runde text-xl font-bold tracking-tight text-white">
                  Oxygen-UI
                </span>
              </Link>

              <nav className="flex flex-wrap items-center gap-x-7 gap-y-2">
                {LINKS.map((link) => (
                  <NavLink key={link.label} {...link} />
                ))}
              </nav>
            </div>
            <div className="h-px w-full bg-white/10" />
          </div>

          {/* Center typography section */}
          <div className="flex flex-1 items-center py-6 md:py-10">
            <h2 className="font-runde text-[clamp(2.5rem,7vw,5.5rem)] font-extrabold leading-[0.95] tracking-tight text-white drop-shadow-lg">
              Solana UI Primitives
            </h2>
          </div>

          {/* Bottom copyright & utility links */}
          <div
            className={`flex flex-wrap items-center justify-between gap-3 pb-5 pt-3 text-xs ${MUTED} border-t border-white/10`}
            suppressHydrationWarning
          >
            <span className="font-medium" suppressHydrationWarning>Oxygen-UI &copy; {new Date().getFullYear()}</span>
            <span className="flex items-center gap-3">
              {UTILITY_LINKS.map((link, index) => (
                <Fragment key={link.href}>
                  {index > 0 && (
                    <span
                      aria-hidden="true"
                      className="text-white/30"
                    >
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
      </div>
    </footer>
  );
}
