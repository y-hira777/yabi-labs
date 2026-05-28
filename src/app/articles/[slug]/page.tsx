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
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-10 sm:py-14">
      {/* Back */}
      <Link
        href="/articles"
        className="inline-flex items-center gap-1.5 font-mono text-xs text-[var(--color-text-muted)] hover:text-[var(--color-accent-cyan)] transition-colors mb-10"
      >
        <span>←</span>
        <span>Articles</span>
      </Link>

      {/* Categories */}
      {article.categories && article.categories.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {article.categories.map((cat) => (
            <CategoryBadge key={cat.id} category={cat} size="md" />
          ))}
        </div>
      )}

      {/* Title */}
      <h1 className="font-sans text-2xl font-bold leading-snug tracking-tight text-[var(--color-text-primary)] sm:text-[1.75rem] mb-4">
        {article.title}
      </h1>

      {/* Date + Tags */}
      <div className="flex flex-wrap items-center gap-2 mb-10 pb-6 border-b border-[var(--color-border)]">
        <time
          dateTime={date}
          className="font-mono text-xs tabular-nums text-[var(--color-text-muted)]"
        >
          {formatDate(date)}
        </time>
        {article.tags && article.tags.length > 0 && (
          <>
            <span className="text-[var(--color-border-subtle)] text-xs select-none">·</span>
            {article.tags.map((tag) => (
              <TagBadge key={tag.id} tag={tag} />
            ))}
          </>
        )}
      </div>

      {/* Thumbnail */}
      {article.thumbnail && (
        <div className="mb-10 overflow-hidden rounded border border-[var(--color-border)]">
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
        <p className="text-sm text-[var(--color-text-muted)]">本文がありません。</p>
      )}

      {/* Footer */}
      <div className="mt-16 pt-8 border-t border-[var(--color-border)]">
        <Link
          href="/articles"
          className="inline-flex items-center gap-1.5 font-mono text-xs text-[var(--color-text-muted)] hover:text-[var(--color-accent-cyan)] transition-colors"
        >
          <span>←</span>
          <span>記事一覧に戻る</span>
        </Link>
      </div>
    </div>
  );
}
