"use client";

import { LeverageSlider } from "@/components/ui/sol/leverage-slider";
import { TokenInput } from "@/components/ui/sol/token-input";
import { TradeButtons } from "@/components/ui/sol/trade-buttons";
import { Button } from "@/components/ui/sol-primitives/button";
import { Separator } from "@/components/ui/sol-primitives/separator";
import type { DetailRow } from "@/lib/sol/types";
import { cn } from "@/lib/utils";

type TradeBoxDetail = DetailRow;

interface TradeBoxProps {
  tokens: { icon: string; symbol: string }[];
  defaultToken?: string;
  balance?: string;
  labels?: [string, string];
  defaultSide?: string;
  leverageMin?: number;
  leverageMax?: number;
  leverageDefault?: number;
  leverageStep?: number;
  details?: TradeBoxDetail[];
  submitLabel?: string;
  onSubmit?: () => void;
  className?: string;
}

const TradeBox = ({
  tokens,
  defaultToken,
  balance,
  labels = ["Long", "Short"],
  defaultSide = "long",
  leverageMin = 1,
  leverageMax = 50,
  leverageDefault = 5,
  leverageStep = 1,
  details,
  submitLabel = "Open Long",
  onSubmit,
  className,
}: TradeBoxProps) => {
  return (
    <div className={cn("flex flex-col gap-4 border rounded-lg p-4", className)}>
      <TradeButtons defaultValue={defaultSide} labels={labels} />
      <Separator />
      <div className="flex flex-col gap-2">
        <TokenInput
          tokens={tokens}
          defaultToken={defaultToken}
          balance={balance}
        />
      </div>
      <LeverageSlider
        min={leverageMin}
        max={leverageMax}
        defaultValue={[leverageDefault]}
        step={leverageStep}
      />
      {details && details.length > 0 && (
        <>
          <Separator />
          <div className="flex flex-col gap-1.5 text-sm">
            {details.map((detail) => (
              <div key={detail.label} className="flex justify-between">
                <span className="text-muted-foreground">{detail.label}</span>
                <span className={detail.className}>{detail.value}</span>
              </div>
            ))}
          </div>
        </>
      )}
      <Button className="w-full" size="lg" onClick={onSubmit}>
        {submitLabel}
      </Button>
    </div>
  );
};

export type { TradeBoxProps, TradeBoxDetail };
export { TradeBox };
