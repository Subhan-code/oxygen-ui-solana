"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import {
  ChevronLeft,
  ChevronRight,
  Copy,
  Check,
  Eye,
  Code2,
  Search,
  X,
} from "lucide-react";
import type { RegistryItem } from "@/lib/registry";
import { DemoRenderer } from "@/components/DemoRenderer";
import ThemeToggle from "@/components/ThemeToggle";
import { cn } from "@/lib/utils";

type TabView = "preview" | "code";

const GITHUB_URL = "https://github.com/Subhan-code/oxygen-ui-solana";

const GithubIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.75 2.69 1.25 3.35.95.1-.74.4-1.25.72-1.53-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11.04 11.04 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.42-2.7 5.39-5.26 5.68.41.35.77 1.05.77 2.12 0 1.53-.01 2.76-.01 3.14 0 .3.2.66.8.55A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
  </svg>
);

interface ComponentStudioProps {
  item: RegistryItem;
  allComponents: RegistryItem[];
}

export default function ComponentStudio({
  item,
  allComponents,
}: ComponentStudioProps) {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<TabView>("preview");
  const [copiedCli, setCopiedCli] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [sourceData, setSourceData] = useState<{ slug: string; code: string } | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchFilter, setSearchFilter] = useState("");

  const currentSourceCode = sourceData?.slug === item.slug ? sourceData.code : null;
  const loadingSource = activeTab === "code" && sourceData?.slug !== item.slug;

  const currentIndex = useMemo(() => {
    return allComponents.findIndex((c) => c.slug === item.slug);
  }, [allComponents, item.slug]);

  const prevComponent = useMemo(() => {
    if (currentIndex <= 0) return allComponents[allComponents.length - 1];
    return allComponents[currentIndex - 1];
  }, [allComponents, currentIndex]);

  const nextComponent = useMemo(() => {
    if (currentIndex === -1 || currentIndex >= allComponents.length - 1) {
      return allComponents[0];
    }
    return allComponents[currentIndex + 1];
  }, [allComponents, currentIndex]);

  useEffect(() => {
    let cancelled = false;
    if (activeTab === "code" && sourceData?.slug !== item.slug) {
      fetch(`/api/source?slug=${item.slug}&file=${encodeURIComponent(item.file || "")}`)
        .then((res) => (res.ok ? res.text() : "// Source unavailable"))
        .then((code) => {
          if (!cancelled) {
            setSourceData({ slug: item.slug, code });
          }
        })
        .catch(() => {
          if (!cancelled) {
            setSourceData({ slug: item.slug, code: "// Failed to load source code" });
          }
        });
    }
    return () => {
      cancelled = true;
    };
  }, [activeTab, item.slug, item.file, sourceData?.slug]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      if (e.key === "ArrowLeft" && (e.metaKey || e.altKey)) {
        e.preventDefault();
        if (prevComponent) router.push(prevComponent.href);
      } else if (e.key === "ArrowRight" && (e.metaKey || e.altKey)) {
        e.preventDefault();
        if (nextComponent) router.push(nextComponent.href);
      } else if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setSidebarOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [prevComponent, nextComponent, router]);

  const cliCommand = `npx shadcn@latest add ${item.slug}`;

  const handleCopyCli = useCallback(() => {
    navigator.clipboard.writeText(cliCommand);
    setCopiedCli(true);
    setTimeout(() => setCopiedCli(false), 2000);
  }, [cliCommand]);

  const handleCopyCode = useCallback(() => {
    if (!currentSourceCode) return;
    navigator.clipboard.writeText(currentSourceCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  }, [currentSourceCode]);

  const filteredQuickList = useMemo(() => {
    const q = searchFilter.toLowerCase().trim();
    if (!q) return allComponents;
    return allComponents.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.title.toLowerCase().includes(q) ||
        c.slug.toLowerCase().includes(q) ||
        (c.group && c.group.toLowerCase().includes(q))
    );
  }, [allComponents, searchFilter]);

  return (
    <div className="flex h-screen w-full flex-col bg-zinc-950 text-zinc-100 overflow-hidden select-none" suppressHydrationWarning>
      {/* minimal studio navbar with full navigation menu */}
      <header className="h-14 w-full shrink-0 border-b border-white/10 bg-zinc-950/80 backdrop-blur-xl px-3 sm:px-5 flex items-center justify-between gap-3 z-30">
        {/* left: logo, nav links, component selector */}
        <div className="flex items-center gap-2 sm:gap-4 min-w-0">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-semibold text-white hover:opacity-85 transition-opacity shrink-0 font-runde"
          >
            <Image src="/logos/Oxygenui.svg" alt="" width={20} height={20} className="size-5 shrink-0" />
            <span className="hidden sm:inline">Oxygen-UI</span>
          </Link>

          <span className="h-4 w-px bg-white/10 shrink-0" />

          {/* navigation menu */}
          <nav className="flex items-center gap-1">
            <Link
              href="/components"
              className="px-2 sm:px-2.5 py-1 rounded-lg text-xs font-medium text-white bg-white/10 transition-colors"
            >
              Components
            </Link>
            <Link
              href="/blocks"
              className="px-2 sm:px-2.5 py-1 rounded-lg text-xs font-medium text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
            >
              Blocks
            </Link>
          </nav>

          <span className="hidden sm:inline-block h-4 w-px bg-white/10 shrink-0" />

          {/* component switcher trigger */}
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium transition-colors truncate max-w-[130px] sm:max-w-[200px] cursor-pointer group"
            aria-label="Open component switcher"
          >
            <span className="font-medium text-zinc-200 group-hover:text-white truncate font-runde">
              {item.title || item.name}
            </span>
            <kbd className="hidden sm:inline-block text-[10px] font-mono text-zinc-500 bg-white/5 px-1.5 py-0.5 rounded border border-white/5">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* center: minimal preview / code segmented pill */}
        <div className="flex items-center bg-zinc-900/90 p-0.5 rounded-xl border border-white/10 text-xs font-medium">
          <button
            type="button"
            onClick={() => setActiveTab("preview")}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1 rounded-lg transition-colors cursor-pointer",
              activeTab === "preview" ? "bg-white/15 text-white shadow-xs" : "text-zinc-400 hover:text-zinc-200"
            )}
          >
            <Eye className="size-3.5" />
            <span>Preview</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("code")}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1 rounded-lg transition-colors cursor-pointer",
              activeTab === "code" ? "bg-white/15 text-white shadow-xs" : "text-zinc-400 hover:text-zinc-200"
            )}
          >
            <Code2 className="size-3.5" />
            <span>Code</span>
          </button>
        </div>

        {/* right: copy cli, prev/next steppers, github, theme */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopyCli}
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-zinc-300 hover:text-white transition-colors cursor-pointer font-mono"
            aria-label="Copy CLI command"
          >
            {copiedCli ? (
              <>
                <Check className="size-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied</span>
              </>
            ) : (
              <>
                <Copy className="size-3.5 text-zinc-400" />
                <span>CLI</span>
              </>
            )}
          </button>

          {/* prev / next */}
          <div className="flex items-center bg-zinc-900/80 p-0.5 rounded-lg border border-white/10">
            <Link
              href={prevComponent.href}
              aria-label={`Previous component: ${prevComponent.name}`}
              className="p-1.5 rounded-md text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <ChevronLeft className="size-3.5" />
            </Link>
            <Link
              href={nextComponent.href}
              aria-label={`Next component: ${nextComponent.name}`}
              className="p-1.5 rounded-md text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <ChevronRight className="size-3.5" />
            </Link>
          </div>

          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Repository"
            className="hidden sm:flex p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 border border-transparent hover:border-white/10 transition-colors"
          >
            <GithubIcon className="size-4" />
          </a>

          <ThemeToggle className="rounded-lg p-1.5 bg-zinc-900/80 border border-white/10 text-zinc-400 hover:text-white" />
        </div>
      </header>

      {/* studio stage content */}
      <main className="relative flex-1 w-full overflow-hidden flex flex-col" suppressHydrationWarning>
        {activeTab === "preview" && (
          <div
            className="relative flex-1 w-full flex items-center justify-center overflow-auto p-4 sm:p-8 bg-zinc-950 bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:20px_20px]"
            suppressHydrationWarning
          >
            <div className="w-full max-w-4xl flex items-center justify-center">
              <DemoRenderer slug={item.slug} />
            </div>
          </div>
        )}

        {activeTab === "code" && (
          <div className="relative flex-1 w-full overflow-hidden flex flex-col bg-zinc-950 p-4 sm:p-8">
            <div className="mx-auto w-full max-w-4xl flex-1 flex flex-col rounded-2xl border border-white/10 bg-zinc-900/60 overflow-hidden shadow-2xl">
              {/* code header */}
              <div className="h-12 shrink-0 border-b border-white/10 bg-zinc-950/80 px-4 flex items-center justify-between text-xs gap-3">
                <span className="font-mono text-zinc-400 truncate">
                  components/ui/{item.file ? item.file.replace(/^components\/ui\//, "") : `${item.slug}.tsx`}
                </span>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={handleCopyCli}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/10 text-xs font-mono transition-colors cursor-pointer"
                  >
                    {copiedCli ? (
                      <>
                        <Check className="size-3 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="size-3" />
                        <span>Copy CLI</span>
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={handleCopyCode}
                    disabled={!currentSourceCode}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-zinc-100 hover:text-white transition-colors cursor-pointer text-xs font-medium"
                  >
                    {copiedCode ? (
                      <>
                        <Check className="size-3 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="size-3" />
                        <span>Copy Code</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* code body */}
              <div className="flex-1 overflow-auto p-4 sm:p-6 font-mono text-xs text-zinc-200 leading-relaxed selection:bg-sky-500/30">
                {loadingSource ? (
                  <div className="flex items-center justify-center h-48 gap-2 text-zinc-400">
                    <span className="size-3 rounded-full border-2 border-sky-400 border-t-transparent animate-spin" />
                    <span>Loading source code...</span>
                  </div>
                ) : (
                  <pre className="tab-4 whitespace-pre font-mono">
                    <code>{currentSourceCode || "// Source code not found"}</code>
                  </pre>
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* quick-switcher drawer */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-xs z-50"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 350, damping: 35 }}
              className="fixed inset-y-0 left-0 w-80 sm:w-96 bg-zinc-950 border-r border-white/10 z-50 flex flex-col shadow-2xl"
            >
              {/* drawer header */}
              <div className="h-14 shrink-0 border-b border-white/10 px-4 flex items-center justify-between">
                <span className="font-semibold text-sm text-white font-runde">
                  Components Library
                </span>
                <button
                  type="button"
                  onClick={() => setSidebarOpen(false)}
                  className="p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X className="size-4" />
                </button>
              </div>

              {/* search input */}
              <div className="p-3 border-b border-white/10">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-zinc-500" />
                  <input
                    type="text"
                    placeholder="Search all components..."
                    value={searchFilter}
                    onChange={(e) => setSearchFilter(e.target.value)}
                    className="w-full h-9 pl-9 pr-3 rounded-xl bg-zinc-900 border border-white/10 text-xs text-zinc-200 placeholder:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-sky-500/50"
                  />
                </div>
              </div>

              {/* components list */}
              <div className="flex-1 overflow-y-auto p-2 space-y-1">
                {filteredQuickList.map((comp) => {
                  const isCurrent = comp.slug === item.slug;
                  return (
                    <Link
                      key={comp.slug}
                      href={comp.href}
                      onClick={() => setSidebarOpen(false)}
                      className={cn(
                        "flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-colors",
                        isCurrent
                          ? "bg-white/15 text-white font-semibold"
                          : "text-zinc-400 hover:text-zinc-200 hover:bg-white/5"
                      )}
                    >
                      <span className="truncate">{comp.title || comp.name}</span>
                      <span className="text-[10px] font-mono text-zinc-500">
                        {comp.group || "UI"}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
