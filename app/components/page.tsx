import type { Metadata } from "next";
import Footer from "@/components/Footer";
import SolComponentsGallery from "@/components/gallery/SolComponentsGallery";
import GooeyNavbar from "@/components/GooeyNavbar";
import { fetchStarCount } from "@/lib/github";
import { SITE_KEYWORDS, componentsJsonLd } from "@/lib/seo";

export const dynamic = "force-static";
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Components | Oxygen-UI",
  description:
    "Explore the official 56 locked Solana UI components catalog for Oxygen UI: production-grade React components for Solana dApps categorized into 7 core modules.",
  keywords: SITE_KEYWORDS,
  alternates: {
    canonical: "/components",
  },
};

export default async function ComponentsPage() {
  const stars = await fetchStarCount();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(componentsJsonLd()) }}
      />
      <GooeyNavbar stars={stars} />

      <main className="mx-auto w-full max-w-6xl flex-1 px-5 pb-10 pt-24 sm:px-6 md:pt-28" suppressHydrationWarning>
        <header className="flex flex-col items-center justify-center text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <h1 className="font-runde text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl">
            Components
          </h1>
          <p className="mt-3 max-w-lg text-xs sm:text-sm font-medium text-muted-foreground leading-relaxed">
            The official catalog of production-grade Solana components organized across core dApp modules.
          </p>
        </header>

        <SolComponentsGallery />
      </main>

      <Footer />
    </>
  );
}
