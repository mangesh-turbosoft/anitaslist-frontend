import type { Metadata } from "next";
import { PrivacyPage } from "@/components/legal/PrivacyPage";
import { getPrivacyPolicy } from "@/lib/api/legal";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "How Anita's List collects, uses and protects your personal information.",
};

/** Figma 1263:653 ("Privacy policy"). */
export default async function Page() {
  const doc = await getPrivacyPolicy();
  return <PrivacyPage doc={doc} />;
}
