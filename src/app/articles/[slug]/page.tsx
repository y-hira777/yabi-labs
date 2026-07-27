import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ArticleBody } from "@/components/article/ArticleBody";
import { CategoryBadge } from "@/components/category/CategoryBadge";
import { TagBadge } from "@/components/tag/TagBadge";
import { Eyecatch } from "@/components/ui/Eyecatch";
import { getArticleBySlug, getAllArticleSlugs } from "@/lib/microcms/queries";
import { SITE_NAME, SITE_URL, formatDate } from "@/lib/utils";

export const revalidate = 3600;

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  try {
    const slugs = await getAllArticleSlugs();
    return slugs.map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return { title: `Not Found | ${SITE_NAME}` };
  }

  const title = article.title;
  const ogImage = article.thumbnail;

  return {
    title,
    openGraph: {
      title,
      url: `${SITE_URL}/articles/${slug}`,
      images: ogImage ? [{ url: ogImage.url, width: ogImage.width, height: ogImage.height }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      images: ogImage ? [ogImage.url] : [],
    },
  };
}

export default async function ArticleDetailPage({ params }: Props) {
  const { slug } = await params;

  let article;
  try {
    article = await getArticleBySlug(slug);
  } catch {
    notFound();
  }

  if (!article) {
    notFound();
  }

  const date = article.published_at ?? article.createdAt;

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-16">
      {/* Back */}
      <Link
        href="/articles"
        className="mb-12 inline-flex items-center gap-2 border-b border-[var(--color-border)] pb-1 font-mono text-[9px] font-bold uppercase tracking-wider text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-accent-violet)]"
      >
        <span>←</span>
        <span>Articles</span>
      </Link>

      {/* Categories */}
      {article.categories && article.categories.length > 0 && (
        <div className="mb-5 flex flex-wrap gap-2">
          {article.categories.map((cat) => (
            <CategoryBadge key={cat.id} category={cat} size="md" />
          ))}
        </div>
      )}

      {/* Title */}
      <h1 className="mb-6 max-w-3xl text-3xl font-black leading-[1.25] tracking-[-0.05em] sm:text-5xl">
        {article.title}
      </h1>

      {/* Date + Tags */}
      <div className="mb-10 flex flex-wrap items-center gap-2 border-b-2 border-[var(--color-border)] pb-6">
        <time
          dateTime={date}
          className="font-mono text-[10px] font-bold tabular-nums tracking-wider text-[var(--color-text-muted)]"
        >
          {formatDate(date)}
        </time>
        {article.tags && article.tags.length > 0 && (
          <>
            <span className="select-none text-xs text-[var(--color-base-400)]">/</span>
            {article.tags.map((tag) => (
              <TagBadge key={tag.id} tag={tag} />
            ))}
          </>
        )}
      </div>

      {/* Thumbnail */}
      {article.thumbnail && (
        <div className="mb-14 overflow-hidden border-2 border-[var(--color-border)] bg-[var(--color-base-100)] shadow-[6px_6px_0_var(--color-accent-violet)]">
          <Eyecatch
            image={article.thumbnail}
            alt={article.title}
            className="w-full h-auto"
            priority
          />
        </div>
      )}

      {/* Content */}
      {article.content ? (
        <ArticleBody html={article.content} />
      ) : (
        <p className="border-2 border-dashed border-[var(--color-border-subtle)] p-8 text-sm text-[var(--color-text-muted)]">
          本文がありません。
        </p>
      )}

      {/* Footer */}
      <div className="mt-20 border-t-2 border-[var(--color-border)] pt-8">
        <Link
          href="/articles"
          className="inline-flex items-center gap-2 font-mono text-[9px] font-bold uppercase tracking-wider text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-accent-violet)]"
        >
          <span>←</span>
          <span>記事一覧に戻る</span>
        </Link>
      </div>
    </div>
  );
}
