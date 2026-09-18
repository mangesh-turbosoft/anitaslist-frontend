/**
 * Site-wide navigation and footer content. Shaped so a Laravel CMS can later supply it verbatim.
 * Every href here is inferred - Figma specifies no destinations (see plan section 4).
 */
export type NavItem = { label: string; href: string };

export const primaryNav: NavItem[] = [
  { label: "Products", href: "/products" },
  { label: "Expert advice", href: "/expert-advice" },
  { label: "Sample lists", href: "/sample-lists" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const accountNav = {
  login: { label: "Login", href: "/account/login" }, // confirmed: literal hyperlink in Figma
  register: { label: "Create account", href: "/account/register" },
  search: { label: "Search", href: "/search" },
} as const;

export const footerQuickLinks: NavItem[] = [
  { label: "About us", href: "/about" },
  { label: "Anita’s Village", href: "/anitas-village" },
  { label: "FAQs", href: "/faqs" },
  { label: "Work with us", href: "/work-with-us" },
  { label: "Contact us", href: "/contact" },
  { label: "Terms of service", href: "/terms" },
  { label: "Privacy policy", href: "/privacy" },
  { label: "Cookie declaration", href: "/cookies" },
];

/** Real profile URLs — not in the Figma design, pulled from the live site's footer (anitaslist.com, 2026-09-17). */
export const social: { instagram: string | null; facebook: string | null; youtube: string | null } = {
  instagram: "https://www.instagram.com/anitaslist?igsh=d2U4N2ZsOW15enJi",
  facebook: "https://www.facebook.com/anitaslist",
  youtube: "https://www.youtube.com/@AnitasList",
};

export const legal = {
  terms: "/terms",
  privacy: "/privacy",
} as const;

/** As drawn. Plan section 18 q13: almost certainly meant to be the copyright symbol. */
export const copyright = "@2026, Anita’s List";
