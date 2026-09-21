import { Noto_Sans } from "next/font/google";
import localFont from "next/font/local";

/** Body / UI face. Figma: Noto Sans 400, 500, 600, 700. */
export const noto = Noto_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-noto",
});

/** Display / heading face. Figma: P22 Mackinac Pro Book 400, Medium 500, Bold 700 (+ italics). Licensed .woff2 files now in src/fonts/. */
export const p22 = localFont({
  src: [
    { path: "../fonts/P22MackinacPro-Book.woff2", weight: "400", style: "normal" },
    { path: "../fonts/P22MackinacPro-BookItalic.woff2", weight: "400", style: "italic" },
    { path: "../fonts/P22MackinacPro-Medium.woff2", weight: "500", style: "normal" },
    { path: "../fonts/P22MackinacPro-MediumItalic.woff2", weight: "500", style: "italic" },
    { path: "../fonts/P22MackinacPro-Bold.woff2", weight: "700", style: "normal" },
    { path: "../fonts/P22MackinacPro-BoldItalic.woff2", weight: "700", style: "italic" },
  ],
  display: "swap",
  variable: "--font-p22",
});
