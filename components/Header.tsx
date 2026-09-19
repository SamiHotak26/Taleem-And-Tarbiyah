import Link from "next/link";

const navLinks = [
  { href: "/courses", label: "Courses" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
];

export default function Header() {
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
