import Link from "next/link";
import { IconFacebook, IconInstagram, IconYoutube } from "@/components/icons";
import { SubscribeForm } from "@/components/forms/SubscribeForm";
import { Button, Container, Eyebrow } from "@/components/ui";
import { copyright, footerQuickLinks, social } from "@/data/site";

const socialLinks = [
  { key: "instagram", label: "Instagram", href: social.instagram, Icon: IconInstagram, iconClass: "size-[30px]" },
  { key: "facebook", label: "Facebook", href: social.facebook, Icon: IconFacebook, iconClass: "size-8" },
  { key: "youtube", label: "YouTube", href: social.youtube, Icon: IconYoutube, iconClass: "size-8" },
] as const;

/**
 * Site footer. Figma desktop (974:9205): 1442x424 #CEBFA7. Columns measured from the 1440 frame:
 * social circles x=54 (50x50, y=64/132/197) · subscribe x=148 w=446 · quick links x=731 w=193 · feedback x=964 w=428.
 * Headings at y=50 (eyebrow 16/46), content from y=89. Copyright P22 700 11/18 right-aligned, y=370.
 * The four 0.5px divider vectors are the same colour as the background and do not render in Figma - omitted.
 * Mobile (51:569, reference only): columns stack, subscribe first, copyright last.
 */
export function Footer() {
  return (
    <footer className="bg-sand text-ink">
      <Container className="flex flex-col pb-9 pt-[50px] xl:min-h-[424px]">
        <div className="flex flex-col gap-10 xl:flex-row xl:gap-0">
          {/* Social */}
          <ul className="order-last flex gap-4 xl:order-none xl:ml-6 xl:mt-[14px] xl:w-[50px] xl:flex-col xl:gap-[17px]" aria-label="Social media">
            {socialLinks.map(({ key, label, href, Icon, iconClass }) => (
              <li key={key}>
                <a
                  href={href ?? "#"}
                  aria-label={label}
                  aria-disabled={href ? undefined : true}
                  title={href ? undefined : "Link not yet configured"}
                  target={href ? "_blank" : undefined}
                  rel={href ? "noopener noreferrer" : undefined}
                  className="flex size-[50px] items-center justify-center rounded-full bg-terracotta text-cream transition-[background-color,transform] duration-150 hover:scale-105 hover:bg-ink aria-disabled:pointer-events-none aria-disabled:cursor-default"
                >
                  <Icon className={iconClass} />
                </a>
              </li>
            ))}
          </ul>

          {/* Subscribe */}
          <div className="xl:ml-11 xl:w-[446px]">
            <Eyebrow>Be in the know</Eyebrow>
            <p className="-mt-[7px] font-display text-h2 text-ink">
              Be the first to know about new products, news and <em>exclusive offers</em>
            </p>
            <div className="mt-7">
              <SubscribeForm />
            </div>
          </div>

          {/* Quick links */}
          <nav aria-label="Quick links" className="xl:ml-[137px] xl:w-[193px]">
            <Eyebrow>Quick links</Eyebrow>
            <ul className="-mt-[7px]">
              {footerQuickLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="font-sans text-body-tall text-ink hover:underline">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Feedback — CONTENT TODO: this column is lorem ipsum in Figma, including its heading */}
          <div className="xl:ml-10 xl:w-[428px]">
            <Eyebrow>Lorem ipsum dolor</Eyebrow>
            <p className="-mt-[7px] font-display text-h2 text-ink">Lorem ipsum dolor set amet, consectetur.</p>
            <p className="mt-[17px] font-sans text-body text-ink">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.
            </p>
            <Button href="/feedback" className="mt-[26px] w-[194px] px-0">
              Share your feedback
            </Button>
          </div>
        </div>

        <p className="mt-[27px] font-display text-legal font-bold text-black xl:mr-[18px] xl:self-end">{copyright}</p>
      </Container>
    </footer>
  );
}
