"use client";

import { useState } from "react";
import { ModalBody, ModalHeader } from "@/components/modals/ModalParts";
import { Input, Modal } from "@/components/ui";
import type { ListItem } from "@/types/app";

/**
 * "Reserve item" lightbox (Figma 1199:2674) - a registry invitee reserving a gift so other guests can see it's
 * spoken for. Product name/category/subcategory are read-only (auto filled from the item); the invitee only
 * supplies their name.
 */
export function ReserveItemModal({
  open,
  onClose,
  item,
  categoryName,
  onSave,
}: {
  open: boolean;
  onClose: () => void;
  item: ListItem | null;
  categoryName: string;
  onSave: (next: ListItem) => void;
}) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [errors, setErrors] = useState<{ firstName?: string; lastName?: string }>({});

  const close = () => {
    setFirstName("");
    setLastName("");
    setErrors({});
    onClose();
  };

  const submit = () => {
    if (!item) return;
    const nextErrors: typeof errors = {};
    if (!firstName.trim()) nextErrors.firstName = "Please enter your first name.";
    if (!lastName.trim()) nextErrors.lastName = "Please enter your last name.";
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }
    onSave({ ...item, status: "reserved", reservedBy: { name: `${firstName.trim()} ${lastName.trim()}`, date: new Date().toISOString() } });
    close();
  };

  return (
    <Modal open={open} onClose={close} label="Reserve item">
      <ModalHeader eyebrow="Reserve item" title={item?.name ?? ""} />
      <ModalBody className="flex flex-col gap-[10px]">
        <Input label="Product name" showLabel value={item?.name ?? ""} readOnly disabled />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Input label="Product category" showLabel value={categoryName} readOnly disabled />
          <Input label="Product subcategory" showLabel value={item?.subcategory ?? ""} readOnly disabled />
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Input
            label="First name"
            showLabel
            placeholder="First name"
            autoComplete="given-name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            error={errors.firstName}
          />
          <Input
            label="Last name"
            showLabel
            placeholder="Last name"
            autoComplete="family-name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            error={errors.lastName}
          />
        </div>
        <button type="button" onClick={submit} className="mt-5 flex h-10 w-full items-center justify-center bg-terracotta font-display text-label font-medium text-cream hover:opacity-90">
          Reserve
        </button>
      </ModalBody>
    </Modal>
  );
}
