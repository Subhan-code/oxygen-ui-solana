"use client";

import React, { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { MessageSquarePlus, CheckCircle2, Send, X, Sparkles, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface MorphingFeedbackPopoverProps extends React.HTMLAttributes<HTMLDivElement> {
  onSubmitFeedback?: (text: string) => Promise<void> | void;
}

const springMorph = {
  type: "spring" as const,
  stiffness: 450,
  damping: 30,
  mass: 0.7,
};

export function MorphingFeedbackPopover({
  onSubmitFeedback,
  className,
  ...props
}: MorphingFeedbackPopoverProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const handleReset = () => {
    setIsOpen(false);
    setFeedback("");
    setStatus("idle");
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        handleReset();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node) && isOpen) {
        handleReset();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedback.trim() || status !== "idle") return;

    setStatus("submitting");
    try {
      if (onSubmitFeedback) {
        await onSubmitFeedback(feedback);
      } else {
        await new Promise((res) => setTimeout(res, 1200));
      }
      setStatus("success");
      setTimeout(() => {
        handleReset();
      }, 2500);
    } catch {
      setStatus("idle");
    }
  };

  return (
    <div
      ref={containerRef}
      data-slot="morphing-feedback-popover"
      className={cn("relative flex items-center justify-center select-none", className)}
      {...props}
    >
      {!isOpen && (
        <motion.button
          layoutId="feedback-popover-card"
          type="button"
          whileHover={shouldReduceMotion ? undefined : { scale: 1.03 }}
          whileTap={shouldReduceMotion ? undefined : { scale: 0.96 }}
          transition={springMorph}
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 rounded-2xl border border-black/10 dark:border-white/12 bg-white/80 dark:bg-[#1c1c1e]/90 px-4 py-2.5 text-xs font-bold text-foreground shadow-md backdrop-blur-2xl transition-colors hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer outline-none"
        >
          <MessageSquarePlus className="size-4 text-blue-500" />
          <motion.span layoutId="feedback-popover-title">Give Feedback</motion.span>
        </motion.button>
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            layoutId="feedback-popover-card"
            transition={springMorph}
            className="relative flex w-[340px] flex-col gap-3 rounded-3xl border border-black/10 dark:border-white/12 bg-white/90 dark:bg-[#1c1c1e]/95 p-5 shadow-2xl backdrop-blur-3xl"
          >
            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={springMorph}
                className="flex flex-col items-center justify-center gap-3 py-6 text-center"
              >
                <div className="flex size-12 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-500 shadow-xs">
                  <CheckCircle2 className="size-6 stroke-[2.5]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-foreground tracking-tight">Feedback Received!</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">Thank you for improving Oxygen UI.</p>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MessageSquarePlus className="size-4 text-blue-500" />
                    <motion.span layoutId="feedback-popover-title" className="text-xs font-bold text-foreground">
                      Give Feedback
                    </motion.span>
                  </div>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="rounded-lg p-1 text-muted-foreground hover:bg-black/5 dark:hover:bg-white/10 hover:text-foreground transition-colors cursor-pointer"
                  >
                    <X className="size-3.5" />
                  </button>
                </div>

                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Tell us what you think or report an issue..."
                  rows={3}
                  disabled={status === "submitting"}
                  className="w-full resize-none rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.03] p-3 text-xs text-foreground placeholder:text-muted-foreground/60 outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20"
                  autoFocus
                />

                <div className="flex items-center justify-between pt-1">
                  <span className="text-[11px] text-muted-foreground font-mono">
                    {feedback.length}/280
                  </span>
                  <motion.button
                    type="submit"
                    disabled={!feedback.trim() || status === "submitting"}
                    whileHover={shouldReduceMotion ? undefined : { scale: 1.02 }}
                    whileTap={shouldReduceMotion ? undefined : { scale: 0.96 }}
                    className={cn(
                      "flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-bold text-white shadow-xs transition-colors cursor-pointer outline-none",
                      feedback.trim() && status !== "submitting"
                        ? "bg-blue-600 hover:bg-blue-500 shadow-blue-500/25"
                        : "bg-zinc-400 dark:bg-zinc-700 opacity-50 cursor-not-allowed"
                    )}
                  >
                    {status === "submitting" ? (
                      <>
                        <Loader2 className="size-3.5 animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="size-3.5" />
                        <span>Send</span>
                      </>
                    )}
                  </motion.button>
                </div>
              </form>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default MorphingFeedbackPopover;
