import Link from "next/link";
import type { ComponentItem } from "@/lib/components";
import PreviewFallback from "./PreviewFallback";
import PreviewVideo from "./PreviewVideo";

const ArrowIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
    className="h-3.5 w-3.5"
    aria-hidden="true"
  >
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
);

export default function ComponentCard({ item }: { item: ComponentItem }) {
  return (
    <Link
      href={item.href}
      className="group flex flex-col rounded-[32px] border border-black/[0.04] bg-[#F5F5F7] p-2 transition-colors duration-200 ease-out dark:border-transparent dark:border-apple dark:bg-[#121212] dark:hover:bg-muted"
      style={{ cornerShape: "squircle" } as React.CSSProperties}
    >
      <div
        className="relative aspect-4/3 w-full overflow-hidden rounded-3xl border border-black/[0.06] bg-white dark:border-neutral-500/15 dark:bg-neutral-950"
        style={{ cornerShape: "squircle" } as React.CSSProperties}
      >
        {item.preview ? <PreviewVideo src={item.preview} /> : <PreviewFallback />}
      </div>

      <div className="flex items-center justify-between gap-3 px-3 pb-1 pt-2">
        <div className="min-w-0">
          <h3 className="font-runde text-base font-semibold tracking-tight">
            {item.name}
          </h3>
          {/* {item.description && (
            <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
              {item.description}
            </p>
          )} */}
        </div>
        <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-white text-[#FC4C01] shadow-[0_1px_2px_rgba(0,0,0,0.06)] transition-colors duration-200 ease-out group-hover:bg-[#FC4C01] group-hover:text-white dark:bg-background dark:shadow-none">
          <ArrowIcon />
        </span>
      </div>
    </Link>
  );
}
