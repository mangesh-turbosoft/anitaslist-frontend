"use client";

import { useId, useState } from "react";
import { categories } from "@/data/categories";
import { ModalBody, ModalHeader } from "@/components/modals/ModalParts";
import { Input, Modal, Select } from "@/components/ui";
import type { ListItem } from "@/types/app";

const CATEGORY_OPTIONS = (categories.find((c) => c.slug === "transport")?.subcategories ?? []).map((s) => ({ value: s.name, label: s.name }));

/** "Add custom product" lightbox (Figma 1199:719) - lets the list/registry owner add an item that isn't in the catalogue. */
export function AddCustomItemModal({ open, onClose, onAdd }: { open: boolean; onClose: () => void; onAdd: (item: ListItem) => void }) {
  const uid = useId();
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [link, setLink] = useState("");
  const [category, setCategory] = useState(CATEGORY_OPTIONS[0]?.value ?? "");
  const [errors, setErrors] = useState<{ name?: string }>({});

  const reset = () => {
    setName("");
    setAmount("");
    setLink("");
    setCategory(CATEGORY_OPTIONS[0]?.value ?? "");
    setErrors({});
  };

  const close = () => {
    reset();
    onClose();
  };

  const submit = () => {
    if (!name.trim()) {
      setErrors({ name: "Give the product a name." });
      return;
    }
    const pounds = Number(amount);
    onAdd({
      id: `custom-${uid}-${Date.now()}`,
      name: name.trim(),
      subcategory: category,
      tier: null,
      notes: link.trim() ? `Link: ${link.trim()}` : "",
      pricePence: Number.isNaN(pounds) ? 0 : Math.round(pounds * 100),
      quantity: 1,
      status: "to-buy",
      image: null,
      reservedBy: null,
      buyingOptions: [],
      purchase: null,
    });
    close();
  };

  return (
    <Modal open={open} onClose={close} label="Add custom product">
      <ModalHeader eyebrow="Add custom product" title="Lorem ipsum dolor set amet sed tempor." />
      <ModalBody className="flex flex-col gap-[10px]">
        <Input label="Product name" showLabel placeholder="E.g. Pushchair brand" value={name} onChange={(e) => setName(e.target.value)} error={errors.name} />
        <Input label="Amount" showLabel placeholder="£00.00" inputMode="decimal" value={amount} onChange={(e) => setAmount(e.target.value)} />
        <Input label="Product link" showLabel placeholder="www.xxx.com/" value={link} onChange={(e) => setLink(e.target.value)} />
        <Select
          label="Product category"
          showLabel
          labelClassName="block font-sans text-body font-medium"
          value={category}
          onChange={setCategory}
          options={CATEGORY_OPTIONS}
          className="w-full"
          fieldClassName="h-[50px] w-full border border-r-0 border-sand bg-sand/50 pl-[10px] font-sans text-body text-ink"
          chevronClassName="h-[50px] w-[49px] border border-sand bg-cream text-ink"
          chevronIconClassName="h-[11px] w-5"
        />
        <button type="button" onClick={submit} className="mt-5 flex h-10 w-full items-center justify-center bg-terracotta font-display text-label font-medium text-cream hover:opacity-90">
          Add product
        </button>
      </ModalBody>
    </Modal>
  );
}
