"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { IconClose } from "@/components/icons";
import { cn } from "@/lib/cn";

type Props = {
  open: boolean;
  onClose: () => void;
  /** Accessible name; the visible heading is rendered by the caller. */
  label: string;
  children: ReactNode;
  className?: string;
};

/**
 * Lightbox shell. Figma: 720 wide, bg #E6E4D8, radius 0, overlay #2D1A14 @70% covering the header too,
 * 40x40 #C77065 close button flush top-right with a ~12px cream X.
 * Native <dialog> gives focus trap, Escape and top-layer stacking for free.
 */
export function Modal({ open, onClose, label, children, className }: Props) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (open && !el.open) el.showModal();
    if (!open && el.open) el.close();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflow;
    };
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-label={label}
      onClose={onClose}
      onClick={(e) => {
        // backdrop click: the dialog element itself is the target only when clicking outside its content box
        if (e.target === e.currentTarget) onClose();
      }}
      className={cn(
        "m-auto w-[calc(100%-32px)] max-w-[720px] bg-bone p-0 text-ink shadow-none outline-none",
        "backdrop:bg-ink/70",
        className,
      )}
    >
      <div className="relative">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-0 top-0 flex size-10 items-center justify-center bg-terracotta text-cream transition-opacity hover:opacity-90"
        >
          <IconClose className="size-3" />
        </button>
        {children}
      </div>
    </dialog>
  );
}
