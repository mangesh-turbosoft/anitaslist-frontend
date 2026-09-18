import type { Metadata } from "next";
import { StubPage } from "@/components/app/StubPage";

type Props = { params: Promise<{ slug: string }> };

function titleFromSlug(slug: string) {
  return slug.replace(/-/g, " ").replace(/^\w/, (c) => c.toUpperCase());
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return { title: titleFromSlug(slug), robots: { index: false } };
}

/** Destination of the homepage category carousel. Product pages were only drawn in V1, which is out of scope. */
export default async function Page({ params }: Props) {
  const { slug } = await params;
  return <StubPage title={titleFromSlug(slug)} />;
}
