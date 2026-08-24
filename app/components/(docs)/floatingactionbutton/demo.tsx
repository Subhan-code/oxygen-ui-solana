"use client";

import React from "react";
import { MessageSquare, Image, Send, Share2 } from "lucide-react";
import { FloatingActionButton } from "@/components/ui/floating-action-button";

export default function Demo() {
  const actions = [
    { id: "msg", label: "New Message", icon: MessageSquare, color: "bg-blue-600 hover:bg-blue-700" },
    { id: "img", label: "Upload Image", icon: Image, color: "bg-purple-600 hover:bg-purple-700" },
    { id: "send", label: "Instant Transfer", icon: Send, color: "bg-emerald-600 hover:bg-emerald-700" },
    { id: "share", label: "Share Link", icon: Share2, color: "bg-amber-600 hover:bg-amber-700" },
  ];

  return (
    <div className="relative flex min-h-[460px] w-full items-end justify-center p-8 items-center transition-all duration-300">
      <div className="flex flex-col items-center gap-4">
        <p className="text-xs text-muted-foreground font-mono">Click the FAB to expand the staggered menu</p>
        <FloatingActionButton actions={actions} />
      </div>
    </div>
  );
}
