"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useCallback, useState } from "react";
import { ItemsBlock } from "@/components/app/ItemsBlock";
import type { RowVariant } from "@/components/app/ItemRow";
import { AddCustomItemModal } from "@/components/modals/AddCustomItemModal";
import { BoughtItemsModal } from "@/components/modals/BoughtItemsModal";
import { ReviewDeletedItemsModal } from "@/components/modals/ReviewDeletedItemsModal";
import type { ItemCategory, ListItem } from "@/types/app";

type Props = { categories: ItemCategory[]; variant: RowVariant };

/**
 * Renders every category's ItemsBlock and owns the item data across all of them, so the fixed-bar panels that
 * cut across categories - review bought items (registry), add own item (list/registry), review deleted items
 * (list) - can actually see and mutate the right item instead of a disconnected snapshot. Opened via
 * ?panel=review-bought | add-own | review-deleted, same convention as ModalRouter.
 */
export function DetailItemsSection({ categories, variant }: Props) {
  return (
    <Suspense fallback={<Board categories={categories} variant={variant} panel={null} onClosePanel={() => {}} />}>
      <PanelAware categories={categories} variant={variant} />
    </Suspense>
  );
}

function PanelAware({ categories, variant }: Props) {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const panel = params.get("panel");

  const closePanel = useCallback(() => {
    const next = new URLSearchParams(params.toString());
    next.delete("panel");
    const qs = next.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }, [params, pathname, router]);

  return <Board categories={categories} variant={variant} panel={panel} onClosePanel={closePanel} />;
}

function Board({ categories: initial, variant, panel, onClosePanel }: Props & { panel: string | null; onClosePanel: () => void }) {
  const [categories, setCategories] = useState(initial);

  const updateItem = (categoryId: string, next: ListItem) =>
    setCategories((all) => all.map((c) => (c.id === categoryId ? { ...c, items: c.items.map((i) => (i.id === next.id ? next : i)) } : c)));

  const softDelete = (categoryId: string, id: string) =>
    setCategories((all) => all.map((c) => (c.id === categoryId ? { ...c, items: c.items.map((i) => (i.id === id ? { ...i, status: "deleted" as const } : i)) } : c)));

  const reinstate = (categoryId: string, id: string) =>
    setCategories((all) => all.map((c) => (c.id === categoryId ? { ...c, items: c.items.map((i) => (i.id === id ? { ...i, status: "to-buy" as const } : i)) } : c)));

  const hardDelete = (categoryId: string, id: string) => setCategories((all) => all.map((c) => (c.id === categoryId ? { ...c, items: c.items.filter((i) => i.id !== id) } : c)));

  const addItem = (item: ListItem) => setCategories((all) => (all.length === 0 ? all : all.map((c, i) => (i === 0 ? { ...c, items: [item, ...c.items] } : c))));

  return (
    <div className="flex flex-col gap-[30px] pb-[50px] pt-10">
      {categories.map((c) => (
        <ItemsBlock key={c.id} category={c} variant={variant} onUpdateItem={(next) => updateItem(c.id, next)} onRemoveItem={(id) => softDelete(c.id, id)} />
      ))}

      {variant === "registry" && <BoughtItemsModal open={panel === "review-bought"} onClose={onClosePanel} categories={categories} onUpdateItem={updateItem} />}
      {(variant === "registry" || variant === "list") && <AddCustomItemModal open={panel === "add-own"} onClose={onClosePanel} onAdd={addItem} />}
      {variant === "list" && (
        <ReviewDeletedItemsModal open={panel === "review-deleted"} onClose={onClosePanel} categories={categories} onReinstate={reinstate} onHardDelete={hardDelete} />
      )}
    </div>
  );
}
