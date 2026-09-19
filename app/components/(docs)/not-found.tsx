"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { components } from "@/lib/components";

export default function ComponentNotFound() {
  const pathname = usePathname();
  const item = components.find((c) => c.href === pathname);
  const title = item?.name ?? pathname.replace(/^\/components\//, "").replace(/-/g, " ");

  return (
    <div className="flex h-full min-h-[400px] flex-col items-center justify-center gap-4 text-center px-6">
      <div className="size-14 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-2xl shadow-2xs">
        💡
      </div>
      <div className="space-y-2 max-w-md">
        <h1 className="text-xl font-bold font-runde capitalize text-foreground">
          {title || "Component Not Found"}
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
          Have a component in mind that needs to be added? Pin me on X or tag me and we&apos;ll ship it.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        <a
          href="https://x.com/intent/tweet?text=Hey%20%40uxdotsol%20can%20you%20add%20this%20component%20to%20Oxygen%20UI%3F"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-xl bg-zinc-900 px-4 py-2 text-xs font-semibold text-white shadow-xs transition-all hover:bg-black active:scale-95 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="size-3.5" aria-hidden="true">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          Tag me on X
        </a>
        <Link
          href="/components"
          className="inline-flex items-center rounded-xl border border-black/10 dark:border-white/10 bg-zinc-100/80 dark:bg-zinc-900/80 px-4 py-2 text-xs font-semibold text-foreground transition-all hover:border-black/20 dark:hover:border-white/20 active:scale-95"
        >
          Browse All Components
        </Link>
      </div>
    </div>
  );
}
