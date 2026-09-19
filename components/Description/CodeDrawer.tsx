"use client";

import { useEffect, useState } from "react";
import { motion, useDragControls } from "motion/react";
import { X } from "lucide-react";
import type { ComponentItem } from "@/lib/components";
import CopyButton from "../CopyButton";
import PanelCode from "./PanelCode";
import { fetchSource, SOURCE_LOADING, SOURCE_ERROR } from "./fetchSource";

type CodeDrawerProps = {
  open: boolean;
  onClose: () => void;
  item?: ComponentItem;
};

export default function CodeDrawer({ open, onClose, item }: CodeDrawerProps) {
  const dragControls = useDragControls();
  const [code, setCode] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open || !item) return;
    let cancelled = false;

    Promise.resolve().then(() => {
      if (cancelled) return;
      setLoading(true);
      setCode(null);

      fetchSource(item.slug || item.name || item.registry, item.file)
        .then((text) => {
          if (!cancelled) setCode(text);
        })
        .finally(() => {
          if (!cancelled) setLoading(false);
        });
    });

    return () => {
      cancelled = true;
    };
  }, [open, item]);

  const canCopy = Boolean(code && code !== SOURCE_LOADING && code !== SOURCE_ERROR);

  return (
    <motion.div
      drag="y"
      dragListener={false}
      dragControls={dragControls}
      dragConstraints={{ top: 0, bottom: 0 }}
      dragElastic={{ top: 0, bottom: 0.4 }}
      onDragEnd={(_, info) => {
        if (info.offset.y > 120) onClose();
      }}
      initial={false}
      animate={{ y: open ? "0%" : "110%" }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="absolute inset-x-0 bottom-0 z-10 flex h-full flex-col rounded-2xl bg-card shadow-2xl shadow-black/30"
    >
      <div
        onPointerDown={(event) => dragControls.start(event)}
        className="shrink-0 cursor-grab touch-none px-4 pb-2 pt-3 active:cursor-grabbing"
      >
        <div className="mx-auto mb-3 h-1.5 w-12 rounded-full bg-foreground/25" />
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 truncate min-w-0">
            <span className="text-sm font-semibold truncate text-foreground">{item?.name ?? "Code"}</span>
            {item?.file && (
              <span className="text-[11px] font-mono text-muted-foreground truncate">
                {item.file.split("/").pop()}
              </span>
            )}
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            {canCopy && (
              <CopyButton
                value={code ?? ""}
                label="Copy code"
                className="h-7 gap-1.5 rounded-lg bg-zinc-900 dark:bg-white px-2.5 text-xs font-medium text-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-100"
              >
                <span>Copy</span>
              </CopyButton>
            )}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close code drawer"
              className="flex size-7 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer"
            >
              <X className="size-4" />
            </button>
          </div>
        </div>
      </div>

      <PanelCode
        code={loading ? SOURCE_LOADING : code ?? ""}
        showLineNumbers
        className="mx-4 mb-4 min-h-0 flex-1"
      />
    </motion.div>
  );
}
