"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/articles", label: "Articles" },
  { href: "/categories", label: "Categories" },
  { href: "/about", label: "About" },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <nav>
      <ul className="flex items-center gap-6">
        {links.map((link) => {
          const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                className={[
                  "text-sm font-mono tracking-wide transition-colors duration-150",
                  isActive
                    ? "text-[var(--color-accent-cyan)]"
                    : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]",
                ].join(" ")}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
