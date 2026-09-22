"use client";

import { useState } from "react";
import { ModalBody, ModalHeader } from "@/components/modals/ModalParts";
import { Input, Modal, Select, Textarea } from "@/components/ui";
import { Image } from "@/components/ui/Image";
import { formatGBP } from "@/lib/format";
import type { ListItem } from "@/types/app";

const DELIVERY_ADDRESS = ["Name Surname", "123 example lane", "Lorem ipsum", "Ab12 3CD"];

const QUANTITY_OPTIONS = Array.from({ length: 10 }, (_, i) => ({ value: String(i + 1), label: String(i + 1).padStart(2, "0") }));

/**
 * "Buy product" lightbox, two steps (Figma 1199:3679 / 1199:4492) - a registry invitee buying a gift.
 * Step 1: product info, the owner's delivery address to copy, and a list of buying options to choose from.
 * Step 2: log what was actually bought (where, total paid, quantity, a personal message for the owner).
 */
export function BuyProductModal({ open, onClose, item, onSave }: { open: boolean; onClose: () => void; item: ListItem | null; onSave: (next: ListItem) => void }) {
  const [step, setStep] = useState<1 | 2>(1);
  const [retailer, setRetailer] = useState("");
  const [copied, setCopied] = useState(false);
  const [totalPaid, setTotalPaid] = useState("");
  const [quantityBought, setQuantityBought] = useState("1");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<{ retailer?: string; totalPaid?: string }>({});

  const reset = () => {
    setStep(1);
    setRetailer("");
    setCopied(false);
    setTotalPaid("");
    setQuantityBought("1");
    setMessage("");
    setErrors({});
  };

  const close = () => {
    reset();
    onClose();
  };

  const chooseOption = (label: string) => {
    setRetailer(label);
    setStep(2);
  };

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(DELIVERY_ADDRESS.join("\n"));
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      window.prompt("Copy this address", DELIVERY_ADDRESS.join("\n"));
    }
  };

  const submit = () => {
    if (!item) return;
    const nextErrors: typeof errors = {};
    if (!retailer.trim()) nextErrors.retailer = "Let us know where it was purchased.";
    const pounds = Number(totalPaid);
    if (!totalPaid.trim() || Number.isNaN(pounds) || pounds < 0) nextErrors.totalPaid = "Enter the total paid.";
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }
    onSave({
      ...item,
      status: "bought",
      purchase: {
        retailer,
        totalPence: Math.round(pounds * 100),
        quantityBought: Number(quantityBought),
        buyerName: "You",
        message: message.trim(),
        thankedYou: false,
      },
    });
    close();
  };

  const productHeader = item && (
    <div className="flex flex-col items-center text-center">
      <div className="relative flex size-[234px] items-center justify-center bg-sand">
        {item.image ? (
          <Image src={item.image.src} alt="" fill sizes="234px" className="object-cover" />
        ) : (
          <span className="px-4 font-display text-label font-medium" aria-hidden="true">
            Product image
          </span>
        )}
      </div>
      <p className="mt-5 font-display text-h3 italic">{item.name}</p>
      <p className="mt-3 font-sans text-meta font-semibold uppercase text-ink/70">Colour: auto filled</p>
      <p className="font-sans text-meta font-semibold uppercase text-ink/70">Alt options: auto filled</p>
    </div>
  );

  return (
    <Modal open={open} onClose={close} label="Buy product" className="max-w-[720px]">
      <ModalHeader eyebrow={step === 1 ? "Buy product" : "Update status"} title="" />
      <ModalBody className={step === 1 ? "flex max-w-[446px] flex-col gap-5" : "hidden"}>
        {productHeader}
        <div className="border-[0.5px] border-sand bg-sand/50 p-5">
          <div className="flex gap-3">
            <span className="flex size-6 shrink-0 items-center justify-center bg-terracotta font-display text-label font-medium text-cream">i</span>
            <p className="font-sans text-body">Don&rsquo;t forget to deliver to the registry&rsquo;s owner. Copy their name and postal address below.</p>
          </div>
          <p className="mt-3 font-sans text-body font-semibold">
            {DELIVERY_ADDRESS.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </p>
          <button type="button" onClick={copyAddress} className="mt-4 flex h-10 w-full items-center justify-center bg-terracotta font-display text-label font-medium text-cream hover:opacity-90">
            {copied ? "Copied" : "Copy address"}
          </button>
        </div>
        <div>
          <p className="font-display text-h3 font-medium">Buying options</p>
          <ul className="mt-3 flex flex-col gap-[10px]">
            {item?.buyingOptions.map((option) => (
              <li key={option.id} className="flex h-10 items-center justify-between gap-3 bg-sand/50 pl-3">
                <span className="font-sans text-body">{option.retailer}</span>
                <button type="button" onClick={() => chooseOption(option.retailer)} className="flex h-10 w-24 shrink-0 items-center justify-center bg-terracotta font-display text-label font-medium text-cream hover:opacity-90">
                  Buy
                </button>
              </li>
            ))}
          </ul>
        </div>
      </ModalBody>

      <ModalBody className={step === 2 ? "flex max-w-[446px] flex-col gap-[10px]" : "hidden"}>
        {productHeader}
        <Select
          label="Where was the product purchased"
          showLabel
          labelClassName="block font-sans text-body font-medium"
          value={retailer}
          onChange={setRetailer}
          options={[{ value: "", label: "Choose option" }, ...(item?.buyingOptions.map((o) => ({ value: o.retailer, label: o.retailer })) ?? [])]}
          className="w-full"
          fieldClassName="h-[50px] w-full border border-r-0 border-sand bg-sand/50 pl-[10px] font-sans text-body text-ink"
          chevronClassName="h-[50px] w-[49px] border border-sand bg-cream text-ink"
          chevronIconClassName="h-[11px] w-5"
        />
        {errors.retailer && (
          <p role="alert" className="-mt-2 text-meta text-terracotta">
            {errors.retailer}
          </p>
        )}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Input
            label="Total paid"
            showLabel
            placeholder={formatGBP(0)}
            inputMode="decimal"
            value={totalPaid}
            onChange={(e) => setTotalPaid(e.target.value)}
            error={errors.totalPaid}
          />
          <Select
            label="How many were bought"
            showLabel
            labelClassName="block font-sans text-body font-medium"
            value={quantityBought}
            onChange={setQuantityBought}
            options={QUANTITY_OPTIONS}
            className="w-full"
            fieldClassName="h-[50px] w-full border border-r-0 border-sand bg-sand/50 pl-[10px] font-sans text-body text-ink"
            chevronClassName="h-[50px] w-[49px] border border-sand bg-cream text-ink"
            chevronIconClassName="h-[11px] w-5"
          />
        </div>
        <Textarea
          label="Add a personal message"
          showLabel
          placeholder="Lorem ipsum..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <p className="-mt-2 font-sans text-meta text-ink/70">Please note: This message can not be edited once saved</p>
        <button type="button" onClick={submit} className="mt-3 flex h-10 w-full items-center justify-center bg-terracotta font-display text-label font-medium text-cream hover:opacity-90">
          Save status update
        </button>
      </ModalBody>
    </Modal>
  );
}
