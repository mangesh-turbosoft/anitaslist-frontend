"use client";

import { useActionState, useState } from "react";
import { createRegistry, type FormState } from "@/app/actions/lists";
import { DatePicker } from "@/components/forms/DatePicker";
import { IconChevronDown } from "@/components/icons";
import { DefaultImagePicker, Dropzone, ModalBody, ModalHeader, ModalOr, ModalSubmit } from "@/components/modals/ModalParts";
import { Input, Modal, Select } from "@/components/ui";

const idle: FormState = { status: "idle" };

/**
 * "Make a registry" lightbox, two steps.
 * Step 1 (1020:18395, 720x767): "CREATE REGISTRY"; Registry name; Choose event (213px select with a 49px chevron
 * box) beside Event date (213px, calendar); Upload image; or; Choose default image; "Add address details" 446x40.
 * Step 2 (1020:20063, 720x770): First name | Last name (213 each); Address (autofill, 403 + 49 chevron);
 * Address line 1; Address line 2; County; Contact number; "Create registry" 446x40. Placeholders read "Auto fill".
 */
export function MakeRegistryModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [step, setStep] = useState<1 | 2>(1);
  const [state, action, pending] = useActionState(createRegistry, idle);
  const f = state.fields ?? {};
  const close = () => {
    setStep(1);
    onClose();
  };
  return (
    <Modal open={open} onClose={close} label="Create a registry">
      <form action={action} noValidate>
        <ModalHeader eyebrow="Create registry" title="Lorem ipsum dolor set." step={step} steps={2} />
        <ModalBody className={step === 1 ? "flex flex-col gap-[10px]" : "hidden"}>
          <Input label="Registry name" name="name" showLabel placeholder="Registry name" required error={f.name} />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Select
              label="Choose event"
              name="eventType"
              showLabel
              labelClassName="block font-sans text-body font-medium"
              options={[
                { value: "", label: "Event type" },
                { value: "Baby shower", label: "Baby shower" },
                { value: "Birth", label: "Birth" },
                { value: "Christening", label: "Christening" },
              ]}
              defaultValue=""
              className="w-full max-w-[262px]"
              fieldClassName="h-[50px] w-full border border-r-0 border-sand bg-sand/50 pl-[10px] font-sans text-body text-ink/50"
              chevronClassName="h-[50px] w-[49px] border border-sand bg-cream text-ink"
              chevronIconClassName="h-[11px] w-5"
            />
            <div>
              <p className="block font-sans text-body font-medium">Event date</p>
              <DatePicker name="eventDate" label="Event date" placeholder="Event date" />
            </div>
          </div>
          <Dropzone name="image" />
          <ModalOr />
          <DefaultImagePicker name="defaultImage" />
          <button type="button" onClick={() => setStep(2)} className="mt-5 flex h-10 w-full items-center justify-center bg-terracotta font-display text-label font-medium text-cream hover:opacity-90">
            Add address details
          </button>
        </ModalBody>
        <ModalBody className={step === 2 ? "flex flex-col gap-[10px]" : "hidden"}>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Input label="First name" name="firstName" showLabel placeholder="Auto fill name" autoComplete="given-name" error={f.firstName} />
            <Input label="Last name" name="lastName" showLabel placeholder="Auto fill name" autoComplete="family-name" error={f.lastName} />
          </div>
          <div>
            <label htmlFor="address-search" className="block font-sans text-body font-medium">
              Address
            </label>
            <div className="flex">
              <input id="address-search" name="addressSearch" placeholder="Type address then autofill options appear" autoComplete="street-address" className="h-[50px] min-w-0 flex-1 border border-r-0 border-sand bg-sand/50 px-[10px] font-sans text-body outline-none focus-visible:outline-2 focus-visible:outline-terracotta" />
              <span aria-hidden="true" className="flex h-[50px] w-[49px] items-center justify-center border border-sand bg-cream text-ink">
                <IconChevronDown className="h-[11px] w-5" />
              </span>
            </div>
          </div>
          <Input label="Address line 1" name="addressLine1" showLabel placeholder="Auto fill" autoComplete="address-line1" error={f.addressLine1} />
          <Input label="Address line 2" name="addressLine2" showLabel placeholder="Auto fill" autoComplete="address-line2" />
          <Input label="County" name="county" showLabel placeholder="Auto fill" autoComplete="address-level1" />
          <Input label="Contact number" name="phone" showLabel placeholder="Auto fill" type="tel" autoComplete="tel" />
          <ModalSubmit pending={pending}>Create registry</ModalSubmit>
        </ModalBody>
      </form>
    </Modal>
  );
}
