import type { Metadata } from "next";
import Link from "next/link";
import GooeyNavbar from "@/components/GooeyNavbar";
import Footer from "@/components/Footer";
import { fetchStarCount } from "@/lib/github";

export const metadata: Metadata = {
  title: "404 — Page Not Found | Oxygen UI",
  description: "Bruh, you're looking for something that doesn't exist.",
};

export default async function NotFound() {
  const stars = await fetchStarCount();

  return (
    <>
      <GooeyNavbar stars={stars} />

      <main className="flex min-h-[calc(100vh-140px)] w-full flex-col items-center justify-center px-4 pt-24 pb-16 text-center">
        <div className="relative mx-auto flex max-w-md flex-col items-center">
          {/* 404 Visual */}
          <div className="relative mb-4 flex items-center justify-center">
            <span className="font-mono text-7xl sm:text-8xl font-black tracking-tighter text-zinc-200 dark:text-zinc-800/90 select-none">
              404
            </span>
            <span className="absolute font-mono text-xs font-semibold uppercase tracking-widest text-[#0066FF] dark:text-[#0A84FF]">
              Lost in blocks
            </span>
          </div>

          <h1 className="font-runde text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Bruh, you&apos;re looking for something that doesn&apos;t exist.
          </h1>

          <p className="mt-2 text-sm text-muted-foreground max-w-sm">
            The page you requested was moved, deleted, or never existed on the Solana ledger.
          </p>

          {/* Action links */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-xl bg-zinc-900 px-4 py-2.5 text-xs font-semibold text-white shadow-xs transition-all hover:bg-black active:scale-95 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
            >
              Go back home
            </Link>

            <Link
              href="/components"
              className="inline-flex items-center justify-center rounded-xl border border-black/10 dark:border-white/10 bg-zinc-100/80 dark:bg-zinc-900/80 px-4 py-2.5 text-xs font-semibold text-foreground transition-all hover:border-black/20 dark:hover:border-white/20 active:scale-95"
            >
              Browse 56+ components
            </Link>
          </div>

          {/* Quick links footer */}
          <div className="mt-10 pt-8 border-t border-black/5 dark:border-white/10 w-full flex items-center justify-center gap-6 text-xs text-muted-foreground">
            <Link href="/blocks" className="hover:text-foreground transition-colors">
              Blocks
            </Link>
            <span className="text-zinc-300 dark:text-zinc-700">•</span>
            <Link href="/docs/installation" className="hover:text-foreground transition-colors">
              Docs &amp; Setup
            </Link>
            <span className="text-zinc-300 dark:text-zinc-700">•</span>
            <a
              href="https://github.com/Subhan-code/oxygen-ui-solana"
              target="_blank"
              rel="noreferrer"
              className="hover:text-foreground transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
