import type { ItemCategory, JourneySlot, ListDetail, ListItem, RegistryDetail } from "@/types/app";
import type { NoteSlide } from "@/types/content";

const notes: NoteSlide[] = [1, 2, 3, 4].map((n) => ({
  id: `detail-note-${n}`,
  image: { src: "/images/cover-a-213x197.webp", alt: "", width: 213, height: 197 },
  text: "“Lorem ipsum dolor sit amet consectetur. Id ornare egestas semper aenean faucibus scelerisque. Nibh volutpat a egestas amet blandit sit venenatis. Vestibulum lorem.”",
  video: { label: "Watch video", href: "/expert-advice" },
}));

const banner = { src: "/images/banner-section-1440x300.webp", alt: "", width: 1440, height: 300 };

/** The 3 retailer rows drawn in the "Buying options" step of the buy lightbox (Figma 1199:3679). */
const buyingOptions: ListItem["buyingOptions"] = [1, 2, 3].map((n) => ({ id: `option-${n}`, retailer: "Lorem ipsum dolor", href: "#" }));

/** Row copy as drawn (916:4388 / 1011:10660). Tier prefix alternates Optional / Recommended in the registry frames. */
const item = (id: string, tier: ListItem["tier"], status: ListItem["status"] = "to-buy"): ListItem => ({
  id,
  name: "Name of product goes here",
  subcategory: "Product subcategory",
  tier,
  notes: "User notes ipsum dolor sit amet consectetur. Arcu arcu fusce vitae mi mauris imperdiet.",
  pricePence: 0,
  quantity: 1,
  status,
  image: null,
  reservedBy: status === "reserved" ? { name: "Jane Black", date: "2026-01-01" } : null,
  buyingOptions,
  purchase:
    status === "bought"
      ? {
          retailer: "Lorem ipsum dolor",
          totalPence: 0,
          quantityBought: 1,
          buyerName: "Jane Blogs",
          message:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut alix et al commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla.\n\nJane xxx",
          thankedYou: false,
        }
      : null,
});

const category = (id: string, withTier: boolean, rows = 4): ItemCategory => ({
  id,
  name: "Product category",
  items: Array.from({ length: rows }, (_, i) => {
    const status: ListItem["status"] = withTier && i === 0 ? "reserved" : withTier && i === 1 ? "bought" : "to-buy";
    return item(`${id}-item-${i + 1}`, withTier ? (i < 2 ? "optional" : "recommended") : null, status);
  }),
  slots: [],
});

const slot = (id: string): JourneySlot => ({ id, tier: "recommended", name: "Product subcategory", quantity: 1 });

const journeyCategory = (id: string): ItemCategory => ({
  id,
  name: "Product category",
  items: [],
  slots: Array.from({ length: 5 }, (_, i) => slot(`${id}-slot-${i + 1}`)),
});

/** Blank list (910:2937 populated / 886:15 unpopulated) and journey list (917:4969 / 917:5720). */
export function listDetail(id: string, opts: { empty?: boolean; type?: "blank" | "journey" } = {}): ListDetail {
  const type = opts.type ?? (id.includes("journey") || ["list-2", "list-5", "list-8"].includes(id) ? "journey" : "blank");
  const populated = !opts.empty;
  return {
    id,
    name: "Dolor sit amet consectetur",
    type,
    editedAt: "2026-06-11",
    totalPence: 0,
    banner,
    notes,
    categories: populated
      ? [1, 2, 3, 4].map((n) => category(`${id}-cat-${n}`, false))
      : type === "journey"
        ? [1, 2, 3, 4].map((n) => journeyCategory(`${id}-cat-${n}`))
        : [],
  };
}

/** Registry owner view (886:21) / shared view (886:22). */
export function registryDetail(id: string): RegistryDetail {
  return {
    id,
    name: "Dolor sit amet consectetur",
    type: "blank",
    editedAt: "2026-06-11",
    totalPence: 0,
    banner: { src: "/images/cover-b-1440x300.webp", alt: "", width: 1440, height: 300 },
    notes,
    categories: [1, 2, 3, 4].map((n) => category(`${id}-cat-${n}`, true)),
    ownerId: "user-1",
    shareToken: `share-${id}`,
  };
}
