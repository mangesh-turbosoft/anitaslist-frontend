import type { ImageAsset, NoteSlide } from "./content";

/**
 * Authenticated-app entities. Shaped to match the future Laravel API: ids as strings, money as integer pence,
 * dates as ISO 8601 strings, nullability explicit (plan section 13).
 */

export type ListType = "blank" | "journey";

export type ListSummary = {
  id: string;
  name: string;
  type: ListType;
  coverImage: ImageAsset | null;
  /** integer pence */
  totalPence: number;
  editedAt: string;
  /** 0-1, or null when the list has no items */
  progress: number | null;
};

export type RegistrySummary = {
  id: string;
  name: string;
  coverImage: ImageAsset | null;
  totalPence: number;
  editedAt: string;
  /** true when someone other than the owner shared it with the viewer */
  sharedWithMe: boolean;
  progress: number | null;
};

export type KeyDate = {
  id: string;
  title: string;
  /** ISO date */
  date: string;
  /** "14:00" style, null when allDay */
  startTime: string | null;
  endTime: string | null;
  allDay: boolean;
};

export type Note = {
  id: string;
  title: string;
  body: string;
  createdAt: string;
};

export type HubData = {
  user: { id: string; name: string; firstName: string; lastName: string; email: string; avatar: ImageAsset | null; weeksPregnant: number; weeksToDue: number };
  notes: NoteSlide[];
  lists: ListSummary[];
  registries: RegistrySummary[];
  keyDates: KeyDate[];
  userNotes: Note[];
};

/* ---------- List / registry detail ---------- */

export type ItemTier = "optional" | "recommended" | null;
export type ItemStatus = "to-buy" | "bought" | "reserved" | "deleted";

export type BuyingOption = { id: string; retailer: string; href: string };

/** Recorded when a registry invitee logs a purchase via the "buy" lightbox (Figma 1199:4492). */
export type PurchaseDetails = {
  retailer: string;
  totalPence: number;
  quantityBought: number;
  buyerName: string;
  message: string;
  thankedYou: boolean;
};

export type ListItem = {
  id: string;
  name: string;
  subcategory: string;
  tier: ItemTier;
  notes: string;
  pricePence: number;
  quantity: number;
  status: ItemStatus;
  image: ImageAsset | null;
  reservedBy: { name: string; date: string } | null;
  buyingOptions: BuyingOption[];
  purchase: PurchaseDetails | null;
};

/** Journey lists start as category "slots" with suggestions rather than items (917:5720 / Group 86). */
export type JourneySlot = { id: string; tier: Exclude<ItemTier, null>; name: string; quantity: number };

export type ItemCategory = {
  id: string;
  name: string;
  items: ListItem[];
  slots: JourneySlot[];
};

export type ListDetail = {
  id: string;
  name: string;
  type: ListType;
  editedAt: string;
  totalPence: number;
  banner: ImageAsset;
  notes: NoteSlide[];
  categories: ItemCategory[];
};

export type RegistryDetail = ListDetail & { ownerId: string; shareToken: string };
