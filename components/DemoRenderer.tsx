"use client";

import React, { Component, Suspense, type ComponentType, type ReactNode } from "react";
import { DEMO_LOADERS } from "@/lib/demo-registry";

export interface DemoRendererProps {
  slug: string;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

// module-level cache: slug → stable lazy component reference
// React.lazy must never be re-called for the same slug after mount
const LAZY_CACHE = new Map<string, ComponentType>();

function getOrCreateLazy(slug: string): ComponentType {
  if (LAZY_CACHE.has(slug)) {
    return LAZY_CACHE.get(slug)!;
  }

  const loader = DEMO_LOADERS[slug];

  const LazyComp = React.lazy(() => {
    const promise = loader
      ? loader()
      : import(`@/app/components/(docs)/${slug}/demo`);

    return promise
      .then((mod) => {
        const Comp = mod.default ?? mod.Demo ?? mod;
        return {
          default:
            typeof Comp === "function" ||
            (typeof Comp === "object" && Comp !== null)
              ? (Comp as ComponentType)
              : (() => null) as ComponentType,
        };
      })
      .catch(() => ({
        default: (() => null) as ComponentType,
      }));
  });

  LAZY_CACHE.set(slug, LazyComp);
  return LazyComp;
}

class DemoErrorBoundary extends Component<
  { children: ReactNode; slug: string },
  ErrorBoundaryState
> {
  constructor(props: { children: ReactNode; slug: string }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.warn(`Demo render error [${this.props.slug}]:`, error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-[280px] w-full flex-col items-center justify-center gap-3 rounded-3xl border border-amber-500/20 bg-amber-500/5 p-6 text-center backdrop-blur-md">
          <span className="text-xs font-bold text-amber-500 uppercase tracking-wider">
            Demo Preview Notice
          </span>
          <p className="text-xs text-muted-foreground max-w-sm font-mono">
            Component preview is currently updating ({this.props.slug}).
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}

export function DemoRenderer({ slug }: DemoRendererProps) {
  if (!slug) {
    return (
      <div className="flex min-h-[250px] w-full items-center justify-center rounded-2xl border border-dashed border-zinc-800 p-6 text-center">
        <span className="text-xs font-mono text-zinc-500">No demo specified</span>
      </div>
    );
  }

  const LazyDemo = getOrCreateLazy(slug);

  return (
    <DemoErrorBoundary slug={slug}>
      <div className="w-full font-sans flex items-center justify-center">
        <Suspense
          fallback={
            <div className="flex min-h-[300px] w-full items-center justify-center rounded-3xl border border-zinc-800/80 bg-zinc-950/40 p-8">
              <div className="flex items-center gap-2.5 text-xs text-zinc-400 font-mono">
                <span className="size-3.5 rounded-full border-2 border-sky-500 border-t-transparent animate-spin" />
                Loading component preview...
              </div>
            </div>
          }
        >
          <LazyDemo />
        </Suspense>
      </div>
    </DemoErrorBoundary>
  );
}

export default DemoRenderer;
