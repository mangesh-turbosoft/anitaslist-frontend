/**
 * Content types for the marketing pages. Shaped to match what a Laravel CMS will return later:
 * camelCase, ISO dates, explicit nullability. Strings marked "rich" may contain <em> and <b> only
 * (rendered by components/ui/RichText).
 */

export type ImageAsset = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type Link = { label: string; href: string };

export type HeroSlide = {
  id: string;
  image: ImageAsset;
  /** rich */
  heading: string;
  body: string;
};

export type CtaCard = {
  id: string;
  label: string;
  href: string;
  icon: "plus" | "heart";
  /** list = blush card + terracotta tile; advice = terracotta card + sand tile */
  variant: "list" | "advice";
};

export type Step = {
  id: string;
  /** rich */
  text: string;
};

export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  info: string;
  avatar: ImageAsset | null;
};

export type Subcategory = { slug: string; name: string };

export type Category = {
  id: string;
  name: string;
  slug: string;
  image: ImageAsset;
  /** Only populated where Figma draws it (Transport, Browse all products' sidebar); others have none yet. */
  subcategories: Subcategory[];
};

export type BrandPartner = {
  id: string;
  name: string;
  /** Real vendors added from the live site's brand list (anitaslist.com/collections/brands) have no clean
   * downloadable logo file, so `logo` is optional - BrandPartnersSection falls back to a text logotype. */
  logo?: ImageAsset;
  /** Text-logotype colour, for brands whose real wordmark isn't plain black (e.g. Maxi-Cosi red). Ignored
   * when `logo` is set - the real logo file already carries its own colour. */
  color?: string;
  href: string | null;
};

export type Rating = {
  score: string;
  outOf: string;
  caption: string;
};

export type HomeContent = {
  hero: HeroContent;
  ctas: CtaCard[];
  howItWorks: { eyebrow: string; heading: string; steps: Step[]; cta: Link };
  expertAdvice: { eyebrow: string; heading: string; body: string; cta: Link; image: ImageAsset; rating: Rating };
  testimonials: { eyebrow: string; heading: string; items: Testimonial[] };
  categories: { eyebrow: string; items: Category[] };
  partners: { eyebrow: string; items: BrandPartner[] };
};

export type HeroContent = {
  slides: HeroSlide[];
  eyebrow?: string;
  cta?: Link & { width?: number };
  rating?: Rating;
  /** Sample list hero: 1060px cream -> transparent gradient from the left edge */
  scrim?: boolean;
};

export type Stat = { id: string; value: string; /** rich */ text: string };
export type Pillar = { id: string; icon: "vision" | "multitasking"; eyebrow: string; /** rich */ heading: string };
export type TeamMember = { id: string; name: string; info: string; image: ImageAsset | null };
export type Podcast = { id: string; title: string; by: string; duration: string; href: string };

export type AboutContent = {
  hero: HeroContent;
  expertise: { eyebrow: string; heading: string; stats: Stat[]; cta: Link & { width?: number } };
  pillars: Pillar[];
  village: { eyebrow: string; heading: string; body: string; cta: Link & { width?: number }; image: ImageAsset; thumb: ImageAsset | null };
  team: { eyebrow: string; heading: string; members: TeamMember[] };
  testimonials: HomeContent["testimonials"];
  podcasts: { eyebrow: string; viewAll: Link; items: Podcast[] };
};

export type SampleListCard = {
  id: string;
  slug: string;
  /** rich */
  title: string;
  body: string;
  image: ImageAsset | null;
};

export type SampleListRow = {
  id: string;
  eyebrow: string;
  /** rich */
  heading: string;
  note: { image: ImageAsset; quote: string };
  items: SampleListCard[];
};

export type SampleListsContent = {
  hero: HeroContent;
  rows: SampleListRow[];
};

/* ---------- Sample list sub page / products ---------- */

export type ProductRating = { value: string; count: string };

export type Product = {
  id: string;
  name: string;
  brand: string;
  /** Display string as designed, e.g. "From £00.00" */
  price: string;
  rating: ProductRating;
  image: ImageAsset;
  tag: string | null;
  options: { colour: string[]; size: string[] };
};

export type ProductsRow = { id: string; heading: string; items: Product[] };

export type NoteSlide = { id: string; image: ImageAsset; text: string; video: Link | null };

export type UserList = { id: string; name: string };

export type SampleListDetail = {
  slug: string;
  breadcrumb: { trail: Link[]; current: string };
  /** rich */
  title: string;
  notes: NoteSlide[];
  banner: ImageAsset;
  subheading: string;
  rows: ProductsRow[];
};

/* ---------- Products browse / category / detail (Figma 183:5020, 190:5514, 196:5949) ---------- */

export type BrowseProductsContent = {
  eyebrow: string;
  /** rich */
  heading: string;
  searchPlaceholder: string;
  /** The "PRODUCT" / "COLLECTION" lorem-ipsum summary block above the grid - CONTENT TODO. */
  filterSummary: { productLines: string[]; collectionLines: string[] };
  categories: Category[];
};

/** Grid card on search results - simpler than the full ProductCard (no rating/brand/add-to-list panel). */
export type CategoryProduct = { id: string; slug: string; name: string; price: string; image: ImageAsset | null };

export type BuyingOption = { id: string; retailer: string; href: string };
export type ProductSpecific = { id: string; label: string; detail: string };

export type ProductDetail = {
  slug: string;
  categorySlug: string;
  subcategorySlug: string;
  trail: Link[];
  name: string;
  price: string;
  rating: ProductRating;
  options: { colour: string[]; size: string[] };
  /** Figma draws plain placeholder boxes, no real photography yet - null renders the "Product image" placeholder. */
  gallery: (ImageAsset | null)[];
  buyingOptions: BuyingOption[];
  description: string;
  specifics: ProductSpecific[];
  notes: NoteSlide[];
  relevantProducts: ProductsRow;
};

/* ---------- Product listing (category / subcategory / retailer) - Figma 1317:1532, 1317:5483, 1348:11415 ---------- */

export type Retailer = {
  id: string;
  slug: string;
  name: string;
  logo?: ImageAsset;
  color?: string;
  image: ImageAsset;
  letter: string;
};

/** Shared "browse products" template: sidebar filter + one carousel row per subcategory. */
export type ProductListingContent = {
  trail: Link[];
  current: string;
  /** rich */
  heading: string;
  notes: NoteSlide[];
  subcategories: Subcategory[];
  /** "Retailers" sidebar filter group - omitted on the Individual retailer page itself. */
  retailers?: Retailer[];
  productCount: number;
  /** Base path each row's "View all X" link is built from: `${subcategoryBasePath}/${row.id}`. */
  subcategoryBasePath: string;
  rows: ProductsRow[];
};

/** A subcategory match, kept with its parent category so the link and label have context. */
export type SubcategoryMatch = { category: Category; subcategory: Subcategory };

export type ProductMatch = { name: string; price: string; href: string };

/**
 * What `q` actually matches in the real fixture data we have (category/subcategory names, the one real
 * product) - there's no live search index yet, so this is honest about being a small, real result set
 * rather than faking a full catalogue (plan section 13).
 */
export type SearchResults = {
  categories: Category[];
  subcategories: SubcategoryMatch[];
  products: ProductMatch[];
};
