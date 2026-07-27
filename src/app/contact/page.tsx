import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { SITE_NAME } from "@/lib/utils";

export const metadata: Metadata = {
  title: `Contact | ${SITE_NAME}`,
  description: "Yabi Labs へのお問い合わせ",
};

export default function ContactPage() {
  return (
    <div>
      <PageHeader
        prompt="~/contact"
        title="Contact"
        description="ご質問・ご依頼・コラボレーションの相談など、お気軽にどうぞ。"
      />

      <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20">
        <div className="grid border-l-2 border-t-2 border-[var(--color-border)] sm:grid-cols-2">
          <section className="flex min-h-72 flex-col justify-between border-b-2 border-r-2 border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-8">
            <div>
              <p className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-[var(--color-accent-cyan)]">
                01 / Form
              </p>
              <h2 className="mt-8 text-2xl font-black tracking-[-0.04em]">お問い合わせフォーム</h2>
              <p className="mt-4 text-sm font-medium leading-7 text-[var(--color-text-secondary)]">
                下記のフォームよりお問い合わせください。通常2〜3営業日以内に返信いたします。
              </p>
            </div>
            <a
              href="#"
              className="mt-8 inline-flex w-fit items-center gap-4 border-2 border-[var(--color-border)] bg-[var(--color-accent-lime)] px-5 py-3 font-mono text-[10px] font-black uppercase tracking-wider shadow-[4px_4px_0_var(--color-border)] transition-transform hover:-translate-y-1"
            >
              Open form <span>↗</span>
            </a>
          </section>

          <section className="flex min-h-72 flex-col justify-between border-b-2 border-r-2 border-[var(--color-border)] bg-[var(--color-accent-violet)] p-6 text-white sm:p-8">
            <div>
              <p className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-white/70">
                02 / Social
              </p>
              <h2 className="mt-8 text-2xl font-black tracking-[-0.04em]">SNSでのご連絡</h2>
              <p className="mt-4 text-sm font-medium leading-7 text-white/75">
                X（Twitter）のDMでもお気軽にどうぞ。
              </p>
            </div>
            <p className="mt-8 font-mono text-[10px] font-bold uppercase tracking-wider text-white/70">
              Social link coming soon
            </p>
          </section>
        </div>

        <Link
          href="/"
          className="mt-10 inline-flex items-center gap-2 border-b border-[var(--color-border)] pb-1 font-mono text-[9px] font-bold uppercase tracking-wider transition-colors hover:text-[var(--color-accent-violet)]"
        >
          ← Back to home
        </Link>
      </div>
    </div>
  );
}
