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
        className={`flex items-center justify-center bg-gradient-to-br from-[var(--color-surface)] via-[var(--color-base-700)] to-[var(--color-base-800)] ${className}`}
        aria-hidden="true"
      >
        <svg
          className="w-10 h-10 text-[var(--color-base-500)]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={0.75}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
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
