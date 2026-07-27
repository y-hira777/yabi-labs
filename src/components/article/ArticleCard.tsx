import Link from "next/link";
import { Eyecatch } from "@/components/ui/Eyecatch";
import { ArticleMeta } from "./ArticleMeta";
import type { Article } from "@/types/article";

type Props = {
  article: Article;
  featured?: boolean;
  index?: number;
};

export function ArticleCard({ article, featured = false, index }: Props) {
  if (featured) {
    return (
      <article className="group">
        <Link
          href={`/articles/${article.slug}`}
          className="grid gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(280px,0.65fr)] lg:items-stretch"
        >
          <div className="overflow-hidden border-2 border-[var(--color-border)] bg-[var(--color-base-100)] shadow-[6px_6px_0_var(--color-border)]">
            <Eyecatch
              image={article.thumbnail}
              alt={article.title}
              className="aspect-[16/10] h-full w-full transition-transform duration-500 group-hover:scale-[1.03]"
              priority
            />
          </div>
          <div className="flex flex-col justify-between border-t-2 border-[var(--color-border)] pt-5 lg:border-y-2 lg:py-6">
            <div>
              <ArticleMeta article={article} />
              <h3 className="mt-5 text-2xl font-black leading-tight tracking-[-0.045em] transition-colors group-hover:text-[var(--color-accent-violet)] sm:text-4xl">
                {article.title}
              </h3>
            </div>
            <div className="mt-10 flex items-center justify-between font-mono text-[10px] font-bold uppercase tracking-wider">
              <span>Read experiment</span>
              <span className="flex h-11 w-11 items-center justify-center border-2 border-[var(--color-border)] bg-[var(--color-accent-lime)] text-lg transition-transform group-hover:-rotate-6">
                ↗
              </span>
            </div>
          </div>
        </Link>
      </article>
    );
  }

  return (
    <article className="group border-t-2 border-[var(--color-border)] pt-4">
      <Link href={`/articles/${article.slug}`} className="block">
        <div className="relative overflow-hidden border border-[var(--color-border)] bg-[var(--color-base-100)]">
          {index !== undefined && (
            <span className="absolute left-0 top-0 z-10 bg-[var(--color-accent-lime)] px-2 py-1 font-mono text-[9px] font-black">
              NOTE / {String(index + 1).padStart(2, "0")}
            </span>
          )}
          <Eyecatch
            image={article.thumbnail}
            alt={article.title}
            className="aspect-[4/3] h-full w-full grayscale-[15%] transition-all duration-500 group-hover:scale-[1.04] group-hover:grayscale-0"
          />
        </div>
        <div className="mt-4 space-y-3">
          <ArticleMeta article={article} />
          <h2 className="text-lg font-bold leading-snug tracking-[-0.035em] transition-colors group-hover:text-[var(--color-accent-violet)]">
            {article.title}
          </h2>
          <span className="inline-block font-mono text-[9px] font-bold uppercase tracking-wider underline decoration-1 underline-offset-4">
            Open note ↗
          </span>
        </div>
      </Link>
    </article>
  );
}
