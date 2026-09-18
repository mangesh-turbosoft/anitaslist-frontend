"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { CardMenu } from "@/components/app/CardMenu";
import { ListCard } from "@/components/cards/ListCard";
import { Container } from "@/components/ui";
import type { ListSummary, RegistrySummary } from "@/types/app";

type Item = (ListSummary & { kind: "list" }) | (RegistrySummary & { kind: "registry" });

/**
 * Card grid for the list page (886:13) and registry page (886:20): four 330px columns, 20px gaps, 20px row gap,
 * starting 0px under the heading hairline. Menu actions mutate local state only until the API exists (TODO).
 */
export function ListGrid({ items: initial }: { items: Item[] }) {
  const [items, setItems] = useState(initial);
  const router = useRouter();

  const rename = (id: string) => {
    const current = items.find((i) => i.id === id);
    const name = window.prompt("Rename", current?.name ?? "");
    if (name) setItems((all) => all.map((i) => (i.id === id ? { ...i, name } : i)));
  };
  const remove = (id: string) => {
    if (window.confirm("Delete this? This cannot be undone.")) setItems((all) => all.filter((i) => i.id !== id));
  };
  const duplicate = (id: string) => {
    setItems((all) => {
      const src = all.find((i) => i.id === id);
      if (!src) return all;
      const copy = { ...src, id: `${src.id}-copy-${Date.now()}`, name: `${src.name} (copy)` } as Item;
      const idx = all.indexOf(src);
      return [...all.slice(0, idx + 1), copy, ...all.slice(idx + 1)];
    });
  };

  return (
    <Container className="pt-0">
      <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((item) => {
          const href = item.kind === "list" ? `/lists/${item.id}` : `/registries/${item.id}`;
          const menuItems =
            item.kind === "list"
              ? [
                  { label: "Rename list", onSelect: () => rename(item.id) },
                  { label: "Turn into registry", onSelect: () => router.push(`/hub?new=registry&from=${item.id}`) },
                  { label: "Delete", onSelect: () => remove(item.id), destructive: true },
                  { label: "Duplicate", onSelect: () => duplicate(item.id) },
                ]
              : [
                  { label: "Rename registry", onSelect: () => rename(item.id) },
                  { label: "Share registry", onSelect: () => router.push(`/registries/${item.id}?share=1`) },
                  { label: "Update address", onSelect: () => router.push(`/registries/${item.id}?address=1`) },
                  { label: "Delete", onSelect: () => remove(item.id), destructive: true },
                ];
          return (
            <li key={item.id} className="flex justify-center sm:justify-start">
              <ListCard
                href={href}
                name={item.name}
                coverImage={item.coverImage}
                totalPence={item.totalPence}
                editedAt={item.editedAt}
                progress={item.progress}
                kind={item.kind}
                menu={<CardMenu items={menuItems} label={`Options for ${item.name}`} />}
              />
            </li>
          );
        })}
      </ul>
    </Container>
  );
}
