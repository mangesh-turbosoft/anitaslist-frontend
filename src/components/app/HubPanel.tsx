"use client";

import Link from "next/link";
import { useState } from "react";
import { IconDelete, IconPlus } from "@/components/icons";
import { BigCta } from "@/components/app/EmptyState";
import { cn } from "@/lib/cn";

export type PanelRow = {
  id: string;
  title: string;
  meta?: string;
  href: string;
  /** Colour-codes the row's left edge (e.g. mine vs shared with me). Omit for panels with only one kind of row. */
  accent?: "mine" | "shared";
  /** false hides the delete button - e.g. a registry someone else owns isn't yours to delete. Defaults to true. */
  deletable?: boolean;
};

type Props = {
  title: string;
  rows: PanelRow[];
  /** Label + href for the top-right "Create new …" action. */
  action?: { label: string; href: string };
  /** Colour key shown where the action would be, for panels whose rows carry an `accent` (e.g. My registries). */
  legend?: { accent: "mine" | "shared"; label: string }[];
  viewAll: { label: string; href: string };
  rowButtonLabel: string;
  empty: { cta?: { label: string; href: string }; heading: string; body: string };
};

const ACCENT_BG: Record<"mine" | "shared", string> = { mine: "bg-sage", shared: "bg-gold" };

/**
 * Hub panel (887:925, 690x485 populated / 898:1739, 690x377 empty). 0.5px sand border, tiled edge to edge 2x2.
 * Six-dot drag handle at (44,46); H2 P22 400 32/44 at (76,39); action at the top-right (label + 51x51 terracotta
 * plus, right inset 56). Rows 594x70 at x=42 from y=110 at an 80px pitch: cream @25% fill, 1px sand border,
 * title P22 500 24/34 (or title + Noto 15/22 date), "View list" 116x40, a 53px bin column. "View all …" at y=430.
 * Empty: 52px CTA centred at y=110, subheading P22 500 24/34 at y=192, paragraph Noto 15/22 (395 wide) at y=233.
 * The drag handle / "Drag to move block" tooltip implies re-ordering; behaviour is unconfirmed (plan section 18).
 * Registry rows also carry a colour-coded left accent (sage = mine, gold = shared with me) with a matching
 * legend in place of the action slot - Figma only draws two plain text lines here ("My registries" /
 * "Registries shared with me"), so this combined, colour-coded list is a UX resolution of that ambiguity.
 */
export function HubPanel({ title, rows: initialRows, action, legend, viewAll, rowButtonLabel, empty }: Props) {
  const [rows, setRows] = useState(initialRows);
  const remove = (id: string) => {
    // TODO (Laravel phase): DELETE. Local only for now.
    if (window.confirm("Delete this item?")) setRows((r) => r.filter((x) => x.id !== id));
  };
  const populated = rows.length > 0;

  return (
    <section aria-label={title} className={cn("flex flex-col border-[0.5px] border-sand px-5 pb-8 pt-9 md:pl-[42px] md:pr-[54px]", populated ? "xl:min-h-[485px]" : "xl:min-h-[377px]")}>
      <header className="flex flex-wrap items-start justify-between gap-x-6 gap-y-3">
        <div className="flex items-start gap-[18px] pt-[3px]">
          <span aria-hidden="true" className="mt-[7px] grid grid-cols-2 gap-x-1 gap-y-[7px] pl-[2px]" title="Drag to move block">
            {Array.from({ length: 6 }, (_, i) => (
              <span key={i} className="size-[5px] rounded-full bg-ink" />
            ))}
          </span>
          <h2 className="text-h2">{title}</h2>
        </div>
        {action && !legend && (
          <Link href={action.href} className="inline-flex items-center gap-5 font-display text-label-md font-medium text-ink hover:opacity-80 md:mr-[2px]">
            {action.label}
            <span aria-hidden="true" className="flex size-[51px] items-center justify-center bg-terracotta text-cream">
              <IconPlus className="size-8" />
            </span>
          </Link>
        )}
        {legend && (
          <ul className="flex flex-col items-start gap-[5px] md:mr-[2px]" aria-label={`${title} colour key`}>
            {legend.map((l) => (
              <li key={l.accent} className="flex items-center gap-2 font-sans text-body">
                <span aria-hidden="true" className={cn("size-4 shrink-0", ACCENT_BG[l.accent])} />
                {l.label}
              </li>
            ))}
          </ul>
        )}
      </header>

      {populated ? (
        <>
          <ul className="mt-[23px] flex flex-col gap-[10px]">
            {/* Below sm, a fixed 70px-tall horizontal row leaves the title only ~130px next to a full-size
                button and delete slot - real row names (not just the lorem ipsum placeholders) would still get
                cut to a handful of characters. Stacking title-then-actions below sm gives the title the full
                row width instead; sm and up is the exact original Figma row unchanged. */}
            {rows.slice(0, 4).map((row) => (
              <li key={row.id} className="flex flex-col border border-sand bg-cream/25 sm:h-[70px] sm:flex-row sm:items-stretch">
                {row.accent && <span aria-hidden="true" className={cn("h-[6px] w-full shrink-0 sm:h-auto sm:w-[10px] sm:self-stretch", ACCENT_BG[row.accent])} />}
                <div className="flex min-w-0 flex-1 items-center px-[19px] py-[14px] sm:py-0 sm:pl-[19px] sm:pr-0">
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-display text-h3 font-medium">{row.title}</p>
                    {row.meta && <p className="font-sans text-body">{row.meta}</p>}
                  </div>
                </div>
                <div className="flex h-10 w-full shrink-0 items-stretch border-t border-sand sm:h-full sm:w-auto sm:border-t-0">
                  {/* Fixed 116px matches Figma at xl; below that the button grows to fill the row (mobile) or
                      hugs its label (tablet) instead of forcing the title down to a handful of characters. */}
                  <Link
                    href={row.href}
                    className="mr-[11px] inline-flex h-10 flex-1 items-center justify-center whitespace-nowrap bg-terracotta px-3 font-display text-label font-medium text-cream hover:opacity-90 sm:h-full sm:flex-none xl:w-[116px] xl:px-0"
                  >
                    {rowButtonLabel}
                  </Link>
                  {/* Slot is always reserved (border + width) so the button lands in the same place on every
                      row - only the icon inside is conditional on whether this row is deletable. */}
                  <div className="flex h-10 w-[53px] shrink-0 items-center justify-center border-l border-sand sm:h-full">
                    {row.deletable !== false && (
                      <button type="button" onClick={() => remove(row.id)} aria-label={`Delete ${row.title}`} className="flex h-full w-full items-center justify-center text-ink hover:bg-sand/40">
                        <IconDelete className="size-8" />
                      </button>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <Link href={viewAll.href} className="mt-[10px] self-start font-sans text-body hover:underline">
            {viewAll.label}
          </Link>
        </>
      ) : (
        <div className="mt-[23px] flex flex-col items-center text-center">
          {empty.cta && <BigCta {...empty.cta} />}
          <p className={cn("max-w-[446px] font-display text-h3 font-medium", empty.cta ? "mt-[30px]" : "mt-[1px]")}>{empty.heading}</p>
          <p className="mt-[7px] max-w-[395px] font-sans text-body">{empty.body}</p>
        </div>
      )}
    </section>
  );
}
