import type { SVGProps } from "react";

/** Figma export (multi-colour, fills preserved): my-hub-icon.svg. Sage circle, cream person glyph. */
export function IconMyHub(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" {...props}>
      <circle cx="24" cy="24" r="24" fill="#A0AA87" />
      <path d="M24.5999 23.56C29.0182 23.56 32.5999 27.1417 32.5999 31.56V35.2397H16.5999V31.56C16.5999 27.1417 20.1816 23.56 24.5999 23.56Z" stroke="#F8F8F2" strokeWidth="2" />
      <circle cx="24.5998" cy="17.16" r="5.12" stroke="#F8F8F2" strokeWidth="2" />
    </svg>
  );
}
