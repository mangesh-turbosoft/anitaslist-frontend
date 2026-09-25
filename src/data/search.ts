import { categories } from "@/data/categories";
import { retailers } from "@/data/retailers";
import type { NoteSlide, Product, SearchResults } from "@/types/content";

export const searchNotes: NoteSlide[] = [1, 2, 3, 4].map((n) => ({
  id: `search-note-${n}`,
  image: { src: "/images/cover-a-213x197.webp", alt: "", width: 213, height: 197 },
  text: "“Lorem ipsum dolor sit amet consectetur. Id ornare egestas semper aenean faucibus scelerisque. Nibh volutpat a egestas amet blandit sit venenatis. Vestibulum egestas pellentesque lacus tincidunt.”",
  video: { label: "Watch video", href: "/expert-advice" },
}));

/** "Best sellers" row shown on the search pages (Figma 1313:2 / 1317:1151) before/alongside real results. */
export const searchBestSellers: Product[] = [0, 1, 2, 3, 4, 5].map((n) => ({
  id: `search-best-seller-${n}`,
  name: n === 0 ? "Bugaboo Fox 5 Renew" : "Lorem ipsum dolor sit amet consectetur et dolore",
  brand: n === 0 ? "Bugaboo" : retailers[n % retailers.length]!.name,
  price: "From £00.00",
  rating: { value: "4.7", count: "17.7k" },
  image: { src: "/images/product-thumb.webp", alt: "", width: 248, height: 248 },
  tag: n % 3 === 0 ? "Best seller" : n % 3 === 1 ? "Out of stock" : null,
  options: { colour: ["Black", "White", "Grey"], size: ["Medium", "Small", "Large"] },
}));

/** The one real product in the fixture data (see product-detail.ts) - the only product search can honestly match. */
const REAL_PRODUCT = {
  name: "Bugaboo Fox 5 Renew",
  price: "£00.00",
  href: "/products/transport/pushchairs/bugaboo-fox-5-renew",
};

export function searchContent(query: string): SearchResults {
  const q = query.trim().toLowerCase();
  if (!q) return { categories: [], subcategories: [], products: [] };

  const matchedCategories = categories.filter((c) => c.name.toLowerCase().includes(q));

  const matchedSubcategories = categories.flatMap((category) =>
    category.subcategories.filter((s) => s.name.toLowerCase().includes(q)).map((subcategory) => ({ category, subcategory })),
  );

  const matchedProducts = REAL_PRODUCT.name.toLowerCase().includes(q) ? [REAL_PRODUCT] : [];

  return { categories: matchedCategories, subcategories: matchedSubcategories, products: matchedProducts };
}
