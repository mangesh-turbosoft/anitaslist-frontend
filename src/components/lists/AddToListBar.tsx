"use client";

import { useState } from "react";
import { IconPlus } from "@/components/icons";
import { useListSelection } from "@/components/lists/ListSelection";
import { Container, Divider, Select } from "@/components/ui";

/**
 * "Add to list feature" bar (1011:11895, 1440x70): subheading P22 500 24/34 at the left; right group =
 * list dropdown 228x40 (cream, 1px sand border, label P22 500 16/19, 40x40 terracotta chevron) + 20px +
 * "Add all to list" 181x40 (40x40 sand plus tile + label). Full-width hairline underneath.
 */
export function AddToListBar({ subheading }: { subheading: string }) {
  const { lists, active, setActiveId } = useListSelection();
  const [done, setDone] = useState(false);

  const addAll = () => {
    // TODO (Laravel phase): POST all items on this page to the selected list.
    setDone(true);
    window.setTimeout(() => setDone(false), 2000);
  };

  return (
    <div>
      <Container className="flex min-h-[70px] flex-col gap-4 py-4 md:flex-row md:items-center md:justify-between md:py-0">
        <h2 className="font-display text-h3 font-medium md:pt-[7px] md:self-start">{subheading}</h2>
        <div className="flex flex-wrap items-center gap-5">
          <Select
            label="Choose a list"
            options={lists.map((l) => ({ value: l.id, label: l.name }))}
            value={active.id}
            onChange={setActiveId}
            className="w-[228px]"
            fieldClassName="h-10 w-full border border-r-0 border-sand bg-cream pl-5 font-display text-label font-medium text-ink"
            chevronClassName="h-10 w-10 bg-terracotta text-cream"
          />
          <button
            type="button"
            onClick={addAll}
            className="flex h-10 w-[181px] items-center bg-terracotta font-display text-label font-medium text-cream transition-opacity hover:opacity-90"
          >
            <span aria-hidden="true" className="flex size-10 shrink-0 items-center justify-center bg-sand">
              <IconPlus className="size-[26px]" />
            </span>
            <span className="flex-1 text-center">{done ? "Added" : "Add all to list"}</span>
          </button>
        </div>
      </Container>
      <Divider />
    </div>
  );
}
