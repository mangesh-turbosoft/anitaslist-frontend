import Link from "next/link";
import { cn } from "@/lib/cn";
import type { Link as LinkData } from "@/types/content";

/**
 * "Back and header element" (sub page hero): parent link | current page, Noto 600 16/22 UPPERCASE.
 * Figma text reads "Sample lists | sample sub link".
 */
export function Breadcrumb({ parent, current, className }: { parent: LinkData; current: string; className?: string }) {
  return (
    <nav aria-label="Breadcrumb" className={cn("font-sans text-eyebrow-xs font-semibold uppercase", className)}>
      <ol className="flex flex-wrap items-center gap-2">
        <li>
          <Link href={parent.href} className="hover:underline">
            {parent.label}
          </Link>
        </li>
        <li aria-hidden="true">|</li>
        <li aria-current="page" className="normal-case">
          <span className="uppercase">{current}</span>
        </li>
      </ol>
    </nav>
  );
}
