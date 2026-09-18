import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

type Props = ComponentPropsWithoutRef<"p"> & { compact?: boolean };

/**
 * Section label. Figma: Noto Sans 600 16px UPPERCASE.
 * Default line-height 46px is the spacing device the design uses (not a heading - see plan 15).
 * compact = the 26px line-height variant used inside modals.
 */
export function Eyebrow({ compact = false, className, ...rest }: Props) {
  return (
    <p
      className={cn("font-sans font-semibold uppercase text-ink", compact ? "text-eyebrow-sm" : "text-eyebrow", className)}
      {...rest}
    />
  );
}
