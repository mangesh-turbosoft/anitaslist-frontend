import Image from "next/image";
import Link from "next/link";
import type { ImageAsset } from "@/types/content";

/**
 * Hub "Profile element" (887:917, 1440x147 at y=130): 97x97 sage circle avatar at x=31; name P22 400 32/44 at
 * (148,18); "Edit profile" Noto 15/22 at (149,60); full-width hairline underneath.
 */
export function ProfileElement({ name, avatar }: { name: string; avatar: ImageAsset | null }) {
  return (
    <div className="flex items-start gap-5">
      <span className="relative block size-[97px] shrink-0 overflow-hidden rounded-full bg-sage">
        {avatar && <Image src={avatar.src} alt="" fill sizes="97px" className="object-cover" />}
      </span>
      <div className="pt-[18px]">
        <p className="text-h2">{name}</p>
        <Link href="/account/profile" className="font-sans text-body hover:underline">
          Edit profile
        </Link>
      </div>
    </div>
  );
}
