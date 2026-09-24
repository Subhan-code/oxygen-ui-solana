import type { Metadata } from "next";
import Footer from "@/components/Footer";
import GooeyNavbar from "@/components/GooeyNavbar";
import SolPageGallery from "@/components/gallery/SolPageGallery";
import { fetchStarCount } from "@/lib/github";
import { SITE_KEYWORDS, componentsJsonLd } from "@/lib/seo";

export const dynamic = "force-static";
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Solana Components | Oxygen UI",
  description:
    "Curated Solana UI components catalog and turnkey application blocks: wallet surfaces, swap widgets, order books, positions, and physical motion primitives.",
  keywords: SITE_KEYWORDS,
  alternates: {
    canonical: "/sol",
  },
};

export default async function SolPage() {
  const stars = await fetchStarCount();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(componentsJsonLd()) }}
      />
      <GooeyNavbar stars={stars} />

      <main className="mx-auto w-full max-w-6xl flex-1 px-5 pb-20 pt-28 sm:px-6 md:pt-32" suppressHydrationWarning>
        <SolPageGallery />
      </main>

      <Footer />
    </>
  );
}
