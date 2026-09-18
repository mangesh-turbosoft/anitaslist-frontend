import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary";

const base =
  "inline-flex h-10 shrink-0 items-center justify-center whitespace-nowrap px-5 font-display text-label font-medium text-cream transition-opacity duration-150 hover:opacity-90 disabled:pointer-events-none disabled:opacity-50";

/** Figma: 40px tall, radius 0, P22 Mackinac 500 16/19 centred. Primary #C77065, secondary #D89A94. */
const variants: Record<Variant, string> = {
  primary: "bg-terracotta",
  secondary: "bg-blush",
};

type ButtonProps = ComponentPropsWithoutRef<"button"> & { variant?: Variant; href?: undefined };
type LinkProps = ComponentPropsWithoutRef<typeof Link> & { variant?: Variant; href: string };

export function Button(props: ButtonProps | LinkProps) {
  const { variant = "primary", className, ...rest } = props;
  const classes = cn(base, variants[variant], className);
  if ("href" in rest && typeof rest.href === "string") {
    return <Link {...(rest as LinkProps)} className={classes} />;
  }
  const { type = "button", ...btn } = rest as ButtonProps;
  return <button type={type} {...btn} className={classes} />;
}
