import { Image } from "@/components/ui/Image";
import { Container, Divider, Eyebrow, RichText } from "@/components/ui";
import type { AboutContent } from "@/types/content";

/**
 * About "Our team" (886:6 @ y=2352): heading column 446 wide at the left; 8 cards 213x280 in two rows of four
 * from x=497 (20px gaps), 7px below the heading top. Card: #CEBFA7 block with the photo slot (Figma shows the
 * placeholder text "Image of person" centred at y=123) and name / info Noto 500 15/22 at (20,220). Hairline 50px below.
 */
export function TeamSection({ eyebrow, heading, members }: AboutContent["team"]) {
  return (
    <section aria-labelledby="team-heading" className="pt-[50px]">
      <Container className="grid grid-cols-1 gap-10 xl:grid-cols-[467px_1fr] xl:gap-0">
        <div>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 id="team-heading" className="mt-[1px] max-w-[446px] text-h2">
            <RichText text={heading} />
          </h2>
        </div>
        <ul className="grid grid-cols-2 gap-5 sm:grid-cols-3 xl:mt-[7px] xl:grid-cols-4">
          {members.map((m) => (
            <li key={m.id} className="relative flex h-[280px] flex-col justify-end bg-sand p-5">
              {m.image ? (
                <Image src={m.image.src} alt="" fill sizes="213px" className="object-cover" />
              ) : (
                <span className="absolute inset-x-0 top-[123px] text-center font-sans text-body text-ink/50" aria-hidden="true">
                  Image of person
                </span>
              )}
              <p className="relative font-sans text-body font-medium">
                <span className="block">{m.name}</span>
                <span className="block">{m.info}</span>
              </p>
            </li>
          ))}
        </ul>
      </Container>
      <Divider className="mt-[50px]" />
    </section>
  );
}
