"use client";

import React, { useState, useCallback, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import {
  ChevronLeft,
  ChevronRight,
  Copy,
  Check,
  X,
  PanelLeft,
} from "lucide-react";
import type { ComponentDoc } from "@/lib/component-docs";
import { getNextComponentDoc, getPrevComponentDoc } from "@/lib/component-docs";
import { DemoRenderer } from "@/components/DemoRenderer";
import GooeyNavbar from "@/components/GooeyNavbar";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";

type TabView = "preview" | "code";

const CATEGORY_ORDER: ComponentDoc["category"][] = [
  "Wallet & identity",
  "Tokens & trading",
  "Pools & finance",
  "Status & motion",
  "Controls",
  "Layout & brand",
];

export interface ComponentStudioProps {
  doc: ComponentDoc;
  allDocs: ComponentDoc[];
}

export default function ComponentStudio({ doc, allDocs }: ComponentStudioProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const tabParam = searchParams ? searchParams.get("tab") : null;
  const [activeTabOverride, setActiveTabOverride] = useState<TabView | null>(null);
  const activeTab: TabView =
    activeTabOverride ?? (tabParam === "code" ? "code" : "preview");

  const [copiedCode, setCopiedCode] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [searchFilter, setSearchFilter] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleTabChange = useCallback(
    (tab: TabView) => {
      setActiveTabOverride(tab);
      const url = new URL(window.location.href);
      if (tab === "code") {
        url.searchParams.set("tab", "code");
      } else {
        url.searchParams.delete("tab");
      }
      window.history.replaceState({}, "", url.toString());
    },
    []
  );

  const prevDoc = useMemo(() => getPrevComponentDoc(doc.slug), [doc.slug]);
  const nextDoc = useMemo(() => getNextComponentDoc(doc.slug), [doc.slug]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }
      if (e.key === "ArrowLeft" && (e.metaKey || e.altKey)) {
        e.preventDefault();
        router.push(`/components/${prevDoc.slug}`);
      } else if (e.key === "ArrowRight" && (e.metaKey || e.altKey)) {
        e.preventDefault();
        router.push(`/components/${nextDoc.slug}`);
      } else if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [prevDoc.slug, nextDoc.slug, router]);

  const handleCopyCode = useCallback(() => {
    navigator.clipboard.writeText(doc.code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  }, [doc.code]);

  const filteredDocs = useMemo(() => {
    const q = searchFilter.toLowerCase().trim();
    if (!q) return allDocs;
    return allDocs.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.slug.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q)
    );
  }, [allDocs, searchFilter]);

  const categorizedDocs = useMemo(() => {
    const groups: Record<string, ComponentDoc[]> = {};
    for (const cat of CATEGORY_ORDER) {
      groups[cat] = [];
    }
    for (const item of filteredDocs) {
      if (!groups[item.category]) {
        groups[item.category] = [];
      }
      groups[item.category].push(item);
    }
    return groups;
  }, [filteredDocs]);

  return (
    <div
      className="min-h-screen w-full flex flex-col bg-zinc-950 text-zinc-100 select-none font-runde"
      suppressHydrationWarning
    >
      {/* Floating Website Navbar */}
      <GooeyNavbar />

      {/* Main Container with Open Left Sidebar & Studio Content */}
      <div className="mx-auto w-full max-w-7xl flex flex-1 px-4 sm:px-6 pt-28 sm:pt-32 pb-20">
        {/* Minimal, Spaced Aesthetic Left Sidebar (Desktop) */}
        <aside className="hidden lg:flex w-64 xl:w-72 shrink-0 border-r border-white/5 pr-6 mr-8 flex-col sticky top-28 h-[calc(100vh-8rem)]">
          {/* Minimal Search Input */}
          <div className="relative mb-6 shrink-0">
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search components..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="w-full h-9 px-3.5 pr-14 rounded-xl bg-white/[0.04] hover:bg-white/[0.06] text-xs text-zinc-200 placeholder:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-sky-500/40 transition-colors"
            />
            {searchFilter ? (
              <button
                type="button"
                onClick={() => setSearchFilter("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors"
              >
                <X className="size-3" />
              </button>
            ) : (
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 pointer-events-none opacity-40">
                <kbd className="text-[10px] font-mono">⌘K</kbd>
              </div>
            )}
          </div>

          {/* Grouped Component List with Generous Aesthetic Spacing */}
          <div className="flex-1 overflow-y-auto space-y-6 pr-2 scrollbar-thin scrollbar-thumb-white/10">
            {CATEGORY_ORDER.map((category) => {
              const items = categorizedDocs[category] || [];
              if (items.length === 0) return null;

              return (
                <div key={category} className="flex flex-col gap-1.5">
                  <div className="px-3 text-[11px] font-medium uppercase tracking-wider text-zinc-500">
                    {category}
                  </div>

                  <div className="flex flex-col gap-0.5">
                    {items.map((item) => {
                      const isCurrent = item.slug === doc.slug;
                      return (
                        <Link
                          key={item.slug}
                          href={`/components/${item.slug}`}
                          className={cn(
                            "flex items-center justify-between px-3 py-1.5 rounded-lg text-xs transition-colors",
                            isCurrent
                              ? "bg-white/10 text-white font-medium"
                              : "text-zinc-400 hover:text-zinc-200 hover:bg-white/5"
                          )}
                        >
                          <span className="truncate">{item.title}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            })}

            {/* Clean, Icon-free Navigation Footer */}
            <div className="pt-5 mt-6 border-t border-white/5 flex flex-col gap-2">
              <div className="px-3 text-[11px] font-medium uppercase tracking-wider text-zinc-500">
                Explore
              </div>
              <div className="flex flex-col gap-0.5">
                <Link
                  href="/sol"
                  className="px-3 py-1.5 rounded-lg text-xs text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
                >
                  Solana Components
                </Link>
                <Link
                  href="/docs/installation"
                  className="px-3 py-1.5 rounded-lg text-xs text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
                >
                  Documentation
                </Link>
              </div>
            </div>
          </div>
        </aside>

        {/* Right Main Column */}
        <main className="flex-1 min-w-0 max-w-4xl flex flex-col gap-6">
          {/* Minimal aesthetic top breadcrumbs */}
          <div className="flex items-center justify-between text-xs pb-1">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setMobileSidebarOpen(true)}
                className="lg:hidden p-1.5 -ml-1 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
                aria-label="Toggle components sidebar"
              >
                <PanelLeft className="size-4" />
              </button>
              <Link
                href="/sol"
                className="text-zinc-500 hover:text-zinc-300 transition-colors font-medium"
              >
                Catalog
              </Link>
              <span className="text-zinc-600">/</span>
              <span className="text-zinc-400 font-medium">
                {doc.category}
              </span>
              <span className="text-zinc-600">/</span>
              <span className="text-zinc-200 font-medium">
                {doc.title}
              </span>
            </div>

            <div className="flex items-center gap-1 text-zinc-400">
              <Link
                href={`/components/${prevDoc.slug}`}
                aria-label={`Previous component: ${prevDoc.title}`}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg hover:text-white hover:bg-white/5 transition-colors text-xs"
                title={`Previous: ${prevDoc.title}`}
              >
                <ChevronLeft className="size-3.5" />
                <span className="hidden sm:inline">Prev</span>
              </Link>
              <Link
                href={`/components/${nextDoc.slug}`}
                aria-label={`Next component: ${nextDoc.title}`}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg hover:text-white hover:bg-white/5 transition-colors text-xs"
                title={`Next: ${nextDoc.title}`}
              >
                <span className="hidden sm:inline">Next</span>
                <ChevronRight className="size-3.5" />
              </Link>
            </div>
          </div>

          {/* Title & Description */}
          <div className="flex flex-col gap-2 pt-1">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              {doc.title}
            </h1>
            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-2xl">
              {doc.description}
            </p>
          </div>

          {/* Tab Controls Bar (Preview | Code) with folder tab style */}
          <div className="flex items-end justify-between border-b border-white/[0.08] pt-2">
            <div className="flex items-end gap-1.5 -mb-px">
              <button
                type="button"
                onClick={() => handleTabChange("preview")}
                className={cn(
                  "relative flex flex-col items-center justify-center px-6 pt-3 pb-2 rounded-t-[20px] transition-all cursor-pointer font-runde text-[13px] tracking-tight outline-none focus-visible:ring-2 focus-visible:ring-sky-500/40",
                  activeTab === "preview"
                    ? "bg-card text-card-foreground font-bold border-t border-x border-border/50 shadow-sm z-10"
                    : "bg-white/[0.03] hover:bg-white/[0.06] text-zinc-400 hover:text-zinc-200 border-t border-x border-transparent font-medium"
                )}
              >
                <span>Preview</span>
                <span
                  className={cn(
                    "mt-1.5 h-[2.5px] w-6 rounded-full transition-all duration-180",
                    activeTab === "preview"
                      ? "bg-current shadow-xs"
                      : "opacity-0"
                  )}
                  aria-hidden="true"
                />
              </button>

              <button
                type="button"
                onClick={() => handleTabChange("code")}
                className={cn(
                  "relative flex flex-col items-center justify-center px-6 pt-3 pb-2 rounded-t-[20px] transition-all cursor-pointer font-runde text-[13px] tracking-tight outline-none focus-visible:ring-2 focus-visible:ring-sky-500/40",
                  activeTab === "code"
                    ? "bg-zinc-950/90 text-white font-bold border-t border-x border-white/[0.08] shadow-sm z-10"
                    : "bg-white/[0.03] hover:bg-white/[0.06] text-zinc-400 hover:text-zinc-200 border-t border-x border-transparent font-medium"
                )}
              >
                <span>Code</span>
                <span
                  className={cn(
                    "mt-1.5 h-[2.5px] w-6 rounded-full transition-all duration-180",
                    activeTab === "code"
                      ? "bg-white dark:bg-zinc-100 shadow-[0_1px_4px_rgba(255,255,255,0.35)]"
                      : "opacity-0"
                  )}
                  aria-hidden="true"
                />
              </button>
            </div>
          </div>

          {/* Tab Panel Content: Connected Container */}
          {activeTab === "preview" && (
            <div className="relative w-full rounded-b-[28px] rounded-tr-[28px] border border-border/50 bg-card p-6 sm:p-10 flex items-center justify-center min-h-[460px] overflow-hidden shadow-sm text-card-foreground">
              <div className="w-full flex items-center justify-center">
                <DemoRenderer slug={doc.slug} />
              </div>
            </div>
          )}

          {activeTab === "code" && (
            <div className="relative w-full rounded-b-[28px] rounded-tr-[28px] border border-white/[0.08] bg-zinc-950/90 overflow-hidden shadow-2xl backdrop-blur-xl flex flex-col">
              <div className="h-10 px-4 border-b border-white/[0.08] bg-white/[0.03] flex items-center justify-between text-xs">
                <span className="font-mono text-zinc-400 text-[11px]">Usage</span>
                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/10 text-[11px] font-mono transition-colors cursor-pointer"
                >
                  {copiedCode ? (
                    <>
                      <Check className="size-3 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="size-3 text-zinc-400" />
                      <span>Copy Code</span>
                    </>
                  )}
                </button>
              </div>

              <pre className="p-4 sm:p-6 overflow-x-auto text-xs font-mono text-zinc-200 leading-relaxed selection:bg-sky-500/30">
                <code>{doc.code}</code>
              </pre>
            </div>
          )}

          {/* Features / Props Section with Open Runde Font */}
          <div className="flex flex-col gap-3 pt-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold tracking-tight text-white font-runde">
                Props
              </h2>
              <span className="text-xs font-mono text-zinc-500">
                [{doc.props.length} props]
              </span>
            </div>

            <div className="w-full overflow-hidden rounded-[24px] border border-white/[0.08] bg-zinc-950/80 backdrop-blur-xl shadow-xl overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse font-runde">
                <thead>
                  <tr className="border-b border-white/[0.08] bg-white/[0.03] text-[12px] font-semibold text-zinc-300">
                    <th className="py-3.5 px-4">Prop</th>
                    <th className="py-3.5 px-4">Type</th>
                    <th className="py-3.5 px-4">Default</th>
                    <th className="py-3.5 px-4">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.05]">
                  {doc.props.map((p) => (
                    <tr
                      key={p.name}
                      className="hover:bg-white/[0.02] transition-colors"
                    >
                      <td className="py-3.5 px-4 font-medium text-sky-400 whitespace-nowrap text-xs">
                        {p.name}
                      </td>
                      <td className="py-3.5 px-4 font-mono text-zinc-300 max-w-xs break-words text-[11px]">
                        <span className="px-1.5 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.06]">
                          {p.type}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-mono text-zinc-400 whitespace-nowrap text-[11px]">
                        {p.default ?? "—"}
                      </td>
                      <td className="py-3.5 px-4 text-zinc-300 leading-relaxed text-xs">
                        {p.description}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {/* Mobile Sidebar Sheet / Drawer */}
      <AnimatePresence>
        {mobileSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileSidebarOpen(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-xs z-50 lg:hidden"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 350, damping: 35 }}
              className="fixed inset-y-0 left-0 w-80 bg-zinc-950 border-r border-white/10 z-50 flex flex-col shadow-2xl lg:hidden"
            >
              <div className="h-14 shrink-0 border-b border-white/10 px-4 flex items-center justify-between">
                <span className="font-semibold text-sm text-white">
                  Components
                </span>
                <button
                  type="button"
                  onClick={() => setMobileSidebarOpen(false)}
                  className="p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X className="size-4" />
                </button>
              </div>

              <div className="p-3 border-b border-white/10">
                <input
                  type="text"
                  placeholder="Search components..."
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  className="w-full h-9 px-3 rounded-xl bg-zinc-900 border border-white/10 text-xs text-zinc-200 placeholder:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-sky-500/50"
                />
              </div>

              <div className="flex-1 overflow-y-auto p-3 space-y-4">
                {CATEGORY_ORDER.map((category) => {
                  const items = categorizedDocs[category] || [];
                  if (items.length === 0) return null;

                  return (
                    <div key={category} className="flex flex-col gap-1">
                      <div className="px-2 text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
                        {category}
                      </div>
                      {items.map((item) => {
                        const isCurrent = item.slug === doc.slug;
                        return (
                          <Link
                            key={item.slug}
                            href={`/components/${item.slug}`}
                            onClick={() => setMobileSidebarOpen(false)}
                            className={cn(
                              "flex items-center justify-between px-3 py-1.5 rounded-xl text-xs transition-colors",
                              isCurrent
                                ? "bg-white/10 text-white font-medium"
                                : "text-zinc-400 hover:text-zinc-200 hover:bg-white/5"
                            )}
                          >
                            <span className="truncate">{item.title}</span>
                          </Link>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Website Footer */}
      <Footer />
    </div>
  );
}
