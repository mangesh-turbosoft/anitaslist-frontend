import { Image } from "@/components/ui/Image";
import { Container } from "@/components/ui";

const portrait = { src: "/images/anitas-village-portrait-900x1350.webp", alt: "Anita", width: 900, height: 1350 };

/** Anita's own welcome letter, as published on anitasvillage.com (2026-09-23). */
const letter = [
  "For the last 25 years, I’ve had the extraordinary privilege of walking alongside more than 12,000 expectant parents as they prepare for one of life’s biggest transitions – becoming parents.",
  "Whether you’ve found your way here through friends or family, my TEDx talk, a podcast, Instagram, or simply by chance … I’m so glad you’re here.",
  "Along the way, many came to know me as the person who helped them choose baby kit.",
  "The truth is, it was never just about baby kit.",
  "Of course, we talked about carseats, prams, cotbeds and what to pack in your hospital bag. But somewhere between the shopping lists and the checklists, our conversations often became something else entirely.",
  "We talked about becoming parents. About changing relationships. About confidence and fear. About identity, expectations and everything that comes with one of life’s biggest transitions.",
  "Looking back, I can see that while people came to me for practical advice, what they were often looking for was something much simpler.",
  "To feel seen. To feel heard. To know they weren’t alone.",
  "Over the years, the parents I’ve met have taught me so much.",
  "And, through them and my own experience of becoming a mother, I learnt something too; there is no strength in silence. There is strength in belonging. In allowing your village to hold you when you can’t hold everything alone.",
  "Whether we’ve known each other for years, or our paths have only just crossed, I hope you’ll feel at home here.",
  "Please do connect so we can continue the conversation.",
];

const bio =
  "For more than 25 years, Anita has supported over 12,000 expectant parents through one of life’s biggest transitions – becoming a parent. Trusted by families around the world, from royalty, Adele and Tom Ford to families with very little except love and hope in their hearts, she is known for combining practical expertise with warmth, empathy and an unwavering belief that no parent should feel they have to do it alone.";

/**
 * Anita's Village. No Figma frame exists for this page - content is the two real sections published on
 * anitasvillage.com (2026-09-23): Anita's own welcome letter, and the pull-quote bio beneath it. The live
 * site's own header/nav/footer aren't reproduced here since this site already has its own.
 */
export function VillagePage() {
  return (
    <>
      <section className="bg-sage/15">
        <Container className="grid grid-cols-1 items-center gap-10 py-[50px] xl:grid-cols-2 xl:gap-16 xl:py-[70px]">
          <div>
            <h1 className="font-display text-h2 italic xl:text-display">I&rsquo;m so happy our paths have crossed!</h1>
            <div className="mt-6 flex flex-col gap-4 font-sans text-body">
              {letter.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
            <p className="mt-6 font-display text-h3 italic">Anita xoxo</p>
          </div>
          <div className="relative aspect-[2/3] w-full overflow-hidden xl:aspect-[900/1350]">
            <Image src={portrait.src} alt={portrait.alt} fill sizes="(min-width: 1280px) 50vw, 100vw" className="object-cover" />
          </div>
        </Container>
      </section>

      <section className="bg-cream">
        <Container className="py-[50px] xl:py-[70px]">
          <p className="mx-auto max-w-[900px] text-center font-display text-h3 italic xl:text-h2">{bio}</p>
        </Container>
      </section>
    </>
  );
}
