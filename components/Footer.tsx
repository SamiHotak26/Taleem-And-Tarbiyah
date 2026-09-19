import Link from "next/link";
import { courses } from "@/lib/courses";

export default function Footer() {
  return (
    <footer className="bg-lapis-dark text-cream/80">
      <div className="mx-auto max-w-6xl px-6 py-16 grid gap-10 sm:grid-cols-2 md:grid-cols-4">
        <div>
          <p className="font-display text-lg text-cream">Ta&apos;lim wa Tarbiya</p>
          <p className="mt-3 text-sm leading-relaxed text-cream/60">
            Structured Quran and Islamic education for Afghan families
            raising children abroad.
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold text-cream">Courses</p>
          <ul className="mt-3 space-y-2 text-sm">
            {courses.slice(0, 5).map((c) => (
              <li key={c.slug}>
                <Link href={`/courses/${c.slug}`} className="hover:text-clay-light">
                  {c.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold text-cream">Quick Links</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/how-it-works" className="hover:text-clay-light">How It Works</Link></li>
            <li><Link href="/pricing" className="hover:text-clay-light">Pricing</Link></li>
            <li><Link href="/about" className="hover:text-clay-light">About</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold text-cream">Contact</p>
          <ul className="mt-3 space-y-2 text-sm text-cream/60">
            <li>info@talemwatarbiya.org</li>
            <li>Available Mon–Sat</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-cream/10 py-6 text-center text-xs text-cream/40">
        © {new Date().getFullYear()} Ta&apos;lim wa Tarbiya. All rights reserved.
      </div>
    </footer>
  );
}
