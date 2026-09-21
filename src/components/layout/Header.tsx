import Link from "next/link";
import { IconLogo, IconLogoMark, IconMyHub } from "@/components/icons";
import { Button, Container } from "@/components/ui";
import { accountNav, primaryNav } from "@/data/site";
import { HeaderSearch } from "./HeaderSearch";
import { MobileMenu } from "./MobileMenu";
import { NavLinks } from "./NavLinks";

/**
 * Site header.
 * Figma desktop (886:23): 1440x80 #F8F8F2; logo 184x32 at x=30; links from x=244 at ~48px gaps;
 * right group Search, the 48x48 "My hub icon" (183:5377, sage circle) in place of a text Login link,
 * Create account 149x40 ending at x=1410.
 * Figma mobile (51:411): 402x93; 55x50 mark at x=16; search icon + hamburger at the right.
 */
export function Header() {
  return (
    <header className="sticky top-0 z-40 bg-cream">
      <Container className="flex h-[93px] items-center xl:h-20">
        <Link href="/" aria-label="Anita’s List home" className="shrink-0 text-ink-alt">
          <IconLogo className="hidden h-8 w-[184px] xl:block" />
          <IconLogoMark className="h-[50px] w-auto xl:hidden" />
        </Link>

        <nav aria-label="Primary" className="ml-[55px] hidden xl:block">
          <NavLinks items={primaryNav} className="flex items-center gap-12" />
        </nav>

        <div className="ml-auto hidden items-center gap-[35px] xl:flex">
          <HeaderSearch variant="desktop" />
          <Link href={accountNav.login.href} aria-label={accountNav.login.label} title={accountNav.login.label} className="shrink-0 transition-opacity hover:opacity-80">
            <IconMyHub className="size-12" />
          </Link>
          <Button href={accountNav.register.href} className="w-[149px] px-0">
            {accountNav.register.label}
          </Button>
        </div>

        <div className="ml-auto flex items-center gap-4 xl:hidden">
          <HeaderSearch variant="mobile" />
          <MobileMenu />
        </div>
      </Container>
    </header>
  );
}
