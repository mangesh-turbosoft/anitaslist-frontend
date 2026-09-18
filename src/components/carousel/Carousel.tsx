"use client";

import {
  Children,
  cloneElement,
  createContext,
  isValidElement,
  useCallback,
  useContext,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type Attributes,
  type ComponentPropsWithoutRef,
  type ReactElement,
  type ReactNode,
} from "react";
import { IconArrowLong } from "@/components/icons";
import { cn } from "@/lib/cn";

/**
 * Scroll-snap carousel. One primitive covers the four layouts in the design:
 * hero (dots), testimonials (dots + arrows), product categories (numbers + arrows), sample-list rows (arrows).
 * Looping is opt-in (`loop`) - Figma doesn't specify it, so call sites that want it ask for it explicitly.
 * When on, CarouselTrack renders a hidden, inert clone of the whole slide set on each side of the real one, so
 * stepping past either end keeps scrolling in the SAME direction into a clone that looks identical to the real
 * target slide; once that scroll settles we silently re-point scrollLeft at the real slide. That's what makes
 * the wrap seamless instead of a visible rewind back through every slide.
 */

type Api = {
  index: number;
  count: number;
  /** How many whole slides currently fit in the visible track — needed to turn item count into page count. */
  perView: number;
  /** Distinct stopping positions: count - perView + 1. */
  pages: number;
  loop: boolean;
  canPrev: boolean;
  canNext: boolean;
  prev: () => void;
  next: () => void;
  goTo: (i: number) => void;
  trackRef: React.RefObject<HTMLUListElement | null>;
  id: string;
};

const Ctx = createContext<Api | null>(null);

export function useCarousel(): Api {
  const api = useContext(Ctx);
  if (!api) throw new Error("Carousel controls must be rendered inside <Carousel>");
  return api;
}

/** Reads live geometry straight off the DOM rather than trusting React state, since goTo/next/prev/settle all fire from events and need this instant's truth, not the last render's. */
function readTrack(t: HTMLUListElement) {
  const items = Array.from(t.children) as HTMLElement[];
  const realCount = items.filter((el) => !el.hasAttribute("data-clone")).length;
  const looping = items.length > realCount;
  const headCount = looping ? realCount : 0;
  const cs = getComputedStyle(t);
  const gap = parseFloat(cs.columnGap || "0") || 0;
  const step = (items[0]?.offsetWidth ?? 0) + gap;
  const domIndex = step > 0 ? Math.round(t.scrollLeft / step) : 0;
  return { items, realCount, headCount, step, gap, domIndex };
}

