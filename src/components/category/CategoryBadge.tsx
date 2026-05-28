import Link from "next/link";
import type { Category } from "@/types/category";

type Props = {
  category: Category;
  size?: "sm" | "md";
};

export function CategoryBadge({ category, size = "sm" }: Props) {
  const sizeClass = size === "sm" ? "text-[10px] px-1.5 py-0.5" : "text-xs px-3 py-1.5";

  return (
    <Link
      href={`/categories/${category.slug}`}
      className={[
        "inline-block font-mono tracking-wide transition-all duration-150",
        "border border-[var(--color-accent-violet)]/60 text-[var(--color-accent-violet)]",
        "hover:border-[var(--color-accent-violet)] hover:bg-[var(--color-accent-violet)]/10",
        "rounded-sm",
        sizeClass,
      ].join(" ")}
    >
      {category.name}
    </Link>
  );
}
