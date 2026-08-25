import type { Metadata } from "next";
import GooeyNavbar from "@/components/GooeyNavbar";
import { fetchStarCount } from "@/lib/github";
import HeroCta from "@/components/HeroCta";
import HeroIntro from "@/components/HeroIntro";
import ComponentsShowcase from "@/components/ComponentsShowcase";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

import FeatureCardsSection from "@/components/FeatureCardsSection";

export default async function Home() {
  const stars = await fetchStarCount();

  return (
    <>
      <GooeyNavbar stars={stars} />

      <section className="relative w-full p-1.5 md:p-2.5">
        <div
          className="relative flex min-h-[min(92vh,54rem)] w-full items-center justify-center overflow-hidden rounded-[45px] border border-blue-200/60 bg-[#E2EDFF] text-slate-900 shadow-xl backdrop-blur-2xl dark:border-blue-900/40 dark:bg-[#081022] dark:text-white md:min-h-[min(92vh,54rem)]"
          style={{ cornerShape: "squircle" } as React.CSSProperties}
        >
          {/* Ambient soft blue mesh glow */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_75%_55%_at_50%_-5%,rgba(0,122,255,0.12),rgba(56,189,248,0.05)_55%,transparent_80%)]" />

          <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center justify-center gap-4 px-4 pb-16 pt-24 text-center sm:px-6">
            <HeroIntro
              headline="Craft Premium Solana Frontends in Minutes."
              sub="Production-grade React primitives for Web3 — build lightning-fast, Apple-crafted Solana frontends in seconds."
            >
              <HeroCta />
            </HeroIntro>
          </div>
        </div>
      </section>
      <ComponentsShowcase />
      <FeatureCardsSection />
      <BackersSection />
      <Footer />
    </>
  );
}

const SPONSOR_URL = "https://github.com/Subhan-code/oxygen_ui";

type Backer = {
  name: string;
  href: string;
  lightSrc: string;
  darkSrc: string;
  cardHeight: string;
};

// mintlify's wordmark has a far larger x-height and sits higher in its artboard, so it needs its own size
const BACKERS: Backer[] = [
  {
    name: "Solana Foundation India",
    href: "https://solana.com",
    lightSrc: "/logos/solana-foundation-india-dark.png",
    darkSrc: "/logos/solana-foundation-india.png",
    cardHeight: "h-12 sm:h-16 max-h-[85%]",
  },
  {
    name: "Mintlify",
    href: "https://mintlify.com",
    lightSrc: "/logos/mintlifydark.png",
    darkSrc: "/logos/mintlifylight.png",
    cardHeight: "h-8 sm:h-9",
  },
];

function BackerLogo({
  backer,
  className,
}: {
  backer: Backer;
  className: string;
}) {
  return (
    <>
      <img
        src={backer.lightSrc}
        alt={backer.name}
        className={`${className} w-auto dark:hidden`}
      />
      <img
        src={backer.darkSrc}
        alt={backer.name}
        className={`hidden w-auto dark:block ${className}`}
      />
    </>
  );
}

function SponsorSlot() {
  return (
    <a
      href={SPONSOR_URL}
      target="_blank"
      rel="noreferrer"
      className="group relative flex h-24 w-full items-center justify-center rounded-3xl bg-card/60 transition-colors duration-150 ease-out hover:bg-card dark:bg-muted/60 dark:hover:bg-muted sm:h-28"
    >
      <span className="flex items-center gap-2.5 text-muted-foreground/70 transition-colors duration-200 ease-out group-hover:text-foreground">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          xmlns="http://www.w3.org/2000/svg"
          className="size-4 transition-transform duration-200 ease-[cubic-bezier(0.215,0.61,0.355,1)] group-hover:rotate-90 motion-reduce:transition-none"
          aria-hidden="true"
        >
          <path d="M12 5v14M5 12h14" />
        </svg>
        <span className="grid overflow-hidden whitespace-nowrap text-center text-sm font-medium">
          <span className="col-start-1 row-start-1 transition-[transform,opacity] duration-200 ease-[cubic-bezier(0.215,0.61,0.355,1)] group-hover:-translate-y-full group-hover:opacity-0 motion-reduce:transition-none">
            Your logo here
          </span>
          <span
            aria-hidden="true"
            className="col-start-1 row-start-1 translate-y-full opacity-0 transition-[transform,opacity] duration-200 ease-[cubic-bezier(0.215,0.61,0.355,1)] group-hover:translate-y-0 group-hover:opacity-100 motion-reduce:transition-none"
          >
            <span className="font-runde font-semibold">Take this slot</span>{" "}
            <span className="text-[#0066FF]">&#10084;</span>
          </span>
        </span>
      </span>
    </a>
  );
}

function BackersSection() {
  return (
    <section
      id="sponsors"
      className="mx-auto flex w-full max-w-7xl scroll-mt-24 flex-col items-center gap-12 px-6 pt-24 pb-0 text-center md:pt-32 md:pb-0"
    >
      <h2 className="max-w-2xl text-balance font-runde text-3xl font-bold tracking-tight sm:text-4xl">
        Supported by Solana Foundation India Grants and ecosystem backers
      </h2>
      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-3">
        {BACKERS.map((backer) => (
          <a
            key={backer.name}
            href={backer.href}
            target="_blank"
            rel="noreferrer"
            className="flex h-24 items-center justify-center rounded-3xl bg-card/60 px-4 py-2 transition-colors duration-150 ease-out hover:bg-card dark:bg-muted/60 dark:hover:bg-muted sm:h-28"
          >
            <BackerLogo
              backer={backer}
              className={`${backer.cardHeight} max-w-full object-contain`}
            />
          </a>
        ))}
        <SponsorSlot />
      </div>
    </section>
  );
}
