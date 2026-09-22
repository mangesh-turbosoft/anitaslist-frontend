"use client";

import { useState } from "react";
import { ModalBody, ModalHeader } from "@/components/modals/ModalParts";
import { IconChevronRight } from "@/components/icons";
import { Modal } from "@/components/ui";
import { Image } from "@/components/ui/Image";
import { cn } from "@/lib/cn";
import { formatGBP } from "@/lib/format";
import type { ItemCategory, ListItem } from "@/types/app";

type BoughtItem = ListItem & { purchase: NonNullable<ListItem["purchase"]> };

/**
 * "Bought items" lightbox for the registry owner (Figma 1199:5074 / 1199:6394): a table of everything guests
 * have bought, drilling into a per-item view of the buyer's message with a "have you said thank you?" toggle.
 * `categories` is the live, lifted item state from DetailItemsSection (not a static snapshot), so the thank-you
 * toggle here calls back through `onUpdateItem` and genuinely persists on the underlying item.
 */
export function BoughtItemsModal({
  open,
  onClose,
  categories,
  onUpdateItem,
}: {
  open: boolean;
  onClose: () => void;
  categories: ItemCategory[];
  onUpdateItem: (categoryId: string, next: ListItem) => void;
}) {
  const boughtItems = categories.flatMap((c) =>
    c.items.filter((i): i is BoughtItem => i.status === "bought" && i.purchase !== null).map((i) => ({ ...i, categoryId: c.id })),
  );
  const [viewingId, setViewingId] = useState<string | null>(null);

  const close = () => {
    setViewingId(null);
    onClose();
  };

  const viewing = boughtItems.find((i) => i.id === viewingId) ?? null;

  const setThanked = (thankedYou: boolean) => {
    if (!viewing) return;
    onUpdateItem(viewing.categoryId, { ...viewing, purchase: { ...viewing.purchase, thankedYou } });
  };

  if (viewing) {
    return (
      <Modal open={open} onClose={close} label="Buyer message">
        <div className="pt-[41px]">
          <button type="button" onClick={() => setViewingId(null)} className="ml-5 flex items-center gap-2 font-sans text-body hover:opacity-70 sm:ml-[35px]">
            <IconChevronRight className="h-3 w-auto -scale-x-100" />
            Back to bought items
          </button>
        </div>
        <ModalBody className="flex flex-col items-center gap-1 text-center">
          <div className="relative flex size-[234px] items-center justify-center bg-sand">
            {viewing.image ? (
              <Image src={viewing.image.src} alt="" fill sizes="234px" className="object-cover" />
            ) : (
              <span className="px-4 font-display text-label font-medium" aria-hidden="true">
                Product image
              </span>
            )}
          </div>
          <p className="mt-5 font-display text-h3 italic">{viewing.name}</p>
          <p className="mt-3 font-sans text-meta font-semibold uppercase text-ink/70">Colour: auto filled</p>
          <p className="font-sans text-meta font-semibold uppercase text-ink/70">Alt options: auto filled</p>
          <p className="mt-4 font-display text-label-md font-medium">Bought by: {viewing.purchase.buyerName}</p>

          <div className="mt-5 w-full whitespace-pre-line bg-sand/50 p-5 text-left font-sans text-body">{viewing.purchase.message || "No message was left."}</div>

          <div className="mt-6 flex w-full items-center justify-between">
            <p className="font-sans text-body font-medium">Have you said thank you?</p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setThanked(true)}
                className={cn("h-10 w-[70px] font-display text-label font-medium", viewing.purchase.thankedYou ? "bg-terracotta text-cream" : "bg-sand/50 text-ink")}
              >
                Yes
              </button>
              <button
                type="button"
                onClick={() => setThanked(false)}
                className={cn("h-10 w-[70px] font-display text-label font-medium", !viewing.purchase.thankedYou ? "bg-terracotta text-cream" : "bg-sand/50 text-ink")}
              >
                No
              </button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    );
  }

  return (
    <Modal open={open} onClose={close} label="Bought items" className="max-w-[860px]">
      <ModalHeader eyebrow="Bought items" title="" />
      <ModalBody className="max-w-none px-4 sm:px-[35px]">
        {boughtItems.length === 0 ? (
          <p className="py-5 text-center font-sans text-body">Nothing has been marked as bought yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] border-collapse">
              <thead>
                <tr className="border-b border-sand text-left font-sans text-eyebrow-xs font-semibold uppercase">
                  <th className="pb-3 font-semibold">Product</th>
                  <th className="pb-3 text-center font-semibold">Quantity</th>
                  <th className="pb-3 font-semibold">Bought by</th>
                  <th className="pb-3 font-semibold">Message</th>
                </tr>
              </thead>
              <tbody>
                {boughtItems.map((i) => (
                  <tr key={i.id} className="border-b border-sand">
                    <td className="py-3 pr-3">
                      <div className="flex items-center gap-3">
                        <div className="relative flex size-[60px] shrink-0 items-center justify-center bg-sand">
                          {i.image ? (
                            <Image src={i.image.src} alt="" fill sizes="60px" className="object-cover" />
                          ) : (
                            <span className="px-1 text-center text-[10px]" aria-hidden="true">
                              Product image
                            </span>
                          )}
                        </div>
                        <div>
                          <p className="font-display text-label-md font-medium">{i.name}</p>
                          <p className="font-sans text-meta text-ink/70">{formatGBP(i.purchase.totalPence)}</p>
                          <p className="font-sans text-meta text-ink/70">{i.purchase.retailer}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 text-center font-display text-label-md font-medium">{String(i.purchase.quantityBought).padStart(2, "0")}</td>
                    <td className="py-3 font-sans text-body">{i.purchase.buyerName}</td>
                    <td className="py-3">
                      <button type="button" onClick={() => setViewingId(i.id)} className="h-10 w-[130px] bg-terracotta font-display text-label font-medium text-cream hover:opacity-90">
                        View message
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </ModalBody>
    </Modal>
  );
}
