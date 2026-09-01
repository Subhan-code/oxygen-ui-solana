import type { Metadata } from "next";
import GooeyNavbar from "@/components/GooeyNavbar";
import { fetchStarCount } from "@/lib/github";
import HeroCta from "@/components/HeroCta";
import HeroIntro from "@/components/HeroIntro";
import ComponentsShowcase from "@/components/ComponentsShowcase";
import Footer from "@/components/Footer";

export const dynamic = "force-static";
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Oxygen UI — Open Source Solana React Components",
  description:
    "Production-grade React primitives you own: wallet surfaces, swap terminals, dynamic charts, and transaction flows for Solana dApps. Install via shadcn CLI.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Oxygen UI — Open Source Solana React Components",
    description:
      "Production-grade React primitives you own: wallet surfaces, swap terminals, dynamic charts, and transaction flows for Solana dApps.",
    url: "/",
    images: ["/ogimage.webp"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Oxygen UI — Open Source Solana React Components",
    description:
      "Production-grade React primitives you own: wallet surfaces, swap terminals, dynamic charts, and transaction flows for Solana dApps.",
    images: ["/ogimage.webp"],
  },
};

import FeatureCardsSection from "@/components/FeatureCardsSection";
import ScrollReveal from "@/components/ScrollReveal";

export default async function Home() {
  const stars = await fetchStarCount();

  return (
    <>
      <GooeyNavbar stars={stars} />

      <section className="relative w-full p-1.5 md:p-2.5">
        <div
          className="relative isolate flex min-h-[min(92vh,54rem)] w-full items-center overflow-hidden rounded-[36px] border border-black/10 text-white shadow-2xl dark:border-white/15 md:rounded-[45px]"
          style={{ cornerShape: "squircle" } as React.CSSProperties}
        >
          <img
            src="/hero-bg.png"
            alt=""
            className="absolute inset-0 size-full object-cover object-center pointer-events-none select-none"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-black/55 backdrop-blur-[1px]"
          />

          <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center justify-center px-6 py-24 sm:py-32 text-center">
            <HeroIntro
              sub="Production-grade React primitives you own: wallet surfaces, swap terminals, and transaction flows, installed as files via the shadcn CLI."
            >
              <HeroCta />
            </HeroIntro>
          </div>
        </div>
      </section>
      <ComponentsShowcase />
      <FeatureCardsSection />
      <ScrollReveal>
        <BackersSection />
      </ScrollReveal>
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
      className="group relative flex h-28 w-full items-center justify-center rounded-[28px] border border-dashed border-black/10 bg-card/40 transition-all duration-200 ease-out hover:border-black/20 hover:bg-card dark:border-white/15 dark:bg-muted/40 dark:hover:border-white/30 dark:hover:bg-muted/80 sm:h-32 shadow-sm hover:shadow-md"
      style={{ cornerShape: "squircle" } as React.CSSProperties}
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
      className="mx-auto flex w-full max-w-7xl scroll-mt-24 flex-col items-center gap-8 px-6 pt-24 pb-12 text-center md:pt-32"
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
            className="group relative flex h-28 items-center justify-center rounded-[28px] border border-black/5 bg-card/60 px-6 py-3 shadow-md backdrop-blur-xl transition-all duration-200 ease-out hover:border-black/15 hover:bg-card hover:shadow-xl dark:border-white/10 dark:bg-muted/60 dark:hover:border-white/20 dark:hover:bg-muted sm:h-32"
            style={{ cornerShape: "squircle" } as React.CSSProperties}
          >
            <BackerLogo
              backer={backer}
              className={`${backer.cardHeight} max-w-full object-contain transition-transform duration-200 group-hover:scale-105`}
            />
          </a>
        ))}
        <SponsorSlot />
      </div>
    </section>
  );
}
