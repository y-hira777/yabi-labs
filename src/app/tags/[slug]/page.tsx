import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { ArticleGrid } from "@/components/article/ArticleGrid";
import { getTagBySlug, getArticlesByTag, getTags } from "@/lib/microcms/queries";
import { SITE_NAME } from "@/lib/utils";

export const revalidate = 3600;

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  try {
    const tags = await getTags();
    return tags.map((t) => ({ slug: t.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tag = await getTagBySlug(slug);

  if (!tag) return { title: `Not Found | ${SITE_NAME}` };

  return {
    title: `#${tag.name} | ${SITE_NAME}`,
    description: `${tag.name} タグの記事一覧`,
  };
}

export default async function TagDetailPage({ params }: Props) {
  const { slug } = await params;

  let tag;
  try {
    tag = await getTagBySlug(slug);
  } catch {
    notFound();
  }

  if (!tag) notFound();

  let articles: Awaited<ReturnType<typeof getArticlesByTag>>["contents"] = [];
  try {
    const res = await getArticlesByTag(tag.id, { limit: 50 });
    articles = res.contents;
  } catch {
    // エラー時は空で表示
  }

  return (
    <div>
      <PageHeader
        prompt={`~/tags/${slug}`}
        title={`#${tag.name}`}
        description={`${tag.name} タグの記事`}
      />
      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-12">
        <ArticleGrid articles={articles} emptyMessage="このタグの記事はまだありません" />
      </div>
    </div>
  );
}
