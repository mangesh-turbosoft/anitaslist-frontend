"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavItem } from "@/data/site";
import { cn } from "@/lib/cn";

/** Footer "Quick links" column, active-state matching the header's NavLinks convention (aria-current + underline). */
export function FooterQuickLinks({ items }: { items: NavItem[] }) {
  const pathname = usePathname();
  return (
    <ul className="-mt-[7px]">
      {items.map((item) => {
        const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href + "/"));
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={cn("font-sans text-body-tall text-ink hover:underline", active && "underline underline-offset-4")}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
