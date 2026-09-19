import { Loader2 } from "lucide-react";
import { DigitSwap } from "../digit-swap";
import type { Token } from "./types";
import { formatAmount } from "./utils";

export function QuoteRow({
  from,
  to,
  rate,
  fee,
  slippage,
  eta,
  quoting,
}: {
  from: Token;
  to: Token;
  rate: number;
  fee: number;
  slippage: number;
  eta: string;
  quoting: boolean;
}) {
  const rateText = formatAmount(rate);
  const feeText = fee.toFixed(2);
  const slippageText = slippage.toFixed(2);

  return (
    <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1.5 rounded-xl border border-border/50 bg-background/40 px-3.5 py-2.5 text-[11px]">
      <span className="text-muted-foreground">Rate</span>
      <span className="text-right tabular-nums text-foreground">
        {quoting ? (
          <Loader2 className="ml-auto inline h-3 w-3 animate-spin text-muted-foreground" />
        ) : (
          <span className="inline-flex items-center justify-end gap-1">
            <span>1 {from.symbol} ≈</span>
            <DigitSwap value={rateText} />
            <span>{to.symbol}</span>
          </span>
        )}
      </span>
      <span className="text-muted-foreground">Network fee</span>
      <span className="text-right tabular-nums text-foreground inline-flex items-center justify-end">
        <span>$</span>
        <DigitSwap value={feeText} />
      </span>
      <span className="text-muted-foreground">Slippage</span>
      <span className="text-right tabular-nums text-foreground inline-flex items-center justify-end">
        <DigitSwap value={slippageText} />
        <span>%</span>
      </span>
      <span className="text-muted-foreground">ETA</span>
      <span className="text-right text-foreground">{eta}</span>
    </div>
  );
}
