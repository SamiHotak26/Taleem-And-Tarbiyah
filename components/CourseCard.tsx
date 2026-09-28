import Link from "next/link";
import { Course } from "@/lib/courses";

export default function CourseCard({ course }: { course: Course }) {
  return (
    <Link
      href={`/courses/${course.slug}`}
      className="group block rounded-lg border border-ink/10 bg-white/60 p-6 transition-colors hover:border-clay"
    >
      <p className="text-xs font-medium uppercase tracking-wide text-sage">
        {course.level}
      </p>
      <h3 className="mt-2 font-display text-xl text-lapis">{course.title}</h3>
      <p className="mt-2 text-sm text-ink/70">{course.tagline}</p>
      <p className="mt-4 text-xs font-medium text-clay">{course.credential}</p>
    </Link>
  );
}
