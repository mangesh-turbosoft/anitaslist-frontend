import type { HomeContent } from "@/types/content";

/**
 * Homepage fixture. Copy is the placeholder text drawn in Figma (886:5) - almost all of it lorem ipsum.
 * Where the design implies more items than it draws (4 hero dots, 4 testimonial dots, "1 2 3 4" categories),
 * the drawn item is repeated so pagination is exercised. CONTENT TODO throughout.
 */

const heroImage = { src: "/images/hero-home-1440x649.webp", alt: "", width: 1440, height: 649 };

export const homeContent: HomeContent = {
  hero: {
    slides: [1, 2, 3, 4].map((n) => ({
      id: `hero-${n}`,
      image: heroImage,
      heading: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, <em>sed do eiusmod tempor.</em>",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.",
    })),
  },

  ctas: [
    { id: "cta-list", label: "Create your list", href: "/hub?new=list", icon: "plus", variant: "list" },
    { id: "cta-advice", label: "Get expert advice", href: "/expert-advice", icon: "heart", variant: "advice" },
  ],

  howItWorks: {
    eyebrow: "What Anita’s List offers",
    heading:
      "Lorem ipsum dolor sit amet consectetur. Bibendum odio sit amet aliquam sit ultrices <em>nibh feugiat lacus.</em>",
    steps: [1, 2, 3, 4].map((n) => ({
      id: `step-${n}`,
      text: "<em>Sit amet consectetur. Bibendum </em>odio sit amet aliquam sit.",
    })),
    cta: { label: "How it works", href: "/about" }, // destination inferred - plan section 11
  },

  expertAdvice: {
    eyebrow: "Expert advice",
    heading:
      "Lorem ipsum dolor sit amet consectetur. A mi elementum in feugiat non elementum volutpat fames. Purus sit dolor lobortis semper platea nunc quis nulla.",
    body: "Lorem ipsum dolor sit amet consectetur. Imperdiet tristique fringilla id donec id. Tellus auctor risus pharetra sem. Neque lectus rhoncus lacinia non diam velit malesuada vel.",
    cta: { label: "Learn more about us", href: "/about" },
    image: { src: "/images/cover-a-710x640.webp", alt: "", width: 710, height: 640 },
    rating: { score: "4.9", outOf: "5.0", caption: "00,000 reviews on trust pilot" },
  },

  testimonials: {
    eyebrow: "Testimonials",
    heading:
      "Lorem ipsum dolor sit amet consectetur. Bibendum odio sit amet aliquam sit ultrices <em>nibh feugiat lacus.</em>",
    items: [1, 2, 3, 4].map((n) => ({
      id: `testimonial-${n}`,
      quote:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.",
      name: "Name goes here",
      info: "Additional information",
      avatar: null,
    })),
  },

  categories: {
    eyebrow: "Lorem ipsum dolor products",
    items: [
      { id: "cat-transport", name: "Transport", slug: "transport", image: { src: "/images/category-transport-476x585.webp", alt: "", width: 476, height: 585 } },
      { id: "cat-nursery", name: "Nursery", slug: "nursery", image: { src: "/images/category-nursery-476x585.webp", alt: "", width: 476, height: 585 } },
      { id: "cat-bedding", name: "Bedding", slug: "bedding", image: { src: "/images/category-bedding-476x585.webp", alt: "", width: 476, height: 585 } },
      // Figma paginates "1 2 3 4" but draws three cards; fourth item is a placeholder so slide 4 exists.
      { id: "cat-4", name: "Lorem ipsum", slug: "lorem-ipsum", image: { src: "/images/category-nursery-476x585.webp", alt: "", width: 476, height: 585 } },
    ],
  },

  partners: {
    eyebrow: "Our trusted partners",
    items: [
      { id: "brand-babybjorn", name: "BabyBjörn", logo: { src: "/images/brand-babybjorn-alt-158x31.webp", alt: "BabyBjörn", width: 158, height: 31 }, href: null },
      { id: "brand-babyzen", name: "Babyzen", logo: { src: "/images/brand-babyzen-alt-158x43.webp", alt: "Babyzen", width: 158, height: 43 }, href: null },
      { id: "brand-lovevery", name: "Lovevery", logo: { src: "/images/brand-lovevery-alt-208x49.webp", alt: "Lovevery", width: 208, height: 49 }, href: null },
      { id: "brand-stokke", name: "Stokke", logo: { src: "/images/brand-stokke-alt-163x42.webp", alt: "Stokke", width: 163, height: 42 }, href: null },
    ],
  },
};
