"use client";

import Link from "next/link";
import { useState } from "react";
import { IconChevronDown } from "@/components/icons";
import { cn } from "@/lib/cn";
import type { Category } from "@/types/content";

/**
 * Category filter sidebar (Figma 190:5514, "Filter" 192:5819): each row is a 331x40 bordered box with the
 * category name (its own link, to Products/Category Template for that category) and a separate 40x40 chevron
 * button that only expands/collapses the subcategory list - two independent hit targets, not one, matching the
 * design's separate "Filter section" text and "Arrow button" layers. Only Transport's subcategories are drawn.
 */
export function CategorySidebar({
  categories,
  activeCategorySlug,
  activeSubcategorySlug,
}: {
  categories: Category[];
  activeCategorySlug: string;
  activeSubcategorySlug: string | null;
}) {
  const [openSlug, setOpenSlug] = useState<string | null>(activeCategorySlug);

  return (
    // A single divide line between rows, not a border per row - stacking each box's own top+bottom border would
    // double up in the middle of the list instead of giving one consistent 1px line throughout.
    <nav aria-label="Product categories" className="flex w-full max-w-[331px] flex-col divide-y divide-sand border border-sand">
      {categories.map((cat) => {
        const isOpen = openSlug === cat.slug;
        const hasSubcategories = cat.subcategories.length > 0;
        return (
          <div key={cat.id} className={cn(hasSubcategories && isOpen && "divide-y divide-sand")}>
            <div className={cn("flex h-10 items-center justify-between pl-5", cat.slug === activeCategorySlug && "font-semibold")}>
              <Link href={`/products/${cat.slug}`} className="font-display text-label text-ink hover:underline">
                {cat.name}
              </Link>
              {hasSubcategories && (
                <button
                  type="button"
                  onClick={() => setOpenSlug((s) => (s === cat.slug ? null : cat.slug))}
                  aria-expanded={isOpen}
                  aria-label={isOpen ? `Collapse ${cat.name}` : `Expand ${cat.name}`}
                  className="flex size-10 shrink-0 items-center justify-center text-ink"
                >
                  <IconChevronDown className={cn("h-[9px] w-4 transition-transform duration-150", isOpen && "rotate-180")} />
                </button>
              )}
            </div>
            {hasSubcategories && isOpen && (
              <ul className="px-5 py-3">
                {cat.subcategories.map((sub) => (
                  <li key={sub.slug}>
                    <Link
                      href={`/products/${cat.slug}/${sub.slug}`}
                      className={cn(
                        "block py-2 font-sans text-body",
                        sub.slug === activeSubcategorySlug ? "text-terracotta underline underline-offset-4" : "text-ink hover:underline",
                      )}
                    >
                      {sub.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      })}
    </nav>
  );
}
