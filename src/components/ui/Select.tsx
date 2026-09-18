"use client";

import { useEffect, useId, useRef, useState } from "react";
import { IconChevronDown } from "@/components/icons";
import { cn } from "@/lib/cn";

export type SelectOption = { value: string; label: string };

type Props = {
  /** sr-only label; every select needs a name even where the field also shows visible text. */
  label: string;
  name?: string;
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  showLabel?: boolean;
  labelClassName?: string;
  className?: string;
  /** Classes for the trigger button - width, colours, border. Content (label + chevron) is laid out inside it. */
  fieldClassName?: string;
  /** Classes for the chevron box specifically (e.g. a solid terracotta square vs. a plain bordered one). */
  chevronClassName?: string;
  chevronIconClassName?: string;
  /** Overrides what the trigger shows - e.g. a static "Filter: Category" that never changes with selection. */
  renderValue?: (selected: SelectOption | undefined) => React.ReactNode;
  disabled?: boolean;
};

/**
 * Custom listbox replacing the native <select> for its OPEN state. A real <select> looks styleable on the
 * closed field, but its open dropdown is rendered by the browser/OS - Chromium in particular accepts
 * background-color/color on <option> but silently ignores padding, so custom option spacing is impossible to
 * achieve with a native select. This renders the popup itself (same working pattern as CardMenu's three-dot
 * menu) so every visual detail, including padding, is real CSS. A hidden input carries the value for
 * <form action> server actions, exactly as a native select's name/value would.
 */
export function Select({
  label,
  name,
  options,
  value,
  defaultValue,
  onChange,
  showLabel = false,
  labelClassName,
  className,
  fieldClassName,
  chevronClassName,
  chevronIconClassName,
  renderValue,
  disabled,
}: Props) {
  const [open, setOpen] = useState(false);
  const [internal, setInternal] = useState(defaultValue ?? options[0]?.value ?? "");
  const current = value ?? internal;
  const [activeIndex, setActiveIndex] = useState(() => Math.max(0, options.findIndex((o) => o.value === current)));
  const root = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const id = useId();
  const listId = `${id}-listbox`;
  const selected = options.find((o) => o.value === current);

  const select = (v: string) => {
    if (value === undefined) setInternal(v);
    onChange?.(v);
  };

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  useEffect(() => {
    if (open) listRef.current?.querySelector<HTMLElement>('[aria-selected="true"]')?.scrollIntoView({ block: "nearest" });
  }, [open]);

  const onTriggerKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;
    if (["ArrowDown", "ArrowUp", "Enter", " "].includes(e.key)) {
      e.preventDefault();
      setActiveIndex(Math.max(0, options.findIndex((o) => o.value === current)));
      setOpen(true);
    }
  };

  const onListKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(options.length - 1, i + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(0, i - 1));
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      const opt = options[activeIndex];
      if (opt) {
        select(opt.value);
        setOpen(false);
      }
    } else if (e.key === "Tab") {
      setOpen(false);
    }
  };

  return (
    <div ref={root} className={cn("relative", className)}>
      <label htmlFor={id} className={cn(!showLabel && "sr-only", showLabel && (labelClassName ?? "mb-1 block text-body"))}>
        {label}
      </label>
      {name && <input type="hidden" name={name} value={current} />}
      <button
        id={id}
        type="button"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => !disabled && setOpen((o) => !o)}
        onKeyDown={onTriggerKeyDown}
        className={cn("flex items-center disabled:opacity-50", fieldClassName)}
      >
        <span className="pointer-events-none flex-1 truncate text-left">{renderValue ? renderValue(selected) : (selected?.label ?? "")}</span>
        <span aria-hidden="true" className={cn("pointer-events-none flex shrink-0 items-center justify-center", chevronClassName)}>
          <IconChevronDown className={cn("h-[9px] w-4", chevronIconClassName)} />
        </span>
      </button>
      {open && (
        <ul
          id={listId}
          ref={listRef}
          role="listbox"
          aria-label={label}
          tabIndex={-1}
          onKeyDown={onListKeyDown}
          autoFocus
          className="absolute left-0 top-full z-20 mt-1 max-h-60 w-full min-w-max overflow-auto border-[0.5px] border-sand bg-cream shadow-ink"
        >
          {options.map((opt, i) => (
            <li key={opt.value} role="none">
              <button
                type="button"
                role="option"
                aria-selected={opt.value === current}
                onMouseEnter={() => setActiveIndex(i)}
                onClick={() => {
                  select(opt.value);
                  setOpen(false);
                }}
                className={cn(
                  "flex h-9 w-full items-center whitespace-nowrap px-5 text-left font-sans text-body",
                  i === activeIndex ? "bg-sand/40" : "hover:bg-sand/40",
                  opt.value === current && "font-semibold",
                )}
              >
                {opt.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
