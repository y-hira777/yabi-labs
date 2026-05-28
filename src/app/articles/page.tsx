import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { ArticleGrid } from "@/components/article/ArticleGrid";
import { getArticles } from "@/lib/microcms/queries";
import { SITE_NAME } from "@/lib/utils";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: `Articles | ${SITE_NAME}`,
  description: "Yabi Labs の記事一覧。AI・Web制作・デザイン・自動化に関する実験と知見。",
};

export default async function ArticlesPage() {
  let articles: Awaited<ReturnType<typeof getArticles>>["contents"] = [];
  try {
    const res = await getArticles({ limit: 50 });
    articles = res.contents;
  } catch {
    // microCMSの認証情報が未設定の場合は空で表示
  }

  return (
    <div>
      <PageHeader
        prompt="~/articles"
        title="Articles"
        description="AI・Web制作・デザイン・自動化に関する実験と知見"
      />
      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-12">
        <ArticleGrid articles={articles} emptyMessage="記事は近日公開予定です" />
      </div>
    </div>
  );
}
