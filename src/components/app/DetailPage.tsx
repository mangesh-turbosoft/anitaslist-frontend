import Link from "next/link";
import { DetailHero } from "@/components/app/AppHero";
import { DetailItemsSection } from "@/components/app/DetailItemsSection";
import { FixedBarClient } from "@/components/app/FixedBarClient";
import type { RowVariant } from "@/components/app/ItemRow";
import { NoteSlider } from "@/components/cards/NoteSlider";
import { IconPencilEdit } from "@/components/icons";
import { ModalRouter } from "@/components/modals/ModalRouter";
import { Banner, Button, Container } from "@/components/ui";
import { formatDate } from "@/lib/format";
import type { ListDetail } from "@/types/app";

type Props = {
  detail: ListDetail;
  variant: RowVariant;
  eyebrow: string;
  back: { label: string; href: string };
  shareLink?: string;
  sharePasscode?: string;
};

/**
 * Shared layout of the list / registry detail frames (910:2937, 917:4969, 917:5720, 886:15, 886:21, 886:22):
 * hero 610 wide at (30,130) · note slider 660 wide at (731,115) · "Fixed item" bar at 346 · full-width 300px banner
 * at 499 with a 30x30 pencil at its bottom-right · category blocks from 839 at a 740px pitch · footer 50px after.
 * Blank list, unpopulated (886:15): centred copy at 849, two 214px buttons at 975, an or-line at 1032, one at 1071.
 */
export function DetailPage({ detail, variant, eyebrow, back, shareLink, sharePasscode }: Props) {
  const empty = detail.categories.length === 0;
  return (
    <>
      <Container className="grid grid-cols-1 gap-8 pt-[35px] xl:grid-cols-[610px_minmax(0,1fr)] xl:gap-0">
        <DetailHero
          back={back}
          eyebrow={eyebrow}
          title={detail.name}
          meta={`Edited ${formatDate(detail.editedAt)}`}
          onEditHref={variant === "shared" ? undefined : "?edit=title"}
          className="xl:pt-[15px]"
        />
        <div className="min-w-0 xl:pl-[91px]">
          <NoteSlider notes={detail.notes} />
        </div>
      </Container>
      <FixedBarClient totalPence={detail.totalPence} variant={variant} />
      <div className="relative">
        <Banner image={detail.banner} />
        {variant !== "shared" && (
          <Container className="pointer-events-none absolute inset-x-0 bottom-[19px] flex justify-end">
            <button type="button" aria-label="Change cover image" className="pointer-events-auto text-cream hover:opacity-80">
              <IconPencilEdit className="size-[30px]" />
            </button>
          </Container>
        )}
      </div>

      {empty ? (
        <Container className="flex flex-col items-center pb-[50px] pt-[50px] text-center">
          <h2 className="max-w-[680px] font-display text-h3 font-medium">Lorem ipsum dolor set amet</h2>
          <p className="mt-[14px] max-w-[446px] font-sans text-body">
            Lorem ipsum dolor sit amet consectetur. Arcu arcu fusce vitae mi mauris imperdiet dui velit eget.
          </p>
          <div className="mt-[38px] flex flex-wrap justify-center gap-[19px]">
            <Button href="/products" className="w-[214px] px-0">
              Browse products
            </Button>
            <Button href="/expert-advice" className="w-[214px] px-0">
              Get expert advise
            </Button>
          </div>
          <div className="mt-[17px] flex w-full max-w-[445px] items-center gap-[22px]" role="separator" aria-label="or">
            <span aria-hidden="true" className="h-px flex-1 bg-sand" />
            <span className="font-sans text-body">or</span>
            <span aria-hidden="true" className="h-px flex-1 bg-sand" />
          </div>
          <Button href="/sample-lists" className="mt-[17px] w-[214px] px-0">
            View sample lists
          </Button>
        </Container>
      ) : (
        <DetailItemsSection categories={detail.categories} variant={variant} />
      )}
      <ModalRouter shareLink={shareLink} sharePasscode={sharePasscode} />
      {variant === "shared" && (
        <Container className="pb-10 text-center">
          <Link href="/account/register" className="font-sans text-body underline-offset-2 hover:underline">
            Create your own list
          </Link>
        </Container>
      )}
    </>
  );
}
