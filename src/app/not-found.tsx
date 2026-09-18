import Link from "next/link";
import { Button, Container } from "@/components/ui";

/** 404. No design exists; follows the empty-state pattern from the list pages. */
export default function NotFound() {
  return (
    <Container className="flex flex-col items-center pb-[133px] pt-[111px] text-center">
      <h1 className="max-w-[680px] font-display text-h3 font-medium">We couldn’t find that page.</h1>
      <p className="mt-[14px] max-w-[446px] font-sans text-body">The link may be out of date, or the page may have moved.</p>
      <Button href="/" className="mt-[52px] w-[214px] px-0">
        Back to the homepage
      </Button>
      <Link href="/hub" className="mt-4 font-sans text-meta underline-offset-2 hover:underline">
        Go to My hub
      </Link>
    </Container>
  );
}
