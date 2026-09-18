import type { Metadata } from "next";
import { ContactPage } from "@/components/legal/ContactPage";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Anita's List — we usually reply within 2 hours.",
};

/** Content from anitaslist.com/pages/faqs's contact section (2026-09-17) — no Figma frame exists for this page. */
export default function ContactRoute() {
  return <ContactPage />;
}
