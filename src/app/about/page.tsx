import type { Metadata } from "next";
import Link from "next/link";
import { SITE_NAME } from "@/lib/utils";

export const metadata: Metadata = {
  title: `About | ${SITE_NAME}`,
  description: "Yabi Labs について — AI・Web制作・デザイン・自動化の実験室",
};

const categories = [
  { name: "AI", description: "ChatGPT・Claude・Gemini などの活用・実験" },
  { name: "Engineering", description: "Next.js・React・TypeScript などの開発記録" },
  { name: "Design", description: "UI・UX・デザインシステムの考察と実践" },
  { name: "Automation", description: "n8n・Make・Zapier を使った自動化レシピ" },
  { name: "WordPress", description: "カスタマイズ・Gutenberg・テーマ開発" },
  { name: "Tools", description: "便利なツール・サービスのレビューと使い方" },
  { name: "Experiments", description: "試してみた・壊してみた・面白かったこと" },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-16 sm:py-20">
      {/* Header */}
      <div className="mb-12">
        <p className="mb-3 font-mono text-xs text-[var(--color-accent-cyan)]">~/about</p>
        <h1 className="font-mono text-2xl font-bold tracking-tight text-[var(--color-text-primary)] sm:text-3xl">
          About
        </h1>
      </div>

      {/* Site */}
      <section className="mb-12">
        <p className="mb-2 font-mono text-xs text-[var(--color-text-muted)]">{"// site"}</p>
        <h2 className="mb-4 font-mono text-lg font-semibold text-[var(--color-text-primary)]">
          Yabi Labs とは
        </h2>
        <div className="space-y-3 text-sm text-[var(--color-text-secondary)] leading-relaxed">
          <p>
            Yabi Labs は、個人ブランド{" "}
            <strong className="text-[var(--color-text-primary)]">Yabi</strong>{" "}
            の技術・研究・実験サイトです。
          </p>
          <p>
            AI・Web制作・デザイン・フロントエンド・自動化の領域で実際に試したこと、学んだこと、壊したことを記録・発信しています。
          </p>
          <p>
            &ldquo;Labs&rdquo;
            という名前のとおり、完成品ではなく実験の場です。正解を教えるサイトではなく、一緒に試行錯誤するサイトを目指しています。
          </p>
        </div>
      </section>

      {/* Sister site */}
      <section className="mb-12 p-5 border border-[var(--color-border)] rounded-sm">
        <p className="mb-2 font-mono text-xs text-[var(--color-text-muted)]">{"// sister site"}</p>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-mono text-sm font-semibold text-[var(--color-text-primary)] mb-1">
              Yabi &amp; Memories
            </h3>
            <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
              旅・写真・Vlog・ペット・日常・記憶を扱うサイト。
              <br />
              Yabi Labs と同じ「Yabi」ブランドの、もうひとつの世界観。
            </p>
          </div>
          <Link
            href="https://yabi-memories.jp/"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 font-mono text-xs text-[var(--color-accent-cyan)] hover:underline"
          >
            yabi-memories.jp →
          </Link>
        </div>
      </section>

      {/* Categories */}
      <section className="mb-12">
        <p className="mb-2 font-mono text-xs text-[var(--color-text-muted)]">{"// categories"}</p>
        <h2 className="mb-4 font-mono text-lg font-semibold text-[var(--color-text-primary)]">
          扱うトピック
        </h2>
        <div className="divide-y divide-[var(--color-border)]">
          {categories.map((cat) => (
            <div key={cat.name} className="flex items-start gap-4 py-3">
              <span className="shrink-0 font-mono text-xs text-[var(--color-accent-violet)] w-24">
                {cat.name}
              </span>
              <span className="text-xs text-[var(--color-text-muted)]">{cat.description}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section>
        <p className="mb-2 font-mono text-xs text-[var(--color-text-muted)]">{"// contact"}</p>
        <h2 className="mb-3 font-mono text-lg font-semibold text-[var(--color-text-primary)]">
          お問い合わせ
        </h2>
        <p className="mb-4 text-sm text-[var(--color-text-secondary)] leading-relaxed">
          ご質問・ご依頼・コラボのご相談などはお気軽にどうぞ。
        </p>
        <Link
          href="/contact"
          className="inline-block rounded-sm border border-[var(--color-accent-cyan)] px-5 py-2 font-mono text-sm text-[var(--color-accent-cyan)] transition-colors hover:bg-[var(--color-accent-cyan)] hover:text-[var(--color-base-950)]"
        >
          Contact →
        </Link>
      </section>
    </div>
  );
}
