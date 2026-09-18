import type { AboutContent } from "@/types/content";

/** About page fixture. Copy as drawn in Figma (886:6); mostly placeholder. CONTENT TODO throughout. */
export const aboutContent: AboutContent = {
  hero: {
    eyebrow: "About",
    slides: [1, 2, 3, 4].map((n) => ({
      id: `about-hero-${n}`,
      image: { src: "/images/hero-c-1440x649.webp", alt: "", width: 1440, height: 649 },
      heading: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, <em>sed do eiusmod tempor.</em>",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.",
    })),
    rating: { score: "4.9", outOf: "5.0", caption: "00,000 reviews on trust pilot" },
  },

  expertise: {
    eyebrow: "Our expertise",
    heading:
      "Lorem ipsum dolor sit amet consectetur. Bibendum odio sit amet aliquam sit ultrices <em>nibh feugiat lacus.</em>",
    stats: [
      { id: "stat-1", value: "30+ years", text: "Sit amet consectetur. Bibendum odio sit amet aliquam sit." },
      { id: "stat-2", value: "000+", text: "Sit amet consectetur. Bibendum odio sit amet aliquam sit." },
      { id: "stat-3", value: "00%", text: "Sit amet consectetur. Bibendum odio sit amet aliquam sit." },
      { id: "stat-4", value: "00+", text: "Sit amet consectetur. Bibendum odio sit amet aliquam sit." },
    ],
    cta: { label: "Get expert advice", href: "/expert-advice", width: 182 },
  },

  pillars: [
    {
      id: "vision",
      icon: "vision",
      eyebrow: "Our vision",
      heading:
        "Lorem ipsum dolor sit amet consectetur. A mi elementum in feugiat non elementum volutpat fames. <em>Purus sit dolor lobortis semper platea nunc quis nulla.</em>",
    },
    {
      id: "mission",
      icon: "multitasking",
      eyebrow: "Our mission",
      heading:
        "<em>Lorem ipsum dolor sit amet consectetur. A mi elementum in</em> feugiat non elementum volutpat fames. Purus sit dolor lobortis semper platea nunc quis nulla.",
    },
  ],

  village: {
    eyebrow: "Anita’s Village",
    heading:
      "Elementum in feugiat non elementum volutpat fames. <em>Purus sit dolor lobortis semper platea nunc quis nulla.</em>",
    body: "Lorem ipsum dolor sit amet consectetur. Imperdiet tristique fringilla id donec id. Tellus auctor risus pharetra sem. Neque lectus rhoncus lacinia non diam velit malesuada vel.",
    cta: { label: "Visit Anita’s Village", href: "/anitas-village", width: 187 },
    image: { src: "/images/cover-a-1380x504.webp", alt: "", width: 1380, height: 504 },
    thumb: { src: "/images/image-about.webp", alt: "", width: 212, height: 141 },
  },

  team: {
    eyebrow: "Our team",
    heading:
      "Ipsum dolor sit amet consectetur. Bibendum odio sit amet aliquam sit ultrices <em>nibh feugiat lacus.</em>",
    members: Array.from({ length: 8 }, (_, i) => ({
      id: `member-${i + 1}`,
      name: "Name goes here",
      info: "Additional information",
      image: null,
    })),
  },

  testimonials: {
    eyebrow: "Testimonials",
    heading:
      "Lorem ipsum dolor sit amet consectetur. Bibendum odio sit amet aliquam sit ultrices <em>nibh feugiat lacus.</em>",
    items: [
      {
        id: "about-t-1",
        quote:
          "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.",
        name: "Name goes here",
        info: "Additional information",
        avatar: null,
      },
      {
        id: "about-t-2",
        quote:
          "Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        name: "Name goes here",
        info: "Additional information",
        avatar: null,
      },
      {
        id: "about-t-3",
        quote:
          "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.",
        name: "Name goes here",
        info: "Additional information",
        avatar: null,
      },
      {
        id: "about-t-4",
        quote:
          "Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        name: "Name goes here",
        info: "Additional information",
        avatar: null,
      },
    ],
  },

  podcasts: {
    eyebrow: "Podcasts",
    viewAll: { label: "View all podcasts", href: "/podcasts" },
    items: [1, 2, 3].map((n) => ({
      id: `podcast-${n}`,
      title: "Bibendum odio sit amet.",
      by: "Anita Worlidge",
      duration: "42:00",
      href: "/podcasts",
    })),
  },
};
