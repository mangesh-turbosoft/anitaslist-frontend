import { retailers } from "@/data/retailers";
import type { NoteSlide, Product, ProductDetail } from "@/types/content";

const notes: NoteSlide[] = [1, 2, 3, 4].map((n) => ({
  id: `product-note-${n}`,
  image: { src: "/images/cover-a-213x197.webp", alt: "", width: 213, height: 197 },
  text: "“Lorem ipsum dolor sit amet consectetur. Id ornare egestas semper aenean faucibus scelerisque. Nibh volutpat a egestas amet blandit sit venenatis. Vestibulum egestas pellentesque lacus tincidunt.”",
  video: { label: "Watch video", href: "/expert-advice" },
}));

const relevantProduct = (n: number): Product => ({
  id: `relevant-${n}`,
  name: "Lorem ipsum dolor sit amet consectetur et dolore",
  brand: retailers[n % retailers.length]!.name,
  price: "From £00.00",
  rating: { value: "4.7", count: "17.7k" },
  image: { src: "/images/product-thumb.webp", alt: "", width: 248, height: 248 },
  tag: n % 3 === 0 ? "Best seller" : n % 3 === 1 ? "Out of stock" : null,
  options: { colour: ["Black", "White", "Grey"], size: ["Medium", "Small", "Large"] },
});

/**
 * Product page (Figma 1331:8538, 1440x2564). Only one product is drawn ("Bugaboo Fox 5 Renew", under
 * Transport > Pushchairs); every slug currently resolves to it until a real catalogue exists.
 * CONTENT TODO: description, buying-option retailer names and specifics are lorem ipsum, gallery has no
 * real photography (Figma draws plain placeholder boxes). Buying-option retailer names use the real
 * partner list (retailers.ts) instead of Figma's literal "Lorem ipsum dolor" placeholder, and link to
 * that retailer's own page.
 */
export function productDetail(categorySlug: string, subcategorySlug: string, productSlug: string): ProductDetail {
  return {
    slug: productSlug,
    categorySlug,
    subcategorySlug,
    trail: [
      { label: "Products", href: "/products" },
      { label: "Transport", href: "/products/transport" },
      { label: "Pushchairs", href: "/products/transport/pushchairs" },
    ],
    name: "Bugaboo Fox 5 Renew",
    price: "£00.00",
    rating: { value: "4.7", count: "17.7k" },
    options: { colour: ["Black", "White", "Grey"], size: ["Medium", "Small", "Large"] },
    gallery: Array.from({ length: 7 }, () => null),
    buyingOptions: retailers.slice(0, 3).map((r) => ({ id: r.id, retailer: r.name, href: `/retailers/${r.slug}` })),
    description:
      "Lorem ipsum dolor sit amet consectetur. Imperdiet tristique fringilla id donec id. Tellus auctor risus pharetra sem. Neque lectus rhoncus lacinia non diam velit malesuada vel.",
    specifics: [1, 2, 3, 4].map((n) => ({ id: `spec-${n}`, label: "Lorem ipsum dolor", detail: "Lorem ipsum dolor sit amet consectetur adipiscing elit." })),
    notes,
    relevantProducts: { id: "relevant-products", heading: "Relevant products", items: [1, 2, 3, 4, 5, 6].map(relevantProduct) },
  };
}
