"use client";

import Image from "next/image";
import { useId, useState, type ReactNode } from "react";
import { IconNounUpload, IconTick } from "@/components/icons";
import { Divider, Eyebrow, StepDots } from "@/components/ui";
import { cn } from "@/lib/cn";

/**
 * Shared lightbox anatomy (measured on 1011:14344, 1011:14512, 1020:18395 …): eyebrow Noto 600 16/26 UPPER at y=41,
 * H2 P22 400 32/44 at y=68 (678 wide, centred), optional subtitle Noto 15/22 at y=166, 13px step dots 7px under the
 * title, hairline 17px under those. Body is a 446px column at x=137; the first label sits 24px under the hairline.
 */
export function ModalHeader({ eyebrow, title, subtitle, step, steps }: { eyebrow: string; title: ReactNode; subtitle?: string; step?: number; steps?: number }) {
  return (
    <div className="pt-[41px]">
      <Eyebrow compact className="px-5 text-center">
        {eyebrow}
      </Eyebrow>
      <h2 className="mx-auto mt-[1px] max-w-[678px] px-5 text-center text-h2">{title}</h2>
      {subtitle && <p className="mx-auto mt-[10px] max-w-[531px] px-5 text-center text-body">{subtitle}</p>}
      {steps && step ? <StepDots total={steps} current={step} className="mt-[7px] gap-3 [&>li]:size-[13px]" /> : null}
      <Divider className={subtitle ? "mt-[19px]" : "mt-[17px]"} />
    </div>
  );
}

/** 446px body column with the 24px top inset and 50px bottom padding. */
export function ModalBody({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mx-auto w-full max-w-[446px] px-4 pb-[50px] pt-6 sm:px-0", className)}>{children}</div>;
}

/** "Upload image" drop zone: label Noto 500 15/22, 446x153 box (1px sand), 50px icon, P22 500 16/22 line, Noto 12/18 support line. */
export function Dropzone({ name, label = "Upload image" }: { name: string; label?: string }) {
  const [fileName, setFileName] = useState<string | null>(null);
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="block font-sans text-body font-medium">
        {label}
      </label>
      <div className="relative flex h-[153px] flex-col items-center border border-sand pt-5 text-center">
        <IconNounUpload className="size-[50px] text-ink" />
        <p className="mt-[7px] font-display text-label-md font-medium">{fileName ?? "Drag your image here or browse"}</p>
        <p className="mt-[5px] font-sans text-meta leading-[18px] text-ink/50">Supports: PNG, JPG, JPEG, WEBP</p>
        <input
          id={id}
          name={name}
          type="file"
          accept="image/png,image/jpeg,image/webp"
          onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)}
          className="absolute inset-0 cursor-pointer opacity-0"
        />
      </div>
    </div>
  );
}

const DEFAULTS = ["avatar-d", "avatar-a", "cover-c", "cover-b", "avatar-c", "avatar-b"] as const;

/** "Choose default image:" picker: 446x96 box (1px sand) with six 59x60 thumbs; the chosen one gets a 1px terracotta border, a 40% wash and a tick. */
export function DefaultImagePicker({ name }: { name: string }) {
  const [picked, setPicked] = useState<string>(DEFAULTS[0]);
  return (
    <fieldset>
      <legend className="block font-sans text-body font-medium">Choose default image:</legend>
      <div className="flex h-24 items-center gap-[10px] border border-sand px-[19px]">
        {DEFAULTS.map((key) => {
          const active = picked === key;
          return (
            <label key={key} className="relative block h-[60px] w-[59px] cursor-pointer">
              <input type="radio" name={name} value={key} checked={active} onChange={() => setPicked(key)} className="peer sr-only" />
              <Image src={`/images/${key}.webp`} alt="" fill sizes="59px" className="object-cover" />
              <span className={cn("absolute inset-0 border peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-terracotta", active ? "border-terracotta bg-terracotta/40" : "border-transparent")} />
              {active && <IconTick className="absolute left-1/2 top-1/2 size-6 -translate-x-1/2 -translate-y-1/2 text-cream" />}
              <span className="sr-only">Default image {key}</span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

/** "or" separator used between the upload and default-image blocks (446x22). */
export function ModalOr() {
  return (
    <div className="my-[9px] flex items-center gap-[22px]" role="separator" aria-label="or">
      <span aria-hidden="true" className="h-px flex-1 bg-sand" />
      <span className="font-sans text-body">or</span>
      <span aria-hidden="true" className="h-px flex-1 bg-sand" />
    </div>
  );
}

/** 70x30 pill switch with a 43x24 knob (Add key date "All day" rows). On = terracotta; off = sand. */
export function Toggle({ name, label, defaultOn = false }: { name: string; label: string; defaultOn?: boolean }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <label className="flex h-[50px] items-center justify-between border border-sand px-[11px]">
      <span className="font-sans text-body font-medium">{label}</span>
      <input type="checkbox" name={name} checked={on} onChange={(e) => setOn(e.target.checked)} className="peer sr-only" />
      <span aria-hidden="true" className={cn("relative block h-[30px] w-[70px] rounded-pill transition-colors peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-terracotta", on ? "bg-terracotta" : "bg-sand")}>
        <span className={cn("absolute top-[3px] block h-6 w-[43px] rounded-pill bg-cream transition-[left]", on ? "left-6" : "left-[3px]")} />
      </span>
    </label>
  );
}

/** Wide submit used at the foot of every lightbox form (446x40). */
export function ModalSubmit({ children, pending }: { children: ReactNode; pending?: boolean }) {
  return (
    <button type="submit" disabled={pending} className="mt-5 flex h-10 w-full items-center justify-center bg-terracotta font-display text-label font-medium text-cream transition-opacity hover:opacity-90 disabled:opacity-60">
      {children}
    </button>
  );
}
