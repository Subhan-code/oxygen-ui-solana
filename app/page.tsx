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

export default async function Home() {
  const stars = await fetchStarCount();

  return (
    <>
      <section className="relative w-full p-1.5 md:p-2.5">
        <div
          className="relative flex min-h-[calc(100svh-0.75rem)] w-full items-center justify-center overflow-hidden rounded-[45px] border border-black/[0.04] bg-[#F5F5F7] dark:border-transparent dark:border-apple dark:bg-[#121212] md:min-h-[calc(100svh-1.25rem)]"
          style={{ cornerShape: "squircle" } as React.CSSProperties}
        >
          <GooeyNavbar stars={stars} />

          <img
            src="/logos/Rareui.svg"
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-[68%] w-[min(88vw,860px)] max-w-none -translate-x-1/2 -translate-y-1/2 opacity-[0.05] [filter:brightness(0)] dark:opacity-[0.07] dark:[filter:brightness(0)_invert(1)]"
          />
          <div className="pointer-events-none absolute inset-0 hidden rounded-[inherit] bg-[radial-gradient(120%_75%_at_50%_-5%,rgba(255,255,255,0.07),transparent_60%)] dark:block" />

          <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center justify-center gap-3 px-4 pb-20 pt-28 text-center sm:gap-4 sm:px-6">
            <HeroIntro
              headline="Tasteful Components, Made to Stand Out."
              sub="A collection of rare, animated components. Browse them in action below and install any component with shadcn CLI."
            >
              <HeroCta />
            </HeroIntro>
          </div>
        </div>
      </section>
      <ComponentsShowcase />
      <BackersSection />
      <Footer />
    </>
  );
}

const SPONSOR_URL = "https://github.com/sponsors/swamimalode07";

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
    name: "Databuddy",
    href: "https://www.databuddy.cc",
    lightSrc: "/logos/databuddydark.svg",
    darkSrc: "/logos/databuddywhite.svg",
    cardHeight: "h-10 sm:h-12",
  },
  {
    name: "Mintlify",
    href: "https://mintlify.com",
    lightSrc: "/logos/mintlifydark.png",
    darkSrc: "/logos/mintlifylight.png",
    cardHeight: "h-8 sm:h-9.5",
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
      className="group relative flex h-24 w-full items-center justify-center rounded-3xl bg-card/60 transition-colors duration-150 ease-out hover:bg-card dark:bg-muted/60 dark:hover:bg-muted sm:h-32"
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
            <span className="text-[#FC4C01]">&#10084;</span>
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
      className="mx-auto flex w-full max-w-7xl scroll-mt-24 flex-col items-center gap-12 px-6 py-24 text-center"
    >
      <h2 className="max-w-2xl text-balance font-runde text-3xl font-bold tracking-tight sm:text-4xl">
        Rare UI is backed and supported by the finest
      </h2>
      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-3">
        {BACKERS.map((backer) => (
          <a
            key={backer.name}
            href={backer.href}
            target="_blank"
            rel="noreferrer"
            className="flex h-24 items-center justify-center rounded-3xl bg-card/60 px-6 transition-colors duration-150 ease-out hover:bg-card dark:bg-muted/60 dark:hover:bg-muted sm:h-32"
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
