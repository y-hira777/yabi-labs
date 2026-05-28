import { CategoryBadge } from "@/components/category/CategoryBadge";
import { TagBadge } from "@/components/tag/TagBadge";
import { formatDate } from "@/lib/utils";
import type { Article } from "@/types/article";

type Props = {
  article: Article;
  showTags?: boolean;
};

export function ArticleMeta({ article, showTags = false }: Props) {
  const date = article.published_at ?? article.createdAt;

  return (
    <div className="flex flex-wrap items-center gap-2">
      <time
        dateTime={date}
        className="font-mono text-[10px] tabular-nums text-[var(--color-text-muted)]"
      >
        {formatDate(date)}
      </time>
      {article.categories && article.categories.length > 0 && (
        <>
          <span className="text-[var(--color-border-subtle)] text-[10px] select-none">·</span>
          {article.categories.map((cat) => (
            <CategoryBadge key={cat.id} category={cat} />
          ))}
        </>
      )}
      {showTags && article.tags && article.tags.length > 0 && (
        <>
          <span className="text-[var(--color-border-subtle)] text-[10px] select-none">·</span>
          {article.tags.map((tag) => (
            <TagBadge key={tag.id} tag={tag} />
          ))}
        </>
      )}
    </div>
  );
}
