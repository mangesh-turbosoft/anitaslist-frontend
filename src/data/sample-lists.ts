import type { SampleListsContent } from "@/types/content";

const noteImage = { src: "/images/cover-a-213x197.webp", alt: "", width: 213, height: 197 };

/** Sample list page fixture. Copy as drawn in Figma (886:7). Two cards are drawn per row; four are supplied so the arrows work. */
export const sampleListsContent: SampleListsContent = {
  hero: {
    eyebrow: "Sample lists",
    scrim: true,
    slides: [
      {
        id: "sample-hero",
        image: { src: "/images/hero-b-1440x649.webp", alt: "", width: 1440, height: 649 },
        heading: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, <em>sed do eiusmod tempor.</em>",
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.",
      },
    ],
    cta: { label: "Link to recommended list", href: "/sample-lists/recommended", width: 233 }, // destination inferred
  },
  rows: [1, 2, 3].map((r) => ({
    id: `sample-row-${r}`,
    eyebrow: "Sample list type",
    heading: "Ipsum dolor sit amet consectetur. Bibendum odio sit amet aliquam sit ultrices <em>nibh feugiat lacus.</em>",
    note: {
      image: noteImage,
      quote:
        "“Lorem ipsum dolor sit amet consectetur. Id ornare egestas semper aenean faucibus scelerisque. Nibh volutpat a egestas amet blandit sit venenatis.”",
    },
    items: [1, 2, 3, 4].map((c) => ({
      id: `sample-${r}-${c}`,
      slug: `sample-list-${r}-${c}`,
      title: "Bibendum odio sit amet <em>aliquam sit.</em>",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.",
      image: null,
    })),
  })),
};
