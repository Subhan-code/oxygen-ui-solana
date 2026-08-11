"use client";

import { useIsMobile } from "@/lib/use-media-query";
import { cn } from "@/lib/utils";

type PanelCodeProps = {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
  className?: string;
};

export default function PanelCode({
  code,
  className,
}: PanelCodeProps) {
  const isMobile = useIsMobile();

  return (
    <div
      className={cn(
        "flex overflow-hidden overflow-x-auto",
        !isMobile && "rounded-xl bg-muted p-4",
        className,
        isMobile && "p-2",
      )}
    >
      <pre className="min-h-0 w-full flex-1 font-mono text-xs text-foreground whitespace-pre">
        <code>{code}</code>
      </pre>
    </div>
  );
}
