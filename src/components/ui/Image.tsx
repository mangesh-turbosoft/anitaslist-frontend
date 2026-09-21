import NextImage, { type ImageProps } from "next/image";

/** Wraps next/image with a higher default quality — the framework default (75) looked soft on photography. */
export function Image({ quality = 90, ...props }: ImageProps) {
  return <NextImage quality={quality} {...props} />;
}
