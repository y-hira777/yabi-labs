import Link from "next/link";
import { Eyecatch } from "@/components/ui/Eyecatch";
import { ArticleMeta } from "./ArticleMeta";
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
            "overflow-hidden rounded border border-[var(--color-border)]",
            "transition-all duration-300",
            "group-hover:border-[var(--color-accent-cyan)]/50 group-hover:shadow-[0_0_20px_-4px_rgba(0,210,255,0.12)]",
            featured ? "aspect-[16/9]" : "aspect-[3/2]",
          ].join(" ")}
        >
          <Eyecatch
            image={article.thumbnail}
            alt={article.title}
            className={[
              "h-full w-full transition-transform duration-500 group-hover:scale-[1.04]",
              featured ? "aspect-[16/9]" : "aspect-[3/2]",
            ].join(" ")}
          />
        </div>
        <div className="mt-4 space-y-2.5">
          <ArticleMeta article={article} />
          <h2
            className={[
              "font-sans font-semibold leading-snug text-[var(--color-text-primary)]",
              "transition-colors group-hover:text-[var(--color-accent-cyan)]",
              featured ? "text-xl sm:text-2xl" : "text-base",
            ].join(" ")}
          >
            {article.title}
          </h2>
        </div>
      </Link>
    </article>
  );
}
