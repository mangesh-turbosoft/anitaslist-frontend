import type { Metadata } from "next";
import { HubPanels } from "@/components/app/HubPanels";
import { ProfileElement } from "@/components/app/ProfileElement";
import { NoteSlider } from "@/components/cards/NoteSlider";
import { ModalRouter } from "@/components/modals/ModalRouter";
import { Container, Divider } from "@/components/ui";
import { getHub } from "@/lib/api/app";

export const metadata: Metadata = { title: "My hub", robots: { index: false } };

type Props = { searchParams: Promise<{ state?: string }> };

/**
 * Hub. Figma 886:11 populated (1440x1851) / 886:12 unpopulated (1440x1634).
 * Note slider 660 wide at (731,80); profile element at y=130 with a hairline at 277; H1 centred at 327;
 * intro centred at 387; hairline at 459; four 690px panels tiled 2x2 directly beneath, footer flush after.
 * ?state=empty previews the unpopulated frame; ?new=list|registry|date|note opens the matching lightbox.
 */
export default async function HubPage({ searchParams }: Props) {
  const sp = await searchParams;
  const hub = await getHub({ empty: sp.state === "empty" });

  return (
    <>
      <Container className="grid grid-cols-1 gap-8 xl:grid-cols-[minmax(0,1fr)_660px] xl:gap-0">
        <div className="pt-[50px]">
          <ProfileElement name={hub.user.name} avatar={hub.user.avatar} />
        </div>
        <div className="min-w-0 xl:pl-[41px]">
          <NoteSlider notes={hub.notes} />
        </div>
      </Container>
      <Divider />
      <Container className="pb-[50px] pt-[50px] text-center">
        <h1 className="mx-auto max-w-[570px] text-[36px] leading-[44px] xl:text-display">Welcome back {hub.user.firstName}</h1>
        <p className="mx-auto mt-0 max-w-[423px] font-sans text-body">
          You’re {hub.user.weeksPregnant} weeks today! {hub.user.weeksToDue} weeks until your due date.
        </p>
      </Container>
      <Divider />
      <HubPanels hub={hub} />
      <ModalRouter />
    </>
  );
}
