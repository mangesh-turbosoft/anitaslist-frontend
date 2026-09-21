"use client";

import { useState, type FocusEvent } from "react";
import { CategoryTile } from "@/components/cards/CategoryTile";
import { IconSearch } from "@/components/icons";
import { Container, Eyebrow, RichText } from "@/components/ui";
import type { BrowseProductsContent } from "@/types/content";

/**
 * Browse all products (Figma 183:5020, 1440x1764), adjusted per feedback: the search bar sits inside the
 * normal content column (not full-bleed), and the "Product/Collection" summary opens as a floating dropdown
 * under it on focus - overlaying the grid below instead of pushing it down as a permanent block.
 */
export function BrowseProductsPage({ content }: { content: BrowseProductsContent }) {
  const [open, setOpen] = useState(false);

  const closeUnlessInside = (e: FocusEvent<HTMLFormElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setOpen(false);
  };

  return (
    <>
      <Container className="pt-[50px]">
        <Eyebrow>{content.eyebrow}</Eyebrow>
        <h1 className="mt-1 text-[36px] leading-[44px] xl:text-display">
          <RichText text={content.heading} />
        </h1>
      </Container>

      <Container className="mt-8">
        <form
          role="search"
          action="/search"
          onFocus={() => setOpen(true)}
          onBlur={closeUnlessInside}
          className="relative flex h-[70px] w-full border border-sand"
        >
          <label htmlFor="browse-products-search" className="sr-only">
            Search products
          </label>
          <input
            id="browse-products-search"
            name="q"
            type="search"
            placeholder={content.searchPlaceholder}
            autoComplete="off"
            className="flex-1 bg-transparent pl-5 font-display text-h3 italic text-ink outline-none placeholder:text-ink/50"
          />
          <button type="submit" aria-label="Search" className="flex w-[70px] shrink-0 items-center justify-center border-l-[0.5px] border-sand text-ink">
            <IconSearch className="h-[17.5px] w-auto" />
          </button>

          {open && (
            <div className="absolute inset-x-0 top-full z-20 border border-t-0 border-sand bg-cream p-[30px] shadow-ink">
              <Eyebrow compact>Product</Eyebrow>
              <div className="mt-1 flex flex-col">
                {content.filterSummary.productLines.map((line, i) => (
                  <p key={i} className="font-display text-h3 font-medium text-ink">
                    {line}
                  </p>
                ))}
              </div>
              <Eyebrow compact className="mt-[27px]">
                Collection
              </Eyebrow>
              <div className="mt-1 flex flex-col">
                {content.filterSummary.collectionLines.map((line, i) => (
                  <p key={i} className="font-display text-h3 font-medium text-ink">
                    {line}
                  </p>
                ))}
              </div>
            </div>
          )}
        </form>
      </Container>

      <Container className="mt-8 pb-[50px]">
        <ul className="grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 xl:grid-cols-4">
          {content.categories.map((category) => (
            <li key={category.id}>
              <CategoryTile category={category} />
            </li>
          ))}
        </ul>
      </Container>
    </>
  );
}
