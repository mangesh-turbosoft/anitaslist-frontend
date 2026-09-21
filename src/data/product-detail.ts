import type { ProductDetail } from "@/types/content";

/**
 * Product page (Figma 196:5949, 1440x1410). Only one product is drawn ("Bugaboo Fox 5 Renew", under
 * Transport > Pushchairs); every slug currently resolves to it until a real catalogue exists.
 * CONTENT TODO: description, buying-option retailer names and specifics are lorem ipsum, gallery has no
 * real photography (Figma draws plain placeholder boxes).
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
    gallery: Array.from({ length: 7 }, () => null),
    buyingOptions: [1, 2, 3].map((n) => ({ id: `option-${n}`, retailer: "Lorem ipsum dolor", href: "#" })),
    description:
      "Lorem ipsum dolor sit amet consectetur. Imperdiet tristique fringilla id donec id. Tellus auctor risus pharetra sem. Neque lectus rhoncus lacinia non diam velit malesuada vel.",
    specifics: [1, 2, 3, 4].map((n) => ({ id: `spec-${n}`, label: "Lorem ipsum dolor", detail: "Lorem ipsum dolor sit amet consectetur adipiscing elit." })),
  };
}
