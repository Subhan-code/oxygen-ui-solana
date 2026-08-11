import type { Metadata } from "next";
import GooeyNavbar from "@/components/GooeyNavbar";
import Footer from "@/components/Footer";
import TransitionsShowcase from "@/components/transitions/TransitionsShowcase";
import { fetchStarCount } from "@/lib/github";
import { SITE_KEYWORDS } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Transitions.dev — CSS & Motion Collection",
  description:
    "Explore 27 essential CSS transitions from transitions.dev. Interactive microinteractions, surfaces, form feedback, and loading states.",
  keywords: [...SITE_KEYWORDS, "transitions.dev", "CSS transitions", "motion tokens"],
  alternates: {
    canonical: "/transitions",
  },
};

export default async function TransitionsPage() {
  const stars = await fetchStarCount();

  return (
    <>
      <GooeyNavbar stars={stars} />

      <main className="mx-auto w-full max-w-6xl flex-1 px-5 pb-16 pt-32 sm:px-6 md:pt-40">
        <header className="mb-10 flex flex-col items-center gap-3 text-center">
          <span className="rounded-full border border-border bg-muted/60 px-3 py-1 text-xs font-medium text-foreground">
            Cloned from transitions.dev
          </span>
          <h1 className="max-w-2xl text-balance font-runde text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Essential Transitions Collection
          </h1>
          <p className="max-w-lg text-balance text-sm font-medium text-muted-foreground sm:text-base">
            Twenty-seven production-ready CSS & Motion transitions with tunable motion tokens. Click any card to interact or copy its self-contained CSS snippet.
          </p>
        </header>

        <TransitionsShowcase />
      </main>

      <Footer />
    </>
  );
}
