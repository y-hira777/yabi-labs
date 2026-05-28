import Link from "next/link";
import type { Metadata } from "next";
import { ArticleCard } from "@/components/article/ArticleCard";
import { ArticleGrid } from "@/components/article/ArticleGrid";
import { CategoryBadge } from "@/components/category/CategoryBadge";
import { getArticles, getFeaturedArticles } from "@/lib/microcms/queries";
import { getCategories } from "@/lib/microcms/queries";
import { SITE_NAME, SITE_DESCRIPTION } from "@/lib/utils";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: `${SITE_NAME} — ${SITE_DESCRIPTION}`,
  description: SITE_DESCRIPTION,
};

export default async function HomePage() {
  const [featuredRes, latestRes, categories] = await Promise.allSettled([
    getFeaturedArticles(1),
    getArticles({ limit: 6 }),
    getCategories(),
  ]);

  const featuredArticle =
    featuredRes.status === "fulfilled" ? (featuredRes.value[0] ?? null) : null;
  const latestArticles = latestRes.status === "fulfilled" ? latestRes.value.contents : [];
  const categoriesList = categories.status === "fulfilled" ? categories.value : [];

  return (
    <div>
      {/* Hero */}
      <section className="border-b border-[var(--color-border)] py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <p className="mb-4 font-mono text-xs text-[var(--color-accent-cyan)] tracking-widest uppercase">
            ~/yabi-labs
          </p>
          <h1 className="max-w-2xl font-mono text-3xl font-bold leading-tight tracking-tight text-[var(--color-text-primary)] sm:text-4xl lg:text-5xl">
            AI と制作の
            <br />
            <span className="text-[var(--color-accent-violet)]">実験室</span>
          </h1>
          <p className="mt-5 max-w-lg text-sm text-[var(--color-text-secondary)] leading-relaxed">
            AI・Web制作・デザイン・自動化・フロントエンドの実験と知見を記録するサイト。 Yabi
            が試したこと、壊したこと、作ったことを発信します。
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/articles"
              className="inline-block rounded-sm border border-[var(--color-accent-cyan)] px-5 py-2 font-mono text-sm text-[var(--color-accent-cyan)] transition-colors hover:bg-[var(--color-accent-cyan)] hover:text-[var(--color-base-950)]"
            >
              記事を読む
            </Link>
            <Link
              href="/about"
              className="inline-block rounded-sm border border-[var(--color-border-subtle)] px-5 py-2 font-mono text-sm text-[var(--color-text-secondary)] transition-colors hover:border-[var(--color-base-300)] hover:text-[var(--color-text-primary)]"
            >
              About
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Article */}
      {featuredArticle && (
        <section className="border-b border-[var(--color-border)] py-14">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <p className="mb-6 font-mono text-xs text-[var(--color-text-muted)] tracking-widest uppercase">
              {"// featured"}
            </p>
            <ArticleCard article={featuredArticle} featured />
          </div>
        </section>
      )}

      {/* Latest Articles */}
      <section className="py-14">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="mb-8 flex items-center justify-between">
            <p className="font-mono text-xs text-[var(--color-text-muted)] tracking-widest uppercase">
              {"// latest"}
            </p>
            <Link
              href="/articles"
              className="font-mono text-xs text-[var(--color-text-muted)] hover:text-[var(--color-accent-cyan)] transition-colors"
            >
              all articles →
            </Link>
          </div>
          <ArticleGrid articles={latestArticles} emptyMessage="記事は近日公開予定です" />
        </div>
      </section>

      {/* Categories */}
      {categoriesList.length > 0 && (
        <section className="border-t border-[var(--color-border)] py-14">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <p className="mb-6 font-mono text-xs text-[var(--color-text-muted)] tracking-widest uppercase">
              {"// categories"}
            </p>
            <div className="flex flex-wrap gap-3">
              {categoriesList.map((category) => (
                <CategoryBadge key={category.id} category={category} size="md" />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
