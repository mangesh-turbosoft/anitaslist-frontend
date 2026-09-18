"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavItem } from "@/data/site";
import { cn } from "@/lib/cn";

type Props = {
  items: NavItem[];
  className?: string;
  linkClassName?: string;
  onNavigate?: () => void;
};

/** Primary nav links with aria-current on the active route. Figma: P22 500 16/19, #2D1A14. */
export function NavLinks({ items, className, linkClassName, onNavigate }: Props) {
  const pathname = usePathname();
  return (
    <ul className={className}>
      {items.map((item) => {
        const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href + "/"));
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={active ? "page" : undefined}
              onClick={onNavigate}
              className={cn(
                "font-display text-label font-medium text-ink transition-opacity hover:opacity-70",
                active && "underline underline-offset-4",
                linkClassName,
              )}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
