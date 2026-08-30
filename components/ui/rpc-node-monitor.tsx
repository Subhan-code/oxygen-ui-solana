"use client"

import * as React from "react"
import { Activity, Server, Zap, Check } from "lucide-react"
import { cn } from "@/lib/utils"

export interface RpcNode {
  name: string
  url: string
  pingMs: number
  status: "optimal" | "degraded" | "down"
}

export interface RpcNodeMonitorProps extends React.HTMLAttributes<HTMLDivElement> {
  nodes?: RpcNode[]
  activeNodeUrl?: string
  onSelectNode?: (url: string) => void
}

const DEFAULT_NODES: RpcNode[] = [
  { name: "Helius RPC", url: "https://mainnet.helius-rpc.com", pingMs: 14, status: "optimal" },
  { name: "Triton RPC", url: "https://mb-solana.rpcpool.com", pingMs: 22, status: "optimal" },
  { name: "QuickNode RPC", url: "https://solana-mainnet.quiknode.pro", pingMs: 35, status: "optimal" },
]

export function RpcNodeMonitor({
  nodes = DEFAULT_NODES,
  activeNodeUrl = "https://mainnet.helius-rpc.com",
  onSelectNode,
  className,
  ...props
}: RpcNodeMonitorProps) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-zinc-800 bg-zinc-900/90 p-5 shadow-2xl backdrop-blur-xl text-left",
        className
      )}
      data-slot="rpc-node-monitor"
      {...props}
    >
      <div className="flex items-center justify-between pb-3 border-b border-zinc-800/80">
        <div className="flex items-center gap-2">
          <Server className="h-5 w-5 text-purple-400" />
          <h3 className="font-bold text-sm text-zinc-100">Solana RPC Health Monitor</h3>
        </div>
        <span className="flex items-center gap-1 font-mono text-xs text-emerald-400 font-semibold">
          <Activity className="h-3.5 w-3.5" /> 100% Operational
        </span>
      </div>

      <div className="my-3 space-y-2">
        {nodes.map((node) => {
          const isSelected = node.url === activeNodeUrl
          return (
            <button
              key={node.url}
              onClick={() => onSelectNode?.(node.url)}
              className={cn(
                "flex w-full items-center justify-between rounded-2xl border p-3 transition-all text-xs font-mono",
                isSelected
                  ? "border-purple-500/40 bg-purple-500/10 text-white shadow-md"
                  : "border-zinc-800 bg-zinc-950/60 text-zinc-300 hover:border-zinc-700"
              )}
            >
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                <span className="font-bold">{node.name}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-semibold text-emerald-400">{node.pingMs} ms</span>
                {isSelected && <Check className="h-4 w-4 text-purple-400" />}
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