function scrollToDomIndex(t: HTMLUListElement, domIndex: number, behavior: ScrollBehavior) {
  const target = t.children[domIndex] as HTMLElement | undefined;
  if (!target) return;
  t.scrollTo({ left: target.offsetLeft, behavior });
}

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function Carousel({
  children,
  className,
  label,
  loop = false,
  autoplayMs,
  fitWhole = false,
}: {
  children: ReactNode;
  className?: string;
  label: string;
  /** Wrap prev/next/dots past the first/last slide seamlessly instead of clamping. */
  loop?: boolean;
  /** Auto-advance one slide every N ms. Paused on hover/focus and skipped under prefers-reduced-motion. */
  autoplayMs?: number;
  /**
   * Stretch slides so a whole number of them exactly fill the track's own width, instead of a fractional one
   * peeking (and getting clipped) at the trailing edge. Needed for fixed-width slides in a full-bleed track,
   * where slide+gap isn't a multiple of the viewport at most widths; skip it for slides sized in vw, where
   * that peek is the intended "there's more" affordance. The slide's own CSS width is only the reference used
   * to decide how many fit - actual rendered width is computed here and applied directly to each slide (real
   * and clone alike), so the full-bleed width is always used edge to edge with none left over or cut.
   */
  fitWhole?: boolean;
}) {
  const trackRef = useRef<HTMLUListElement | null>(null);
  const regionRef = useRef<HTMLDivElement | null>(null);
  const naturalStepRef = useRef<number | null>(null);
  const [index, setIndex] = useState(0);
  const [count, setCount] = useState(0);
  const [perView, setPerView] = useState(1);
  const [paused, setPaused] = useState(false);
  const id = useId();

  const measure = useCallback(() => {
    const t = trackRef.current;
    if (!t) return;
    const { items, realCount, headCount, step, gap, domIndex } = readTrack(t);
    setCount(realCount);
    if (!realCount) return;
    const cs = getComputedStyle(t);
    // Keep scroll-snap's "safe area" in sync with the track's own padding. Without this, a scroll-snap
    // container with side padding auto-scrolls on load to snap the first slide flush against the bare
    // edge, silently cancelling that padding and pushing an equal gap onto the opposite end instead.
    t.style.scrollPaddingLeft = cs.paddingLeft;
    t.style.scrollPaddingRight = cs.paddingRight;
    const realIndex = headCount ? (((domIndex - headCount) % realCount) + realCount) % realCount : domIndex;
    setIndex(realIndex);
    if (fitWhole) {
      // Cache the slide's natural (CSS-declared) width the first time, before any fluid override is applied -
      // reading it fresh on later measures would be reading our own previous override, not the reference size.
      if (naturalStepRef.current == null) naturalStepRef.current = step;
      const refStep = naturalStepRef.current;
      const available = regionRef.current?.clientWidth ?? t.clientWidth;
      const pv = refStep > 0 ? Math.max(1, Math.floor((available + gap + 1) / refStep)) : 1;
      setPerView(pv);
      const fluidWidth = pv > 0 ? (available - (pv - 1) * gap) / pv : refStep - gap;
      // Slides typically also carry a `max-w-[Npx]` cap (so they don't grow past their design size on an
      // ordinary container-width page) - max-width always wins over a larger `width` regardless of origin or
      // specificity, inline included, so it has to be overridden too or the fluid width above gets clamped back.
      for (const el of items) {
        el.style.width = `${fluidWidth}px`;
        el.style.maxWidth = `${fluidWidth}px`;
      }
    } else {
      setPerView(step > 0 ? Math.max(1, Math.floor((t.clientWidth + gap + 1) / step)) : 1);
    }
  }, [fitWhole]);

  // Once scrolling stops, pull scrollLeft back from a clone region onto the equivalent real slide - instant,
  // so it lands while the (visually identical) clone is still on screen and nothing appears to move.
  const settle = useCallback(() => {
    const t = trackRef.current;
    if (!t) return;
    const { realCount, headCount, domIndex } = readTrack(t);
    if (!headCount) return;
    if (domIndex < headCount) scrollToDomIndex(t, domIndex + realCount, "instant");
    else if (domIndex >= headCount + realCount) scrollToDomIndex(t, domIndex - realCount, "instant");
  }, []);

  useLayoutEffect(() => {
    const t = trackRef.current;
    if (!t) return;
    const { headCount } = readTrack(t);
    if (headCount) scrollToDomIndex(t, headCount, "instant");
    measure();
  }, [measure]);

  useEffect(() => {
    const t = trackRef.current;
    if (!t) return;
    const ro = new ResizeObserver(measure);
    ro.observe(fitWhole && regionRef.current ? regionRef.current : t);
    t.addEventListener("scroll", measure, { passive: true });
    t.addEventListener("scrollend", settle, { passive: true });
    return () => {
      ro.disconnect();
      t.removeEventListener("scroll", measure);
      t.removeEventListener("scrollend", settle);
    };
  }, [measure, settle, fitWhole]);

  const goTo = useCallback((i: number) => {
    const t = trackRef.current;
    if (!t) return;
    const { realCount, headCount } = readTrack(t);
    if (!realCount) return;
    const clamped = Math.max(0, Math.min(i, realCount - 1));
    scrollToDomIndex(t, headCount + clamped, prefersReducedMotion() ? "instant" : "smooth");
  }, []);

  // next/prev always step one DOM position in the requested direction - when looping that can walk straight
  // into a clone, which is the point: the motion never reverses, only the silent settle() after repositions it.
  const step = useCallback((dir: 1 | -1) => {
    const t = trackRef.current;
    if (!t) return;
    const { realCount, headCount, domIndex } = readTrack(t);
    if (!realCount) return;
    const next = headCount ? domIndex + dir : Math.max(0, Math.min(domIndex + dir, realCount - 1));
    scrollToDomIndex(t, next, prefersReducedMotion() ? "instant" : "smooth");
  }, []);

  const pages = Math.max(1, count - perView + 1);
  const canPrev = loop ? pages > 1 : index > 0;
  const canNext = loop ? pages > 1 : index < count - perView;

  const api: Api = {
    index,
    count,
    perView,
    pages,
    loop,
    canPrev,
    canNext,
    prev: () => step(-1),
    next: () => step(1),
    goTo,
    trackRef,
    id,
  };

  // `step` closes over no render-time state (it re-reads the DOM fresh each call), so it's safe to depend on
  // directly here instead of needing a "latest ref" indirection to dodge stale closures.
  useEffect(() => {
    if (!autoplayMs || pages < 2 || paused || prefersReducedMotion()) return;
    const timer = setInterval(() => step(1), autoplayMs);
    return () => clearInterval(timer);
  }, [autoplayMs, pages, paused, step]);

  return (
    <Ctx.Provider value={api}>
      <div
        ref={regionRef}
        className={cn("min-w-0 max-w-full", className)}
        role="region"
        aria-roledescription="carousel"
        aria-label={label}
        onMouseEnter={autoplayMs ? () => setPaused(true) : undefined}
        onMouseLeave={autoplayMs ? () => setPaused(false) : undefined}
        onFocus={autoplayMs ? () => setPaused(true) : undefined}
        onBlur={autoplayMs ? () => setPaused(false) : undefined}
      >
        {children}
      </div>
    </Ctx.Provider>
  );
}

