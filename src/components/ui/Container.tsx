import type { ComponentPropsWithoutRef, ElementType } from "react";
import { cn } from "@/lib/cn";

type Props<T extends ElementType> = { as?: T } & ComponentPropsWithoutRef<T>;

/** 1440px frame with 30px side margins -> 1380px content, centred. Figma: every page. */
export function Container<T extends ElementType = "div">({ as, className, ...rest }: Props<T>) {
  const Tag = (as ?? "div") as ElementType;
  return <Tag className={cn("mx-auto w-full max-w-page px-4 md:px-[30px]", className)} {...rest} />;
}
