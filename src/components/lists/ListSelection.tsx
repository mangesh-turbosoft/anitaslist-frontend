"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import type { UserList } from "@/types/content";

type Ctx = { lists: UserList[]; active: UserList; setActiveId: (id: string) => void };
const ListSelectionContext = createContext<Ctx | null>(null);

/** Shares the "which list am I adding to" choice between the Add-to-list bar and every product card on a page. */
export function ListSelectionProvider({ lists, children }: { lists: UserList[]; children: ReactNode }) {
  const [activeId, setActiveId] = useState(lists[0]?.id ?? "");
  const active = lists.find((l) => l.id === activeId) ?? lists[0] ?? { id: "", name: "" };
  return <ListSelectionContext.Provider value={{ lists, active, setActiveId }}>{children}</ListSelectionContext.Provider>;
}

export function useListSelection(): Ctx {
  const ctx = useContext(ListSelectionContext);
  if (!ctx) throw new Error("useListSelection must be used inside ListSelectionProvider");
  return ctx;
}
