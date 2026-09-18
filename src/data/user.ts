import type { UserList } from "@/types/content";

/** Signed-in user fixture. Names as drawn in the hub (886:11). Replaced by the Laravel session later. */
export const currentUser = { id: "user-1", name: "Anne Johnson", avatar: null as string | null };

export const userLists: UserList[] = [
  { id: "list-1", name: "List title one" },
  { id: "list-2", name: "List title two" },
  { id: "list-3", name: "List title three" },
  { id: "list-4", name: "List title four" },
];
