import { Image } from "@/components/ui/Image";
import { Button, Container } from "@/components/ui";

const features = [
  { id: "community", title: "A community that gets it", body: "Lorem ipsum dolor sit amet consectetur. Bibendum odio sit amet aliquam sit ultrices nibh feugiat lacus.", image: { src: "/images/category-transport-476x585.webp", alt: "" } },
  { id: "resources", title: "Resources you can trust", body: "Sit amet consectetur. Bibendum odio sit amet aliquam sit ultrices nibh feugiat lacus dolor.", image: { src: "/images/category-nursery-476x585.webp", alt: "" } },
  { id: "events", title: "Events for every stage", body: "Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", image: { src: "/images/category-bedding-476x585.webp", alt: "" } },
];

/**
 * Anita's Village. No Figma frame and no page on the live site currently — dummy/placeholder content only,
 * in the same lorem-ipsum register as the rest of the unfinished copy in the file. Linked from the About page's
 * village banner and the footer (plan section 4); replace with real content and, ideally, a Figma frame later.
 * The banner image is full viewport width per the site's banners rule, same as the Hero and About's village section.
 */
export function VillagePage() {
  return (
    <>
      <Container className="py-[50px]">
        <div className="mx-auto max-w-narrow text-center">
          <h1 className="text-[36px] leading-[44px] xl:text-display">Anita&rsquo;s Village</h1>
          <p className="mx-auto mt-3 max-w-[600px] font-sans text-body">
            Lorem ipsum dolor sit amet consectetur. Bibendum odio sit amet aliquam sit ultrices nibh feugiat lacus —
            a place for expectant and new parents to find support, advice and each other.
          </p>
          <div aria-hidden="true" className="mx-auto mt-8 h-px w-full max-w-[720px] bg-sand" />
        </div>
      </Container>

      <div className="relative h-[220px] w-full overflow-hidden sm:h-[300px] xl:h-[420px]">
        <Image src="/images/cover-b-1440x300.webp" alt="" fill sizes="100vw" className="object-cover" />
      </div>

      <Container className="py-[50px]">
        <div className="mx-auto max-w-narrow">
          <p className="font-sans text-body">
            Lorem ipsum dolor sit amet consectetur. Imperdiet tristique fringilla id donec id. Tellus auctor risus
            pharetra sem. Neque lectus rhoncus lacinia non diam velit malesuada vel.
          </p>
          <p className="mt-4 font-sans text-body">
            Sit amet consectetur. Bibendum odio sit amet aliquam sit ultrices nibh feugiat lacus. Lorem ipsum dolor
            sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.
          </p>

          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
            {features.map((f) => (
              <div key={f.id}>
                <div className="relative aspect-[4/5] w-full overflow-hidden">
                  <Image src={f.image.src} alt={f.image.alt} fill sizes="(min-width: 640px) 33vw, 100vw" className="object-cover" />
                </div>
                <h2 className="mt-4 font-display text-h3 font-medium">{f.title}</h2>
                <p className="mt-2 font-sans text-body">{f.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <Button href="/about" className="w-[187px] px-0">
              Learn more about us
            </Button>
          </div>
        </div>
      </Container>
    </>
  );
}
