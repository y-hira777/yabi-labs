import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { SITE_NAME } from "@/lib/utils";

export const metadata: Metadata = {
  title: `Privacy & Site Policy | ${SITE_NAME}`,
  description: "Yabi Labsのプライバシーポリシー、免責事項、著作権に関する方針",
};

const privacySections = [
  {
    title: "取得する情報",
    content: (
      <>
        <p>
          お問い合わせ時に、氏名、メールアドレスなどの連絡先、お問い合わせ内容を取得する場合があります。
        </p>
        <p>
          また、サイトの安定運用や不正アクセス対策のため、IPアドレス、ブラウザ情報、参照元URL、アクセス日時などがサーバーのアクセスログに記録される場合があります。
        </p>
      </>
    ),
  },
  {
    title: "利用目的",
    content: (
      <ul>
        <li>お問い合わせへの回答と必要な連絡</li>
        <li>サイトの品質改善、利用状況の把握</li>
        <li>不正アクセスや迷惑行為の防止、セキュリティの確保</li>
        <li>法令または利用条件に違反する行為への対応</li>
      </ul>
    ),
  },
  {
    title: "第三者への提供",
    content: (
      <p>
        法令に基づく場合、人の生命・身体・財産の保護に必要な場合などを除き、ご本人の同意なく個人情報を第三者へ提供しません。
      </p>
    ),
  },
  {
    title: "外部サービス",
    content: (
      <p>
        当サイトは、ホスティングにVercel、コンテンツ管理にmicroCMSを利用しています。外部サービス上で取り扱われる情報には、各サービスのプライバシーポリシーが適用されます。
      </p>
    ),
  },
  {
    title: "情報の管理",
    content: (
      <p>
        取得した情報は利用目的に必要な範囲で管理し、漏えい、紛失、改ざん、不正アクセスなどを防ぐため、合理的な安全対策に努めます。
      </p>
    ),
  },
];

const sitePolicySections = [
  {
    title: "情報の正確性",
    content: (
      <p>
        掲載内容は公開時点の情報をもとに、できる限り正確であるよう確認しています。ただし、技術仕様やサービス内容は変更される可能性があり、内容の完全性や最新性を保証するものではありません。
      </p>
    ),
  },
  {
    title: "免責事項",
    content: (
      <p>
        当サイトの情報を利用したこと、または利用できなかったことによって生じた損害について、運営者は責任を負いかねます。掲載内容は、必要に応じて公式情報や専門家の見解とあわせてご確認ください。
      </p>
    ),
  },
  {
    title: "外部リンク",
    content: (
      <p>
        当サイトから移動した外部サイトの内容やサービスについて、運営者は管理しておらず、その正確性、安全性、利用結果を保証しません。
      </p>
    ),
  },
  {
    title: "著作権と引用",
    content: (
      <p>
        当サイトに掲載する文章、画像、デザインなどの著作権は、運営者または正当な権利者に帰属します。法令で認められる引用の範囲を超えた無断転載、複製、再配布はご遠慮ください。
      </p>
    ),
  },
];

type PolicySection = (typeof privacySections)[number];

function PolicyGroup({
  number,
  label,
  sections,
}: {
  number: string;
  label: string;
  sections: PolicySection[];
}) {
  return (
    <section className="grid gap-8 border-b-2 border-[var(--color-border)] py-14 first:pt-0 sm:py-20 lg:grid-cols-[260px_1fr]">
      <div>
        <p className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-[var(--color-accent-cyan)]">
          {number} / {label}
        </p>
      </div>
      <div className="border-t-2 border-[var(--color-border)]">
        {sections.map((section, index) => (
          <div
            key={section.title}
            className="grid gap-4 border-b border-[var(--color-border-subtle)] py-7 sm:grid-cols-[44px_180px_1fr] sm:gap-6"
          >
            <span className="font-mono text-[9px] font-bold text-[var(--color-text-muted)]">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h2 className="text-base font-black tracking-[-0.03em]">{section.title}</h2>
            <div className="space-y-3 text-sm font-medium leading-7 text-[var(--color-text-secondary)] [&_li]:relative [&_li]:pl-4 [&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:text-[var(--color-accent-cyan)] [&_li]:before:content-['—']">
              {section.content}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function PolicyPage() {
  return (
    <div>
      <PageHeader
        prompt="~/policy"
        title="Policy"
        description="Yabi Labsのプライバシー、情報発信、コンテンツ利用に関する方針。"
      />

      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="mb-14 grid gap-6 border-2 border-[var(--color-border)] bg-[var(--color-accent-lime)] p-6 shadow-[5px_5px_0_var(--color-border)] sm:grid-cols-[1fr_auto] sm:items-end sm:p-8">
          <div>
            <p className="font-mono text-[9px] font-bold uppercase tracking-[0.2em]">
              Privacy &amp; Site Policy
            </p>
            <p className="mt-4 max-w-2xl text-sm font-bold leading-7">
              Yabi
              Labsは、訪問者の情報を必要な範囲で適切に扱い、公開するコンテンツに責任を持つことを大切にします。
            </p>
          </div>
          <p className="font-mono text-[9px] font-bold uppercase tracking-[0.16em]">
            Updated / 2026.07.28
          </p>
        </div>

        <PolicyGroup number="01" label="Privacy" sections={privacySections} />
        <PolicyGroup number="02" label="Site policy" sections={sitePolicySections} />

        <section className="grid gap-8 pt-14 sm:pt-20 lg:grid-cols-[260px_1fr]">
          <div>
            <p className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-[var(--color-accent-cyan)]">
              03 / Contact &amp; revision
            </p>
          </div>
          <div className="grid gap-8 border-t-2 border-[var(--color-border)] pt-7 sm:grid-cols-2">
            <div>
              <h2 className="text-base font-black tracking-[-0.03em]">お問い合わせ</h2>
              <p className="mt-3 text-sm font-medium leading-7 text-[var(--color-text-secondary)]">
                情報の取り扱いや当ポリシーについては、Contactページからご連絡ください。
              </p>
              <Link
                href="/contact"
                className="mt-5 inline-flex items-center gap-3 border-b-2 border-[var(--color-border)] pb-1 font-mono text-[10px] font-black uppercase tracking-wider hover:text-[var(--color-accent-violet)]"
              >
                Contact us <span>↗</span>
              </Link>
            </div>
            <div>
              <h2 className="text-base font-black tracking-[-0.03em]">ポリシーの変更</h2>
              <p className="mt-3 text-sm font-medium leading-7 text-[var(--color-text-secondary)]">
                法令、利用サービス、サイト運用の変更に応じて内容を見直します。重要な変更がある場合は、このページでお知らせします。
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
