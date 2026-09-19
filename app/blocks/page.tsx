import type { Metadata } from "next";
import Footer from "@/components/Footer";
import ComponentsGallery from "@/components/gallery/ComponentsGallery";
import GooeyNavbar from "@/components/GooeyNavbar";
import { blockComponents } from "@/lib/components";
import { fetchStarCount } from "@/lib/github";
import { SITE_KEYWORDS, componentsJsonLd } from "@/lib/seo";

export const dynamic = "force-static";
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Blocks | Oxygen-UI",
  description:
    "Explore Oxygen UI application blocks: pre-built wallet dashboards, trading terminals, checkout flows, and analytics cards for Solana dApps.",
  keywords: SITE_KEYWORDS,
  alternates: {
    canonical: "/blocks",
  },
};

export default async function BlocksIndexPage() {
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
            {blockComponents.length}+ Solana UI blocks and application layouts
          </h1>
          <p className="mt-3 max-w-lg text-xs sm:text-sm font-medium text-muted-foreground leading-relaxed">
            Pre-built wallet dashboards, swap terminals, wallet sheets, analytics grids, and composite application blocks. Filter by name or category below.
          </p>
        </header>

        <ComponentsGallery items={blockComponents} />
      </main>

      <Footer />
    </>
  );
}
