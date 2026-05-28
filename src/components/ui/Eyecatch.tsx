import Image from "next/image";
import type { MicroCMSImage } from "@/types/microcms";

type Props = {
  image?: MicroCMSImage;
  alt: string;
  className?: string;
  priority?: boolean;
};

export function Eyecatch({ image, alt, className = "", priority = false }: Props) {
  if (!image) {
    return (
      <div
        className={`flex items-center justify-center bg-[var(--color-surface)] ${className}`}
        aria-hidden="true"
      >
        <span className="font-mono text-xs text-[var(--color-text-muted)]">no image</span>
      </div>
    );
  }

  return (
    <Image
      src={image.url}
      alt={alt}
      width={image.width}
      height={image.height}
      className={`object-cover ${className}`}
      priority={priority}
    />
  );
}
