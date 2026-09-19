import type { Metadata } from "next";
import Footer from "@/components/Footer";
import SolComponentsGallery from "@/components/gallery/SolComponentsGallery";
import GooeyNavbar from "@/components/GooeyNavbar";
import { fetchStarCount } from "@/lib/github";
import { SITE_KEYWORDS, componentsJsonLd } from "@/lib/seo";

export const dynamic = "force-static";
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Sol Components | Oxygen-UI",
  description:
    "Explore the official 56 locked Sol Components catalog for Oxygen UI: production-grade React components for Solana dApps categorized into 7 core modules.",
  keywords: SITE_KEYWORDS,
  alternates: {
    canonical: "/sol-components",
  },
};

export default async function SolComponentsPage() {
  const stars = await fetchStarCount();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(componentsJsonLd()) }}
      />
      <GooeyNavbar stars={stars} />

      <main className="mx-auto w-full max-w-6xl flex-1 px-5 pb-10 pt-24 sm:px-6 md:pt-28" suppressHydrationWarning>
        <header className="flex flex-col items-center justify-center text-center max-w-2xl mx-auto mb-6 sm:mb-8">
          <span className="font-mono text-[11px] font-semibold tracking-wide text-[#0066FF] dark:text-[#0A84FF]">
            Solana UI Catalog
          </span>
          <h1 className="mt-1 font-runde text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl">
            Sol Components Catalog
          </h1>
          <p className="mt-2 max-w-lg text-xs sm:text-sm font-medium text-muted-foreground leading-relaxed">
            The official catalog of production-grade Solana components organized across core dApp modules.
          </p>
        </header>

        <SolComponentsGallery />
      </main>

      <Footer />
    </>
  );
}
