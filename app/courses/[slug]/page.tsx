import Link from "next/link";
import { notFound } from "next/navigation";
import { courses, getCourseBySlug } from "@/lib/courses";

export function generateStaticParams() {
  return courses.map((c) => ({ slug: c.slug }));
}

export default function CoursePage({ params }: { params: { slug: string } }) {
  const course = getCourseBySlug(params.slug);
  if (!course) return notFound();

  return (
    <section className="mx-auto max-w-3xl px-6 py-20">
      <p className="text-sm font-medium text-clay">{course.level}</p>
      <h1 className="mt-3 font-display text-4xl text-lapis">
        {course.title}
      </h1>
      <p className="mt-2 text-lg text-ink/60">{course.tagline}</p>

      <p className="mt-8 text-ink/80 leading-relaxed">{course.description}</p>

      <div className="mt-8 rounded-lg border border-ink/10 bg-white/60 p-6">
        <p className="text-xs font-medium uppercase tracking-wide text-sage">
          Taught by
        </p>
        <p className="mt-1 font-display text-lapis">{course.credential}</p>
      </div>

      <div className="mt-10 flex flex-wrap gap-4">
        <Link
          href="/pricing"
          className="rounded-full bg-clay px-6 py-3 text-sm font-medium text-cream hover:bg-clay-dark transition-colors"
        >
          View plans & enroll
        </Link>
        <Link
          href="/courses"
          className="rounded-full border border-lapis px-6 py-3 text-sm font-medium text-lapis hover:bg-lapis hover:text-cream transition-colors"
        >
          Back to all courses
        </Link>
      </div>
    </section>
  );
}
