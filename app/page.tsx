import type { Metadata } from "next";
import Image from "next/image";
import DynamicIslandNavbar from "@/components/DynamicIslandNavbar";
import { fetchStarCount } from "@/lib/github";
import HeroCta from "@/components/HeroCta";
import HeroIntro from "@/components/HeroIntro";
import Footer from "@/components/Footer";
import FeatureCardsSection from "@/components/FeatureCardsSection";
import ProjectIntroSection from "@/components/ProjectIntroSection";
import ScrollReveal from "@/components/ScrollReveal";

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

const HERO_MIN_HEIGHT = "min-h-[min(88vh,52rem)]";
const HERO_PADDING = "py-20 sm:py-28 md:py-32";
const SPONSOR_URL = "https://github.com/Subhan-code/oxygen-ui-solana";

function BackersSection() {
  return (
    <section
      id="sponsors"
      className="mx-auto flex w-full max-w-6xl scroll-mt-24 flex-col items-start gap-10 px-6 pt-24 pb-16 md:pt-32"
    >
      <header className="flex flex-col items-start gap-2">
        <h2 className="font-runde text-3xl font-bold tracking-tight sm:text-4xl text-foreground">
          Sponsors &amp; Ecosystem
        </h2>
        <p className="text-sm font-medium text-muted-foreground">
          Supported by leading ecosystem partners advancing Solana developer tooling.
        </p>
      </header>

      {/* atmosphere tier */}
      <div className="flex w-full flex-col items-start gap-3">
        <span className="text-[11px] font-semibold tracking-wider uppercase text-muted-foreground/70">
          Atmosphere
        </span>
        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 max-w-3xl">
          <a
            href="https://solana.com"
            target="_blank"
            rel="noreferrer"
            aria-label="Solana Foundation India"
            className="group relative flex h-28 w-full items-center justify-start rounded-[28px] border border-black/5 bg-card/60 px-6 py-4 backdrop-blur-xl transition-all duration-200 ease-out hover:border-black/15 hover:bg-card hover:shadow-md dark:border-white/10 dark:bg-muted/60 dark:hover:border-white/20 dark:hover:bg-muted sm:h-34"
            style={{ cornerShape: "squircle" } as React.CSSProperties}
          >
            <Image
              src="/logos/solana-foundation-india-dark.png"
              alt="Solana Foundation India"
              width={400}
              height={110}
              className="h-14 sm:h-18 w-auto max-w-[80%] max-h-[70%] object-contain transition-transform duration-200 group-hover:scale-105 dark:hidden"
            />
            <Image
              src="/logos/solana-foundation-india.png"
              alt="Solana Foundation India"
              width={400}
              height={110}
              className="hidden h-14 sm:h-18 w-auto max-w-[80%] max-h-[70%] object-contain transition-transform duration-200 group-hover:scale-105 dark:block"
            />
          </a>
          {/* empty atmosphere slot */}
          <a
            href={SPONSOR_URL}
            target="_blank"
            rel="noreferrer"
            aria-label="Become an Atmosphere sponsor"
            className="group relative flex h-28 w-full items-center justify-center rounded-[28px] border border-dashed border-black/8 bg-card/20 px-6 py-4 transition-all duration-200 ease-out hover:border-black/20 hover:bg-card/40 dark:border-white/8 dark:bg-muted/10 dark:hover:border-white/15 dark:hover:bg-muted/20 sm:h-34"
            style={{ cornerShape: "squircle" } as React.CSSProperties}
          >
            <span className="flex items-center gap-2 text-xs font-medium text-muted-foreground/50 transition-colors duration-200 group-hover:text-foreground">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" xmlns="http://www.w3.org/2000/svg" className="size-3.5 transition-transform duration-200 group-hover:rotate-90" aria-hidden="true">
                <path d="M12 5v14M5 12h14" />
              </svg>
              Become a sponsor
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

export default async function Home() {
  const stars = await fetchStarCount();

  return (
    <>
      <DynamicIslandNavbar stars={stars} />

      <section className="relative w-full px-1.5 pb-1.5 pt-20 sm:px-2.5 sm:pb-2.5 sm:pt-24 md:pt-24">
        <div
          className={`relative isolate flex ${HERO_MIN_HEIGHT} w-full items-center overflow-hidden rounded-[36px] border border-black/10 text-white shadow-2xl dark:border-white/15 md:rounded-[45px]`}
          style={{ cornerShape: "squircle" } as React.CSSProperties}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/hero-bg.png"
            alt=""
            className="absolute inset-0 size-full object-cover object-center pointer-events-none select-none"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-transparent dark:bg-black/55 dark:backdrop-blur-[1px]"
          />
          <div className={`relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center justify-center px-6 ${HERO_PADDING} text-center`}>
            <HeroIntro>
              <HeroCta stars={stars} />
            </HeroIntro>
          </div>
        </div>
      </section>

      <ProjectIntroSection />
      <FeatureCardsSection />
      <ScrollReveal>
        <BackersSection />
      </ScrollReveal>
      <Footer />
    </>
  );
}
