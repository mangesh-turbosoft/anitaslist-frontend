import type { SVGProps } from "react";

/** Play triangle. Figma: 12x12 REGULAR_POLYGON (Polygon 2) in the podcast card play button; drawn here as a path. */
export function IconPlay(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 12 12" fill="none" aria-hidden="true" {...props}>
      <path d="M2 0.8 L11.2 6 L2 11.2 Z" fill="currentColor" />
    </svg>
  );
}
