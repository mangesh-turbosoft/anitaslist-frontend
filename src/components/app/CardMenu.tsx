"use client";

import { useEffect, useId, useRef, useState } from "react";
import { MenuDots } from "@/components/ui";
import { cn } from "@/lib/cn";

export type MenuItem = { label: string; onSelect: () => void; destructive?: boolean };

/**
 * Three-dot popover (900:2364, 199x164): cream, 0.5px sand border, items Noto 15/22 at 36px pitch. Figma draws an
 * icon column before each label (Rename list · Turn into registry · Delete · Duplicate); no per-action icon set
 * is built yet, so items are plain text with even left/right padding rather than reserving space for icons
 * that aren't there.
 */
export function CardMenu({ items, label = "More options", className }: { items: MenuItem[]; label?: string; className?: string }) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={root} className={cn("relative", className)}>
      <MenuDots label={label} aria-haspopup="menu" aria-expanded={open} aria-controls={id} onClick={() => setOpen((o) => !o)} />
      {open && (
        <ul id={id} role="menu" aria-label={label} className="absolute right-0 top-full z-20 w-[199px] border-[0.5px] border-sand bg-cream py-2">
          {items.map((item) => (
            <li key={item.label} role="none">
              <button
                type="button"
                role="menuitem"
                onClick={() => {
                  setOpen(false);
                  item.onSelect();
                }}
                className={cn("flex h-9 w-full items-center px-5 text-left font-sans text-body hover:bg-sand/40", item.destructive && "text-terracotta")}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
