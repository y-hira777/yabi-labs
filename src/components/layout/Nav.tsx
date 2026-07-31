"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/articles", label: "Journal", number: "01" },
  { href: "/categories", label: "Index", number: "02" },
  { href: "/about", label: "About", number: "03" },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <nav>
      <ul className="flex items-center gap-2 sm:gap-7">
        {links.map((link) => {
          const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                className={[
                  "group/link flex items-baseline gap-1.5 border-b-2 py-1 font-mono text-[10px] font-bold uppercase tracking-wider transition-colors duration-150 sm:text-xs",
                  isActive
                    ? "border-[var(--color-accent-cyan)] text-[var(--color-text-primary)]"
                    : "border-transparent text-[var(--color-text-secondary)] hover:border-[var(--color-border)] hover:text-[var(--color-text-primary)]",
                ].join(" ")}
              >
                <span className="hidden text-[8px] text-[var(--color-accent-cyan)] sm:inline">
                  {link.number}
                </span>
                <span>{link.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
