"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ModalHeader, Toggle } from "@/components/modals/ModalParts";
import { Input, Modal } from "@/components/ui";
import { cn } from "@/lib/cn";

type Tab = "personal" | "marketing" | "delete";
const TABS: { id: Tab; label: string; step: number }[] = [
  { id: "personal", label: "Personal Details", step: 1 },
  { id: "marketing", label: "Marketing preferences", step: 2 },
  { id: "delete", label: "Delete account", step: 3 },
];

const PREFERENCES = [
  { id: "pref-1", title: "Lorem ipsum", body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit magna aliqua.", defaultOn: true },
  { id: "pref-2", title: "Lorem ipsum", body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit magna aliqua.", defaultOn: false },
  { id: "pref-3", title: "Lorem ipsum", body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit magna aliqua.", defaultOn: false },
  { id: "pref-4", title: "Lorem ipsum", body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit magna aliqua.", defaultOn: true },
];

/**
 * "Profile settings" lightbox (Figma 1169:2 / 1177:153 / 1180:583) - a left-hand tab switcher for the account
 * settings that used to live only on the /account/profile page. No real backend, so "Save changes" just shows a
 * brief inline confirmation rather than persisting anywhere new.
 */
export function ProfileSettingsModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("personal");
  const [saved, setSaved] = useState<Tab | null>(null);

  const close = () => {
    setTab("personal");
    setSaved(null);
    onClose();
  };

  const save = (which: Tab) => {
    setSaved(which);
    window.setTimeout(() => setSaved(null), 1500);
  };

  const deleteAccount = () => {
    close();
    router.push("/");
  };

  return (
    <Modal open={open} onClose={close} label="Profile settings">
      <ModalHeader eyebrow="Profile settings" title="Lorem ipsum dolor set" step={TABS.find((t) => t.id === tab)?.step} steps={TABS.length} />
      <div className="mx-auto flex w-full max-w-[678px] flex-col gap-6 px-4 pb-[50px] pt-6 sm:flex-row sm:px-5">
        <nav aria-label="Profile settings sections" className="flex shrink-0 flex-row overflow-x-auto sm:w-[230px] sm:flex-col sm:overflow-visible">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={cn(
                "h-10 shrink-0 whitespace-nowrap px-4 text-left font-sans text-body sm:h-[50px] sm:whitespace-normal",
                tab === t.id ? "bg-terracotta text-cream" : "text-ink hover:bg-sand/40",
              )}
            >
              {t.label}
            </button>
          ))}
        </nav>

        <div className="min-w-0 flex-1">
          {tab === "personal" && (
            <div className="flex flex-col gap-[10px]">
              <div className="flex items-center gap-4">
                <span className="flex size-[70px] shrink-0 items-center justify-center rounded-full bg-sage" aria-hidden="true" />
                <button type="button" className="h-10 w-[150px] bg-terracotta font-display text-label font-medium text-cream hover:opacity-90">
                  Update photo
                </button>
              </div>
              <Input label="Username" showLabel placeholder="Name" />
              <Input label="Primary Email" showLabel placeholder="Type address" type="email" />
              <Input label="Secondary Email" showLabel placeholder="Type address" type="email" />
              <div>
                <label htmlFor="profile-password" className="block font-sans text-body font-medium">
                  Password
                </label>
                <div className="flex gap-[10px]">
                  <input id="profile-password" type="password" placeholder="**********" disabled className="h-[50px] flex-1 bg-sand/50 px-[10px] text-body text-ink/50 outline-none" />
                  <button type="button" className="h-[50px] w-[100px] shrink-0 bg-terracotta font-display text-label font-medium text-cream hover:opacity-90">
                    Update
                  </button>
                </div>
              </div>
              <Input label="Birthday" showLabel placeholder="00/00/00" />
              <div>
                <p className="font-sans text-body font-medium">Are you expecting?</p>
                <div className="mt-1 flex gap-2">
                  <button type="button" className="h-10 w-[70px] bg-terracotta font-display text-label font-medium text-cream">
                    Yes
                  </button>
                  <button type="button" className="h-10 w-[70px] bg-sand/50 font-display text-label font-medium text-ink">
                    No
                  </button>
                </div>
              </div>
              <Input label="Due date" showLabel placeholder="00/00/00" />
              <button type="button" onClick={() => save("personal")} className="mt-5 flex h-10 w-full items-center justify-center bg-terracotta font-display text-label font-medium text-cream hover:opacity-90">
                {saved === "personal" ? "Saved" : "Save changes"}
              </button>
            </div>
          )}

          {tab === "marketing" && (
            <div className="flex flex-col gap-[10px]">
              {PREFERENCES.map((p) => (
                <div key={p.id} className="flex items-center justify-between gap-4 border-b border-sand pb-3">
                  <div>
                    <p className="font-display text-h3 font-medium">{p.title}</p>
                    <p className="mt-1 font-sans text-body">{p.body}</p>
                  </div>
                  <Toggle name={p.id} label="" defaultOn={p.defaultOn} />
                </div>
              ))}
              <div className="flex gap-3 border-[0.5px] border-sand bg-sand/50 p-5">
                <span className="flex size-6 shrink-0 items-center justify-center bg-terracotta font-display text-label font-medium text-cream">i</span>
                <p className="font-sans text-body">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              </div>
              <button type="button" onClick={() => save("marketing")} className="flex h-10 w-full items-center justify-center bg-terracotta font-display text-label font-medium text-cream hover:opacity-90">
                {saved === "marketing" ? "Saved" : "Save changes"}
              </button>
            </div>
          )}

          {tab === "delete" && (
            <div className="flex flex-col gap-5">
              <div className="flex gap-3 border-[0.5px] border-sand bg-sand/50 p-5">
                <span className="flex size-6 shrink-0 items-center justify-center bg-terracotta font-display text-label font-medium text-cream">!</span>
                <p className="font-sans text-body">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              </div>
              <div>
                <p className="font-display text-h3 font-medium">Delete Account</p>
                <p className="mt-2 font-sans text-body">You will permanently loose your:</p>
                <ul className="mt-1 list-disc pl-5 font-sans text-body">
                  <li>Profile</li>
                  <li>Notes</li>
                  <li>Registries</li>
                  <li>Lorem ipsum</li>
                  <li>Lorem ipsum</li>
                </ul>
              </div>
              <div className="flex gap-3">
                <button type="button" onClick={close} className="h-10 w-[130px] bg-terracotta font-display text-label font-medium text-cream hover:opacity-90">
                  No, keep it
                </button>
                <button type="button" onClick={deleteAccount} className="h-10 w-[130px] bg-sand/50 font-display text-label font-medium text-ink hover:bg-sand">
                  Yes, delete
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}
