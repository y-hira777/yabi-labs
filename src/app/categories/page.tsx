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
      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-12">
        {categories.length === 0 ? (
          <EmptyState message="カテゴリはまだありません" />
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className="group block rounded-sm border border-[var(--color-border)] p-5 transition-colors hover:border-[var(--color-accent-violet)]"
              >
                <p className="font-mono text-xs text-[var(--color-accent-violet)] mb-2">
                  {category.slug}
                </p>
                <h2 className="font-sans text-base font-semibold text-[var(--color-text-primary)] group-hover:text-[var(--color-accent-cyan)] transition-colors">
                  {category.name}
                </h2>
                {category.description && (
                  <p className="mt-2 text-xs text-[var(--color-text-muted)] leading-relaxed">
                    {category.description}
                  </p>
                )}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
