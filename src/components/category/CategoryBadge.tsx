import Link from "next/link";
import type { Category } from "@/types/category";

type Props = {
  category: Category;
  size?: "sm" | "md";
};

export function CategoryBadge({ category, size = "sm" }: Props) {
  const sizeClass = size === "sm" ? "text-[9px] px-2 py-1" : "text-[10px] px-3 py-2";

  return (
    <Link
      href={`/categories/${category.slug}`}
      className={[
        "inline-block border border-[var(--color-border)] bg-[var(--color-surface)] font-mono font-bold uppercase tracking-wider transition-all duration-150",
        "text-[var(--color-text-primary)] hover:bg-[var(--color-accent-lime)]",
        sizeClass,
      ].join(" ")}
    >
      / {category.name}
    </Link>
  );
}
