"use client";

import React, { useState } from "react";
import { CryptoPricePills, type CryptoToken } from "@/components/ui/crypto-price-pills";

export default function Demo() {
  const [selected, setSelected] = useState<CryptoToken | null>(null);

  return (
    <div className="flex min-h-[460px] w-full flex-col items-center justify-center gap-6 rounded-3xl bg-card p-6 sm:p-10 text-card-foreground border border-border/50">
      <div className="flex flex-col items-center gap-1.5 text-center">
        <span className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
          Token Price Feed
        </span>
        <p className="text-xs text-muted-foreground">
          Interactive token pills with active spring elevation and 24h market performance badges.
        </p>
      </div>

      <div className="w-full max-w-[280px]">
        <CryptoPricePills onSelect={setSelected} />
      </div>

      {selected && (
        <div className="text-xs font-mono text-muted-foreground">
          Selected: <span className="text-foreground font-semibold">{selected.symbol}</span> ({selected.price})
        </div>
      )}
    </div>
  );
}
