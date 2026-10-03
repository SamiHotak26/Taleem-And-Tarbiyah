"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

const navLinks = [
  { href: "/courses", label: "Courses" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const { data: session, status } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const role = (session?.user as { role?: string } | undefined)?.role;
  const dashboardHref =
    role === "teacher" ? "/teacher/dashboard" : "/parent/dashboard";
  const close = () => setMenuOpen(false);

  return (
    <header className="border-b border-ink/10 bg-cream/95 backdrop-blur sticky top-0 z-40">
      <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
             <Link href="/" className="flex flex-col items-start leading-tight whitespace-nowrap" onClick={close}>
          <span className="font-display text-2xl md:text-3xl font-semibold text-lapis">Ta&apos;lim and Tarbiya</span>
          <span className="text-base md:text-lg font-semibold text-clay" dir="rtl">
            <span lang="fa">تعلیم و تربیه</span> · <span lang="ps">تعلیم او تربیه</span>
          </span>
        </Link>

        {/* Desktop menu */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium whitespace-nowrap">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-ink/70 hover:text-lapis transition-colors"
            >
              {link.label}
            </Link>
          ))}

          {status === "loading" ? (
            <span className="w-14" />
          ) : session ? (
            <>
              <Link
                href={dashboardHref}
                className="text-ink/70 hover:text-lapis transition-colors"
              >
                My Dashboard
              </Link>
              <button
                type="button"
                onClick={() => signOut({ callbackUrl: "/" })}
                className="text-ink/70 hover:text-lapis transition-colors"
              >
                Sign Out
              </button>
            </>
          ) : (
            <details className="relative">
              <summary className="cursor-pointer list-none text-ink/70 hover:text-lapis transition-colors">
                Sign In
              </summary>
              <div className="absolute right-0 mt-2 w-40 rounded-lg border border-ink/10 bg-white shadow-lg overflow-hidden">
                <Link
                  href="/parent/login"
                  className="block px-4 py-2.5 text-sm text-ink hover:bg-cream"
                >
                  Parent Login
                </Link>
                <Link
                  href="/teacher/login"
                  className="block px-4 py-2.5 text-sm text-ink hover:bg-cream"
                >
                  Teacher Login
                </Link>
              </div>
            </details>
          )}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/pricing"
            onClick={close}
            className="whitespace-nowrap rounded-full bg-clay px-5 py-2.5 text-sm font-medium text-cream hover:bg-clay-dark transition-colors"
          >
            Enroll your child
          </Link>

          {/* Mobile menu button */}
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden rounded-md p-2 text-2xl leading-none text-lapis hover:bg-ink/5"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      {menuOpen && (
        <nav className="lg:hidden border-t border-ink/10 bg-cream px-6 py-4 text-base font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={close}
              className="block py-3 text-ink/80 hover:text-lapis"
            >
              {link.label}
            </Link>
          ))}

          <div className="mt-2 border-t border-ink/10 pt-2">
            {session ? (
              <>
                <Link
                  href={dashboardHref}
                  onClick={close}
                  className="block py-3 text-ink/80 hover:text-lapis"
                >
                  My Dashboard
                </Link>
                <button
                  type="button"
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="block w-full py-3 text-left text-ink/80 hover:text-lapis"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/parent/login"
                  onClick={close}
                  className="block py-3 text-ink/80 hover:text-lapis"
                >
                  Parent Login
                </Link>
                <Link
                  href="/teacher/login"
                  onClick={close}
                  className="block py-3 text-ink/80 hover:text-lapis"
                >
                  Teacher Login
                </Link>
              </>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}
