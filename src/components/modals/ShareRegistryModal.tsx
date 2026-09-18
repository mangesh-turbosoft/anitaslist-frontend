"use client";

import { useActionState, useState } from "react";
import { shareRegistry, type FormState } from "@/app/actions/lists";
import { IconWhatsapp } from "@/components/icons";
import { ModalBody, ModalHeader, ModalSubmit } from "@/components/modals/ModalParts";
import { Divider, Eyebrow, Input, Modal, Textarea } from "@/components/ui";

const idle: FormState = { status: "idle" };

/**
 * "Share a registry" lightbox (1020:23241, 720x770): Share with friends (emails); Write message (444x135 textarea);
 * Shareable link and Unique Passcode as read-only sand fields (Noto 600 15/22) each with a 90x30 terracotta "Copy";
 * "Share via" with a 50px terracotta WhatsApp circle; "Share registry" 446x40.
 * Confirmation (1020:24086, 720x427): H1 P22 400 48/60 centred, "Your registry has been shared with your selected
 * contacts", paragraph, hairline.
 */
export function ShareRegistryModal({ open, onClose, link, passcode }: { open: boolean; onClose: () => void; link: string; passcode: string }) {
  const [state, action, pending] = useActionState(shareRegistry, idle);
  const [copied, setCopied] = useState<"link" | "code" | null>(null);
  const copy = async (kind: "link" | "code", value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(kind);
      window.setTimeout(() => setCopied(null), 1500);
    } catch {
      window.prompt("Copy this value", value);
    }
  };
  const wa = `https://wa.me/?text=${encodeURIComponent(`${link} (passcode ${passcode})`)}`;

  if (state.status === "success") {
    return (
      <Modal open={open} onClose={onClose} label="Registry shared">
        <div className="pt-[41px]">
          <Eyebrow compact className="text-center">
            Share registry
          </Eyebrow>
          <h2 className="mx-auto mt-[3px] max-w-[720px] px-6 text-center text-[36px] leading-[44px] xl:text-display">Your registry has been shared with your selected contacts</h2>
          <p className="mx-auto mt-[13px] max-w-[444px] px-4 text-center text-body">
            Lorem ipsum dolor sit amet consectetur. Id ornare egestas semper aenean faucibus scelerisque. Nibh volutpat a egestas amet blandit sit venenatis.
          </p>
          <Divider className="mt-12" />
          <div className="h-[50px]" />
        </div>
      </Modal>
    );
  }

  return (
    <Modal open={open} onClose={onClose} label="Share registry">
      <form action={action} noValidate>
        <ModalHeader eyebrow="Share registry" title="Lorem ipsum dolor set." />
        <ModalBody className="flex flex-col gap-[10px]">
          <Input label="Share with friends" name="emails" showLabel placeholder="Type email addresses" error={state.fields?.emails} />
          <Textarea label="Write message" name="message" showLabel placeholder="Type your message" className="[&_textarea]:min-h-[135px]" />
          <CopyField label="Shareable link" value={link} copied={copied === "link"} onCopy={() => copy("link", link)} />
          <CopyField label="Unique Passcode" value={passcode} copied={copied === "code"} onCopy={() => copy("code", passcode)} />
          <div>
            <p className="font-sans text-body font-medium">Share via</p>
            <div className="mt-[6px] flex gap-3">
              <a href={wa} target="_blank" rel="noopener noreferrer" aria-label="Share on WhatsApp" className="flex size-[50px] items-center justify-center rounded-full bg-terracotta text-cream hover:opacity-90">
                <IconWhatsapp className="size-9" />
              </a>
            </div>
          </div>
          <ModalSubmit pending={pending}>Share registry</ModalSubmit>
        </ModalBody>
      </form>
    </Modal>
  );
}

function CopyField({ label, value, copied, onCopy }: { label: string; value: string; copied: boolean; onCopy: () => void }) {
  return (
    <div>
      <p className="font-sans text-body font-medium">{label}</p>
      <div className="relative">
        <output className="flex h-[50px] items-center bg-sand/50 pl-[10px] pr-[110px] font-sans text-body font-semibold">{value}</output>
        <button type="button" onClick={onCopy} className="absolute right-[9px] top-[10px] h-[30px] w-[90px] bg-terracotta font-display text-label font-medium text-cream hover:opacity-90">
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
    </div>
  );
}
