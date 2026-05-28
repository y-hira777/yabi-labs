import type { Metadata } from "next";
import Link from "next/link";
import { SITE_NAME } from "@/lib/utils";

export const metadata: Metadata = {
  title: `Contact | ${SITE_NAME}`,
  description: "Yabi Labs へのお問い合わせ",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 py-16 sm:py-20">
      <div className="mb-10">
        <p className="mb-3 font-mono text-xs text-[var(--color-accent-cyan)]">~/contact</p>
        <h1 className="font-mono text-2xl font-bold tracking-tight text-[var(--color-text-primary)] sm:text-3xl">
          Contact
        </h1>
        <p className="mt-3 text-sm text-[var(--color-text-secondary)] leading-relaxed">
          ご質問・ご依頼・コラボのご相談など、お気軽にどうぞ。
        </p>
      </div>

      <div className="space-y-6">
        {/* Google Form などへの導線 */}
        <div className="rounded-sm border border-[var(--color-border)] p-6">
          <p className="mb-1 font-mono text-xs text-[var(--color-text-muted)]">{"// form"}</p>
          <h2 className="mb-3 font-mono text-sm font-semibold text-[var(--color-text-primary)]">
            お問い合わせフォーム
          </h2>
          <p className="mb-5 text-xs text-[var(--color-text-muted)] leading-relaxed">
            下記のフォームよりお問い合わせください。
            <br />
            通常 2〜3 営業日以内に返信いたします。
          </p>
          {/* TODO: Google Form URL や Formspree などに差し替えてください */}
          <a
            href="#"
            className="inline-block rounded-sm border border-[var(--color-accent-cyan)] px-5 py-2 font-mono text-sm text-[var(--color-accent-cyan)] transition-colors hover:bg-[var(--color-accent-cyan)] hover:text-[var(--color-base-950)]"
          >
            フォームを開く →
          </a>
        </div>

        {/* SNS */}
        <div className="rounded-sm border border-[var(--color-border)] p-6">
          <p className="mb-1 font-mono text-xs text-[var(--color-text-muted)]">{"// social"}</p>
          <h2 className="mb-3 font-mono text-sm font-semibold text-[var(--color-text-primary)]">
            SNS でのご連絡
          </h2>
          <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
            X (Twitter) の DM でもお気軽にどうぞ。
          </p>
        </div>
      </div>

      <div className="mt-10">
        <Link
          href="/"
          className="font-mono text-xs text-[var(--color-text-muted)] hover:text-[var(--color-accent-cyan)] transition-colors"
        >
          ← トップへ戻る
        </Link>
      </div>
    </div>
  );
}
