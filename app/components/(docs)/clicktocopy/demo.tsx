"use client"

import React from "react"
import { Copy } from "lucide-react"
import { ClickToCopy } from "@/components/ui/click-to-copy"

export default function Demo() {
  return (
    <div className="flex min-h-[520px] w-full flex-col items-center justify-center gap-8 p-6 max-w-md mx-auto transition-all duration-300">
      <div className="flex items-center gap-2 rounded-full border border-black/10 bg-zinc-100 px-3.5 py-1.5 text-xs font-semibold text-zinc-800 dark:border-white/10 dark:bg-zinc-900 dark:text-zinc-200 shadow-xs">
        <Copy className="h-3.5 w-3.5 text-emerald-500" />
        <span>3-State Vertical Status Roll</span>
      </div>

      <div className="flex flex-col items-center gap-6 w-full p-8 rounded-3xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950 shadow-xl">
        <ClickToCopy
          copyText="0x71C...8492"
          label="Hover button to copy address"
          confirmation="✨ Address copied to clipboard ✨"
        />

        <ClickToCopy
          copyText="npx shadcn@latest add"
          label="Hover for install command"
          confirmation="🚀 Command copied! 🚀"
        />
      </div>

      <p className="text-xs text-muted-foreground text-center max-w-xs">
        Hover to preview copy action, and click to copy to clipboard with rolling status feedback.
      </p>
    </div>
  )
}
