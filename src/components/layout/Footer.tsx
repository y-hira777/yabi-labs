import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] mt-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p className="font-mono text-sm font-semibold text-[var(--color-text-primary)]">
              Yabi Labs
            </p>
            <p className="mt-1 text-xs text-[var(--color-text-muted)]">
              AI・Web制作・デザイン・自動化の実験室
            </p>
          </div>
          <nav>
            <ul className="flex flex-wrap gap-4">
              {[
                { href: "/articles", label: "Articles" },
                { href: "/categories", label: "Categories" },
                { href: "/tags", label: "Tags" },
                { href: "/about", label: "About" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs font-mono text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <p className="text-xs text-[var(--color-text-muted)] font-mono">
            &copy; {new Date().getFullYear()} Yabi Labs
          </p>
          <Link
            href="https://yabi-memories.jp/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono text-[var(--color-text-muted)] hover:text-[var(--color-accent-cyan)] transition-colors"
          >
            Yabi &amp; Memories →
          </Link>
        </div>
      </div>
    </footer>
  );
}
