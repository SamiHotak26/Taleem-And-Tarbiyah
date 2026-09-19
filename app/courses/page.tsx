import { courses } from "@/lib/courses";
import CourseCard from "@/components/CourseCard";

export default function CoursesPage() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <p className="text-sm font-medium text-clay">Our programs</p>
      <h1 className="mt-3 font-display text-4xl text-lapis">
        A complete Islamic education, not just Quran recitation
      </h1>
      <p className="mt-4 max-w-prose text-ink/70">
        Every course is taught live, one-to-one, by a vetted teacher — with
        progress tracked by an independent team so you always know how your
        child is doing.
      </p>

      <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <CourseCard key={course.slug} course={course} />
        ))}
      </div>
    </section>
  );
}
