"use client";

import Link from "next/link";
import { useState } from "react";
import { ItemRow, type RowVariant } from "@/components/app/ItemRow";
import { IconPlus } from "@/components/icons";
import { BuyProductModal } from "@/components/modals/BuyProductModal";
import { ReserveItemModal } from "@/components/modals/ReserveItemModal";
import { Container } from "@/components/ui";
import type { ItemCategory, ListItem } from "@/types/app";

/** Header cells mirror the control widths/margins in ItemRow so they centre over their columns (Figma: 120px labels). */
const HEADERS: Record<RowVariant, { label: string; w: number; ml: number }[]> = {
  list: [
    { label: "Quantity", w: 120, ml: 0 },
    { label: "Amount", w: 122, ml: 21 },
    { label: "Status", w: 125, ml: 30 },
    { label: "Purchase", w: 96, ml: 30 },
    { label: "", w: 110, ml: 22 },
    { label: "", w: 30, ml: 21 },
  ],
  registry: [
    { label: "Quantity", w: 120, ml: 0 },
    { label: "Amount", w: 122, ml: 21 },
    { label: "Status", w: 125, ml: 30 },
    { label: "Purchase", w: 96, ml: 30 },
    { label: "Reserved", w: 96, ml: 46 },
    { label: "", w: 30, ml: 67 },
  ],
  shared: [
    { label: "Quantity", w: 120, ml: 0 },
    { label: "Amount", w: 122, ml: 21 },
    { label: "Status", w: 125, ml: 30 },
    { label: "Purchase", w: 96, ml: 30 },
    { label: "Reserve", w: 96, ml: 45 },
  ],
};

/**
 * Category block (Cat items 916:4388 / Product items 1011:10660 / shared Group 71 / journey Group 86, 1380 wide):
 * H2 "Product category" P22 400 32/44; column headers Noto 600 16/22 UPPER at y=50 ("Product" left, the rest
 * centred over their 120px controls); rows from y=80 at a 160px pitch (150 + 10). Blocks repeat at a 740px pitch.
 * Journey lists start as slots (Group 86): "Recommended" P22 500 15/22, subcategory P22 500 24/34 and three 174x40
 * buttons - Browse products · Get expert advise (sic) · View sample lists - plus quantity and "Save for later".
 */
export function ItemsBlock({
  category,
  variant,
  onUpdateItem,
  onRemoveItem,
}: {
  category: ItemCategory;
  variant: RowVariant;
  /** Item state is lifted to DetailItemsSection so the cross-cutting panels (bought items, add own item,
   * review deleted items) can see and mutate it across every category, not just this block's own. */
  onUpdateItem: (next: ListItem) => void;
  onRemoveItem: (id: string) => void;
}) {
  const items = category.items.filter((i) => i.status !== "deleted");
  const [pending, setPending] = useState<{ item: ListItem; action: "reserve" | "buy" } | null>(null);
  const update = onUpdateItem;
  const remove = (id: string) => {
    if (window.confirm("Delete this item?")) onRemoveItem(id);
  };
  const save = (next: ListItem) => {
    update(next);
    setPending(null);
  };

  return (
    <section aria-labelledby={`${category.id}-h`}>
      <Container>
        <h2 id={`${category.id}-h`} className="text-h2">
          {category.name}
        </h2>
        <div className="mt-[6px] hidden h-[22px] font-sans text-eyebrow-xs font-semibold uppercase xl:flex">
          <span className="w-[330px]">Product</span>
          <span className={variant === "shared" ? "ml-auto flex pr-[74px]" : "ml-auto flex pr-[32px]"}>
            {HEADERS[variant].map((h, i) => (
              <span key={i} className="text-center" style={{ width: h.w, marginLeft: h.ml }} aria-hidden={h.label ? undefined : true}>
                {h.label}
              </span>
            ))}
          </span>
        </div>
        <ul className="mt-[8px] flex flex-col gap-[10px]">
          {items.map((item) => (
            <ItemRow
              key={item.id}
              item={item}
              variant={variant}
              onChange={update}
              onDelete={() => remove(item.id)}
              onBuyClick={() => setPending({ item, action: "buy" })}
              onReserveClick={() => setPending({ item, action: "reserve" })}
            />
          ))}
          {category.slots.map((slot) => (
            <li key={slot.id} className="flex min-h-[150px] flex-col justify-between gap-4 border-[0.5px] border-sand p-5 xl:flex-row xl:items-start">
              <div>
                <p className="font-display text-[15px] font-medium leading-[22px]">{slot.tier === "recommended" ? "Recommended" : "Optional"}</p>
                <p className="mt-0 font-display text-h3 font-medium">{slot.name}</p>
                <div className="mt-[9px] flex flex-wrap gap-[10px]">
                  <Link href="/products" className="inline-flex h-10 w-[174px] items-center justify-center bg-terracotta font-display text-label font-medium text-cream hover:opacity-90">
                    Browse products
                  </Link>
                  <Link href="/expert-advice" className="inline-flex h-10 w-[174px] items-center justify-center bg-terracotta font-display text-label font-medium text-cream hover:opacity-90">
                    Get expert advise
                  </Link>
                  <Link href="/sample-lists" className="inline-flex h-10 w-[174px] items-center justify-center bg-terracotta font-display text-label font-medium text-cream hover:opacity-90">
                    View sample lists
                  </Link>
                </div>
              </div>
              <div className="flex items-center gap-6 xl:mr-[63px] xl:mt-9">
                <div className="flex" role="group" aria-label="Quantity">
                  <span className="flex size-10 items-center justify-center border border-sand">
                    <span aria-hidden="true" className="block h-[2px] w-[13px] bg-ink" />
                  </span>
                  <output className="flex size-10 items-center justify-center bg-sand/50 font-display text-label-md font-medium text-black">{slot.quantity}</output>
                  <span className="flex size-10 items-center justify-center border border-sand text-ink">
                    <IconPlus className="size-[14px]" />
                  </span>
                </div>
                <button type="button" className="w-[110px] font-sans text-body hover:underline xl:ml-[420px]">
                  Save for later
                </button>
              </div>
            </li>
          ))}
        </ul>
      </Container>

      <ReserveItemModal
        open={pending?.action === "reserve"}
        onClose={() => setPending(null)}
        item={pending?.action === "reserve" ? pending.item : null}
        categoryName={category.name}
        onSave={save}
      />
      <BuyProductModal open={pending?.action === "buy"} onClose={() => setPending(null)} item={pending?.action === "buy" ? pending.item : null} onSave={save} />
    </section>
  );
}
