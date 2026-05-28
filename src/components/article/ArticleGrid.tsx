import { ArticleCard } from "./ArticleCard";
import { EmptyState } from "@/components/ui/EmptyState";
import type { Article } from "@/types/article";

type Props = {
  articles: Article[];
  emptyMessage?: string;
};

export function ArticleGrid({ articles, emptyMessage }: Props) {
  if (articles.length === 0) {
    return <EmptyState message={emptyMessage} />;
  }

  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {articles.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  );
}
