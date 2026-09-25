import { Image } from "@/components/ui/Image";
import { ContactForm } from "@/components/forms/ContactForm";
import { Container, RichText } from "@/components/ui";

const heroImage = { src: "/images/contact-hero-1080x1350.webp", width: 1080, height: 1350 };
const EMAIL = "team@anitaslist.com";
const PHONE = "+44 (0)20 7371 5145";

function Address() {
  return (
    <>
      Anita&apos;s List, 2 Stanton Road,
      <br />
      London, SW13 0EX
    </>
  );
}

function InfoCard({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <div className="p-5 text-center xl:p-[30px]">
      <p className="font-display text-h3 font-medium text-ink">{heading}</p>
      <p className="mt-[15px] font-sans text-body text-ink">{children}</p>
    </div>
  );
}

/**
 * Contact page. The "Contact us" content frame (Figma 1348:12214, 1440x1859) and its hero ("Hero section",
 * 1348:12406, 1440x520) are two separate top-level frames in Figma rather than one nested tree - easy to miss
 * fetching the content frame alone, which is why the hero was dropped on the first pass. Address/email/phone
 * use the site's real values (data/legal-privacy.ts, data/legal-terms.ts) rather than Figma's own placeholder
 * "12 Florence Street" / "0000 000000" / "info@anitaslist.com".
 */
export function ContactPage() {
  return (
    <>
      <section className="relative h-[420px] w-full overflow-hidden xl:h-[520px]">
        <Image src={heroImage.src} alt="" fill priority sizes="100vw" className="object-cover" />
        <span aria-hidden="true" className="absolute inset-y-0 left-0 w-[1060px] max-w-full bg-gradient-to-r from-cream to-cream/0" />
        <Container className="absolute inset-0 flex flex-col justify-center gap-[10px] pb-16 xl:justify-start xl:pt-[109px]">
          <p className="font-sans text-eyebrow-xs font-semibold uppercase">Contact us</p>
          <h1 className="max-w-[563px] font-display text-h2 xl:text-display">
            <RichText text="Lorem ipsum dolor sit amet, consectetur <em>do eiusmod tempor.</em>" />
          </h1>
          <p className="max-w-[447px] font-sans text-body">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.
          </p>
        </Container>
      </section>

      <Container className="pt-10 pb-[50px] xl:pt-[51px]">
        <h2 className="max-w-[678px] font-display text-h2">
          <RichText text="Lorem ipsum dolor sit amet consectetur. Bibendum odiosit amet aliquam sit ultrices<em>.</em>" />
        </h2>

        <div className="mt-[30px] grid grid-cols-1 items-start gap-5 xl:mt-[45px] xl:grid-cols-[680px_680px]">
          <div className="border-[0.5px] border-sand p-5 xl:p-[30px]">
            <h3 className="font-display text-h3 font-medium text-ink">
              Lorem ipsum dolor sit amet consectetur. <em className="font-medium italic">Bibendum odio sit.</em>
            </h3>
            <div className="mt-[30px]">
              <ContactForm />
            </div>
          </div>

          <div className="grid grid-cols-1 border-[0.5px] border-sand sm:grid-cols-2 [&>*]:border-sand [&>*:nth-child(2)]:border-t-[0.5px] [&>*:nth-child(2)]:sm:border-t-0 [&>*:nth-child(2)]:sm:border-l-[0.5px] [&>*:nth-child(3)]:border-t-[0.5px] [&>*:nth-child(4)]:border-t-[0.5px] [&>*:nth-child(4)]:sm:border-l-[0.5px]">
            <InfoCard heading="Address">
              <Address />
            </InfoCard>
            <InfoCard heading="Address">
              <Address />
            </InfoCard>
            <InfoCard heading="Email">{EMAIL}</InfoCard>
            <InfoCard heading="Contact number">{PHONE}</InfoCard>
          </div>
        </div>
      </Container>
    </>
  );
}
