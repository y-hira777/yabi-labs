import Link from "next/link";
import type { Tag } from "@/types/tag";

type Props = {
  tag: Tag;
  size?: "sm" | "md";
};

export function TagBadge({ tag, size = "sm" }: Props) {
  const sizeClass = size === "sm" ? "text-[10px] px-1.5 py-0.5" : "text-xs px-3 py-1.5";

  return (
    <Link
      href={`/tags/${tag.slug}`}
      className={[
        "inline-block font-mono tracking-wide transition-all duration-150",
        "border border-[var(--color-border)] text-[var(--color-text-muted)]",
        "hover:border-[var(--color-base-300)] hover:text-[var(--color-text-secondary)]",
        "rounded-sm",
        sizeClass,
      ].join(" ")}
    >
      #{tag.name}
    </Link>
  );
}
