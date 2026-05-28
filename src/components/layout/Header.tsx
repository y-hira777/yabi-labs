import Link from "next/link";
import { Nav } from "./Nav";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-bg)]/90 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="font-mono text-xs text-[var(--color-accent-cyan)] select-none">~/</span>
          <span className="font-mono text-base font-semibold tracking-tight text-[var(--color-text-primary)] group-hover:text-[var(--color-accent-cyan)] transition-colors">
            Yabi Labs
          </span>
        </Link>
        <Nav />
      </div>
    </header>
  );
}
