"use client";

import { useEffect, useRef, useState } from "react";
import { ModalBody, ModalHeader } from "@/components/modals/ModalParts";
import { Modal } from "@/components/ui";
import type { ItemCategory } from "@/types/app";

const REINSTATE_DELAY_MS = 1400;
const DELETE_UNDO_WINDOW_MS = 4000;

/**
 * "Review deleted items" lightbox (Figma 1199:1596 / 1998 / 2378) - the list owner's trash. Reinstating shows a
 * brief "This item is reinstated" confirmation before the row actually leaves the trash; deleting for good gives
 * an undo window before the item is permanently removed, matching the two state-confirmation frames.
 */
export function ReviewDeletedItemsModal({
  open,
  onClose,
  categories,
  onReinstate,
  onHardDelete,
}: {
  open: boolean;
  onClose: () => void;
  categories: ItemCategory[];
  onReinstate: (categoryId: string, itemId: string) => void;
  onHardDelete: (categoryId: string, itemId: string) => void;
}) {
  const deletedItems = categories.flatMap((c) => c.items.filter((i) => i.status === "deleted").map((i) => ({ ...i, categoryId: c.id })));

  const [reinstating, setReinstating] = useState<Set<string>>(new Set());
  const [pendingDelete, setPendingDelete] = useState<Set<string>>(new Set());
  const timers = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  useEffect(() => {
    const map = timers.current;
    return () => {
      map.forEach((t) => clearTimeout(t));
      map.clear();
    };
  }, []);

  const startReinstate = (categoryId: string, id: string) => {
    setReinstating((all) => new Set(all).add(id));
    const t = setTimeout(() => {
      onReinstate(categoryId, id);
      setReinstating((all) => {
        const next = new Set(all);
        next.delete(id);
        return next;
      });
      timers.current.delete(id);
    }, REINSTATE_DELAY_MS);
    timers.current.set(id, t);
  };

  const startDelete = (categoryId: string, id: string) => {
    setPendingDelete((all) => new Set(all).add(id));
    const t = setTimeout(() => {
      onHardDelete(categoryId, id);
      setPendingDelete((all) => {
        const next = new Set(all);
        next.delete(id);
        return next;
      });
      timers.current.delete(id);
    }, DELETE_UNDO_WINDOW_MS);
    timers.current.set(id, t);
  };

  const undoDelete = (id: string) => {
    const t = timers.current.get(id);
    if (t) clearTimeout(t);
    timers.current.delete(id);
    setPendingDelete((all) => {
      const next = new Set(all);
      next.delete(id);
      return next;
    });
  };

  return (
    <Modal open={open} onClose={onClose} label="Review deleted items">
      <ModalHeader eyebrow="Delete items" title="Lorem ipsum dolor set amet sed tempor." />
      <ModalBody className="flex flex-col gap-5">
        <div className="flex gap-3 border-[0.5px] border-sand bg-sand/50 p-5">
          <span className="flex size-6 shrink-0 items-center justify-center bg-terracotta font-display text-label font-medium text-cream">!</span>
          <p className="font-sans text-body">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </div>

        {deletedItems.length === 0 ? (
          <p className="py-5 text-center font-sans text-body">Nothing’s been deleted yet.</p>
        ) : (
          <ul className="flex flex-col">
            {deletedItems.map((item) => (
              <li key={item.id} className="flex items-center justify-between border-b border-sand py-3 last:border-b-0">
                <span className="font-sans text-body">{item.name}</span>
                {pendingDelete.has(item.id) ? (
                  <button type="button" onClick={() => undoDelete(item.id)} className="h-10 w-[220px] bg-sand/50 font-display text-label font-medium text-ink hover:bg-sand">
                    Item deleted, click to undo
                  </button>
                ) : reinstating.has(item.id) ? (
                  <span className="flex h-10 w-[220px] items-center justify-center bg-terracotta font-display text-label font-medium text-cream">This item is reinstated</span>
                ) : (
                  <span className="flex gap-2">
                    <button type="button" onClick={() => startReinstate(item.categoryId, item.id)} className="h-10 w-[104px] bg-terracotta font-display text-label font-medium text-cream hover:opacity-90">
                      Reinstate
                    </button>
                    <button type="button" onClick={() => startDelete(item.categoryId, item.id)} className="h-10 w-[104px] bg-sand/50 font-display text-label font-medium text-ink hover:bg-sand">
                      Yes, delete
                    </button>
                  </span>
                )}
              </li>
            ))}
          </ul>
        )}
      </ModalBody>
    </Modal>
  );
}