type SlideElement = ReactElement<ComponentPropsWithoutRef<"li">>;
type SlideExtraProps = Partial<ComponentPropsWithoutRef<"li">> & Attributes;

function cloneHidden(child: ReactNode, key: string): ReactNode {
  if (!isValidElement(child)) return child;
  // `data-clone` is a plain marker attribute the DOM allows but React's LiHTMLAttributes type doesn't name -
  // routing the literal through `unknown` is the standard escape hatch for that gap.
  const extra = { key, "data-clone": "true", "aria-hidden": true, inert: true } as unknown as SlideExtraProps;
  return cloneElement(child as SlideElement, extra);
}

/** The scrolling row. Children must be <CarouselSlide>. Gap is set by the caller via className (e.g. gap-[6px]). */
export function CarouselTrack({ className, children, ...rest }: ComponentPropsWithoutRef<"ul">) {
  const { trackRef, id, loop } = useCarousel();
  const items = Children.toArray(children);
  const canLoop = loop && items.length >= 2;
  const rendered = canLoop
    ? [
        ...items.map((child, i) => cloneHidden(child, `clone-head-${i}`)),
        ...items,
        ...items.map((child, i) => cloneHidden(child, `clone-tail-${i}`)),
      ]
    : items;
  return (
    <ul
      ref={trackRef}
      id={id}
      className={cn(
        "relative flex min-w-0 max-w-full snap-x snap-mandatory overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        className,
      )}
      {...rest}
    >
      {rendered}
    </ul>
  );
}

export function CarouselSlide({ className, children, ...rest }: ComponentPropsWithoutRef<"li">) {
  return (
    <li className={cn("shrink-0 snap-start", className)} role="group" aria-roledescription="slide" {...rest}>
      {children}
    </li>
  );
}

/**
 * Square dot pagination. Figma: 14x15 squares at ~28px pitch.
 * dark (testimonials): active #2D1A14, inactive same @30%. light (hero): active #CEBFA7, inactive #F8F8F2 @30%.
 */
export function CarouselDots({ tone = "dark", size = "md", className }: { tone?: "dark" | "light"; size?: "md" | "sm"; className?: string }) {
  const { index, pages, goTo, id } = useCarousel();
  if (pages < 2) return null;
  return (
    <div className={cn("flex items-center", size === "sm" ? "gap-3" : "gap-3.5", className)} role="tablist" aria-label="Slides">
      {Array.from({ length: pages }, (_, i) => {
        const active = i === index;
        return (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={active}
            aria-controls={id}
            aria-label={`Slide ${i + 1} of ${pages}`}
            onClick={() => goTo(i)}
            className={cn(
              size === "sm" ? "size-[13px]" : "h-[15px] w-[14px]",
              tone === "dark" ? "bg-ink" : active ? "bg-sand" : "bg-cream",
              !active && "opacity-30",
            )}
          />
        );
      })}
    </div>
  );
}

/** Numeric pagination. Figma product section: "1 2 3 4" Noto 15/22 right-aligned, current bold. */
export function CarouselNumbers({ className }: { className?: string }) {
  const { index, count, goTo, id } = useCarousel();
  if (count < 2) return null;
  return (
    <div className={cn("flex items-center gap-[7px] font-sans text-body text-ink", className)} role="tablist" aria-label="Slides">
      {Array.from({ length: count }, (_, i) => (
        <button
          key={i}
          type="button"
          role="tab"
          aria-selected={i === index}
          aria-controls={id}
          aria-label={`Slide ${i + 1} of ${count}`}
          onClick={() => goTo(i)}
          className={cn("min-w-[1ch]", i === index && "font-bold")}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
}

/** Prev/next. Figma: 35x28 arrow (chevron + 23px shaft), 27px apart, prev at 30% opacity on the first slide. */
export function CarouselArrows({ className, tone = "dark" }: { className?: string; tone?: "dark" | "light" }) {
  const { prev, next, canPrev, canNext } = useCarousel();
  const color = tone === "dark" ? "text-ink" : "text-cream";
  return (
    <div className={cn("flex items-center gap-[27px]", className)}>
      <button
        type="button"
        onClick={prev}
        disabled={!canPrev}
        aria-disabled={!canPrev}
        aria-label="Previous slide"
        className={cn("flex h-7 w-[35px] items-center justify-center disabled:opacity-30", color)}
      >
        <IconArrowLong className="h-7 w-[35px] -scale-x-100" />
      </button>
      <button
        type="button"
        onClick={next}
        disabled={!canNext}
        aria-disabled={!canNext}
        aria-label="Next slide"
        className={cn("flex h-7 w-[35px] items-center justify-center disabled:opacity-30", color)}
      >
        <IconArrowLong className="h-7 w-[35px]" />
      </button>
    </div>
  );
}
