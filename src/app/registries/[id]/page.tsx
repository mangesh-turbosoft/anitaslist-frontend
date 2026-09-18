import type { Metadata } from "next";
import { DetailPage } from "@/components/app/DetailPage";
import { getRegistry } from "@/lib/api/app";

type Props = { params: Promise<{ id: string }>; searchParams: Promise<{ view?: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const registry = await getRegistry(id);
  return { title: registry.name, robots: { index: false } };
}

/**
 * Registry detail. Owner view 886:21; shared view 886:22 (rendered with ?view=shared, or for a viewer who is not
 * the owner once auth exists - plan section 18 q6). The share lightbox exposes a tokenised link plus a passcode.
 */
export default async function RegistryPage({ params, searchParams }: Props) {
  const [{ id }, sp] = await Promise.all([params, searchParams]);
  const registry = await getRegistry(id);
  const shared = sp.view === "shared";
  return (
    <DetailPage
      detail={registry}
      variant={shared ? "shared" : "registry"}
      eyebrow={shared ? "Shared registry" : "My registry"}
      back={shared ? { label: "Back to Anita’s List", href: "/" } : { label: "Back to My registries", href: "/registries" }}
      shareLink={`https://anitaslist.com/${registry.shareToken}`}
      sharePasscode="R3gT3st2026"
    />
  );
}
