import * as React from "react";

import { cn } from "@/lib/utils";

export interface ShimmerButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  shimmerDuration?: string;
}

function ShimmerButton({
  className,
  shimmerDuration = "2.5s",
  children,
  ...props
}: ShimmerButtonProps) {
  return (
    <button
      style={{ "--shimmer-duration": shimmerDuration } as React.CSSProperties}
      className={cn(
        "group relative inline-flex h-10 items-center justify-center overflow-hidden rounded-full bg-zinc-900 px-6 text-sm font-medium text-zinc-50 transition-transform active:scale-95 dark:bg-zinc-50 dark:text-zinc-900",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "disabled:pointer-events-none disabled:opacity-50",
        className
      )}
      {...props}
    >
      <span
        aria-hidden
        className="absolute inset-0 -translate-x-full animate-[shimmer_var(--shimmer-duration)_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent dark:via-black/20"
      />
      <span className="relative z-10">{children}</span>
    </button>
  );
}

export { ShimmerButton };
