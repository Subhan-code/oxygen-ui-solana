import type { Metadata } from "next";
import Footer from "@/components/Footer";
import ComponentsGallery from "@/components/gallery/ComponentsGallery";
import GooeyNavbar from "@/components/GooeyNavbar";
import { uiComponents } from "@/lib/components";
import { fetchStarCount } from "@/lib/github";
import { SITE_KEYWORDS, componentsJsonLd } from "@/lib/seo";

export const dynamic = "force-static";
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Components | Oxygen-UI",
  description:
    "Browse Oxygen UI components: open-source React components and frontend primitives for Solana dApps built with Tailwind CSS and Motion. Install any of them with the shadcn CLI.",
  keywords: SITE_KEYWORDS,
  alternates: {
    canonical: "/components",
  },
};

export default async function ComponentsIndexPage() {
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
            Registry
          </span>
          <h1 className="mt-1 font-runde text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl">
            {uiComponents.length}+ Solana UI components and primitives
          </h1>
          <p className="mt-2 max-w-lg text-xs sm:text-sm font-medium text-muted-foreground leading-relaxed">
            Reusable building blocks for buttons, inputs, indicators, avatars, badges, and interface controls. Filter by name or category below.
          </p>
        </header>

        <ComponentsGallery items={uiComponents} />
      </main>

      <Footer />
    </>
  );
}


