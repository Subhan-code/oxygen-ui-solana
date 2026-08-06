"use client";

import { EmojiReaction } from "@/components/ui/emoji-reaction";

export default function EmojiReactionPage() {
  return (
    <div className="relative flex h-full flex-col items-center justify-center gap-6">
      <EmojiReaction size="md" align="center" />
      <p className="text-sm text-foreground/50">
        Click the button, then pick an emoji to throw it up the screen.
      </p>
    </div>
  );
}
