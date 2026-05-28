import Link from "next/link";
import type { Category } from "@/types/category";

type Props = {
  category: Category;
  size?: "sm" | "md";
};

export function CategoryBadge({ category, size = "sm" }: Props) {
  const sizeClass = size === "sm" ? "text-[10px] px-2 py-0.5" : "text-xs px-3 py-1";

  return (
    <Link
      href={`/categories/${category.slug}`}
      className={[
        "inline-block rounded-sm font-mono tracking-wide transition-colors",
        "border border-[var(--color-accent-violet)] text-[var(--color-accent-violet)]",
        "hover:bg-[var(--color-accent-violet)] hover:text-[var(--color-base-950)]",
        sizeClass,
      ].join(" ")}
    >
      {category.name}
    </Link>
  );
}
