"use client"

import * as React from "react"
import { Key, Copy, Check, RefreshCw, Eye, EyeOff } from "lucide-react"
import { cn } from "@/lib/utils"

export interface KeypairGeneratorProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultPublicKey?: string
  defaultSecretKeyArray?: string
}

export function KeypairGenerator({
  defaultPublicKey = "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
  defaultSecretKeyArray = "[142, 84, 19, 241, 102, 84, 99, 12, ... 18]",
  className,
  ...props
}: KeypairGeneratorProps) {
  const [pubKey, setPubKey] = React.useState(defaultPublicKey)
  const [secretKey, setSecretKey] = React.useState(defaultSecretKeyArray)
  const [copiedPub, setCopiedPub] = React.useState(false)
  const [copiedSec, setCopiedSec] = React.useState(false)
  const [showSecret, setShowSecret] = React.useState(false)
  const [generating, setGenerating] = React.useState(false)

  const handleGenerate = () => {
    setGenerating(true)
    setTimeout(() => {
      // Dummy random base58-like key generator for burner testing
      const chars = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"
      let res = ""
      for (let i = 0; i < 44; i++) res += chars.charAt(Math.floor(Math.random() * chars.length))
      setPubKey(res)
      setGenerating(false)
    }, 400)
  }

  const copyText = (txt: string, setCopied: (v: boolean) => void) => {
    navigator.clipboard.writeText(txt)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div
      className={cn(
        "rounded-3xl border border-zinc-800 bg-zinc-900/90 p-5 shadow-2xl backdrop-blur-xl text-left",
        className
      )}
      data-slot="keypair-generator"
      {...props}
    >
      <div className="flex items-center justify-between pb-3 border-b border-zinc-800/80">
        <div className="flex items-center gap-2">
          <Key className="h-5 w-5 text-purple-400" />
          <h3 className="font-bold text-sm text-zinc-100">Devnet Burner Keypair Generator</h3>
        </div>
        <button
          onClick={handleGenerate}
          disabled={generating}
          className="flex items-center gap-1.5 rounded-xl border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-xs font-mono font-semibold text-purple-300 hover:bg-purple-500/20 transition-colors"
        >
          <RefreshCw className={cn("h-3.5 w-3.5", generating && "animate-spin")} /> Generate New
        </button>
      </div>

      <div className="my-4 space-y-3 font-mono text-xs">
        <div className="rounded-2xl bg-zinc-950/60 p-3 border border-zinc-800/50">
          <div className="flex items-center justify-between text-zinc-400 mb-1">
            <span>Public Key (Base58)</span>
            <button onClick={() => copyText(pubKey, setCopiedPub)} className="text-zinc-500 hover:text-white transition-colors">
              {copiedPub ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
            </button>
          </div>
          <span className="font-bold text-zinc-200 break-all">{pubKey}</span>
        </div>

        <div className="rounded-2xl bg-zinc-950/60 p-3 border border-zinc-800/50">
          <div className="flex items-center justify-between text-zinc-400 mb-1">
            <span>Secret Key (Uint8Array)</span>
            <div className="flex items-center gap-2">
              <button onClick={() => setShowSecret(!showSecret)} className="text-zinc-500 hover:text-white transition-colors">
                {showSecret ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
              </button>
              <button onClick={() => copyText(secretKey, setCopiedSec)} className="text-zinc-500 hover:text-white transition-colors">
                {copiedSec ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
              </button>
            </div>
          </div>
          <span className="font-bold text-rose-400 break-all">{showSecret ? secretKey : "••••••••••••••••••••••••••••••••"}</span>
        </div>
      </div>
    </div>
  )
}
