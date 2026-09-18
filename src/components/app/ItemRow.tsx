"use client";

import Image from "next/image";
import { useId, useState } from "react";
import { IconDelete, IconPencil, IconPlus } from "@/components/icons";
import { Select } from "@/components/ui";
import { cn } from "@/lib/cn";
import { formatGBP, formatShortDate } from "@/lib/format";
import type { ItemStatus, ListItem } from "@/types/app";

export type RowVariant = "list" | "registry" | "shared";

const STATUS: { value: ItemStatus; label: string }[] = [
  { value: "to-buy", label: "To buy" },
  { value: "bought", label: "Bought" },
  { value: "reserved", label: "Reserved" },
];

/**
 * Product row (Group 35, 1380x150): 0.5px sand border; 150x150 image holder (#CEBFA7, "Product image" placeholder);
 * subcategory P22 500 16/20 at (170,22) with a bold "Optional |" / "Recommended |" prefix on registries;
 * name P22 500 24/34 at (170,45); notes Noto 15/22 at (171,85); pencil 30x30 at (467,15).
 * Controls (x for registry / list): quantity stepper 3x40 at 565/621; price P22 500 16/22 centred in 122 at 706/762;
 * "To buy" status dropdown 125x40 at 858/914; terracotta "Buy" 96x40 at 1013/1069; registry adds a sage "Reserved"
 * 96x40 at 1155 with a "Reserved by" popover; shared view shows a "Reserve" button at 1210 instead;
 * list shows "Save for later" Noto 15/22 at 1187. Delete 30x30 at 1318.
 */
export function ItemRow({ item, variant, onChange, onDelete }: { item: ListItem; variant: RowVariant; onChange: (next: ListItem) => void; onDelete: () => void }) {
  const [showReserved, setShowReserved] = useState(false);
  const id = useId();
  const tierLabel = item.tier === "optional" ? "Optional" : item.tier === "recommended" ? "Recommended" : null;

  return (
    <li className="relative flex min-h-[150px] flex-col border-[0.5px] border-sand lg:flex-row">
      <div className="relative flex h-[150px] w-full shrink-0 items-center justify-center bg-sand lg:w-[150px]">
        {item.image ? (
          <Image src={item.image.src} alt="" fill sizes="150px" className="object-cover" />
        ) : (
          <span className="px-4 text-center font-display text-label font-medium" aria-hidden="true">
            Product image
          </span>
        )}
      </div>

      <div className={cn("relative min-w-0 flex-1 px-5 pb-5 pt-[22px] lg:flex-none lg:pr-0", variant === "registry" ? "lg:w-[395px]" : "lg:w-[451px]")}>
        <p className="font-display text-[16px] font-medium leading-5">
          {tierLabel && <b className="font-bold">{tierLabel} | </b>}
          {item.subcategory}
        </p>
        <h3 className="mt-[3px] max-w-[305px] font-display text-h3 font-medium">{item.name}</h3>
        <p className="mt-[6px] max-w-[391px] font-sans text-body">{item.notes}</p>
      </div>

      {variant !== "shared" && (
        <button type="button" aria-label={`Edit ${item.name}`} className="absolute right-4 top-4 text-ink hover:opacity-70 lg:left-[467px] lg:right-auto lg:top-[15px]">
          <IconPencil className="size-[30px]" />
        </button>
      )}

      <div className={cn("flex flex-wrap items-center gap-x-6 gap-y-3 px-5 pb-5 lg:ml-auto lg:flex-nowrap lg:gap-x-0 lg:pl-0 lg:pt-[54px]", variant === "shared" ? "lg:pr-[74px]" : "lg:pr-[32px]")}>
        {/* Quantity */}
        <div className="flex" role="group" aria-label="Quantity">
          <button type="button" onClick={() => onChange({ ...item, quantity: Math.max(1, item.quantity - 1) })} aria-label="Decrease quantity" className="flex size-10 items-center justify-center border border-sand">
            <span aria-hidden="true" className="block h-[2px] w-[13px] bg-ink" />
          </button>
          <output className="flex size-10 items-center justify-center bg-sand/50 font-display text-label-md font-medium text-black">{item.quantity}</output>
          <button type="button" onClick={() => onChange({ ...item, quantity: item.quantity + 1 })} aria-label="Increase quantity" className="flex size-10 items-center justify-center border border-sand text-ink">
            <IconPlus className="size-[14px]" />
          </button>
        </div>

        {/* Amount */}
        <p className="w-[122px] text-center font-display text-label-md font-medium text-black lg:ml-[21px]">{formatGBP(item.pricePence * item.quantity)}</p>

        {/* Status */}
        <Select
          label="Status"
          options={STATUS}
          value={item.status}
          onChange={(v) => onChange({ ...item, status: v as ItemStatus })}
          className="w-[125px] lg:ml-[30px]"
          fieldClassName="h-10 w-full border border-r-0 border-sand bg-transparent pl-3 font-display text-label font-medium text-ink"
          chevronClassName="h-10 w-[39px] border border-sand text-ink"
        />

        {/* Purchase */}
        <button type="button" onClick={() => onChange({ ...item, status: "bought" })} className="h-10 w-24 bg-terracotta font-display text-label font-medium text-cream hover:opacity-90 lg:ml-[30px]">
          Buy
        </button>

        {/* Reserved / Reserve / Save for later */}
        {variant === "registry" && (
          <div className="relative lg:ml-[46px]" onMouseEnter={() => setShowReserved(true)} onMouseLeave={() => setShowReserved(false)}>
            <button
              type="button"
              aria-describedby={item.reservedBy ? `${id}-reserved` : undefined}
              onFocus={() => setShowReserved(true)}
              onBlur={() => setShowReserved(false)}
              className={cn("h-10 w-24 font-display text-label font-medium text-cream", item.reservedBy ? "bg-sage" : "bg-sage/40")}
              disabled={!item.reservedBy}
            >
              Reserved
            </button>
            {item.reservedBy && (
              <div
                id={`${id}-reserved`}
                role="tooltip"
                className={cn("absolute right-0 top-[45px] z-10 w-[143px] border-[0.5px] border-sand bg-cream p-[11px] font-sans text-body", !showReserved && "sr-only")}
              >
                <p>Reserved by: {item.reservedBy.name}</p>
                <p>{formatShortDate(item.reservedBy.date)}</p>
              </div>
            )}
          </div>
        )}
        {variant === "shared" && (
          <button
            type="button"
            onClick={() => onChange({ ...item, status: "reserved", reservedBy: { name: "You", date: new Date().toISOString() } })}
            disabled={item.status === "reserved"}
            className="h-10 w-24 bg-terracotta font-display text-label font-medium text-cream hover:opacity-90 disabled:opacity-60 lg:ml-[45px]"
          >
            {item.status === "reserved" ? "Reserved" : "Reserve"}
          </button>
        )}
        {variant === "list" && (
          <button type="button" className="w-[110px] text-center font-sans text-body hover:underline lg:ml-[22px]">
            Save for later
          </button>
        )}

        {variant !== "shared" && (
          <button type="button" onClick={onDelete} aria-label={`Delete ${item.name}`} className={cn("flex size-[30px] items-center justify-center text-ink hover:opacity-70", variant === "registry" ? "lg:ml-[67px]" : "lg:ml-[21px]")}>
            <IconDelete className="size-8" />
          </button>
        )}
      </div>
    </li>
  );
}
