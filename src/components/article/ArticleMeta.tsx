import { CategoryBadge } from "@/components/category/CategoryBadge";
import { TagBadge } from "@/components/tag/TagBadge";
import { formatDate } from "@/lib/utils";
import type { Article } from "@/types/article";

type Props = {
  article: Article;
  showTags?: boolean;
};

export function ArticleMeta({ article, showTags = false }: Props) {
  const date = article.publishedAt ?? article.createdAt;

  return (
    <div className="flex flex-wrap items-center gap-2">
      <time dateTime={date} className="font-mono text-[10px] text-[var(--color-text-muted)]">
        {formatDate(date)}
      </time>
      {article.category && (
        <>
          <span className="text-[var(--color-border-subtle)] text-[10px]">/</span>
          <CategoryBadge category={article.category} />
        </>
      )}
      {showTags && article.tags && article.tags.length > 0 && (
        <>
          <span className="text-[var(--color-border-subtle)] text-[10px]">/</span>
          {article.tags.map((tag) => (
            <TagBadge key={tag.id} tag={tag} />
          ))}
        </>
      )}
    </div>
  );
}
