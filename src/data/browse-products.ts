import { categories } from "@/data/categories";
import type { BrowseProductsContent } from "@/types/content";

/** Browse all products (Figma 183:5020, 1440x1764). CONTENT TODO: search/filter summary text is lorem ipsum. */
export const browseProductsContent: BrowseProductsContent = {
  eyebrow: "Products",
  heading: "Browse <em>all products</em>",
  searchPlaceholder: "Pushchairs with cover",
  filterSummary: {
    productLines: ["Lorem ipsum dolor sit amet consectetur.", "Lorem ipsum dolor sit amet consectetur.", "Lorem ipsum dolor sit amet consectetur."],
    collectionLines: ["Lorem ipsum dolor sit amet consectetur."],
  },
  categories,
};
