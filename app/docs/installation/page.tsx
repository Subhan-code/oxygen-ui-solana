import type { Metadata } from "next";
import Footer from "@/components/Footer";
import GooeyNavbar from "@/components/GooeyNavbar";
import { fetchStarCount } from "@/lib/github";
import CopyButton from "@/components/CopyButton";

export const dynamic = "force-static";
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Installation & Integration Guide",
  description:
    "Learn how to set up Oxygen UI in your Next.js, Vite, or React Solana project using the shadcn CLI.",
  alternates: {
    canonical: "/docs/installation",
  },
  openGraph: {
    title: "Installation & Integration Guide — Oxygen UI",
    description:
      "Learn how to set up Oxygen UI in your Next.js, Vite, or React Solana project using the shadcn CLI.",
    url: "/docs/installation",
    images: ["/ogimage.webp"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Installation & Integration Guide — Oxygen UI",
    description:
      "Learn how to set up Oxygen UI in your Next.js, Vite, or React Solana project using the shadcn CLI.",
    images: ["/ogimage.webp"],
  },
};

export default async function InstallationPage() {
  const stars = await fetchStarCount();

  return (
    <>
      <GooeyNavbar stars={stars} />

      <main className="mx-auto w-full max-w-4xl flex-1 px-5 pb-24 pt-32 sm:px-6 md:pt-40">
        <header className="flex flex-col gap-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-400 w-fit">
            Documentation &amp; Setup Guide
          </div>
          <h1 className="font-runde text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Installation &amp; Integration Guide
          </h1>
          <p className="text-base text-muted-foreground sm:text-lg">
            Complete walkthrough for integrating Oxygen UI components into your Solana React application.
          </p>
        </header>

        <hr className="my-8 border-neutral-800" />

        {/* Quickstart via Shadcn */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold font-runde">1. Quickstart (shadcn CLI)</h2>
          <p className="text-sm text-muted-foreground">
            Oxygen UI components are distributed via the official shadcn CLI registry. You can add any component directly into your codebase with a single command:
          </p>
          <div className="relative rounded-xl border border-neutral-800 bg-neutral-900 p-4 font-mono text-sm">
            <div className="flex items-center justify-between text-neutral-300">
              <code>npx shadcn add oxygen/solana-swap-card</code>
              <CopyButton value="npx shadcn add oxygen/solana-swap-card" />
            </div>
          </div>
        </section>

        {/* Framework Setup */}
        <section className="mt-12 space-y-6">
          <h2 className="text-2xl font-bold font-runde">2. Framework Setup</h2>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-blue-400">A. Next.js (App Router)</h3>
            <p className="text-sm text-muted-foreground">
              Create a Next.js project with Tailwind CSS and TypeScript:
            </p>
            <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-4 font-mono text-sm">
              <code>npx create-next-app@latest my-solana-app --typescript --tailwind --eslint</code>
            </div>
            <p className="text-sm text-muted-foreground">
              Initialize shadcn UI in your project:
            </p>
            <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-4 font-mono text-sm">
              <code>npx shadcn@latest init</code>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-purple-400">B. Vite + React</h3>
            <p className="text-sm text-muted-foreground">
              Initialize a React project using Vite:
            </p>
            <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-4 font-mono text-sm">
              <code>npm create vite@latest my-solana-dapp -- --template react-ts</code>
            </div>
          </div>
        </section>

        {/* Solana Wallet Adapter Integration */}
        <section className="mt-12 space-y-4">
          <h2 className="text-2xl font-bold font-runde">3. Solana Wallet Adapter Setup</h2>
          <p className="text-sm text-muted-foreground">
            Oxygen UI primitives seamlessly pair with `@solana/wallet-adapter-react` and `@solana/web3.js`:
          </p>
          <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-4 font-mono text-sm text-neutral-300">
            <code>npm install @solana/web3.js @solana/wallet-adapter-react @solana/wallet-adapter-react-ui @solana/wallet-adapter-wallets</code>
          </div>
        </section>

        {/* Community & Feedback */}
        <section className="mt-12 rounded-2xl border border-blue-500/20 bg-blue-500/5 p-6">
          <h3 className="text-xl font-bold font-runde text-blue-400">Community &amp; Feedback</h3>
          <p className="mt-2 text-sm text-neutral-300">
            Found a bug or need a specific Solana primitive? Oxygen UI is driven by community feedback. Check out our{" "}
            <a href="https://github.com/Subhan-code/oxygen-ui-solana/blob/main/FEEDBACK.md" target="_blank" rel="noreferrer" className="underline font-semibold text-white">
              Feedback &amp; Contribution Guidelines
            </a>{" "}
            or open an issue on GitHub.
          </p>
        </section>
      </main>

      <Footer />
    </>
  );
}
