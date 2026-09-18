import Link from "next/link";
import { ContactForm } from "@/components/forms/ContactForm";
import { Container } from "@/components/ui";

/**
 * Contact page. Content from the "Still have a question? Contact us!" section at
 * anitaslist.com/pages/faqs#shopify-section-template--22286997553441__60535c4b-1ec9-4e0a-9657-00ecea4c7cce
 * (2026-09-17). No Figma frame exists for this page (plan section 4). Centred, no card — a contained rule under
 * the title (not the site's usual full-bleed Divider) separates it from the form.
 */
export function ContactPage() {
  return (
    <Container className="py-[50px]">
      <div className="mx-auto flex max-w-narrow flex-col items-center text-center">
        <h1 className="text-[36px] leading-[44px] xl:text-display">Still have a question? Contact us!</h1>
        <p className="mt-3 max-w-[560px] font-sans text-body">We are delighted to help. Please fill out this form and we will get back to you as soon as we can.</p>

        <div aria-hidden="true" className="mt-8 h-px w-full max-w-[720px] bg-sand" />

        <div className="mt-10 w-full max-w-[720px] text-left">
          <ContactForm />
        </div>

        <p className="mt-8 font-sans text-body">
          Or email us directly at{" "}
          <Link href="mailto:support@anitaslist.com" className="underline">
            support@anitaslist.com
          </Link>{" "}
          — usual response time is less than 2 hours.
        </p>
      </div>
    </Container>
  );
}
