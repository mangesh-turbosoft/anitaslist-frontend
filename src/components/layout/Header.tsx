import Link from "next/link";
import { IconLogo, IconLogoMark, IconSearch } from "@/components/icons";
import { Button, Container } from "@/components/ui";
import { accountNav, primaryNav } from "@/data/site";
import { MobileMenu } from "./MobileMenu";
import { NavLinks } from "./NavLinks";

/**
 * Site header.
 * Figma desktop (886:23): 1440x80 #F8F8F2; logo 184x32 at x=30; links from x=244 at ~48px gaps;
 * right group Search + icon, Login, Create account 149x40 ending at x=1410.
 * Figma mobile (51:411): 402x93; 55x50 mark at x=16; search icon + hamburger at the right.
 * Not sticky - nothing in the file indicates it (plan section 18 q3).
 */
export function Header() {
  return (
    <header className="bg-cream">
      <Container className="flex h-[93px] items-center xl:h-20">
        <Link href="/" aria-label="Anita’s List home" className="shrink-0 text-ink-alt">
          <IconLogo className="hidden h-8 w-[184px] xl:block" />
          <IconLogoMark className="h-[50px] w-auto xl:hidden" />
        </Link>

        <nav aria-label="Primary" className="ml-[55px] hidden xl:block">
          <NavLinks items={primaryNav} className="flex items-center gap-12" />
        </nav>

        <div className="ml-auto hidden items-center gap-[35px] xl:flex">
          <Link
            href={accountNav.search.href}
            className="inline-flex items-center gap-1 font-display text-label font-medium text-ink transition-opacity hover:opacity-70"
          >
            {accountNav.search.label}
            <IconSearch className="h-5 w-auto" />
          </Link>
          <Link
            href={accountNav.login.href}
            className="font-display text-label font-medium text-ink transition-opacity hover:opacity-70"
          >
            {accountNav.login.label}
          </Link>
          <Button href={accountNav.register.href} className="w-[149px] px-0">
            {accountNav.register.label}
          </Button>
        </div>

        <div className="ml-auto flex items-center gap-4 xl:hidden">
          <Link
            href={accountNav.search.href}
            aria-label={accountNav.search.label}
            className="flex size-11 items-center justify-center text-ink"
          >
            <IconSearch className="h-[27px] w-auto" />
          </Link>
          <MobileMenu />
        </div>
      </Container>
    </header>
  );
}
