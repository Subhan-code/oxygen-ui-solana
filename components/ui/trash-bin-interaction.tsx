"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Trash2, Undo2, Check, RefreshCw, Sparkles, FileText, Image as ImageIcon, Music } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TrashItem {
  id: string;
  name: string;
  size: string;
  type: "image" | "file" | "audio";
}

const INITIAL_ITEMS: TrashItem[] = [
  { id: "1", name: "solana_keypair_backup.json", size: "1.2 KB", type: "file" },
  { id: "2", name: "nft_solana_monkey.png", size: "4.8 MB", type: "image" },
  { id: "3", name: "voice_note_passphrase.mp3", size: "2.1 MB", type: "audio" },
  { id: "4", name: "tx_receipt_jupiter.pdf", size: "340 KB", type: "file" },
];

const springItem = {
  type: "spring" as const,
  stiffness: 450,
  damping: 28,
};

export function TrashBinInteraction({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const [items, setItems] = useState<TrashItem[]>(INITIAL_ITEMS);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [lastDeleted, setLastDeleted] = useState<TrashItem[]>([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  };

  const handleDelete = () => {
    if (selectedIds.length === 0) return;
    setIsDeleting(true);

    const deleted = items.filter((item) => selectedIds.includes(item.id));
    const remaining = items.filter((item) => !selectedIds.includes(item.id));

    setTimeout(() => {
      setLastDeleted(deleted);
      setItems(remaining);
      setSelectedIds([]);
      setIsDeleting(false);
    }, 400);
  };

  const handleRestore = () => {
    if (lastDeleted.length === 0) return;
    setItems((prev) => [...prev, ...lastDeleted]);
    setLastDeleted([]);
  };

  const handleReset = () => {
    setItems(INITIAL_ITEMS);
    setSelectedIds([]);
    setLastDeleted([]);
  };

  const renderIcon = (type: TrashItem["type"]) => {
    switch (type) {
      case "image":
        return <ImageIcon className="size-4 text-sky-500" />;
      case "audio":
        return <Music className="size-4 text-purple-500" />;
      case "file":
      default:
        return <FileText className="size-4 text-amber-500" />;
    }
  };

  return (
    <div
      data-slot="trash-bin-interaction"
      className={cn("flex flex-col gap-4 w-full max-w-md select-none", className)}
      {...props}
    >
      {/* Header Bar */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <Trash2 className="size-4 text-rose-500" />
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Vault Trash Interaction ({items.length})
          </span>
        </div>
        <button
          type="button"
          onClick={handleReset}
          className="flex items-center gap-1 text-[11px] font-semibold text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
        >
          <RefreshCw className="size-3" /> Reset
        </button>
      </div>

      {/* Item List Container */}
      <div className="flex flex-col gap-2 rounded-3xl border border-black/10 dark:border-white/12 bg-white/70 dark:bg-[#1c1c1e]/80 p-4 shadow-xl backdrop-blur-2xl min-h-[260px]">
        <AnimatePresence mode="popLayout">
          {items.map((item) => {
            const isSelected = selectedIds.includes(item.id);
            return (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                  filter: isDeleting && isSelected ? "blur(8px)" : "blur(0px)",
                }}
                exit={
                  shouldReduceMotion
                    ? { opacity: 0 }
                    : { opacity: 0, scale: 0.2, y: 40, rotate: 12 }
                }
                transition={springItem}
                onClick={() => toggleSelect(item.id)}
                className={cn(
                  "flex items-center justify-between p-3 rounded-2xl border transition-all duration-200 cursor-pointer outline-none",
                  isSelected
                    ? "bg-rose-500/[0.08] dark:bg-rose-500/15 border-rose-500/30 shadow-xs"
                    : "bg-white/60 dark:bg-black/20 border-black/5 dark:border-white/5 hover:border-black/15 dark:hover:border-white/15"
                )}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5">
                    {renderIcon(item.type)}
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs font-bold text-foreground truncate">{item.name}</span>
                    <span className="text-[11px] font-mono text-muted-foreground">{item.size}</span>
                  </div>
                </div>

                {/* Selection Check Circle */}
                <div
                  className={cn(
                    "flex size-5 shrink-0 items-center justify-center rounded-full border transition-colors",
                    isSelected
                      ? "bg-rose-600 border-rose-600 text-white"
                      : "border-muted-foreground/30 bg-transparent"
                  )}
                >
                  {isSelected && <Check className="size-3 stroke-[3]" />}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {items.length === 0 && (
          <div className="flex flex-1 flex-col items-center justify-center gap-2 py-12 text-center">
            <Trash2 className="size-8 text-muted-foreground/40 stroke-[1.5]" />
            <span className="text-xs font-bold text-muted-foreground">Trash bin is clean</span>
          </div>
        )}
      </div>

      {/* Action Toolbar */}
      <div className="flex items-center justify-between gap-3">
        <motion.button
          type="button"
          disabled={selectedIds.length === 0 || isDeleting}
          whileHover={shouldReduceMotion ? undefined : { scale: 1.02 }}
          whileTap={shouldReduceMotion ? undefined : { scale: 0.96 }}
          onClick={handleDelete}
          className={cn(
            "flex-1 flex items-center justify-center gap-2 h-11 rounded-2xl text-xs font-bold text-white shadow-md transition-all cursor-pointer outline-none",
            selectedIds.length > 0
              ? "bg-rose-600 hover:bg-rose-500 shadow-rose-500/25"
              : "bg-zinc-400 dark:bg-zinc-700 opacity-50 cursor-not-allowed"
          )}
        >
          <Trash2 className="size-4" />
          <span>Move {selectedIds.length > 0 ? `(${selectedIds.length})` : ""} to Trash</span>
        </motion.button>

        {lastDeleted.length > 0 && (
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            type="button"
            onClick={handleRestore}
            className="flex items-center gap-1.5 h-11 px-4 rounded-2xl border border-black/10 dark:border-white/10 bg-white/80 dark:bg-[#1c1c1e]/80 text-xs font-bold text-foreground shadow-xs hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer"
          >
            <Undo2 className="size-3.5 text-blue-500" />
            <span>Undo Delete</span>
          </motion.button>
        )}
      </div>
    </div>
  );
}

export default TrashBinInteraction;
