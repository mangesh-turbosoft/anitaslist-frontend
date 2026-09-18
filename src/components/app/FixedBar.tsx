"use client";

import { useState, type ComponentType, type SVGProps } from "react";
import { IconChevronDown, IconDelete, IconNounDone, IconNounMessage, IconNounSave, IconNounShare, IconPencil } from "@/components/icons";
import { Container, Select } from "@/components/ui";
import { cn } from "@/lib/cn";
import { formatGBP } from "@/lib/format";

type Tile = { label: string; Icon: ComponentType<SVGProps<SVGSVGElement>>; onSelect?: () => void; href?: string };

export type FixedBarVariant = "list" | "registry" | "shared";

/**
 * "Fixed item" bar (921:6928, 1440x153; shared view 1440x73). Bone background, hairlines at 0 / 73 / 153.
 * Row 1 (73px): "Total: £00.00" P22 500 24/34 at x=30, a 23x23 terracotta chevron toggle at x=220, and a run of
 * 79px x 73px action tiles (0.5px sand borders) ending at the container edge - icon on top, Noto 400 8/10 label at y=47.
 *   list:     Turn into registry · Add own item · Review deleted items · Download list · Delete list
 *   registry: Turn into registry · Review bought items · Share list · Add own item · Download registry · Delete list
 * Row 2 (80px): three filter selects (179x40 + 39x40 chevron, 1px sand border, P22 500 16/19): Retailer · Category · Status.
 * The layer is named "Fixed" so it is sticky; that reading is unconfirmed (plan section 18 q4).
 */
export function FixedBar({
  totalPence,
  variant,
  onAction,
}: {
  totalPence: number;
  variant: FixedBarVariant;
  onAction?: (action: string) => void;
}) {
  const [filtersOpen, setFiltersOpen] = useState(true);
  const act = (a: string) => () => onAction?.(a);

  const tiles: Tile[] =
    variant === "registry"
      ? [
          { label: "Turn into registry", Icon: IconPencil, onSelect: act("convert") },
          { label: "Review bought items", Icon: IconNounMessage, onSelect: act("review-bought") },
          { label: "Share list", Icon: IconNounShare, onSelect: act("share") },
          { label: "Add own item", Icon: IconNounDone, onSelect: act("add-own") },
          { label: "Download registry", Icon: IconNounSave, onSelect: act("download") },
          { label: "Delete list", Icon: IconDelete, onSelect: act("delete") },
        ]
      : variant === "list"
        ? [
            { label: "Turn into registry", Icon: IconPencil, onSelect: act("convert") },
            { label: "Add own item", Icon: IconNounDone, onSelect: act("add-own") },
            { label: "Review deleted items", Icon: IconNounMessage, onSelect: act("review-deleted") },
            { label: "Download list", Icon: IconNounSave, onSelect: act("download") },
            { label: "Delete list", Icon: IconDelete, onSelect: act("delete") },
          ]
        : [];

  return (
    <div className="sticky top-[93px] z-30 mt-[25px] border-y-[0.5px] border-sand bg-bone xl:top-20">
      <Container className="flex min-h-[73px] flex-wrap items-stretch justify-between gap-x-6">
        <div className="flex items-center gap-[10px] py-[19px]">
          <p className="font-display text-h3 font-medium">Total: {formatGBP(totalPence)}</p>
          {variant !== "shared" && (
            <button
              type="button"
              onClick={() => setFiltersOpen((o) => !o)}
              aria-expanded={filtersOpen}
              aria-controls="list-filters"
              aria-label={filtersOpen ? "Hide filters" : "Show filters"}
              className="flex size-[23px] items-center justify-center bg-terracotta text-cream"
            >
              <IconChevronDown className={cn("h-[6px] w-3 transition-transform", !filtersOpen && "-rotate-90")} />
            </button>
          )}
        </div>
        {tiles.length > 0 && (
          <ul className="flex flex-wrap md:-mr-[30px] md:flex-nowrap">
            {tiles.map((t) => (
              <li key={t.label} className="border-l-[0.5px] border-sand last:border-r-[0.5px]">
                <button
                  type="button"
                  onClick={t.onSelect}
                  className="flex h-[73px] w-[79px] flex-col items-center pt-[11px] text-ink hover:bg-sand/30"
                >
                  <t.Icon className="size-8" />
                  <span className="mt-1 px-1 font-sans text-[8px] leading-[10px]">{t.label}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </Container>
      {variant !== "shared" && filtersOpen && (
        <div id="list-filters" className="border-t-[0.5px] border-sand">
          <Container className="flex flex-wrap gap-x-6 gap-y-3 py-5">
            <FilterSelect label="Retailer" options={["All retailers"]} />
            <FilterSelect label="Category" options={["All categories"]} />
            <FilterSelect label="Status" options={["All", "To buy", "Bought", "Reserved"]} />
          </Container>
        </div>
      )}
    </div>
  );
}

function FilterSelect({ label, options }: { label: string; options: string[] }) {
  // Figma draws the trigger text as a static "Filter: Category" regardless of what's picked - kept as-is via
  // renderValue rather than switching to a value-reflecting display, to match the original behaviour exactly.
  return (
    <Select
      label={`Filter: ${label}`}
      options={options.map((o) => ({ value: o, label: o }))}
      defaultValue={options[0]}
      renderValue={() => `Filter: ${label}`}
      className="w-[218px]"
      fieldClassName="h-10 w-full border border-r-0 border-sand pl-[10px] font-display text-label font-medium"
      chevronClassName="h-10 w-[39px] border border-sand text-ink"
    />
  );
}
