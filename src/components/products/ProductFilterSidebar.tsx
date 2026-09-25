"use client";

import { useId, useState } from "react";
import { IconChevronDown, IconChevronRight, IconStar } from "@/components/icons";
import { Checkbox } from "@/components/ui";
import { cn } from "@/lib/cn";
import type { Retailer, Subcategory } from "@/types/content";

const RATING_TIERS = [5, 4, 3, 2, 1];

/**
 * "Filters" sidebar (Product category/subcategory template, Figma 1317:1532/1317:5483; also reused on the
 * Individual retailer page, 1348:11415, minus the "Retailers" group - filtering a retailer's own page by
 * retailer doesn't apply): 330px column, product count, "Price range" two £ fields, "Sub categories" checklist
 * (open by default), "Retailers" checklist (collapsed by default in Figma), "Product rating" star checklist
 * (open by default), "Apply filters" button. Price range and rating have no real per-product data to filter
 * against yet (every fixture product is £00.00 / a flat 4.7), so those two groups are genuinely interactive
 * controls that don't change the results - only the sub-category checklist does, since that's the one field
 * with real underlying data (the rows below are one per subcategory).
 */
export function ProductFilterSidebar({
  subcategories,
  retailers,
  productCount,
  selected,
  onToggle,
  onClear,
}: {
  subcategories: Subcategory[];
  retailers?: Retailer[];
  productCount: number;
  selected: string[];
  onToggle: (slug: string) => void;
  onClear: () => void;
}) {
  const [subOpen, setSubOpen] = useState(true);
  const [retailersOpen, setRetailersOpen] = useState(false);
  const [ratingOpen, setRatingOpen] = useState(true);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [ratings, setRatings] = useState<number[]>([]);
  const [selectedRetailers, setSelectedRetailers] = useState<string[]>([]);
  const priceId = useId();

  const toggleRating = (tier: number) => {
    setRatings((prev) => (prev.includes(tier) ? prev.filter((t) => t !== tier) : [...prev, tier]));
  };
  const toggleRetailer = (id: string) => {
    setSelectedRetailers((prev) => (prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]));
  };

  return (
    <div className="bg-cream">
      <div className="flex items-center gap-4 px-5 pt-6">
        <svg aria-hidden="true" viewBox="0 0 22 22" className="size-[22px] text-ink">
          <path d="M2 6h18M6 11h10M9 16h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        </svg>
        <p className="font-display text-label font-medium text-ink">Filters</p>
      </div>
      <p className="px-5 pt-2 font-sans text-body text-ink/50">Showing {String(productCount).padStart(3, "0")} products</p>

      <div className="mt-[24px] border-t-[0.5px] border-sand px-5 pt-[20px]">
        <p className="font-display text-label font-medium text-ink">Price range</p>
        <div className="mt-4 flex gap-[10px]">
          <label className="flex h-[50px] flex-1 items-center bg-sand/50 px-[10px]">
            <span className="sr-only" id={`${priceId}-min`}>
              Minimum price
            </span>
            <span className="font-sans text-body text-ink">£</span>
            <input
              type="number"
              min={0}
              aria-labelledby={`${priceId}-min`}
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              placeholder="0.00"
              className="ml-1 w-full bg-transparent font-sans text-body text-ink outline-none placeholder:text-ink/50"
            />
          </label>
          <label className="flex h-[50px] flex-1 items-center bg-sand/50 px-[10px]">
            <span className="sr-only" id={`${priceId}-max`}>
              Maximum price
            </span>
            <span className="font-sans text-body text-ink">£</span>
            <input
              type="number"
              min={0}
              aria-labelledby={`${priceId}-max`}
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              placeholder="100.00"
              className="ml-1 w-full bg-transparent font-sans text-body text-ink outline-none placeholder:text-ink/50"
            />
          </label>
        </div>
      </div>

      {subcategories.length > 0 && (
        <div className="mt-5 border-t-[0.5px] border-sand px-5 pt-[20px]">
          <button type="button" onClick={() => setSubOpen((v) => !v)} aria-expanded={subOpen} className="flex w-full items-center justify-between">
            <span className="font-display text-label font-medium text-ink">Sub categories</span>
            <IconChevronDown className={cn("h-[7px] w-[14px] text-ink transition-transform", subOpen && "rotate-180")} />
          </button>
          {subOpen && (
            <ul className="mt-4 flex flex-col gap-3">
              {subcategories.map((sub) => (
                <li key={sub.slug}>
                  <Checkbox
                    variant="filled"
                    label={<span className="text-ink/70">{sub.name}</span>}
                    checked={selected.includes(sub.slug)}
                    onChange={() => onToggle(sub.slug)}
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {retailers && retailers.length > 0 && (
        <div className="mt-5 border-t-[0.5px] border-sand px-5 pt-[20px]">
          <button type="button" onClick={() => setRetailersOpen((v) => !v)} aria-expanded={retailersOpen} className="flex w-full items-center justify-between">
            <span className="font-display text-label font-medium text-ink">Retailers</span>
            {retailersOpen ? (
              <IconChevronDown className="h-[7px] w-[14px] rotate-180 text-ink transition-transform" />
            ) : (
              <IconChevronRight className="h-[14px] w-[7px] text-ink transition-transform" />
            )}
          </button>
          {retailersOpen && (
            <ul className="mt-4 flex flex-col gap-3">
              {retailers.map((retailer) => (
                <li key={retailer.id}>
                  <Checkbox
                    variant="filled"
                    label={<span className="text-ink/70">{retailer.name}</span>}
                    checked={selectedRetailers.includes(retailer.id)}
                    onChange={() => toggleRetailer(retailer.id)}
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <div className="mt-5 border-t-[0.5px] border-sand px-5 pt-[20px]">
        <button type="button" onClick={() => setRatingOpen((v) => !v)} aria-expanded={ratingOpen} className="flex w-full items-center justify-between">
          <span className="font-display text-label font-medium text-ink">Product rating</span>
          <IconChevronDown className={cn("h-[7px] w-[14px] text-ink transition-transform", ratingOpen && "rotate-180")} />
        </button>
        {ratingOpen && (
          <ul className="mt-4 flex flex-col gap-4">
            {RATING_TIERS.map((tier) => (
              <li key={tier} className="flex items-center justify-between">
                <label className="flex cursor-pointer items-center gap-[6px]">
                  <input type="checkbox" checked={ratings.includes(tier)} onChange={() => toggleRating(tier)} className="sr-only" />
                  <ul className="flex gap-[6px]" aria-hidden="true">
                    {Array.from({ length: 5 }, (_, i) => (
                      <li key={i}>
                        <IconStar className={cn("size-5", i < tier ? "text-sage" : "text-sand", ratings.includes(tier) && i < tier && "text-terracotta")} />
                      </li>
                    ))}
                  </ul>
                </label>
                <span className="font-sans text-meta text-ink">{tier === 5 ? "5 stars" : `${tier}+ stars`}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-5 border-t-[0.5px] border-sand px-5 pb-6 pt-5">
        <button
          type="button"
          onClick={() => {
            setMinPrice("");
            setMaxPrice("");
            setRatings([]);
            setSelectedRetailers([]);
            onClear();
          }}
          className="flex h-10 w-full items-center justify-center bg-terracotta font-display text-label font-medium text-cream transition-opacity hover:opacity-90"
        >
          Apply filters
        </button>
      </div>
    </div>
  );
}
