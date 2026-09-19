"use client";

import { useIsMobile } from "@/lib/use-media-query";
import { cn } from "@/lib/utils";
import CopyButton from "../CopyButton";

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
  const canCopy = Boolean(
    code &&
    code !== "// Loading…" &&
    code !== "// Unable to load source." &&
    code.trim().length > 0
  );

  return (
    <div
      className={cn(
        "relative flex overflow-hidden overflow-x-auto group/code",
        !isMobile && "rounded-xl bg-muted p-4",
        className,
        isMobile && "p-2",
      )}
    >
      {canCopy && (
        <div className="absolute right-3 top-3 z-10">
          <CopyButton
            value={code}
            label="Copy code"
            className="size-7 rounded-md bg-background/80 hover:bg-background border border-border/60 text-muted-foreground hover:text-foreground shadow-xs backdrop-blur-xs transition-colors"
          />
        </div>
      )}
      <pre className="min-h-0 w-full flex-1 font-mono text-xs text-foreground whitespace-pre pr-8">
        <code>{code}</code>
      </pre>
    </div>
  );
}
