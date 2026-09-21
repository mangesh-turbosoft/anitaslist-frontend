import { notFound } from "next/navigation";
import { categories } from "@/data/categories";
import type { CategoryPageContent, CategoryProduct, NoteSlide } from "@/types/content";

const notes: NoteSlide[] = [1, 2, 3, 4].map((n) => ({
  id: `category-note-${n}`,
  image: { src: "/images/cover-a-213x197.webp", alt: "", width: 213, height: 197 },
  text: "“Lorem ipsum dolor sit amet consectetur. Id ornare egestas semper aenean faucibus scelerisque. Nibh volutpat a egestas amet blandit sit venenatis. Vestibulum egestas pellentesque lacus tincidunt.”",
  video: { label: "Watch video", href: "/expert-advice" },
}));

/**
 * 12 products per page, first column real-named ("Bugaboo Fox 5 Renew", matching the one product page Figma
 * draws), the rest lorem ipsum - matches the pattern drawn on Products/Category Template (190:5514).
 */
function products(categorySlug: string, subcategorySlug: string | null): CategoryProduct[] {
  return Array.from({ length: 12 }, (_, i) => {
    const isFirstColumn = i % 3 === 0;
    return {
      id: `${categorySlug}-${subcategorySlug ?? "all"}-${i + 1}`,
      slug: isFirstColumn ? "bugaboo-fox-5-renew" : `product-${i + 1}`,
      name: isFirstColumn ? "Bugaboo Fox 5 Renew" : "Lorem ipsum dolor sit amet consectetur",
      price: "£00.00",
      image: null,
    };
  });
}

const TOTAL_PAGES = 4;

/** Products/Category Template (Figma 190:5514, 1440x2220). CONTENT TODO: description and product names beyond the one drawn example are lorem ipsum. */
export function categoryPageContent(categorySlug: string, subcategorySlug?: string, page = 1): CategoryPageContent {
  const category = categories.find((c) => c.slug === categorySlug);
  if (!category) notFound();
  const subcategory = subcategorySlug ? category.subcategories.find((s) => s.slug === subcategorySlug) : undefined;
  if (subcategorySlug && !subcategory) notFound();
  const activeName = subcategory?.name ?? category.name;
  const currentPage = Math.min(Math.max(1, page), TOTAL_PAGES);

  return {
    trail: subcategory
      ? [{ label: "Products", href: "/products" }, { label: category.name, href: `/products/${category.slug}` }]
      : [{ label: "Products", href: "/products" }],
    current: activeName,
    heading: `Browse <em>${activeName.toLowerCase()}</em>`,
    notes,
    description: "Lorem ipsum dolor sit amet consectetur.",
    categories,
    activeCategorySlug: category.slug,
    activeSubcategorySlug: subcategory?.slug ?? null,
    products: products(category.slug, subcategory?.slug ?? null),
    page: currentPage,
    totalPages: TOTAL_PAGES,
  };
}
