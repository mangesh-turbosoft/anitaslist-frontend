"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react";
import { IconArrowLong } from "@/components/icons";
import { cn } from "@/lib/cn";

/**
 * Scroll-snap carousel. One primitive covers the four layouts in the design:
 * hero (dots), testimonials (dots + arrows), product categories (numbers + arrows), sample-list rows (arrows).
 * Behaviour not specified by Figma (autoplay, looping) is left out: manual, clamped, one slide per press.
 */

type Api = {
  index: number;
  count: number;
  /** How many whole slides currently fit in the visible track — needed to turn item count into page count. */
  perView: number;
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

export function Carousel({ children, className, label }: { children: ReactNode; className?: string; label: string }) {
  const trackRef = useRef<HTMLUListElement | null>(null);
  const [index, setIndex] = useState(0);
  const [count, setCount] = useState(0);
  const [perView, setPerView] = useState(1);
  const id = useId();

  const measure = useCallback(() => {
    const t = trackRef.current;
    if (!t) return;
    const items = Array.from(t.children) as HTMLElement[];
    setCount(items.length);
    if (!items.length) return;
    const cs = getComputedStyle(t);
    // Keep scroll-snap's "safe area" in sync with the track's own padding. Without this, a scroll-snap
    // container with side padding auto-scrolls on load to snap the first slide flush against the bare
    // edge, silently cancelling that padding and pushing an equal gap onto the opposite end instead.
    t.style.scrollPaddingLeft = cs.paddingLeft;
    t.style.scrollPaddingRight = cs.paddingRight;
    const gap = parseFloat(cs.columnGap || "0") || 0;
    const step = items[0].offsetWidth + gap;
    setIndex(step > 0 ? Math.round(t.scrollLeft / step) : 0);
    setPerView(step > 0 ? Math.max(1, Math.floor((t.clientWidth + gap + 1) / step)) : 1);
  }, []);

  useEffect(() => {
    const t = trackRef.current;
    if (!t) return;
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(t);
    t.addEventListener("scroll", measure, { passive: true });
    return () => {
      ro.disconnect();
      t.removeEventListener("scroll", measure);
    };
  }, [measure]);

  const goTo = useCallback((i: number) => {
    const t = trackRef.current;
    if (!t) return;
    const items = t.children;
    const target = items[Math.max(0, Math.min(i, items.length - 1))] as HTMLElement | undefined;
    if (!target) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    t.scrollTo({ left: target.offsetLeft, behavior: reduce ? "auto" : "smooth" });
  }, []);

  const canPrev = index > 0;
  const canNext = index < count - perView;

  const api: Api = {
    index,
    count,
    perView,
    canPrev,
    canNext,
    prev: () => goTo(index - 1),
    next: () => goTo(index + 1),
    goTo,
    trackRef,
    id,
  };

  return (
    <Ctx.Provider value={api}>
      <div className={cn("min-w-0 max-w-full", className)} role="region" aria-roledescription="carousel" aria-label={label}>
        {children}
      </div>
    </Ctx.Provider>
  );
}

/** The scrolling row. Children must be <CarouselSlide>. Gap is set by the caller via className (e.g. gap-[6px]). */
export function CarouselTrack({ className, children, ...rest }: ComponentPropsWithoutRef<"ul">) {
  const { trackRef, id } = useCarousel();
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
      {children}
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
  const { index, count, perView, goTo, id } = useCarousel();
  // Dots mark stopping positions ("pages"), not raw items - with N items and M shown at once there are only
  // N - M + 1 distinct places to land. Using the item count here would draw dots with nowhere new to go to.
  const pages = Math.max(1, count - perView + 1);
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
