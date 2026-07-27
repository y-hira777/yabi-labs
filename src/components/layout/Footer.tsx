import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-24 border-t-2 border-[var(--color-border)] bg-[var(--color-base-950)] text-[var(--color-base-50)]">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-end">
          <div>
            <p className="font-mono text-3xl font-black uppercase leading-none tracking-[-0.08em] sm:text-5xl">
              Yabi
              <br />
              Labs<span className="text-[var(--color-accent-lime)]">.</span>
            </p>
            <p className="mt-4 max-w-xs text-xs leading-relaxed text-[var(--color-base-300)]">
              AI・Web制作・デザイン・自動化の実験室
            </p>
          </div>
          <nav>
            <ul className="flex max-w-sm flex-wrap justify-start gap-x-5 gap-y-3 sm:justify-end">
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
                    className="border-b border-transparent font-mono text-[10px] uppercase tracking-wider text-[var(--color-base-300)] transition-colors hover:border-[var(--color-accent-lime)] hover:text-[var(--color-base-50)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-[var(--color-base-700)] pt-5 sm:flex-row sm:items-center">
          <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-[var(--color-base-400)]">
            &copy; {new Date().getFullYear()} Yabi Labs / Issue 001
          </p>
          <Link
            href="https://yabi-memories.jp/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[9px] uppercase tracking-[0.18em] text-[var(--color-base-400)] transition-colors hover:text-[var(--color-accent-lime)]"
          >
            Yabi &amp; Memories →
          </Link>
        </div>
      </div>
    </footer>
  );
}
