import Link from "next/link";
import { Nav } from "./Nav";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b-2 border-[var(--color-border)] bg-[var(--color-bg)]/95 backdrop-blur-md">
      <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-3" aria-label="Yabi Labs ホーム">
          <span className="flex h-9 w-9 items-center justify-center border-2 border-[var(--color-border)] bg-[var(--color-accent-lime)] font-mono text-xs font-black transition-transform group-hover:-rotate-6">
            YL
          </span>
          <span>
            <span className="block font-mono text-sm font-black uppercase leading-none tracking-[-0.04em]">
              Yabi Labs
            </span>
            <span className="mt-1 hidden font-mono text-[8px] uppercase tracking-[0.2em] text-[var(--color-text-muted)] sm:block">
              Creative Research Journal
            </span>
          </span>
        </Link>
        <Nav />
      </div>
    </header>
  );
}
