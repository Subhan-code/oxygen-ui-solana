import type { Metadata } from "next";
import Footer from "@/components/Footer";
import ComponentCard from "@/components/gallery/ComponentCard";
import GooeyNavbar from "@/components/GooeyNavbar";
import { components } from "@/lib/components";
import { fetchStarCount } from "@/lib/github";
import { SITE_KEYWORDS } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Components",
  description:
    "Browse every Rare UI component in action, then install any of them with the shadcn CLI.",
  keywords: SITE_KEYWORDS,
  alternates: {
    canonical: "/components",
  },
};

export default async function ComponentsIndexPage() {
  const stars = await fetchStarCount();

  return (
    <>
      <GooeyNavbar stars={stars} />

      <main className="mx-auto w-full max-w-6xl flex-1 px-5 pb-16 pt-32 sm:px-6 md:pt-40">
        <header className="flex flex-col items-center gap-3 text-center">
          <h1 className="max-w-2xl text-balance font-runde text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
            {components.length}+ rare and unique components
          </h1>
          <p className="max-w-lg text-balance text-sm font-medium text-muted-foreground sm:text-base">
            Every component is a single file you own, not a dependency you
            install. Add any of them with the shadcn CLI.
          </p>
        </header>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {components.map((item) => (
            <ComponentCard key={item.href} item={item} />
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
}
