import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { EmptyState } from "@/components/ui/EmptyState";
import { getCategories } from "@/lib/microcms/queries";
import type { Category } from "@/types/category";
import { SITE_NAME } from "@/lib/utils";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: `Categories | ${SITE_NAME}`,
  description: "記事カテゴリ一覧",
};

export default async function CategoriesPage() {
  let categories: Category[] = [];
  try {
    categories = await getCategories();
  } catch {
    // microCMSの認証情報が未設定の場合は空で表示
  }

  return (
    <div>
      <PageHeader prompt="~/categories" title="Categories" description="トピック別に記事を探す" />
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        {categories.length === 0 ? (
          <EmptyState message="カテゴリはまだありません" />
        ) : (
          <div className="grid grid-cols-1 border-l-2 border-t-2 border-[var(--color-border)] sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category, index) => (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className="group relative min-h-56 border-b-2 border-r-2 border-[var(--color-border)] bg-[var(--color-surface)] p-6 transition-colors hover:bg-[var(--color-accent-lime)]"
              >
                <p className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
                  Field / {String(index + 1).padStart(2, "0")}
                </p>
                <h2 className="mt-10 text-2xl font-black tracking-[-0.04em]">{category.name}</h2>
                {category.description && (
                  <p className="mt-3 max-w-xs text-xs font-medium leading-relaxed text-[var(--color-text-secondary)]">
                    {category.description}
                  </p>
                )}
                <span className="absolute bottom-5 right-5 font-mono text-lg transition-transform group-hover:-rotate-12">
                  ↗
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
