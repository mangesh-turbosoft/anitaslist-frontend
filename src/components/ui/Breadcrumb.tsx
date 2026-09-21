import Link from "next/link";
import { cn } from "@/lib/cn";
import type { Link as LinkData } from "@/types/content";

/**
 * "Back and header element" (sub page hero): trail of links | current page, Noto 600 16/22 UPPERCASE.
 * Figma text reads "Sample lists | sample sub link" (2 levels) up to "Products | Transport | Pushchairs |
 * Bugaboo Fox 5 Renew" (4 levels) on the product pages - one component covers any trail length.
 */
export function Breadcrumb({ trail, current, className }: { trail: LinkData[]; current: string; className?: string }) {
  return (
    <nav aria-label="Breadcrumb" className={cn("font-sans text-eyebrow-xs font-semibold uppercase", className)}>
      <ol className="flex flex-wrap items-center gap-2">
        {trail.map((link) => (
          <li key={link.href} className="flex items-center gap-2">
            <Link href={link.href} className="hover:underline">
              {link.label}
            </Link>
            <span aria-hidden="true">|</span>
          </li>
        ))}
        <li aria-current="page" className="normal-case">
          <span className="uppercase">{current}</span>
        </li>
      </ol>
    </nav>
  );
}
