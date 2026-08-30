import { cn } from "@/lib/utils";

interface HealthBarProps {
  value: number;
  label?: string;
  showValue?: boolean;
  className?: string;
}

const getHealthColor = (value: number) => {
  if (value >= 66) return "text-[#34C759] dark:text-[#30D158]";
  if (value >= 33) return "text-[#FF9500] dark:text-[#FF9F0A]";
  return "text-[#FF3B30] dark:text-[#FF453A]";
};

const getHealthBg = (value: number) => {
  if (value >= 66) return "bg-[#34C759] dark:bg-[#30D158]";
  if (value >= 33) return "bg-[#FF9500] dark:bg-[#FF9F0A]";
  return "bg-[#FF3B30] dark:bg-[#FF453A]";
};

const HealthBar = ({
  value,
  label = "Health Factor",
  showValue = true,
  className,
}: HealthBarProps) => {
  const clamped = Math.max(0, Math.min(100, value));

  return (
    <div data-slot="health-bar" className={cn("flex flex-col gap-2 w-full", className)}>
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">{label}</span>
        {showValue && (
          <span className={cn("text-sm font-medium tabular-nums", getHealthColor(clamped))}>
            {clamped.toFixed(0)}%
          </span>
        )}
      </div>
      <div className="relative h-2.5 w-full overflow-hidden rounded-full bg-muted">
        <div
          className={cn(
            "h-full origin-left rounded-full motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-[var(--ease-out-expo)]",
            getHealthBg(clamped),
          )}
          style={{ transform: `scaleX(${clamped / 100})` }}
        />
      </div>
    </div>
  );
};

export type { HealthBarProps };
export { HealthBar };
