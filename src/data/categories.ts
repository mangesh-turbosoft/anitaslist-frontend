import type { Category } from "@/types/content";

const generic1 = { src: "/images/category-generic-1-476x585.webp", alt: "", width: 476, height: 585 };
const generic2 = { src: "/images/category-generic-2-476x585.webp", alt: "", width: 476, height: 585 };
const generic3 = { src: "/images/category-generic-3-476x585.webp", alt: "", width: 476, height: 585 };

/** Only Transport's subcategories are drawn (Browse all products, 190:5514 sidebar) - the rest are CONTENT TODO. */
const transportSubcategories = [
  "Newborn car seats",
  "Car seat bases",
  "Car seat accessories",
  "Pushchairs",
  "Carrycots and seats",
  "Pushchair Accessories",
  "Rain covers",
  "Mosquito nets",
  "Footmuffs",
  "Sheepskin liners",
  "Liners & snugglers",
].map((name) => ({ slug: name.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""), name }));

/**
 * The 12 categories drawn on Browse all products (183:5020). Figma cycles 3 generic stock photos across every
 * tile regardless of category, not real per-category photography - transport/nursery/bedding keep the images
 * already used on the homepage carousel instead, since those are genuinely relevant.
 */
export const categories: Category[] = [
  { id: "cat-baby-clothing", slug: "baby-clothing", name: "Baby clothing", image: generic1, subcategories: [] },
  { id: "cat-bathing", slug: "bathing", name: "Bathing", image: generic2, subcategories: [] },
  { id: "cat-bedding", slug: "bedding", name: "Bedding", image: { src: "/images/category-bedding-476x585.webp", alt: "", width: 476, height: 585 }, subcategories: [] },
  { id: "cat-cleaning", slug: "cleaning", name: "Cleaning", image: generic3, subcategories: [] },
  { id: "cat-feeding-weaning", slug: "feeding-weaning", name: "Feeding & weaning", image: generic1, subcategories: [] },
  { id: "cat-monitors", slug: "monitors", name: "Monitors", image: generic2, subcategories: [] },
  { id: "cat-mothers", slug: "mothers", name: "Mothers", image: generic3, subcategories: [] },
  { id: "cat-nappies-lotions", slug: "nappies-lotions", name: "Nappies & lotions", image: generic1, subcategories: [] },
  { id: "cat-nursery", slug: "nursery", name: "Nursery", image: { src: "/images/category-nursery-476x585.webp", alt: "", width: 476, height: 585 }, subcategories: [] },
  { id: "cat-toys-play", slug: "toys-play", name: "Toys & play", image: generic2, subcategories: [] },
  { id: "cat-transport", slug: "transport", name: "Transport", image: { src: "/images/category-transport-476x585.webp", alt: "", width: 476, height: 585 }, subcategories: transportSubcategories },
  { id: "cat-travel", slug: "travel", name: "Travel", image: generic3, subcategories: [] },
];
