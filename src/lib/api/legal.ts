import { faqCategories } from "@/data/faqs";
import { browserCookieLinks, cookieSections } from "@/data/legal-cookies";
import { privacyDocument } from "@/data/legal-privacy";
import { termsDocument } from "@/data/legal-terms";
import type { FaqCategory, LegalDocument } from "@/types/legal";

/** Content access for the legal/support pages. Async from day one, same pattern as the rest of the site (plan section 13). */
export async function getFaqs(): Promise<FaqCategory[]> {
  return faqCategories;
}

export async function getTerms(): Promise<LegalDocument> {
  return termsDocument;
}

export async function getPrivacyPolicy(): Promise<LegalDocument> {
  return privacyDocument;
}

export async function getCookieInfo() {
  return { sections: cookieSections, browserLinks: browserCookieLinks };
}
