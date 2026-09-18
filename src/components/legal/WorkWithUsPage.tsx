import { Container } from "@/components/ui";

/**
 * Content from anitaslist.com/pages/work-with-us (2026-09-17). No Figma frame exists for this page (plan section 4).
 * The live page's only other content is a "Contact Us" email line and a newsletter form — both already covered
 * by the site's global footer, so this page is just the recruiting copy.
 */
export function WorkWithUsPage() {
  return (
    <Container className="py-[50px]">
      <div className="mx-auto flex max-w-narrow flex-col items-center text-center">
        <h1 className="text-[36px] leading-[44px] xl:text-display">Work with us</h1>

        <div aria-hidden="true" className="mt-8 h-px w-full max-w-[720px] bg-sand" />

        <p className="mt-8 max-w-[600px] font-sans text-body">
          We&rsquo;re looking for talented and driven individuals to join our growing team. We believe in fostering a
          collaborative and innovative work environment where you can make a real impact. If you love the idea of
          helping expectant parents feel less overwhelmed and more calm, confident and prepared, we encourage you to
          get in touch with us!
        </p>
      </div>
    </Container>
  );
}
