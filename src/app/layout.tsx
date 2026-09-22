import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { noto } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://anitaslist.com"), // TODO: confirm production origin
  title: {
    default: "Anita’s List",
    template: "%s | Anita’s List",
  },
  description: "Anita’s List", // CONTENT TODO: real description not provided in Figma
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB" className={noto.variable}>
      <head>
        {/* P22 Mackinac Pro (display face) via the client's Adobe Fonts kit - see src/fonts/README.md */}
        <link rel="stylesheet" href="https://use.typekit.net/ewt3ipw.css" />
      </head>
      <body className="flex min-h-dvh flex-col">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
  