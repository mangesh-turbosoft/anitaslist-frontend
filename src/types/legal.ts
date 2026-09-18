/** Content types for the legal / support pages. Sourced from the live site (anitaslist.com) — see plan section 6. */

export type FaqItem = {
  id: string;
  question: string;
  /** One paragraph per array entry. */
  answer: string[];
};

export type FaqCategory = {
  id: string;
  title: string;
  items: FaqItem[];
};

/**
 * A legal document section. `body` is lightweight markdown: blank-line-separated paragraphs, a block whose every
 * line starts with "- " renders as a bullet list. Kept this simple rather than adding a markdown dependency.
 */
export type LegalSection = {
  id: string;
  heading: string;
  body: string;
};

export type LegalDocument = {
  title: string;
  updated: string;
  intro?: string;
  sections: LegalSection[];
};
