import { Noto_Sans } from "next/font/google";

/** Body / UI face. Figma: Noto Sans 400, 500, 600, 700. */
export const noto = Noto_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-noto",
});

/**
 * Display / heading face is P22 Mackinac Pro, loaded from Adobe Fonts (Typekit) via the <link> in layout.tsx,
 * not bundled here - the client's Adobe Fonts licence covers CDN delivery, not redistributing the font files
 * in this repo. See src/fonts/README.md.
 */
