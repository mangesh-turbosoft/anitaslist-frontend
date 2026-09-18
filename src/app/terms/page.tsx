import type { Metadata } from "next";
import { LegalDocumentPage } from "@/components/legal/LegalDocumentPage";
import { getTerms } from "@/lib/api/legal";

export const metadata: Metadata = {
  title: "Terms of service",
  description: "The terms and conditions for using Anita's List.",
};

/** Content from anitaslist.com/policies/terms-of-service (2026-09-17) — no Figma frame exists for this page. */
export default async function TermsPage() {
  const doc = await getTerms();
  return <LegalDocumentPage doc={doc} />;
}
