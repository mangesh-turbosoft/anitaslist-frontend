import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Solid square or circle holding an icon. Figma: 50x50 #C77065 with 32x32 plus (CTA cards); 50x50 circle (footer social). */
export function IconTile({ children, round = false, className }: { children: ReactNode; round?: boolean; className?: string }) {
  return (
    <span
      className={cn("inline-flex size-[50px] shrink-0 items-center justify-center bg-terracotta text-cream", round && "rounded-full", className)}
      aria-hidden="true"
    >
      {children}
    </span>
  );
}
