import Image from "next/image";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

const splitImage = { src: "/images/auth-split-709x869.webp", alt: "" };

/**
 * Login / Registration shell (886:9, 886:10): 709x869 photo flush left under the header, form centred in the
 * remaining 731px. Login form starts 164px below the header, registration 44px. Below xl the photo is hidden.
 * `showImage=false` (forgot-password, thank-you - no Figma frame for either) drops the split photo entirely
 * and centres the content in the full width instead, both horizontally and vertically.
 */
export function AuthShell({
  children,
  formTop = "login",
  showImage = true,
}: {
  children: ReactNode;
  formTop?: "login" | "register";
  showImage?: boolean;
}) {
  if (!showImage) {
    return (
      <div className="mx-auto flex min-h-[600px] max-w-page flex-col items-center justify-center px-4 py-16 text-center md:px-[30px]">
        {children}
      </div>
    );
  }

  return (
    <div className="mx-auto grid max-w-page grid-cols-1 xl:min-h-[869px] xl:grid-cols-[709px_1fr]">
      <div className="relative hidden xl:block">
        <Image src={splitImage.src} alt={splitImage.alt} fill priority sizes="709px" className="object-cover" />
      </div>
      <div className={cn("flex justify-center px-4 pb-16 pt-10 md:px-[30px]", formTop === "login" ? "xl:pt-[164px]" : "xl:pt-[44px]")}>
        {children}
      </div>
    </div>
  );
}
