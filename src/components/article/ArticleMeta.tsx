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
    <div className="flex flex-wrap items-center gap-2 font-mono text-[9px] font-bold uppercase tracking-wider">
      <time dateTime={date} className="tabular-nums text-[var(--color-text-muted)]">
        {formatDate(date)}
      </time>
      {article.categories && article.categories.length > 0 && (
        <>
          <span className="select-none text-[var(--color-base-400)]">/</span>
          {article.categories.map((cat) => (
            <CategoryBadge key={cat.id} category={cat} />
          ))}
        </>
      )}
      {showTags && article.tags && article.tags.length > 0 && (
        <>
          <span className="select-none text-[var(--color-base-400)]">/</span>
          {article.tags.map((tag) => (
            <TagBadge key={tag.id} tag={tag} />
          ))}
        </>
      )}
    </div>
  );
}
