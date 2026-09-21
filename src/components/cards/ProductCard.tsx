"use client";

import { Image } from "@/components/ui/Image";
import { useId, useState } from "react";
import { IconPlus, IconStar } from "@/components/icons";
import { useListSelection } from "@/components/lists/ListSelection";
import { Select } from "@/components/ui";
import { cn } from "@/lib/cn";
import type { Product } from "@/types/content";

/**
 * Product card (Sample list sub page, "Product item" 330x449).
 * Default: white, 0.5px sand border; hover lifts 5px and swaps to a 1px terracotta border (drawn on the 2nd card).
 * 40x40 terracotta plus flush top-right (Figma shows an "Add to list" tooltip beside it); 248x248 photo centred
 * 5px down; optional "Best seller" tag 107x30 sage at (20,20); info panel 330x190 cream with 0.5px sand top border:
 * name P22 500 16/26 (2 lines), brand Noto 15/22 sage, five 20px sage stars + "4.7 (17.7k)" Noto 12/22 ink@50%,
 * price Noto 500 15/22.
 * Expanded (drawn as "Rectangle 93"): cream panel with 70x70 thumb, name, price, hairline, Colour / Size selects
 * (199+39 wide), Quantity stepper (40/40/40), hairline, and a 288x40 "Add to ‘list name’" button with a sand plus tile.
 */
export function ProductCard(product: Product) {
  const { active } = useListSelection();
  const [open, setOpen] = useState(false);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const id = useId();

  const add = () => {
    // TODO (Laravel phase): POST list item. No backend yet - acknowledge only.
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2000);
  };

  return (
    <article
      className={cn(
        "group relative flex h-[449px] w-[330px] flex-col transition-[transform,border-color,border-width] duration-150",
        open
          ? "border-[0.5px] border-sand bg-cream"
          : "border-[0.5px] border-sand bg-white hover:-translate-y-[5px] hover:border hover:border-terracotta",
      )}
      aria-labelledby={`${id}-name`}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={`${id}-panel`}
        aria-label={open ? "Close add to list" : `Add ${product.name} to list`}
        title={open ? undefined : "Add to list"}
        className="absolute right-[-0.5px] top-[-0.5px] z-10 flex size-10 items-center justify-center bg-terracotta text-cream"
      >
        <IconPlus className={cn("size-[26px] transition-transform duration-150", open && "rotate-45")} />
      </button>

      {!open ? (
        <>
          {product.tag && (
            <span className="absolute left-5 top-5 z-10 inline-flex h-[30px] items-center bg-sage px-[13px] font-display text-[16px] font-medium leading-[26px] text-cream">
              {product.tag}
            </span>
          )}
          <div className="relative mx-auto mt-[5px] size-[248px]">
            <Image src={product.image.src} alt={product.image.alt} fill sizes="248px" className="object-cover" />
          </div>
          <div className="mt-auto h-[190px] border-t-[0.5px] border-sand bg-cream p-5">
            <h3 id={`${id}-name`} className="line-clamp-2 max-w-[289px] font-display text-[16px] font-medium leading-[26px]">
              {product.name}
            </h3>
            <p className="mt-[5px] font-sans text-body text-sage">{product.brand}</p>
            <div className="mt-[11px] flex items-center">
              <ul className="flex gap-[2px] text-sage" aria-label={`Rated ${product.rating.value} out of 5`}>
                {Array.from({ length: 5 }, (_, i) => (
                  <li key={i}>
                    <IconStar className="size-5" />
                  </li>
                ))}
              </ul>
              <span className="ml-[9px] font-sans text-meta text-ink/50">
                {product.rating.value} ({product.rating.count})
              </span>
            </div>
            <p className="mt-[21px] font-sans text-body font-medium">{product.price}</p>
          </div>
        </>
      ) : (
        <div id={`${id}-panel`} className="flex h-full flex-col p-5 pb-[22px]">
          <div className="relative size-[70px]">
            <Image src={product.image.src} alt="" fill sizes="70px" className="object-cover" />
          </div>
          <h3 id={`${id}-name`} className="mt-3 line-clamp-2 max-w-[289px] font-display text-[16px] font-medium leading-[26px]">
            {product.name}
          </h3>
          <p className="mt-[6px] font-sans text-body font-medium">{product.price}</p>
          <div className="mt-[20px] border-t-[0.5px] border-sand pt-5">
            <OptionSelect label="Colour" options={product.options.colour} />
            <OptionSelect label="Size" options={product.options.size} className="mt-[5px]" />
            <div className="mt-[5px] flex h-10 items-center">
              <span id={`${id}-qty-label`} className="w-[90px] font-sans text-body">
                Quantity
              </span>
              <div className="flex" role="group" aria-labelledby={`${id}-qty-label`}>
                <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity" className="flex size-10 items-center justify-center border border-sand text-ink">
                  <span aria-hidden="true" className="block h-[2px] w-[13px] bg-ink" />
                </button>
                <output className="flex size-10 items-center justify-center bg-sand/50 font-display text-label-md font-medium text-ink/50" aria-live="polite">
                  {qty}
                </output>
                <button type="button" onClick={() => setQty((q) => q + 1)} aria-label="Increase quantity" className="flex size-10 items-center justify-center border border-sand text-ink">
                  <IconPlus className="size-[14px] [&_path]:stroke-ink" />
                </button>
              </div>
            </div>
          </div>
          <div className="mt-auto border-t-[0.5px] border-sand pt-5">
            <button type="button" onClick={add} className="flex h-10 w-full items-center bg-terracotta font-display text-label font-medium text-cream transition-opacity hover:opacity-90">
              <span aria-hidden="true" className="flex size-10 shrink-0 items-center justify-center bg-sand">
                <IconPlus className="size-[26px]" />
              </span>
              <span className="flex-1 pr-2 text-center">{added ? "Added" : `Add to ‘${active.name}’`}</span>
            </button>
          </div>
        </div>
      )}
    </article>
  );
}

function OptionSelect({ label, options, className }: { label: string; options: string[]; className?: string }) {
  return (
    <div className={`flex h-10 items-center ${className ?? ""}`}>
      <span className="w-[90px] font-sans text-body">{label}</span>
      <Select
        label={label}
        showLabel={false}
        options={options.map((o) => ({ value: o, label: o }))}
        defaultValue={options[0]}
        className="w-[238px]"
        fieldClassName="h-10 w-full border border-r-0 border-sand bg-sand/50 pl-[9px] font-sans text-body text-ink/50"
        chevronClassName="h-10 w-[39px] border border-sand bg-cream text-ink"
      />
    </div>
  );
}
