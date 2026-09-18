import type { Metadata } from "next";
import { DetailPage } from "@/components/app/DetailPage";
import { getList } from "@/lib/api/app";

type Props = { params: Promise<{ id: string }>; searchParams: Promise<{ state?: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const list = await getList(id);
  return { title: list.name, robots: { index: false } };
}

/**
 * List detail. Blank list: 910:2937 populated / 886:15 unpopulated. Journey list: 917:4969 / 917:5720.
 * Both render at /lists/[id]; the type is a field on the record (plan section 18 q5 - unconfirmed).
 * ?state=empty previews the unpopulated frame.
 */
export default async function ListPage({ params, searchParams }: Props) {
  const [{ id }, sp] = await Promise.all([params, searchParams]);
  const list = await getList(id, { empty: sp.state === "empty" });
  return (
    <DetailPage
      detail={list}
      variant="list"
      eyebrow={list.type === "journey" ? "Journey list" : "Standard list"}
      back={{ label: "Back to My lists", href: "/lists" }}
    />
  );
}
