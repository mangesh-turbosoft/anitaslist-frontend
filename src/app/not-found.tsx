import { IconLogoMark } from "@/components/icons";
import { Button, Container } from "@/components/ui";

/** 404. No design exists in Figma; a bespoke, lightly-animated page rather than the plain empty-state pattern. */
export default function NotFound() {
  return (
    <Container className="flex flex-col items-center pb-[133px] pt-[90px] text-center">
      <div className="animate-float text-terracotta">
        <IconLogoMark className="h-16 w-auto" />
      </div>

      <p className="animate-fade-up animate-delay-1 mt-6 font-display text-[120px] italic leading-none text-ink sm:text-[160px]">404</p>

      <h1 className="animate-fade-up animate-delay-2 mt-6 max-w-[680px] font-display text-h3 font-medium">We couldn’t find that page.</h1>
      <p className="animate-fade-up animate-delay-2 mt-[14px] max-w-[446px] font-sans text-body">
        The link may be out of date, or the page may have moved.
      </p>

      <Button href="/" className="animate-fade-up animate-delay-3 mt-[52px] w-[214px] px-0">
        Back to the homepage
      </Button>
    </Container>
  );
}
