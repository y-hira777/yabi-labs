import Link from "next/link";
import type { Metadata } from "next";
import { ArticleCard } from "@/components/article/ArticleCard";
import { ArticleGrid } from "@/components/article/ArticleGrid";
import { getArticles, getFeaturedArticles, getCategories } from "@/lib/microcms/queries";
import { SITE_NAME, SITE_DESCRIPTION } from "@/lib/utils";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: `${SITE_NAME} — ${SITE_DESCRIPTION}`,
  description: SITE_DESCRIPTION,
};

export default async function HomePage() {
  const [featuredRes, latestRes, categoriesRes] = await Promise.allSettled([
    getFeaturedArticles(1),
    getArticles({ limit: 6 }),
    getCategories(),
  ]);

  const featuredArticle =
    featuredRes.status === "fulfilled" ? (featuredRes.value[0] ?? null) : null;
  const latestArticles = latestRes.status === "fulfilled" ? latestRes.value.contents : [];
  const categoriesList = categoriesRes.status === "fulfilled" ? categoriesRes.value : [];

  return (
    <div>
      <section className="border-b-2 border-[var(--color-border)]">
        <div className="mx-auto grid max-w-7xl lg:grid-cols-[minmax(0,1fr)_300px] lg:border-x-2 lg:border-[var(--color-border)]">
          <div className="relative overflow-hidden px-4 py-16 sm:px-6 sm:py-24 lg:px-10 lg:py-28">
            <div className="absolute right-5 top-5 font-mono text-[9px] uppercase tracking-[0.2em] text-[var(--color-text-muted)] sm:right-8 sm:top-8">
              Tokyo / Japan
              <br />
              Est. 2026
            </div>
            <p className="mb-8 flex items-center gap-3 font-mono text-[10px] font-bold uppercase tracking-[0.22em]">
              <span className="h-2.5 w-2.5 bg-[var(--color-accent-cyan)]" />
              Independent creative research
            </p>
            <h1 className="max-w-5xl font-sans text-[clamp(3.2rem,9vw,8.7rem)] font-black leading-[0.82] tracking-[-0.09em]">
              つくる。
              <br />
              <span className="text-[var(--color-accent-violet)]">こわす。</span>
              <br />
              考える。
            </h1>
            <div className="mt-10 flex flex-col gap-6 border-t-2 border-[var(--color-border)] pt-6 sm:flex-row sm:items-end sm:justify-between">
              <p className="max-w-md text-sm font-medium leading-7 text-[var(--color-text-secondary)]">
                AI、デザイン、Web制作、自動化。
                <br />
                試してわかったことを、完成前の熱量ごと記録する実験誌。
              </p>
              <Link
                href="/articles"
                className="group inline-flex w-fit items-center gap-5 border-2 border-[var(--color-border)] bg-[var(--color-accent-lime)] px-5 py-3 font-mono text-xs font-black uppercase tracking-wider shadow-[4px_4px_0_var(--color-border)] transition-transform hover:-translate-y-1 hover:shadow-[6px_6px_0_var(--color-border)]"
              >
                Read the journal
                <span className="text-lg transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>

          <aside className="grid border-t-2 border-[var(--color-border)] lg:grid-rows-[1fr_auto] lg:border-l-2 lg:border-t-0">
            <div className="flex min-h-56 flex-col justify-between bg-[var(--color-accent-lime)] p-6 lg:p-8">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em]">
                Manifesto / 001
              </p>
              <p className="mt-12 text-2xl font-black leading-tight tracking-[-0.04em]">
                正解を並べるより、
                <br />
                試行錯誤を公開する。
              </p>
            </div>
            <div className="grid grid-cols-2 border-t-2 border-[var(--color-border)] lg:grid-cols-1">
              <Link
                href="/about"
                className="group flex items-center justify-between p-5 font-mono text-[10px] font-bold uppercase tracking-wider transition-colors hover:bg-[var(--color-surface)]"
              >
                About this lab <span className="group-hover:translate-x-1">↗</span>
              </Link>
              <div className="border-l-2 border-[var(--color-border)] bg-[var(--color-accent-violet)] p-5 font-mono text-[10px] font-bold uppercase tracking-wider text-white lg:border-l-0 lg:border-t-2">
                Issue No. 001
              </div>
            </div>
          </aside>
        </div>
      </section>

      {featuredArticle && (
        <section className="border-b-2 border-[var(--color-border)] bg-[var(--color-surface)] py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 flex items-end justify-between border-b-2 border-[var(--color-border)] pb-4">
              <div>
                <p className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-[var(--color-accent-cyan)]">
                  Editor&apos;s selection
                </p>
                <h2 className="mt-1 text-2xl font-black tracking-[-0.04em] sm:text-4xl">
                  注目の実験
                </h2>
              </div>
              <span className="hidden font-mono text-6xl font-black leading-none text-[var(--color-base-200)] sm:block">
                01
              </span>
            </div>
            <ArticleCard article={featuredArticle} featured />
          </div>
        </section>
      )}

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex items-end justify-between border-b-2 border-[var(--color-border)] pb-4">
            <div>
              <p className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-[var(--color-accent-cyan)]">
                Recent field notes
              </p>
              <h2 className="mt-1 text-2xl font-black tracking-[-0.04em] sm:text-4xl">
                最新の記録
              </h2>
            </div>
            <Link
              href="/articles"
              className="font-mono text-[10px] font-bold uppercase tracking-wider underline decoration-2 underline-offset-4 hover:text-[var(--color-accent-violet)]"
            >
              View all →
            </Link>
          </div>
          <ArticleGrid articles={latestArticles} emptyMessage="記事は近日公開予定です" />
        </div>
      </section>

      {categoriesList.length > 0 && (
        <section className="border-y-2 border-[var(--color-border)] bg-[var(--color-base-950)] py-16 text-[var(--color-base-50)] sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[300px_1fr]">
              <div>
                <p className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-[var(--color-accent-lime)]">
                  Research index
                </p>
                <h2 className="mt-3 text-3xl font-black leading-tight tracking-[-0.05em]">
                  興味の入口を
                  <br />
                  見つける。
                </h2>
              </div>
              <div className="border-t border-[var(--color-base-700)]">
                {categoriesList.map((category, index) => (
                  <Link
                    key={category.id}
                    href={`/categories/${category.slug}`}
                    className="group grid grid-cols-[40px_1fr_auto] items-center gap-3 border-b border-[var(--color-base-700)] py-4 transition-colors hover:bg-[var(--color-accent-lime)] hover:px-4 hover:text-[var(--color-base-950)]"
                  >
                    <span className="font-mono text-[9px] text-[var(--color-base-400)] group-hover:text-[var(--color-base-700)]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-lg font-bold tracking-[-0.03em]">{category.name}</span>
                    <span className="font-mono text-sm">↗</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
