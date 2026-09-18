import type { Metadata } from "next";
import { LegalDocumentPage } from "@/components/legal/LegalDocumentPage";
import { getPrivacyPolicy } from "@/lib/api/legal";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "How Anita's List collects, uses and protects your personal information.",
};

/** Content from anitaslist.com/policies/privacy-policy (2026-09-17) — no Figma frame exists for this page. */
export default async function PrivacyPage() {
  const doc = await getPrivacyPolicy();
  return <LegalDocumentPage doc={doc} />;
}
