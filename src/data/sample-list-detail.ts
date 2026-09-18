import type { Product, SampleListDetail } from "@/types/content";

const product = (id: string): Product => ({
  id,
  name: "Lorem ipsum dolor sit amet consectetur et dolore",
  brand: "Brand/Retailer here",
  price: "From £00.00",
  rating: { value: "4.7", count: "17.7k" },
  image: { src: "/images/product-thumb.webp", alt: "", width: 248, height: 248 },
  tag: "Best seller",
  // Figma shows the selected values "Black" and "Medium"; the other options are placeholders so the selects work.
  options: { colour: ["Black", "White", "Grey"], size: ["Medium", "Small", "Large"] },
});

/**
 * Sample list sub page fixture (Figma 886:8). One record serves every slug until the CMS exists.
 * Four product rows are drawn with four visible cards each; six per row are supplied so the arrows work.
 */
export function sampleListDetail(slug: string): SampleListDetail {
  return {
    slug,
    breadcrumb: { parent: { label: "Sample lists", href: "/sample-lists" }, current: "Sample sub link" },
    title: "Bibendum odio sit amet aliquam sit.",
    notes: [1, 2, 3, 4].map((n) => ({
      id: `note-${n}`,
      image: { src: "/images/cover-a-213x197.webp", alt: "", width: 213, height: 197 },
      text: "“Lorem ipsum dolor sit amet consectetur. Id ornare egestas semper aenean faucibus scelerisque. Nibh volutpat a egestas amet blandit sit venenatis.”",
      video: { label: "Watch video", href: "/expert-advice" }, // destination unspecified in Figma
    })),
    banner: { src: "/images/banner-section-1440x300.webp", alt: "", width: 1440, height: 300 },
    subheading: "Bibendum odio sit amet aliquam sit.",
    rows: [1, 2, 3, 4].map((r) => ({
      id: `row-${r}`,
      heading: "Product category",
      items: [1, 2, 3, 4, 5, 6].map((p) => product(`${slug}-${r}-${p}`)),
    })),
  };
}
