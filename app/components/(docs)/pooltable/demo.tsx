"use client";

import React from "react";
import { PoolTable } from "@/components/ui/sol/pool-table";
import { Button } from "@/components/ui/sol-primitives/button";

const SOL_ICON =
  "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png";
const USDC_ICON =
  "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png";
const BONK_ICON =
  "https://arweave.net/hQiPZOsRZXGXBJd_82PhVdlM_hACsT_q6wqwf5cSY7I";
const MSOL_ICON =
  "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So/logo.png";

export default function Demo() {
  return (
    <div className="flex min-h-[450px] w-full items-center justify-center p-6 bg-zinc-950/40 rounded-2xl">
      <div className="w-full max-w-3xl bg-zinc-900/60 p-5 rounded-2xl border border-white/10">
        <PoolTable
          columns={[
            { key: "tvl", label: "TVL" },
            { key: "volume", label: "Volume (24h)" },
            { key: "apy", label: "APY", className: "text-emerald-400 font-semibold" },
          ]}
          rows={[
            {
              icons: [
                { src: SOL_ICON, alt: "SOL" },
                { src: USDC_ICON, alt: "USDC" },
              ],
              data: { tvl: "$245.8M", volume: "$18.2M", apy: "12.4%" },
            },
            {
              icons: [
                { src: SOL_ICON, alt: "SOL" },
                { src: BONK_ICON, alt: "BONK" },
              ],
              data: { tvl: "$12.4M", volume: "$3.1M", apy: "24.8%" },
            },
            {
              icons: [
                { src: MSOL_ICON, alt: "mSOL" },
                { src: SOL_ICON, alt: "SOL" },
              ],
              data: { tvl: "$89.2M", volume: "$5.6M", apy: "8.1%" },
            },
          ]}
          actions={[
            <Button key="sol-usdc" variant="outline" size="sm" className="border-white/20 hover:bg-white/10">Deposit</Button>,
            <Button key="sol-bonk" variant="outline" size="sm" className="border-white/20 hover:bg-white/10">Deposit</Button>,
            <Button key="msol-sol" variant="outline" size="sm" className="border-white/20 hover:bg-white/10">Deposit</Button>,
          ]}
        />
      </div>
    </div>
  );
}
