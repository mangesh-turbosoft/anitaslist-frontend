/** Display formatting at the render boundary. Figma shows "£1235.43" (no thousands separator) and "10 July 2026". */

export function formatGBP(pence: number): string {
  return `£${(pence / 100).toFixed(2)}`;
}

const dateFmt = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric" });

export function formatDate(iso: string): string {
  return dateFmt.format(new Date(iso));
}

/** Figma key-date rows show "00/00/00". */
const shortFmt = new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "2-digit", year: "2-digit" });

export function formatShortDate(iso: string): string {
  return shortFmt.format(new Date(iso));
}
