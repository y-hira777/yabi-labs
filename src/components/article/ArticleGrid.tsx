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
    <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8">
      {articles.map((article, index) => (
        <ArticleCard key={article.id} article={article} index={index} />
      ))}
    </div>
  );
}
