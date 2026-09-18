"use client";

import { useActionState, useRef, useState, type ComponentType, type SVGProps } from "react";
import { addNote, type FormState } from "@/app/actions/lists";
import { IconNounBulletlist, IconNounItalic, IconNounLink, IconNounStrikeout, IconNounTable, IconNounUnderline } from "@/components/icons";
import { ModalHeader, ModalSubmit } from "@/components/modals/ModalParts";
import { Modal } from "@/components/ui";
import { cn } from "@/lib/cn";

const idle: FormState = { status: "idle" };

type Tool = { key: string; label: string; wrap: [string, string]; Icon?: ComponentType<SVGProps<SVGSVGElement>>; text?: string };

/**
 * "Add a note / to-do" lightbox (1020:24608, 720x906): "ADD NOTE" header; a 446x581 editing surface (sand @50%)
 * showing rich text; an eight-tile formatting toolbar 56x49 each with 0.5px sand borders directly beneath -
 * Aa (active, terracotta) · bullet list · table · bold · italic · underline · strikethrough · link;
 * "Add new note" 445x40, 42px bottom padding. Implemented as a textarea with Markdown-style wrappers (no editor library).
 */
export function AddNoteModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [state, action, pending] = useActionState(addNote, idle);
  const [value, setValue] = useState("");
  const ref = useRef<HTMLTextAreaElement>(null);

  const tools: Tool[] = [
    { key: "heading", label: "Heading", wrap: ["## ", ""], text: "Aa" },
    { key: "list", label: "Bullet list", wrap: ["- ", ""], Icon: IconNounBulletlist },
    { key: "table", label: "Table", wrap: ["| ", " | |\n| --- | --- |\n| | |"], Icon: IconNounTable },
    { key: "bold", label: "Bold", wrap: ["**", "**"], text: "B" },
    { key: "italic", label: "Italic", wrap: ["_", "_"], Icon: IconNounItalic },
    { key: "underline", label: "Underline", wrap: ["<u>", "</u>"], Icon: IconNounUnderline },
    { key: "strike", label: "Strikethrough", wrap: ["~~", "~~"], Icon: IconNounStrikeout },
    { key: "link", label: "Link", wrap: ["[", "](https://)"], Icon: IconNounLink },
  ];

  const apply = (t: Tool) => {
    const el = ref.current;
    if (!el) return;
    const { selectionStart: s, selectionEnd: e } = el;
    const next = value.slice(0, s) + t.wrap[0] + value.slice(s, e) + t.wrap[1] + value.slice(e);
    setValue(next);
    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(s + t.wrap[0].length, e + t.wrap[0].length);
    });
  };

  return (
    <Modal open={open} onClose={onClose} label="Add a note">
      <form action={action} noValidate>
        <ModalHeader eyebrow="Add note" title="Lorem ipsum dolor set." />
        <div className="mx-auto w-full max-w-[446px] px-4 pb-[42px] pt-5 sm:px-0">
          <label htmlFor="note-body" className="sr-only">
            Note
          </label>
          <textarea
            id="note-body"
            ref={ref}
            name="body"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Lorem ipsum dolor set."
            aria-invalid={state.fields?.body ? true : undefined}
            className="block h-[420px] w-full resize-none bg-sand/50 p-5 font-sans text-body text-ink outline-none [scrollbar-color:var(--color-sage)_var(--color-cream)] [scrollbar-width:thin] focus-visible:outline-2 focus-visible:outline-terracotta sm:h-[581px]"
          />
          <div role="toolbar" aria-label="Formatting" className="flex flex-wrap">
            {tools.map((t, i) => (
              <button
                key={t.key}
                type="button"
                onClick={() => apply(t)}
                aria-label={t.label}
                title={t.label}
                className={cn("flex h-[49px] w-14 items-center justify-center border-[0.5px] border-sand text-ink hover:bg-sand/40", i === 0 && "bg-terracotta text-cream hover:bg-terracotta")}
              >
                {t.Icon ? <t.Icon className="size-8" /> : <span className={cn("font-sans text-label font-bold", t.key === "bold" && "font-display")}>{t.text}</span>}
              </button>
            ))}
          </div>
          {state.fields?.body && (
            <p role="alert" className="mt-2 text-meta text-terracotta">
              {state.fields.body}
            </p>
          )}
          <ModalSubmit pending={pending}>Add new note</ModalSubmit>
        </div>
      </form>
    </Modal>
  );
}
