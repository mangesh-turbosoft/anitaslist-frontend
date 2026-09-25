import { notFound } from "next/navigation";
import { categories } from "@/data/categories";
import { retailers } from "@/data/retailers";
import type { NoteSlide, Product, ProductListingContent, ProductsRow } from "@/types/content";

const notes: NoteSlide[] = [1, 2, 3, 4].map((n) => ({
  id: `category-note-${n}`,
  image: { src: "/images/cover-a-213x197.webp", alt: "", width: 213, height: 197 },
  text: "“Lorem ipsum dolor sit amet consectetur. Id ornare egestas semper aenean faucibus scelerisque. Nibh volutpat a egestas amet blandit sit venenatis. Vestibulum egestas pellentesque lacus tincidunt.”",
  video: { label: "Watch video", href: "/expert-advice" },
}));

/**
 * 6 products per subcategory row, first card of the very first row real-named ("Bugaboo Fox 5 Renew", matching
 * the one product page Figma draws), the rest lorem ipsum, brand cycling through the real retailer list -
 * matches Products/Category Template (1317:1532) and Products/Subcategory Template (1317:5483).
 */
function productsFor(rowIndex: number, categorySlug: string, subcategorySlug: string): Product[] {
  return Array.from({ length: 6 }, (_, i) => {
    const isRealExample = rowIndex === 0 && i === 0 && categorySlug === "transport" && subcategorySlug === "pushchairs";
    const retailer = retailers[(rowIndex + i) % retailers.length];
    return {
      id: `${categorySlug}-${subcategorySlug}-${rowIndex}-${i}`,
      name: isRealExample ? "Bugaboo Fox 5 Renew" : "Lorem ipsum dolor sit amet consectetur et dolore",
      brand: isRealExample ? "Bugaboo" : retailer.name,
      price: "From £00.00",
      rating: { value: "4.7", count: "17.7k" },
      image: { src: "/images/product-thumb.webp", alt: "", width: 248, height: 248 },
      tag: i % 3 === 0 ? "Best seller" : null,
      options: { colour: ["Black", "White", "Grey"], size: ["Medium", "Small", "Large"] },
    };
  });
}

function rowsFor(categorySlug: string, subcategorySlug: string | null, subcategories: { slug: string; name: string }[]): ProductsRow[] {
  if (subcategorySlug) {
    const sub = subcategories.find((s) => s.slug === subcategorySlug);
    return [{ id: subcategorySlug, heading: sub?.name ?? "Products", items: productsFor(0, categorySlug, subcategorySlug) }];
  }
  if (subcategories.length > 0) {
    return subcategories.map((sub, i) => ({ id: sub.slug, heading: sub.name, items: productsFor(i, categorySlug, sub.slug) }));
  }
  return [{ id: "all", heading: "All products", items: productsFor(0, categorySlug, "all") }];
}

/** Products/Category & Subcategory Templates (Figma 1317:1532, 1317:5483). CONTENT TODO: product names beyond the one drawn example are lorem ipsum. */
export function categoryPageContent(categorySlug: string, subcategorySlug?: string): ProductListingContent {
  const category = categories.find((c) => c.slug === categorySlug);
  if (!category) notFound();
  const subcategory = subcategorySlug ? category.subcategories.find((s) => s.slug === subcategorySlug) : undefined;
  if (subcategorySlug && !subcategory) notFound();
  const activeName = subcategory?.name ?? category.name;

  const rows = rowsFor(category.slug, subcategory?.slug ?? null, category.subcategories);

  return {
    trail: subcategory
      ? [{ label: "Products", href: "/products" }, { label: category.name, href: `/products/${category.slug}` }]
      : [{ label: "Products", href: "/products" }],
    current: activeName,
    heading: `Browse <em>${activeName.toLowerCase()}</em>`,
    notes,
    subcategories: category.subcategories,
    retailers,
    productCount: rows.reduce((sum, row) => sum + row.items.length, 0),
    subcategoryBasePath: `/products/${category.slug}`,
    rows,
  };
}
