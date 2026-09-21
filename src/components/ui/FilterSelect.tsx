"use client";

import { Select } from "@/components/ui/Select";

/**
 * A filter dropdown whose trigger always reads "Filter: {label}" regardless of what's picked (Figma draws it
 * static on both the "Fixed item" bar and the Products/Category Template's price/brand filters). Needs "use
 * client" of its own since it passes a function prop (renderValue) into Select - a server component can't do
 * that directly, but can render this pre-wired client component.
 */
export function FilterSelect({ label, options }: { label: string; options: string[] }) {
  return (
    <Select
      label={`Filter: ${label}`}
      options={options.map((o) => ({ value: o, label: o }))}
      defaultValue={options[0]}
      renderValue={() => `Filter: ${label}`}
      className="w-[218px]"
      fieldClassName="h-10 w-full border border-r-0 border-sand pl-[10px] font-display text-label font-medium"
      chevronClassName="h-10 w-[39px] border border-sand text-ink"
    />
  );
}
