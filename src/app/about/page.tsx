import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
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
  { name: "Devlog", description: "開発記録・進捗" },
];

export default function AboutPage() {
  return (
    <div>
      <PageHeader
        prompt="~/about"
        title="About"
        description="完成した答えではなく、試行錯誤の途中を記録する個人研究誌。"
      />

      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <section className="grid gap-8 border-b-2 border-[var(--color-border)] pb-16 lg:grid-cols-[280px_1fr]">
          <div>
            <p className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-[var(--color-accent-cyan)]">
              01 / The lab
            </p>
          </div>
          <div>
            <h2 className="max-w-3xl text-3xl font-black leading-tight tracking-[-0.05em] sm:text-5xl">
              つくったものだけでなく、
              <span className="text-[var(--color-accent-violet)]">そこに至る思考</span>も残す。
            </h2>
            <div className="mt-8 max-w-2xl space-y-5 text-sm font-medium leading-8 text-[var(--color-text-secondary)]">
              <p>
                Yabi Labs は、個人ブランド{" "}
                <strong className="text-[var(--color-text-primary)]">Yabi</strong>{" "}
                の技術・研究・実験サイトです。
              </p>
              <p>
                AI・Web制作・デザイン・フロントエンド・自動化の領域で、実際に試したこと、学んだこと、壊したことを記録・発信しています。
              </p>
              <p>
                正解を教える場所ではなく、完成前のアイデアや失敗も含めて、一緒に試行錯誤できる場所を目指しています。
              </p>
            </div>
          </div>
        </section>

        <section className="grid gap-8 border-b-2 border-[var(--color-border)] py-16 lg:grid-cols-[280px_1fr]">
          <div>
            <p className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-[var(--color-accent-cyan)]">
              02 / Research fields
            </p>
          </div>
          <div className="border-l-2 border-t-2 border-[var(--color-border)] sm:grid sm:grid-cols-2">
            {categories.map((category, index) => (
              <div
                key={category.name}
                className="min-h-32 border-b-2 border-r-2 border-[var(--color-border)] bg-[var(--color-surface)] p-5"
              >
                <p className="font-mono text-[9px] text-[var(--color-text-muted)]">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-4 text-lg font-black tracking-[-0.03em]">{category.name}</h3>
                <p className="mt-2 text-xs leading-relaxed text-[var(--color-text-secondary)]">
                  {category.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-8 py-16 lg:grid-cols-[280px_1fr]">
          <div>
            <p className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-[var(--color-accent-cyan)]">
              03 / Another world
            </p>
          </div>
          <Link
            href="https://yabi-memories.jp/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col justify-between gap-10 border-2 border-[var(--color-border)] bg-[var(--color-accent-lime)] p-6 shadow-[6px_6px_0_var(--color-border)] transition-transform hover:-translate-y-1 sm:flex-row sm:items-end sm:p-8"
          >
            <div>
              <p className="font-mono text-[9px] font-bold uppercase tracking-[0.2em]">
                Sister journal
              </p>
              <h2 className="mt-4 text-3xl font-black tracking-[-0.05em] sm:text-5xl">
                Yabi &amp; Memories
              </h2>
              <p className="mt-4 max-w-lg text-sm font-medium leading-7">
                旅・写真・Vlog・ペット・日常・記憶を扱う、Yabiブランドのもうひとつの世界。
              </p>
            </div>
            <span className="font-mono text-3xl transition-transform group-hover:-rotate-12">
              ↗
            </span>
          </Link>
        </section>
      </div>
    </div>
  );
}
