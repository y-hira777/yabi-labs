import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 — Page Not Found | Yabi Labs",
};

export default function NotFound() {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col items-center justify-center px-4 py-32 text-center">
      <p className="mb-5 font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-[var(--color-accent-cyan)]">
        Archive error / 404
      </p>
      <h1 className="text-6xl font-black leading-none tracking-[-0.08em] sm:text-8xl">
        NOT
        <br />
        FOUND<span className="text-[var(--color-accent-violet)]">.</span>
      </h1>
      <p className="mb-8 mt-6 max-w-sm text-sm font-medium leading-relaxed text-[var(--color-text-secondary)]">
        お探しのページは見つかりませんでした。
        <br />
        移動または削除された可能性があります。
      </p>
      <Link
        href="/"
        className="inline-block border-2 border-[var(--color-border)] bg-[var(--color-accent-lime)] px-5 py-3 font-mono text-[10px] font-black uppercase tracking-wider shadow-[4px_4px_0_var(--color-border)] transition-transform hover:-translate-y-1"
      >
        ← トップへ戻る
      </Link>
    </div>
  );
}
