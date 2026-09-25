import { notFound } from "next/navigation";
import { categories } from "@/data/categories";
import { homeContent } from "@/data/home";
import type { NoteSlide, Product, ProductListingContent, Retailer } from "@/types/content";

const cardImage = { src: "/images/retailer-card-photo-1080x1080.webp", alt: "", width: 1080, height: 1080 };

const slugify = (name: string) =>
  name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

/**
 * Retailers landing / individual retailer pages (Figma 1347:10942, 1348:11415). Figma's own example brands
 * ("Aden + anais", "Angelcare") have no real vendor behind them in this codebase, so this reuses the real
 * partner list already built for the homepage's "Our trusted partners" marquee (home.ts) instead - same
 * brands, same real logos where one exists, now given a slug/letter/product-card photo for a full page each.
 */
export const retailers: Retailer[] = homeContent.partners.items
  .map((brand) => ({
    id: brand.id,
    slug: slugify(brand.name),
    name: brand.name,
    logo: brand.logo,
    color: brand.color,
    image: cardImage,
    letter: brand.name[0]!.toUpperCase(),
  }))
  .sort((a, b) => a.name.localeCompare(b.name));

export function getRetailer(slug: string): Retailer | undefined {
  return retailers.find((r) => r.slug === slug);
}

export const retailersLandingNotes: NoteSlide[] = [1, 2, 3, 4].map((n) => ({
  id: `retailers-landing-note-${n}`,
  image: { src: "/images/cover-a-213x197.webp", alt: "", width: 213, height: 197 },
  text: "“Lorem ipsum dolor sit amet consectetur. Id ornare egestas semper aenean faucibus scelerisque. Nibh volutpat a egestas amet blandit sit venenatis. Vestibulum egestas pellentesque lacus tincidunt.”",
  video: { label: "Watch video", href: "/expert-advice" },
}));

const notes: NoteSlide[] = [1, 2, 3, 4].map((n) => ({
  id: `retailer-note-${n}`,
  image: { src: "/images/cover-a-213x197.webp", alt: "", width: 213, height: 197 },
  text: "“Lorem ipsum dolor sit amet consectetur. Id ornare egestas semper aenean faucibus scelerisque. Nibh volutpat a egestas amet blandit sit venenatis. Vestibulum egestas pellentesque lacus tincidunt.”",
  video: { label: "Watch video", href: "/expert-advice" },
}));

// Only Transport has real subcategories (categories.ts) - reused here as the shape of what a retailer's
// range of products would be filtered by, since no retailer-to-product catalogue exists yet.
const transport = categories.find((c) => c.slug === "transport")!;

function productsFor(retailer: Retailer, rowIndex: number, i: number): Product {
  const isRealExample = retailer.slug === "stokke" && rowIndex === 0 && i === 0;
  return {
    id: `${retailer.slug}-${rowIndex}-${i}`,
    name: isRealExample ? "Bugaboo Fox 5 Renew" : "Lorem ipsum dolor sit amet consectetur et dolore",
    brand: retailer.name,
    price: "From £00.00",
    rating: { value: "4.7", count: "17.7k" },
    image: { src: "/images/product-thumb.webp", alt: "", width: 248, height: 248 },
    tag: i % 3 === 0 ? "Best seller" : i % 3 === 1 ? "Out of stock" : null,
    options: { colour: ["Black", "White", "Grey"], size: ["Medium", "Small", "Large"] },
  };
}

/** Individual retailer page (Figma 1348:11415) - one per real brand, product rows grouped by Transport's real subcategories. */
export function retailerPageContent(slug: string): ProductListingContent {
  const retailer = getRetailer(slug);
  if (!retailer) notFound();

  const rows = transport.subcategories.map((sub, rowIndex) => ({
    id: sub.slug,
    heading: sub.name,
    items: Array.from({ length: 6 }, (_, i) => productsFor(retailer, rowIndex, i)),
  }));

  return {
    trail: [{ label: "Products", href: "/products" }, { label: "Our retailers", href: "/retailers" }],
    current: retailer.name,
    heading: retailer.name,
    notes,
    subcategories: transport.subcategories,
    // No "Retailers" filter group here - you're already on this retailer's own page.
    productCount: rows.reduce((sum, row) => sum + row.items.length, 0),
    subcategoryBasePath: `/products/${transport.slug}`,
    rows,
  };
}
