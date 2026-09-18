import { IconNounMultitasking, IconNounVision } from "@/components/icons";
import { Divider, Eyebrow, RichText } from "@/components/ui";
import type { AboutContent } from "@/types/content";

const icons = { vision: IconNounVision, multitasking: IconNounMultitasking } as const;

/**
 * About "Vision / Mission" (886:6 @ y=1275): 1440x423 between two full-width hairlines, split by a vertical
 * hairline at x=709. Each half: 90x90 icon 31px below the top rule, eyebrow at y=140, H2 at y=187 (680 wide), 60px bottom.
 * Left content sits at the 30px margin (icon frame at x=19); right content starts 22px after the divider.
 */
export function VisionMissionSection({ pillars }: { pillars: AboutContent["pillars"] }) {
  return (
    <section aria-label="Vision and mission" className="mt-20">
      <Divider />
      <div className="mx-auto grid max-w-page grid-cols-1 xl:grid-cols-[709px_1fr]">
        {pillars.map((p, i) => {
          const Icon = icons[p.icon];
          return (
            <div
              key={p.id}
              className={
                i === 0
                  ? "px-4 pt-[31px] pb-10 md:px-[30px] xl:border-r-[0.5px] xl:border-sand xl:pb-[60px]"
                  : "px-4 pt-[31px] pb-10 md:px-[30px] xl:pl-[22px] xl:pr-[30px] xl:pb-[60px]"
              }
            >
              <Icon className="size-[90px] text-ink xl:-ml-[11px]" />
              <Eyebrow className="mt-[19px]">{p.eyebrow}</Eyebrow>
              <h2 className="mt-[1px] max-w-[680px] text-h2">
                <RichText text={p.heading} />
              </h2>
            </div>
          );
        })}
      </div>
      <Divider />
    </section>
  );
}
