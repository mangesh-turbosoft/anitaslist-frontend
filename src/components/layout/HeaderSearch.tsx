"use client";

import Link from "next/link";
import { useMemo, useState, type FocusEvent } from "react";
import { IconChevronRight, IconClose, IconSearch } from "@/components/icons";
import { searchContent } from "@/data/search";
import { cn } from "@/lib/cn";

/**
 * Header search - the original "Search" icon (+ text on desktop) trigger, unchanged visually. Clicking it
 * reveals an inline input with a live results dropdown instead of opening a popup/modal, matching how the live
 * site's header search actually behaves (Shopify predictive search: input sits directly in the header, a
 * dropdown of matches appears while typing, Enter/submit goes to the full results page). Matches against the
 * real fixture data we have (category/subcategory names, the one real product) via the same searchContent()
 * used by /search and /search-results.
 */
export function HeaderSearch({ variant }: { variant: "desktop" | "mobile" }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [fieldOpen, setFieldOpen] = useState(false);

  const results = useMemo(() => searchContent(query), [query]);
  const hasResults = results.categories.length > 0 || results.subcategories.length > 0 || results.products.length > 0;
  const showDropdown = open && query.trim().length > 0;

  const closeUnlessInside = (e: FocusEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
      setOpen(false);
      setFieldOpen(false);
    }
  };

  if (!fieldOpen) {
    return (
      <button
        type="button"
        onClick={() => setFieldOpen(true)}
        aria-label="Search"
        className={
          variant === "desktop"
            ? "inline-flex items-center gap-1 font-display text-label font-medium text-ink transition-opacity hover:opacity-70"
            : "flex size-11 items-center justify-center text-ink"
        }
      >
        {variant === "desktop" && "Search"}
        <IconSearch className={variant === "desktop" ? "h-5 w-auto" : "h-[27px] w-auto"} />
      </button>
    );
  }

  const field = (
    <div className="relative" onFocus={() => setOpen(true)} onBlur={closeUnlessInside}>
      <form role="search" action="/search-results" className={cn("flex h-10 items-center border border-sand bg-cream", variant === "desktop" ? "w-[220px]" : "flex-1")}>
        <label htmlFor={`header-search-${variant}`} className="sr-only">
          Search
        </label>
        <input
          id={`header-search-${variant}`}
          name="q"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for products"
          autoComplete="off"
          autoFocus
          className="h-full min-w-0 flex-1 bg-transparent px-3 font-sans text-body text-ink outline-none placeholder:text-ink/50"
        />
        <button type="submit" aria-label="Submit search" className="flex h-full w-10 shrink-0 items-center justify-center text-ink">
          <IconSearch className="h-4 w-auto" />
        </button>
      </form>

      {showDropdown && (
        <div className={cn("absolute top-full z-30 mt-1 border border-sand bg-cream p-4 shadow-ink", variant === "desktop" ? "right-0 w-[360px]" : "inset-x-0")}>
          {hasResults ? (
            <div className="flex flex-col gap-3">
              {results.categories.map((category) => (
                <Link key={category.id} href={`/products/${category.slug}`} className="flex items-center justify-between font-display text-label font-medium text-ink hover:opacity-70">
                  {category.name}
                  <IconChevronRight className="h-3 w-auto text-terracotta" />
                </Link>
              ))}
              {results.subcategories.map(({ category, subcategory }) => (
                <Link
                  key={subcategory.slug}
                  href={`/products/${category.slug}/${subcategory.slug}`}
                  className="flex items-center justify-between font-display text-label font-medium text-ink hover:opacity-70"
                >
                  {subcategory.name}
                  <IconChevronRight className="h-3 w-auto text-terracotta" />
                </Link>
              ))}
              {results.products.map((product) => (
                <Link key={product.href} href={product.href} className="flex items-center justify-between font-sans text-body text-ink hover:opacity-70">
                  <span>{product.name}</span>
                  <span className="shrink-0 pl-3 text-meta">{product.price}</span>
                </Link>
              ))}
              <Link
                href={`/search-results?q=${encodeURIComponent(query)}`}
                className="mt-1 border-t border-sand pt-3 font-sans text-meta font-medium text-terracotta hover:opacity-70"
              >
                See all results for “{query}”
              </Link>
            </div>
          ) : (
            <p className="font-sans text-body text-ink/70">No results for “{query}”.</p>
          )}
        </div>
      )}
    </div>
  );

  if (variant === "mobile") {
    return (
      <div className="fixed inset-x-0 top-[93px] z-30 flex items-center gap-3 border-t border-sand bg-cream px-4 py-3">
        {field}
        <button
          type="button"
          onClick={() => {
            setOpen(false);
            setFieldOpen(false);
          }}
          aria-label="Close search"
          className="flex size-10 shrink-0 items-center justify-center text-ink"
        >
          <IconClose className="size-3" />
        </button>
      </div>
    );
  }

  return field;
}
