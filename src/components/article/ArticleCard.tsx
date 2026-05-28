import Link from "next/link";
import { Eyecatch } from "@/components/ui/Eyecatch";
import { ArticleMeta } from "./ArticleMeta";
import { truncate } from "@/lib/utils";
import type { Article } from "@/types/article";

type Props = {
  article: Article;
  featured?: boolean;
};

export function ArticleCard({ article, featured = false }: Props) {
  return (
    <article className="group">
      <Link href={`/articles/${article.slug}`} className="block">
        <div
          className={[
            "overflow-hidden rounded-sm border border-[var(--color-border)]",
            "transition-colors duration-200",
            "group-hover:border-[var(--color-border-subtle)]",
            featured ? "aspect-[16/9]" : "aspect-[3/2]",
          ].join(" ")}
        >
          <Eyecatch
            image={article.thumbnail}
            alt={article.title}
            className={[
              "h-full w-full transition-transform duration-300 group-hover:scale-[1.02]",
              featured ? "aspect-[16/9]" : "aspect-[3/2]",
            ].join(" ")}
          />
        </div>
        <div className="mt-3 space-y-2">
          <ArticleMeta article={article} />
          <h2
            className={[
              "font-sans font-semibold leading-snug text-[var(--color-text-primary)]",
              "transition-colors group-hover:text-[var(--color-accent-cyan)]",
              featured ? "text-lg sm:text-xl" : "text-base",
            ].join(" ")}
          >
            {article.title}
          </h2>
        </div>
      </Link>
    </article>
  );
}
