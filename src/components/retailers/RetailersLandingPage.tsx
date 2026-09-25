"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { NoteSlider } from "@/components/cards/NoteSlider";
import { IconChevronRight } from "@/components/icons";
import { Image } from "@/components/ui/Image";
import { Breadcrumb, Container } from "@/components/ui";
import { cn } from "@/lib/cn";
import type { NoteSlide, Retailer } from "@/types/content";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

/**
 * Retailers landing page (Figma 1347:10942): hero + "Note from Anita" + an A-Z filter bar + a grid of the
 * selected letter's brands. Defaults to the first letter that actually has a retailer, since the real
 * partner list (retailers.ts) has no "A" brand the way Figma's example ("Aden + anais") does.
 */
export function RetailersLandingPage({ retailers, notes }: { retailers: Retailer[]; notes: NoteSlide[] }) {
  const lettersWithRetailers = useMemo(() => new Set(retailers.map((r) => r.letter)), [retailers]);
  const [letter, setLetter] = useState(() => ALPHABET.find((l) => lettersWithRetailers.has(l)) ?? "A");
  const shown = retailers.filter((r) => r.letter === letter);

  return (
    <>
      <Container className="grid grid-cols-1 gap-8 pt-[35px] xl:grid-cols-[610px_minmax(0,1fr)] xl:gap-0">
        <div>
          <Breadcrumb trail={[{ label: "Products", href: "/products" }]} current="Our retailers" />
          <h1 className="mt-2 text-[36px] leading-[44px] xl:mt-[26px] xl:text-display">Our retailers</h1>
        </div>
        <div className="min-w-0 xl:pl-[91px]">
          <NoteSlider notes={notes} />
        </div>
      </Container>

      <nav aria-label="Filter retailers by letter" className="mt-10">
        <Container>
          <ul className="flex flex-wrap gap-[6px]">
            {ALPHABET.map((l) => {
              const has = lettersWithRetailers.has(l);
              const active = l === letter;
              return (
                <li key={l}>
                  <button
                    type="button"
                    disabled={!has}
                    onClick={() => setLetter(l)}
                    aria-current={active ? "true" : undefined}
                    className={cn(
                      "flex h-[52px] w-11 items-center justify-center font-display text-label font-medium",
                      active ? "bg-terracotta text-cream" : has ? "border border-sand text-ink hover:border-terracotta" : "border border-sand text-ink/30",
                    )}
                  >
                    {l}
                  </button>
                </li>
              );
            })}
          </ul>
        </Container>
      </nav>

      <Container className="mt-8 pb-[50px]">
        <h2 className="font-display text-h2">‘{letter}’ Brands</h2>
        {shown.length === 0 ? (
          <p className="mt-4 font-sans text-body text-ink">No retailers starting with “{letter}” yet.</p>
        ) : (
          <ul className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {shown.map((retailer) => (
              <li key={retailer.id} className="border-[0.5px] border-sand">
                <Link href={`/retailers/${retailer.slug}`} className="group flex h-full flex-col">
                  <div className="relative h-[251px] w-full overflow-hidden">
                    <Image src={retailer.image.src} alt={retailer.image.alt} fill sizes="330px" className="object-cover transition-transform duration-300 group-hover:scale-[1.02]" />
                  </div>
                  <div className="flex flex-1 items-center justify-between p-5">
                    <p className="font-display text-h3 font-medium text-ink">{retailer.name}</p>
                    <span aria-hidden="true" className="flex size-[33px] shrink-0 items-center justify-center bg-terracotta text-cream">
                      <IconChevronRight className="h-4 w-auto" />
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Container>
    </>
  );
}
