"use client";

import { useState } from "react";
import { IconSearch } from "@/components/icons";
import { ModalBody, ModalHeader, ModalSubmit } from "@/components/modals/ModalParts";
import { Input, Modal } from "@/components/ui";
import { cn } from "@/lib/cn";

/**
 * Header "Search" - opens the site's standard lightbox instead of navigating straight to a search page, so
 * typing and pressing enter (or the button) is what lands on the results page. Submits to /search-results, a
 * page dedicated to this entry point and shaped differently from /search (the general "start searching" page
 * that search bars embedded elsewhere on the site submit back to, on themselves, in place).
 */
export function HeaderSearch({ variant }: { variant: "desktop" | "mobile" }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Search"
        className={cn(
          variant === "desktop"
            ? "inline-flex items-center gap-1 font-display text-label font-medium text-ink transition-opacity hover:opacity-70"
            : "flex size-11 items-center justify-center text-ink",
        )}
      >
        {variant === "desktop" && "Search"}
        <IconSearch className={variant === "desktop" ? "h-5 w-auto" : "h-[27px] w-auto"} />
      </button>

      <Modal open={open} onClose={() => setOpen(false)} label="Search" className="max-w-[600px]">
        <ModalHeader eyebrow="Anita’s List" title="Search" />
        <ModalBody>
          <form role="search" action="/search-results" className="flex flex-col">
            <Input label="Search" name="q" type="search" placeholder="Search for products, lists or advice" autoFocus />
            <ModalSubmit>Search</ModalSubmit>
          </form>
        </ModalBody>
      </Modal>
    </>
  );
}
