import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 — Page Not Found | Yabi Labs",
};

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-32 text-center">
      <p className="font-mono text-xs text-[var(--color-accent-cyan)] tracking-widest mb-4">
        {"// 404"}
      </p>
      <h1 className="font-mono text-4xl font-bold text-[var(--color-text-primary)] mb-3">
        Page Not Found
      </h1>
      <p className="text-sm text-[var(--color-text-muted)] mb-8 max-w-sm leading-relaxed">
        お探しのページは見つかりませんでした。
        <br />
        移動または削除された可能性があります。
      </p>
      <Link
        href="/"
        className="inline-block rounded-sm border border-[var(--color-accent-cyan)] px-5 py-2 font-mono text-sm text-[var(--color-accent-cyan)] transition-colors hover:bg-[var(--color-accent-cyan)] hover:text-[var(--color-base-950)]"
      >
        ← トップへ戻る
      </Link>
    </div>
  );
}
