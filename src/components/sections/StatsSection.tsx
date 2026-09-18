import { Button, Container, Eyebrow, RichText } from "@/components/ui";
import type { AboutContent } from "@/types/content";

/**
 * About "Our expertise" (974:9400): 1381x416 in the container. Eyebrow y=0, H2 y=47 (1145 wide),
 * four stats in the 4-col grid at y=185: figure P22 700 48/34, caption P22 500 24/34 at y=234 (3 lines),
 * button 182x40 at y=376. 80px to the hairline that opens the next section.
 */
export function StatsSection({ eyebrow, heading, stats, cta }: AboutContent["expertise"]) {
  return (
    <section aria-labelledby="expertise-heading" className="pt-[50px]">
      <Container>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 id="expertise-heading" className="mt-[1px] max-w-[1145px] text-h2">
          <RichText text={heading} />
        </h2>
        <dl className="mt-[50px] grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((s) => (
            <div key={s.id}>
              <dt className="font-display text-stat font-bold">{s.value}</dt>
              <dd className="mt-[15px] font-display text-h3 font-medium">
                <RichText text={s.text} />
              </dd>
            </div>
          ))}
        </dl>
        <Button href={cta.href} className="mt-10 px-0" style={{ width: cta.width }}>
          {cta.label}
        </Button>
      </Container>
    </section>
  );
}
