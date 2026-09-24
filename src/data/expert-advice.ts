import type { ImageAsset } from "@/types/content";

export type AdviceTopic = { id: string; name: string; image: ImageAsset; href: string };

const PRODUCTS_FALLBACK = "/products/transport";

function img(file: string, width: number, height: number): ImageAsset {
  return { src: `/images/${file}`, alt: "", width, height };
}

/**
 * Expert Advice Hub grid (Figma 1252:2, Transport filter). Real subcategory names and photography, taken
 * directly from the design. Only "Pushchairs" has a dedicated advice page (the one sub-page the client actually
 * designed, node 1260:2) - every other card links to the matching Browse Transport category page, a real
 * destination, rather than a fabricated advice article.
 */
export const transportAdviceTopics: AdviceTopic[] = [
  { id: "newborn-car-seats", name: "Newborn car seats", image: img("advice-newborn-car-seats-1080x1080.webp", 1080, 1080), href: PRODUCTS_FALLBACK },
  { id: "car-seat-bases", name: "Car seat bases", image: img("advice-car-seat-bases-1080x1080.webp", 1080, 1080), href: PRODUCTS_FALLBACK },
  { id: "car-seat-accessories-a", name: "Car seat accessories", image: img("advice-car-seat-accessories-a-700x560.webp", 700, 560), href: PRODUCTS_FALLBACK },
  { id: "car-seat-accessories-b", name: "Car seat accessories", image: img("advice-car-seat-accessories-b-1650x1650.webp", 1650, 1650), href: PRODUCTS_FALLBACK },
  { id: "pushchairs", name: "Pushchairs", image: img("advice-pushchairs-800x533.webp", 800, 533), href: "/expert-advice/pushchairs" },
  { id: "carrycots-and-seats", name: "Carrycots and seats", image: img("advice-carrycots-and-seats-1272x1272.webp", 1272, 1272), href: PRODUCTS_FALLBACK },
  { id: "pushchair-accessories", name: "Pushchair accessories", image: img("advice-pushchair-accessories-1080x1080.webp", 1080, 1080), href: PRODUCTS_FALLBACK },
  { id: "rain-covers-mosquito-nets", name: "Rain covers & mosquito nets", image: img("advice-rain-covers-mosquito-nets-1080x1080.webp", 1080, 1080), href: PRODUCTS_FALLBACK },
  { id: "foot-muffs", name: "Foot muffs", image: img("advice-foot-muffs-1080x1080.webp", 1080, 1080), href: PRODUCTS_FALLBACK },
  { id: "sheepskin-linens", name: "Sheepskin linens", image: img("advice-sheepskin-linens-1080x1080.webp", 1080, 1080), href: PRODUCTS_FALLBACK },
  { id: "liners-and-snugglers", name: "Liners & snugglers", image: img("advice-liners-and-snugglers-700x700.webp", 700, 700), href: PRODUCTS_FALLBACK },
  { id: "adapters", name: "Adapters", image: img("advice-adapters-800x800.webp", 800, 800), href: PRODUCTS_FALLBACK },
  { id: "transport-accessories", name: "Transport accessories", image: img("advice-transport-accessories-2000x2000.webp", 2000, 2000), href: PRODUCTS_FALLBACK },
  { id: "baby-carriers", name: "Baby carriers", image: img("advice-baby-carriers-1080x1080.webp", 1080, 1080), href: PRODUCTS_FALLBACK },
  { id: "baby-carrier-accessories", name: "Baby carrier accessories", image: img("advice-baby-carrier-accessories-1000x1000.webp", 1000, 1000), href: PRODUCTS_FALLBACK },
  { id: "changing-bags", name: "Changing bags", image: img("advice-changing-bags-1080x1080.webp", 1080, 1080), href: PRODUCTS_FALLBACK },
  { id: "transport-and-protection-bags", name: "Transport and protection bags", image: img("advice-transport-protection-bags-1080x1080.webp", 1080, 1080), href: PRODUCTS_FALLBACK },
  { id: "luggage", name: "Luggage", image: img("advice-car-seat-bases-1080x1080.webp", 1080, 1080), href: PRODUCTS_FALLBACK },
  { id: "toddler-car-seats", name: "Toddler car seats", image: img("advice-toddler-car-seats-1080x1080.webp", 1080, 1080), href: PRODUCTS_FALLBACK },
];
