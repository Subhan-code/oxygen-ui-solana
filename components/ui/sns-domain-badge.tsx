"use client"

import * as React from "react"
import { Globe, Share2, ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"

export interface SnsDomainBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  domain?: string
  twitterHandle?: string
  avatarUrl?: string
}

export function SnsDomainBadge({
  domain = "oxygen.sol",
  twitterHandle = "@oxygenui",
  avatarUrl = "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png",
  className,
  ...props
}: SnsDomainBadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2.5 rounded-full border border-purple-500/30 bg-zinc-900/90 px-3.5 py-1.5 shadow-xl backdrop-blur-xl",
        className
      )}
      data-slot="sns-domain-badge"
      {...props}
    >
      <img src={avatarUrl} alt={domain} className="h-5 w-5 rounded-full object-cover" />
      <span className="font-mono text-xs font-bold text-white">{domain}</span>
      {twitterHandle && (
        <a
          href={`https://twitter.com/${twitterHandle.replace("@", "")}`}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1 text-[11px] font-mono text-sky-400 hover:underline"
        >
          <Share2 className="h-3 w-3 text-sky-400" />
          <span>{twitterHandle}</span>
        </a>
      )}
    </div>
  )
}
