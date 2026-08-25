"use client";

import React from "react";
import { PoolTable } from "@/components/ui/sol/pool-table";

export default function Demo() {
  const columns = [{ id: "pool", label: "Pool" }, { id: "tvl", label: "TVL" }];
  const rows = [{ id: "1", icons: [], data: { pool: "SOL / USDC", tvl: "$45.2M" } }];
  return (
    <div className="flex min-h-[450px] w-full items-center justify-center p-6 bg-zinc-950/40 rounded-2xl">
      <PoolTable columns={columns as any} rows={rows as any} />
    </div>
  );
}
