"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

const navLinks = [
  { href: "/courses", label: "Courses" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
];

export default function Header() {
  const { data: session, status } = useSession();
  const role = (session?.user as { role?: string } | undefined)?.role;
  const dashboardHref =
    role === "teacher" ? "/teacher/dashboard" : "/parent/dashboard";

  return (
    <header className="border-b border-ink/10 bg-cream/95 backdrop-blur sticky top-0 z-40">
      <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
        <Link href="/" className="font-display text-xl text-lapis">
          Ta&apos;lim wa Tarbiya
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
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

        <Link
          href="/pricing"
          className="rounded-full bg-clay px-5 py-2.5 text-sm font-medium text-cream hover:bg-clay-dark transition-colors"
        >
          Enroll your child
        </Link>
      </div>
    </header>
  );
}
