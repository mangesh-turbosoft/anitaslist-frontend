import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

/** Three-dot trigger. Figma: three 5x5 circles at 9px pitch on a 37x19 pill @cream/20. Hit area enlarged to 44px (plan 15). */
export function MenuDots({
  className,
  label = "More options",
  ...rest
}: ComponentPropsWithoutRef<"button"> & { label?: string }) {
  return (
    <button type="button" aria-label={label} className={cn("flex size-11 items-center justify-center", className)} {...rest}>
      <span className="flex items-center gap-1 bg-cream/20 px-2 py-[7px]">
        <span className="size-[5px] rounded-full bg-ink" />
        <span className="size-[5px] rounded-full bg-ink" />
        <span className="size-[5px] rounded-full bg-ink" />
      </span>
    </button>
  );
}
