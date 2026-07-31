import Image from "next/image";
import type { MicroCMSImage } from "@/types/microcms";

type Props = {
  image?: MicroCMSImage;
  fallbackSrc?: string;
  alt: string;
  className?: string;
  priority?: boolean;
};

export function Eyecatch({ image, fallbackSrc, alt, className = "", priority = false }: Props) {
  const src = image?.url ?? fallbackSrc;

  if (!src) {
    return (
      <div
        className={`relative isolate overflow-hidden bg-[var(--color-surface)] ${className}`}
        aria-hidden="true"
      >
        <div
          className="absolute inset-0 opacity-35"
          style={{
            backgroundImage:
              "linear-gradient(var(--color-border-subtle) 1px, transparent 1px), linear-gradient(90deg, var(--color-border-subtle) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="absolute -right-[8%] -top-[20%] h-[75%] w-[48%] rotate-12 border-2 border-[var(--color-border)] bg-[var(--color-accent-violet)]" />
        <div className="absolute -bottom-[18%] left-[7%] h-[62%] w-[42%] -rotate-6 border-2 border-[var(--color-border)] bg-[var(--color-accent-lime)]" />
        <div className="absolute bottom-[12%] right-[13%] h-[28%] w-[28%] rounded-full border-2 border-[var(--color-border)] bg-[var(--color-accent-cyan)]" />
        <div className="absolute left-[8%] top-[10%] z-10 border-2 border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 shadow-[3px_3px_0_var(--color-border)]">
          <span className="block font-mono text-[8px] font-black uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
            Yabi Labs
          </span>
          <span className="mt-1 block font-mono text-xs font-black uppercase tracking-[-0.03em] text-[var(--color-text-primary)] sm:text-sm">
            Field Note / 000
          </span>
        </div>
        <span className="absolute bottom-[8%] right-[8%] z-10 flex h-9 w-9 items-center justify-center border-2 border-[var(--color-border)] bg-[var(--color-bg)] font-mono text-[10px] font-black">
          YL
        </span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={image?.width ?? 1600}
      height={image?.height ?? 1000}
      className={`object-cover ${className}`}
      priority={priority}
    />
  );
}
