import Link from "next/link";
import type { Tag } from "@/types/tag";

type Props = {
  tag: Tag;
  size?: "sm" | "md";
};

export function TagBadge({ tag, size = "sm" }: Props) {
  const sizeClass = size === "sm" ? "text-[9px] px-2 py-1" : "text-[10px] px-3 py-2";

  return (
    <Link
      href={`/tags/${tag.slug}`}
      className={[
        "inline-block border border-[var(--color-border-subtle)] font-mono font-bold uppercase tracking-wider transition-all duration-150",
        "text-[var(--color-text-secondary)] hover:border-[var(--color-border)] hover:bg-[var(--color-base-100)] hover:text-[var(--color-text-primary)]",
        sizeClass,
      ].join(" ")}
    >
      #{tag.name}
    </Link>
  );
}
