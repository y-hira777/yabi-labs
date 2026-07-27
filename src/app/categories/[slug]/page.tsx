import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { ArticleGrid } from "@/components/article/ArticleGrid";
import { getCategoryBySlug, getArticlesByCategory, getCategories } from "@/lib/microcms/queries";
import { SITE_NAME } from "@/lib/utils";

export const revalidate = 3600;

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  try {
    const categories = await getCategories();
    return categories.map((c) => ({ slug: c.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) return { title: `Not Found | ${SITE_NAME}` };

  return {
    title: `${category.name} | ${SITE_NAME}`,
    description: category.description ?? `${category.name} カテゴリの記事一覧`,
  };
}

export default async function CategoryDetailPage({ params }: Props) {
  const { slug } = await params;

  let category;
  try {
    category = await getCategoryBySlug(slug);
  } catch {
    notFound();
  }

  if (!category) notFound();

  let articles: Awaited<ReturnType<typeof getArticlesByCategory>>["contents"] = [];
  try {
    const res = await getArticlesByCategory(category.id, { limit: 50 });
    articles = res.contents;
  } catch {
    // エラー時は空で表示
  }

  return (
    <div>
      <PageHeader
        prompt={`~/categories/${slug}`}
        title={category.name}
        description={category.description}
      />
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <ArticleGrid articles={articles} emptyMessage="このカテゴリの記事はまだありません" />
      </div>
    </div>
  );
}
