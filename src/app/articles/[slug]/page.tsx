import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArticleBody } from "@/components/article/ArticleBody";
import { ArticleMeta } from "@/components/article/ArticleMeta";
import { Eyecatch } from "@/components/ui/Eyecatch";
import { getArticleBySlug, getAllArticleSlugs } from "@/lib/microcms/queries";
import { SITE_NAME, SITE_URL } from "@/lib/utils";

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
  const description = "";
  const ogImage = article.thumbnail;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/articles/${slug}`,
      images: ogImage ? [{ url: ogImage.url, width: ogImage.width, height: ogImage.height }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
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

  return (
    <article className="mx-auto max-w-3xl px-4 sm:px-6 py-12">
      {/* Meta */}
      <div className="mb-6">
        <ArticleMeta article={article} showTags />
      </div>

      {/* Title */}
      <h1 className="font-sans text-2xl font-bold leading-snug tracking-tight text-[var(--color-text-primary)] sm:text-3xl mb-8">
        {article.title}
      </h1>

      {/* Thumbnail */}
      {article.thumbnail && (
        <div className="mb-10 overflow-hidden rounded-sm border border-[var(--color-border)]">
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

      {/* Footer Tags */}
      {article.tags && article.tags.length > 0 && (
        <div className="mt-12 pt-8 border-t border-[var(--color-border)]">
          <p className="mb-3 font-mono text-xs text-[var(--color-text-muted)]">{"// tags"}</p>
          <div className="flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <span
                key={tag.id}
                className="font-mono text-xs text-[var(--color-text-muted)] border border-[var(--color-border-subtle)] px-2 py-0.5 rounded-sm"
              >
                #{tag.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
