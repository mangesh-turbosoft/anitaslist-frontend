import { cn } from "@/lib/cn";

/** Figma: 292x15 track #E6E4D8, fill #E0BD5A. */
export function ProgressBar({
  value,
  max = 100,
  label,
  className,
}: {
  value: number;
  max?: number;
  label: string;
  className?: string;
}) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={value}
      className={cn("h-[15px] w-full bg-bone", className)}
    >
      <div className="h-full bg-gold" style={{ width: `${pct}%` }} />
    </div>
  );
}
