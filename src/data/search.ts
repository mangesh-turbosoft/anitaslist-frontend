import { categories } from "@/data/categories";
import type { SearchResults } from "@/types/content";

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
