import type { Metadata } from "next";
import Footer from "@/components/Footer";
import GooeyNavbar from "@/components/GooeyNavbar";
import { fetchStarCount } from "@/lib/github";
import CopyButton from "@/components/CopyButton";

export const dynamic = "force-static";
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Installation — Oxygen UI",
  description:
    "Add production-grade Solana React components to your project using the shadcn CLI.",
  alternates: {
    canonical: "/docs/installation",
  },
};

export default async function InstallationPage() {
  const stars = await fetchStarCount();

  return (
    <>
      <GooeyNavbar stars={stars} />

      <main className="mx-auto w-full max-w-3xl flex-1 px-5 pb-24 pt-28 sm:px-6 md:pt-36">
        <header className="flex flex-col gap-2">
          <h1 className="font-runde text-3xl font-bold tracking-tight sm:text-4xl text-foreground">
            Installation
          </h1>
          <p className="text-sm text-muted-foreground sm:text-base">
            Add production-ready Solana primitives directly to your codebase. You own the code.
          </p>
        </header>

        <div className="mt-8 space-y-10">
          {/* CLI Install */}
          <section className="space-y-3">
            <h2 className="font-runde text-base font-semibold text-foreground">
              1. Add via shadcn CLI
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Install any Oxygen component directly into your project:
            </p>
            <div className="relative rounded-2xl border border-black/10 dark:border-white/10 bg-zinc-100/70 dark:bg-zinc-900/60 p-4 font-mono text-xs sm:text-sm">
              <div className="flex items-center justify-between gap-2 text-foreground">
                <code className="overflow-x-auto">npx shadcn add oxygen/solana-swap-card</code>
                <CopyButton value="npx shadcn add oxygen/solana-swap-card" />
              </div>
            </div>
          </section>

          {/* Solana Peer Dependencies */}
          <section className="space-y-3">
            <h2 className="font-runde text-base font-semibold text-foreground">
              2. Peer Dependencies
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Ensure you have the standard Solana wallet and web3 libraries installed:
            </p>
            <div className="relative rounded-2xl border border-black/10 dark:border-white/10 bg-zinc-100/70 dark:bg-zinc-900/60 p-4 font-mono text-xs sm:text-sm">
              <div className="flex items-center justify-between gap-2 text-foreground">
                <code className="overflow-x-auto">npm i @solana/web3.js @solana/wallet-adapter-react @solana/wallet-adapter-react-ui</code>
                <CopyButton value="npm i @solana/web3.js @solana/wallet-adapter-react @solana/wallet-adapter-react-ui" />
              </div>
            </div>
          </section>

          {/* Integration */}
          <section className="space-y-3">
            <h2 className="font-runde text-base font-semibold text-foreground">
              3. Import &amp; Render
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Once added, import the component directly from your local components directory:
            </p>
            <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-zinc-100/70 dark:bg-zinc-900/60 p-4 font-mono text-xs text-muted-foreground">
              <pre className="overflow-x-auto text-foreground">
                <code>{`import { SolanaSwapCard } from "@/components/oxygen/solana-swap-card";

export default function Swap() {
  return <SolanaSwapCard />;
}`}</code>
              </pre>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
