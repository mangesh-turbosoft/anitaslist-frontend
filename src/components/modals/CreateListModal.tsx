"use client";

import { useActionState, useState } from "react";
import { createList, createTemplateList, type FormState } from "@/app/actions/lists";
import { IconNounStop, IconNounWireframe } from "@/components/icons";
import { DefaultImagePicker, Dropzone, ModalBody, ModalHeader, ModalOr, ModalSubmit } from "@/components/modals/ModalParts";
import { Input, Modal } from "@/components/ui";
import { cn } from "@/lib/cn";

const idle: FormState = { status: "idle" };

type Step = "choose" | "blank" | "template";

/**
 * "Creating list" lightboxes.
 * Step 1 (1011:14344, 720x508): "LIST OPTIONS" header with subtitle; two 340x220 option cards (0.5px sand border)
 * side by side with 20px insets - Blank list (50px stop icon, blush button "Create blank list") and Template list
 * (44px wireframe icon, terracotta button "Select template"); title P22 500 24/34, copy Noto 15/22, buttons 171x40.
 * Step 2 blank (1011:14512, 720x697): "CUSTOMISE LIST"; List name field; Upload image drop zone; or; Choose default
 * image; "Create list" 445x40.
 * Step 2 template (1020:15565): tabbed left rail (233x60 rows, selected terracotta) + a scrollable grid of 214px
 * template cards (sand, 174x116 image slot, P22 500 16/22 title, 174x40 "Select").
 */
export function CreateListModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [step, setStep] = useState<Step>("choose");
  const close = () => {
    setStep("choose");
    onClose();
  };
  return (
    <Modal open={open} onClose={close} label="Create a list">
      {step === "choose" && <ChooseStep onBlank={() => setStep("blank")} onTemplate={() => setStep("template")} />}
      {step === "blank" && <BlankStep />}
      {step === "template" && <TemplateStep />}
    </Modal>
  );
}

function ChooseStep({ onBlank, onTemplate }: { onBlank: () => void; onTemplate: () => void }) {
  return (
    <>
      <ModalHeader eyebrow="List options" title="Lorem ipsum dolor set amet sed tempor." subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit." step={1} steps={2} />
      <div className="grid grid-cols-1 gap-5 p-5 pb-[50px] sm:grid-cols-2 sm:gap-0">
        <OptionCard icon={<IconNounStop className="size-[50px]" />} title="Blank list" body="Consectetur adipiscing elit, sed do eiusmod" cta="Create blank list" tone="blush" onSelect={onBlank} />
        <OptionCard icon={<IconNounWireframe className="size-11" />} title="Template list" body="Consectetur adipiscing elit, sed do eiusmod" cta="Select template" tone="terracotta" onSelect={onTemplate} />
      </div>
    </>
  );
}

function OptionCard({ icon, title, body, cta, tone, onSelect }: { icon: React.ReactNode; title: string; body: string; cta: string; tone: "blush" | "terracotta"; onSelect: () => void }) {
  return (
    <div className="flex h-[220px] flex-col items-center border-[0.5px] border-sand pt-4 text-center">
      <span className="flex h-[50px] items-center text-ink">{icon}</span>
      <h3 className="mt-[1px] font-display text-h3 font-medium">{title}</h3>
      <p className="mt-[1px] max-w-[339px] px-4 font-sans text-body">{body}</p>
      <button type="button" onClick={onSelect} className={cn("mt-auto mb-5 h-10 w-[171px] font-display text-label font-medium text-cream hover:opacity-90", tone === "blush" ? "bg-blush" : "bg-terracotta")}>
        {cta}
      </button>
    </div>
  );
}

function BlankStep() {
  const [state, action, pending] = useActionState(createList, idle);
  return (
    <form action={action} noValidate>
      <ModalHeader eyebrow="Customise list" title="Lorem ipsum dolor set" step={2} steps={2} />
      <ModalBody className="flex flex-col gap-[9px]">
        <Input label="List name" name="name" showLabel placeholder="List name" required error={state.fields?.name} />
        <Dropzone name="image" />
        <ModalOr />
        <DefaultImagePicker name="defaultImage" />
        <ModalSubmit pending={pending}>Create list</ModalSubmit>
      </ModalBody>
    </form>
  );
}

const TEMPLATE_TABS = ["Journey templates", "Lorem templates", "Ipsum templates", "Eiusmond templates"];

function TemplateStep() {
  const [state, action, pending] = useActionState(createTemplateList, idle);
  const [tab, setTab] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const templates = Array.from({ length: 6 }, (_, i) => ({ id: `${TEMPLATE_TABS[tab]}-${i + 1}`, title: "Bibendum odio sit amet aliquam sit." }));
  return (
    <form action={action} noValidate>
      <ModalHeader eyebrow="Customise list" title="Lorem ipsum dolor set" step={2} steps={2} />
      <div className="flex flex-col sm:flex-row">
        <div role="tablist" aria-label="Template categories" className="flex shrink-0 overflow-x-auto sm:w-[233px] sm:flex-col sm:border-r-[0.5px] sm:border-sand">
          {TEMPLATE_TABS.map((t, i) => (
            <button
              key={t}
              type="button"
              role="tab"
              aria-selected={tab === i}
              onClick={() => setTab(i)}
              className={cn("h-[60px] shrink-0 px-5 text-left font-display text-label font-medium", tab === i ? "bg-terracotta text-cream" : "text-ink hover:bg-sand/40")}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="max-h-[544px] flex-1 overflow-y-auto p-5 [scrollbar-color:var(--color-sage)_var(--color-cream)] [scrollbar-width:thin]">
          <input type="hidden" name="template" value={picked ?? ""} />
          <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {templates.map((t) => (
              <li key={t.id} className="flex flex-col bg-sand p-[19px]">
                <div className="flex h-[116px] items-center justify-center border border-sand bg-bone font-sans text-body text-ink/50">Image for list</div>
                <p className="mt-2 font-display text-label-md font-medium">{t.title}</p>
                <button
                  type="button"
                  onClick={() => setPicked(t.id)}
                  aria-pressed={picked === t.id}
                  className={cn("mt-[14px] h-10 w-full font-display text-label font-medium text-cream hover:opacity-90", picked === t.id ? "bg-blush" : "bg-terracotta")}
                >
                  {picked === t.id ? "Selected" : "Select"}
                </button>
              </li>
            ))}
          </ul>
          {state.message && (
            <p role="alert" className="mt-3 text-meta text-terracotta">
              {state.message}
            </p>
          )}
          <ModalSubmit pending={pending}>Create list</ModalSubmit>
        </div>
      </div>
    </form>
  );
}
