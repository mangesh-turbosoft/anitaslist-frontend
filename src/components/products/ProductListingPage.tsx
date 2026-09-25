"use client";

import Link from "next/link";
import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { Carousel, CarouselArrows, CarouselSlide, CarouselTrack } from "@/components/carousel/Carousel";
import { ProductCard } from "@/components/cards/ProductCard";
import { NoteSlider } from "@/components/cards/NoteSlider";
import { AddToListControl } from "@/components/lists/AddToListControl";
import { ProductFilterSidebar } from "@/components/products/ProductFilterSidebar";
import { Breadcrumb, Container, RichText } from "@/components/ui";
import type { ProductListingContent } from "@/types/content";

const CARD_WIDTH = 330;
const CARD_GAP = 20;
const STEP = CARD_WIDTH + CARD_GAP;

/**
 * Clips its own parent-width visible area down to the largest exact multiple of (card + gap), so the row
 * inside never shows a partially-cut trailing card at any scroll position - not on load, and not after
 * stepping to the last slide via the arrows, since CarouselArrows always snaps scroll to a card's left edge.
 * A CSS-only fade can't do this (it doesn't know the container's width), and the shared Carousel/CarouselTrack
 * primitives (used by many older, already-approved pages) are left untouched - this only wraps the track here.
 */
function WholeCardsViewport({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number | null>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    const parent = el?.parentElement;
    if (!parent) return;
    const update = () => {
      const available = parent.clientWidth;
      const whole = Math.max(1, Math.floor((available + CARD_GAP) / STEP));
      setWidth(whole * STEP - CARD_GAP);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(parent);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={ref} className="max-w-full overflow-hidden" style={width != null ? { width } : undefined}>
      {children}
    </div>
  );
}

/**
 * Shared "browse products" template behind the Category page (1317:1532), Subcategory page (1317:5483) and
 * Individual retailer page (1348:11415) - all three share the same shape: hero + breadcrumb + Note from Anita,
 * a 330px filter sidebar, and one horizontally-scrolling carousel row per subcategory. Checking sub-category
 * boxes in the sidebar filters which rows show, live (see ProductFilterSidebar's own note on price/rating).
 */
export function ProductListingPage({ content }: { content: ProductListingContent }) {
  const [selected, setSelected] = useState<string[]>([]);
  const toggle = (slug: string) => setSelected((prev) => (prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]));

  const rows = useMemo(() => {
    if (selected.length === 0) return content.rows;
    return content.rows.filter((row) => selected.includes(row.id));
  }, [content.rows, selected]);

  return (
    <>
      <Container className="grid grid-cols-1 gap-8 pt-[35px] xl:grid-cols-[610px_minmax(0,1fr)] xl:gap-0">
        <div>
          <Breadcrumb trail={content.trail} current={content.current} />
          <h1 className="mt-2 text-[36px] leading-[44px] xl:mt-[26px] xl:text-display">
            <RichText text={content.heading} />
          </h1>
        </div>
        <div className="min-w-0 xl:pl-[91px]">
          <NoteSlider notes={content.notes} />
        </div>
      </Container>

      <div className="mt-10 border-y-[0.5px] border-sand py-5">
        <Container className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-display text-h3 font-medium text-ink">
            <em className="italic">Bibendum </em>odio sit amet aliquam sit.
          </p>
          <AddToListControl />
        </Container>
      </div>

      <Container className="mt-8 grid grid-cols-1 gap-5 pb-[50px] xl:grid-cols-[330px_minmax(0,1fr)] xl:items-start">
        <aside className="xl:sticky xl:top-[100px]">
          <ProductFilterSidebar
            subcategories={content.subcategories}
            retailers={content.retailers}
            productCount={content.productCount}
            selected={selected}
            onToggle={toggle}
            onClear={() => setSelected([])}
          />
        </aside>

        <div className="min-w-0 flex flex-col gap-16">
          {rows.length === 0 ? (
            <p className="font-sans text-body text-ink">No products match the selected filters.</p>
          ) : (
            rows.map((row) => {
              const headingId = `${row.id}-heading`;
              return (
                <section key={row.id} aria-labelledby={headingId}>
                  <Carousel label={row.heading} loop>
                    <div className="flex h-11 items-center justify-between gap-4">
                      <h2 id={headingId} className="text-h2">
                        {row.heading}
                      </h2>
                      <div className="flex items-center gap-4">
                        <Link href={`${content.subcategoryBasePath}/${row.id}`} className="whitespace-nowrap font-sans text-body text-ink underline underline-offset-2 hover:opacity-70">
                          View all {row.heading.toLowerCase()}
                        </Link>
                        <CarouselArrows />
                      </div>
                    </div>
                    <WholeCardsViewport>
                      <CarouselTrack className="-mt-[5px] gap-5 pt-[22px] pb-1">
                        {row.items.map((p, i) => (
                          <CarouselSlide key={p.id} aria-label={`${i + 1} of ${row.items.length}`} className="w-[330px]">
                            <ProductCard {...p} />
                          </CarouselSlide>
                        ))}
                      </CarouselTrack>
                    </WholeCardsViewport>
                  </Carousel>
                </section>
              );
            })
          )}
        </div>
      </Container>
    </>
  );
}
