import { cn } from "@/lib/cn";

/** Two-step modal indicator. Figma: 13x13 squares, 12px gap, active #2D1A14, inactive same @30%. */
export function StepDots({ total, current, className }: { total: number; current: number; className?: string }) {
  return (
    <ol className={cn("flex items-center justify-center gap-3", className)} aria-label={`Step ${current} of ${total}`}>
      {Array.from({ length: total }, (_, i) => (
        <li
          key={i}
          aria-current={i + 1 === current ? "step" : undefined}
          className={cn("size-[13px] bg-ink", i + 1 !== current && "opacity-30")}
        >
          <span className="sr-only">Step {i + 1}</span>
        </li>
      ))}
    </ol>
  );
}
