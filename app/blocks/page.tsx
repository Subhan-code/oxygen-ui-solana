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
  title: "Blocks | Oxygen UI",
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

      <main className="mx-auto w-full max-w-6xl flex-1 px-5 pb-20 pt-28 sm:px-6 md:pt-32" suppressHydrationWarning>
        <ComponentsGallery items={blockComponents} />
      </main>

      <Footer />
    </>
  );
}
