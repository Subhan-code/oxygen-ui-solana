import { Fragment } from "react";
import Link from "next/link";

const GITHUB_URL = "https://github.com/Subhan-code/oxygen-ui-solana";
const X_URL = "https://x.com/SubhanHQ";

type FooterLink = { label: string; href: string; external?: boolean };

const NAV_LINKS: FooterLink[] = [
  { label: "Home", href: "/" },
  { label: "Solana Components", href: "/sol" },
  { label: "Installation", href: "/docs/installation" },
];

const RESOURCE_LINKS: FooterLink[] = [
  { label: "GitHub", href: GITHUB_URL, external: true },
  { label: "X / Twitter", href: X_URL, external: true },
  { label: "Sitemap", href: "/sitemap.xml" },
];

const UTILITY_LINKS = [
  { label: "Sitemap", href: "/sitemap.xml" },
  { label: "robots.txt", href: "/robots.txt" },
];

function NavLink({ label, href, external }: FooterLink) {
  const className =
    "w-fit text-sm text-white/60 hover:text-white transition-colors duration-150 font-medium";

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
    <footer className="w-full px-4 pb-6 pt-2 md:px-6 flex flex-col gap-5" suppressHydrationWarning>
      {/* cta card */}
      <div
        className="relative w-full overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 bg-zinc-950 p-6 sm:p-8 md:p-10 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6"
      >
        <div className="flex flex-col gap-2 text-center sm:text-left">
          <span className="font-runde text-xl sm:text-2xl font-bold tracking-tight text-white">
            Have a component in mind which can be added here?
          </span>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-lg leading-relaxed">
            Suggest a component, feature request, or custom Solana UI pattern. DM me or mail me anytime.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <a
            href={X_URL}
            target="_blank"
            rel="noreferrer"
            className="h-10 px-4 rounded-xl bg-white text-zinc-950 font-medium text-xs sm:text-sm hover:bg-zinc-200 transition-colors shadow-sm inline-flex items-center justify-center cursor-pointer active:scale-95"
          >
            DM on X
          </a>
          <a
            href="mailto:syedsubhan.dev@gmail.com"
            className="h-10 px-4 rounded-xl bg-white/5 border border-white/10 text-white font-medium text-xs sm:text-sm hover:bg-white/10 hover:border-white/20 transition-colors inline-flex items-center justify-center cursor-pointer active:scale-95"
          >
            Mail me
          </a>
        </div>
      </div>

      <div
        className="relative w-full overflow-hidden rounded-[32px] border border-white/10 bg-[#09090b] text-white shadow-2xl md:rounded-[40px]"
        style={{ cornerShape: "squircle" } as React.CSSProperties}
        suppressHydrationWarning
      >
        {/* top grid */}
        <div className="grid grid-cols-1 gap-10 px-8 pt-10 pb-8 sm:grid-cols-2 md:grid-cols-4 md:px-12 md:pt-12">
          {/* brand column */}
          <div className="flex flex-col gap-4 md:col-span-2">
            <Link href="/" className="flex w-fit items-center gap-2.5">
              <img src="/logos/Oxygenui.svg" alt="" className="h-7 w-7" />
              <span className="font-runde text-xl font-bold tracking-tight text-white">
                Oxygen-UI
              </span>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-white/50">
              Production-grade React primitives for Solana dApps. Install as
              code files via the shadcn CLI — you own every line.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="flex h-8 w-8 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/60 transition-all duration-150 hover:border-white/20 hover:bg-white/10 hover:text-white"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden="true">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
                </svg>
              </a>
              <a
                href={X_URL}
                target="_blank"
                rel="noreferrer"
                aria-label="X / Twitter"
                className="flex h-8 w-8 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/60 transition-all duration-150 hover:border-white/20 hover:bg-white/10 hover:text-white"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="size-3.5" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.631 5.905-5.631Zm-1.161 17.52h1.833L7.084 4.126H5.117Z" />
                </svg>
              </a>
            </div>
          </div>

          {/* nav column */}
          <div className="flex flex-col gap-3">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-white/30">
              Navigation
            </span>
            {NAV_LINKS.map((link) => (
              <NavLink key={link.label} {...link} />
            ))}
          </div>

          {/* resources column */}
          <div className="flex flex-col gap-3">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-white/30">
              Resources
            </span>
            {RESOURCE_LINKS.map((link) => (
              <NavLink key={link.label} {...link} />
            ))}
          </div>
        </div>

        {/* divider */}
        <div className="h-px w-full bg-white/[0.07]" />

        {/* bottom bar */}
        <div
          className="flex flex-wrap items-center justify-between gap-3 px-8 py-4 text-xs text-white/30 md:px-12"
          suppressHydrationWarning
        >
          <span suppressHydrationWarning>
            Oxygen-UI &copy; {new Date().getFullYear()} — Open Source
          </span>
          <span className="flex items-center gap-3">
            {UTILITY_LINKS.map((link, index) => (
              <Fragment key={link.href}>
                {index > 0 && (
                  <span aria-hidden="true" className="text-white/20">
                    &middot;
                  </span>
                )}
                <a
                  href={link.href}
                  className="transition-colors duration-150 hover:text-white/60"
                >
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
