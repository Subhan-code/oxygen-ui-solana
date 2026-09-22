import type { Metadata } from "next";
import Footer from "@/components/Footer";
import SolComponentsGallery from "@/components/gallery/SolComponentsGallery";
import GooeyNavbar from "@/components/GooeyNavbar";
import { fetchStarCount } from "@/lib/github";
import { SITE_KEYWORDS, componentsJsonLd } from "@/lib/seo";

export const dynamic = "force-static";
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Components | Oxygen UI",
  description:
    "Explore the official Solana UI components catalog: production-grade React components for Solana dApps with animated motion and dark aesthetics.",
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

      <main className="mx-auto w-full max-w-6xl flex-1 px-5 pb-20 pt-28 sm:px-6 md:pt-32" suppressHydrationWarning>
        <SolComponentsGallery />
      </main>

      <Footer />
    </>
  );
}
