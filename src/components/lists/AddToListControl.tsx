"use client";

import { useState } from "react";
import { IconPlus } from "@/components/icons";
import { useListSelection } from "@/components/lists/ListSelection";
import { Select } from "@/components/ui";

/** Product page "Add to list" control (Figma 196:6103 + 196:6120): list picker + a 51x51 plus tile that adds this product. */
export function AddToListControl() {
  const { lists, active, setActiveId } = useListSelection();
  const [added, setAdded] = useState(false);

  const add = () => {
    // TODO (Laravel phase): POST this product to the selected list. No backend yet - acknowledge only.
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="flex flex-wrap items-center gap-5">
      <Select
        label="Choose a list"
        renderValue={() => `List: ${active.name}`}
        options={lists.map((l) => ({ value: l.id, label: l.name }))}
        value={active.id}
        onChange={setActiveId}
        className="w-full sm:w-[330px]"
        fieldClassName="h-10 w-full border border-r-0 border-sand pl-[11px] font-display text-label font-medium text-ink"
        chevronClassName="h-10 w-10 border border-sand text-ink"
      />
      <span className="font-display text-label font-medium text-ink">{added ? "Added" : "Add to list"}</span>
      <button type="button" onClick={add} aria-label="Add to list" className="flex size-[51px] shrink-0 items-center justify-center bg-terracotta text-cream hover:opacity-90">
        <IconPlus className="size-6" />
      </button>
    </div>
  );
}
