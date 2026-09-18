"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { IconClose, IconLogoMark, IconMenu } from "@/components/icons";
import { Button } from "@/components/ui";
import { accountNav, primaryNav } from "@/data/site";
import { NavLinks } from "./NavLinks";

/**
 * Mobile navigation panel. NOT designed in Figma (the "Menus and pop out" page is empty) - this is the
 * rules-first interpretation: a full-screen cream panel holding the nav list, Search, Login and Create account.
 * Figma does specify the trigger (51:450): 27x16 hamburger, three 3px rules, #2D1A14.
 */
export function MobileMenu() {
  const [open, setOpen] = useState(false);
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

  const close = () => setOpen(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        aria-expanded={open}
        aria-controls="mobile-menu"
        className="flex size-11 items-center justify-center text-ink"
      >
        <IconMenu className="h-4 w-[27px]" />
      </button>

      <dialog
        id="mobile-menu"
        ref={ref}
        aria-label="Menu"
        onClose={close}
        className="h-dvh max-h-none w-screen max-w-none bg-cream p-0 text-ink backdrop:bg-ink/70"
      >
        <div className="flex h-full flex-col px-4">
          <div className="flex h-[93px] items-center justify-between">
            <Link href="/" aria-label="Anita’s List home" onClick={close} className="text-ink-alt">
              <IconLogoMark className="h-[50px] w-auto" />
            </Link>
            <button
              type="button"
              onClick={close}
              aria-label="Close menu"
              className="flex size-10 items-center justify-center bg-terracotta text-cream"
            >
              <IconClose className="size-3" />
            </button>
          </div>
          <nav aria-label="Primary" className="mt-6">
            <NavLinks
              items={primaryNav}
              className="flex flex-col gap-5"
              linkClassName="text-h3 font-medium"
              onNavigate={close}
            />
          </nav>
          <div className="mt-auto flex flex-col gap-4 pb-8">
            <Link href={accountNav.search.href} onClick={close} className="font-display text-label font-medium">
              {accountNav.search.label}
            </Link>
            <Link href={accountNav.login.href} onClick={close} className="font-display text-label font-medium">
              {accountNav.login.label}
            </Link>
            <Button href={accountNav.register.href} onClick={close} className="w-full">
              {accountNav.register.label}
            </Button>
          </div>
        </div>
      </dialog>
    </>
  );
}
