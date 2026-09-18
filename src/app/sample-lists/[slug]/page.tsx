import type { Metadata } from "next";
import { NoteSlider } from "@/components/cards/NoteSlider";
import { AddToListBar } from "@/components/lists/AddToListBar";
import { ListSelectionProvider } from "@/components/lists/ListSelection";
import { ProductsRow } from "@/components/sections/ProductsRow";
import { Banner, Breadcrumb, Container, RichText } from "@/components/ui";
import { getSampleListDetail, getUserLists } from "@/lib/api/content";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const list = await getSampleListDetail(slug);
  return { title: list.title.replace(/<[^>]+>/g, "") };
}

/**
 * Sample list sub page. Figma 886:8 (1440x3447): breadcrumb + H1 at (30,176) in a 610 column; Note slider 660 wide
 * at (731,149); full-width banner at 396-696; add-to-list bar at 725 (70 tall); four product rows from 845 at a
 * 540px pitch; footer at 3025.
 */
export default async function SampleListDetailPage({ params }: Props) {
  const { slug } = await params;
  const [list, lists] = await Promise.all([getSampleListDetail(slug), getUserLists()]);

  return (
    <ListSelectionProvider lists={lists}>
      <Container className="grid grid-cols-1 gap-8 pt-10 xl:grid-cols-[610px_minmax(0,1fr)] xl:gap-0 xl:pt-0">
        <div className="xl:pt-[96px]">
          <Breadcrumb {...list.breadcrumb} />
          <h1 className="mt-[7px] text-[36px] leading-[44px] xl:text-display">
            <RichText text={list.title} />
          </h1>
        </div>
        <div className="min-w-0 xl:pl-[91px] xl:pt-[69px]">
          <NoteSlider notes={list.notes} />
        </div>
      </Container>
      <Banner image={list.banner} className="mt-10 xl:mt-[50px]" />
      <div className="mt-[29px]">
        <AddToListBar subheading={list.subheading} />
      </div>
      <div className="flex flex-col gap-[30px] pb-[50px] pt-[50px]">
        {list.rows.map((row) => (
          <ProductsRow key={row.id} {...row} />
        ))}
      </div>
    </ListSelectionProvider>
  );
}
