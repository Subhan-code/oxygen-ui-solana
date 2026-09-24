/* eslint-disable @next/next/no-img-element */
"use client";

import React, {
  Component,
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ComponentType,
  type ReactNode,
} from "react";
import type { ComponentItem } from "@/lib/components";
import { DEMO_LOADERS } from "@/lib/demo-registry";

// module-level cache shared with DemoRenderer to avoid duplicate lazy instances
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

interface PreviewBoundaryState {
  hasError: boolean;
}

class LivePreviewErrorBoundary extends Component<
  { children: ReactNode; name: string },
  PreviewBoundaryState
> {
  constructor(props: { children: ReactNode; name: string }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): PreviewBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.warn(`Preview error [${this.props.name}]:`, error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center gap-1.5 p-3 text-center">
          <span className="text-xs font-bold text-sky-400">{this.props.name}</span>
          <span className="text-[10px] text-muted-foreground font-mono">Interactive Component</span>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function LiveComponentPreview({ item }: { item: ComponentItem }) {
  const [inView, setInView] = useState(false);
  const [scale, setScale] = useState(1);
  const [isReady, setIsReady] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const observedChildRef = useRef<Element | null>(null);

  useEffect(() => {
    if (!containerRef.current || inView) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "50px 0px" }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [inView]);

  const updateScale = useCallback(() => {
    const container = containerRef.current;
    const content = contentRef.current;
    if (!container || !content) return;

    const cWidth = container.clientWidth;
    const cHeight = container.clientHeight;
    if (cWidth <= 0 || cHeight <= 0) return;

    const firstChild = content.firstElementChild as HTMLElement | null;
    const target = firstChild || content;

    const targetW = Math.max(
      target.scrollWidth || 0,
      target.offsetWidth || 0,
      content.scrollWidth || 0,
      content.offsetWidth || 0
    );
    const targetH = Math.max(
      target.scrollHeight || 0,
      target.offsetHeight || 0,
      content.scrollHeight || 0,
      content.offsetHeight || 0
    );

    if (targetW <= 0 || targetH <= 0) return;

    // 16px safe margin prevents clipping against card borders
    const padX = 16;
    const padY = 16;
    const availW = Math.max(cWidth - padX, 20);
    const availH = Math.max(cHeight - padY, 20);

    const scaleX = availW / targetW;
    const scaleY = availH / targetH;
    const fitScale = Math.min(scaleX, scaleY, 1);
    const rounded = Math.round(fitScale * 1000) / 1000;

    setScale(rounded);
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (!inView) return;
    const container = containerRef.current;
    const content = contentRef.current;
    if (!container || !content) return;

    updateScale();

    const ro = new ResizeObserver(() => {
      updateScale();
    });

    ro.observe(container);
    ro.observe(content);
    if (content.firstElementChild) {
      observedChildRef.current = content.firstElementChild;
      ro.observe(content.firstElementChild);
    }

    const mo = new MutationObserver(() => {
      updateScale();
      const currentChild = content.firstElementChild;
      if (currentChild && currentChild !== observedChildRef.current) {
        if (observedChildRef.current) {
          ro.unobserve(observedChildRef.current);
        }
        observedChildRef.current = currentChild;
        ro.observe(currentChild);
      }
    });
    mo.observe(content, { childList: true, subtree: true });

    const rafId = requestAnimationFrame(updateScale);
    const tId = setTimeout(updateScale, 120);

    return () => {
      ro.disconnect();
      mo.disconnect();
      cancelAnimationFrame(rafId);
      clearTimeout(tId);
    };
  }, [inView, updateScale]);

  if (item.image) {
    return (
      <img
        src={item.image}
        alt={item.name}
        className="h-full w-full object-cover object-center motion-safe:transition-transform motion-safe:duration-150 motion-safe:ease-[var(--ease-out-expo)] group-hover:scale-[1.02]"
        loading="lazy"
        decoding="async"
      />
    );
  }

  const slug = item.slug;
  if (!slug) {
    return (
      <div
        ref={containerRef}
        className="relative flex h-full w-full items-center justify-center overflow-hidden bg-neutral-900 p-4 select-none border border-white/5"
        suppressHydrationWarning
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="text-sky-400 font-bold text-lg">{item.name.charAt(0)}</div>
          <span className="font-semibold text-xs tracking-tight text-white">{item.name}</span>
          <span className="text-[10px] font-mono text-zinc-400">{item.group || "UI Primitive"}</span>
        </div>
      </div>
    );
  }

  const LazyDemo = getOrCreateLazy(slug);

  return (
    <div
      ref={containerRef}
      className="relative flex h-full w-full items-center justify-center overflow-hidden select-none font-sans"
      suppressHydrationWarning
    >
      <div
        ref={contentRef}
        className={`live-preview-content flex items-center justify-center shrink-0 origin-center pointer-events-none will-change-transform ${
          isReady ? "opacity-100" : "opacity-0"
        } transition-[transform,opacity] duration-200 ease-out`}
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "center center",
        }}
        suppressHydrationWarning
      >
        {inView ? (
          <LivePreviewErrorBoundary name={item.name}>
            <Suspense
              fallback={
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="size-3 rounded-full border-2 border-sky-500 border-t-transparent animate-spin" />
                  Loading preview...
                </div>
              }
            >
              <LazyDemo />
            </Suspense>
          </LivePreviewErrorBoundary>
        ) : (
          <div className="flex items-center gap-2 text-xs text-muted-foreground/60">
            <span className="size-2.5 rounded-full bg-zinc-800" />
          </div>
        )}
      </div>
    </div>
  );
}
