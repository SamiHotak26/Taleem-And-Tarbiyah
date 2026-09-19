import Link from "next/link";
import { courses } from "@/lib/courses";
import CourseCard from "@/components/CourseCard";

const stats = [
  { value: "96%", label: "Parent satisfaction" },
  { value: "500+", label: "Active students" },
  { value: "30+", label: "Qualified teachers" },
  { value: "12+", label: "Countries served" },
];

const steps = [
  {
    title: "Choose a plan",
    body: "Pick the schedule and subjects that fit your family — no long-term contract required to start.",
  },
  {
    title: "Meet your teacher",
    body: "We match your child with a teacher based on age, level, and personality, then set up a free trial class.",
  },
  {
    title: "Start learning, live",
    body: "Weekly live sessions, recorded for you to revisit, with a short progress note after every class.",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pt-16 pb-20 md:pt-24 md:pb-28 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-sm font-medium text-clay">
            Live online Quran & Islamic education
          </p>
          <h1 className="mt-4 font-display text-4xl md:text-5xl leading-[1.1] text-lapis">
            Raising children who carry their Deen wherever they grow up.
          </h1>
          <p className="mt-6 text-lg text-ink/70 max-w-prose">
            Ta&apos;lim wa Tarbiya gives Afghan families abroad a structured,
            accountable way to teach children Quran, Islamic studies, and
            heritage language — live, one-to-one, with a real teacher who
            knows their name.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/pricing"
              className="rounded-full bg-clay px-6 py-3 text-sm font-medium text-cream hover:bg-clay-dark transition-colors"
            >
              View plans & enroll
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-lapis px-6 py-3 text-sm font-medium text-lapis hover:bg-lapis hover:text-cream transition-colors"
            >
              Book a free trial class
            </Link>
          </div>
        </div>

        <div className="relative aspect-[4/5] rounded-lg bg-lapis overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-lapis-dark via-lapis to-clay/40" />
        </div>
      </section>

      {/* Stats */}
      <section className="bg-lapis text-cream">
        <div className="mx-auto max-w-6xl px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="font-display text-3xl">{s.value}</p>
              <p className="mt-1 text-sm text-cream/70">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Differentiation */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl text-lapis">
            Not a tutor marketplace. A structured institution.
          </h2>
          <p className="mt-4 text-ink/70">
            We don&apos;t just connect you with a freelance teacher. Every
            class follows a set curriculum, every session is recorded, and a
            dedicated team checks in on progress — so learning doesn&apos;t
            depend on one person&apos;s memory or mood.
          </p>
        </div>
      </section>

      {/* Process */}
      <section className="bg-white/50 border-y border-ink/10">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="font-display text-3xl text-lapis">
            Getting started takes three steps
          </h2>
          <div className="mt-10 grid md:grid-cols-3 gap-10">
            {steps.map((step, i) => (
              <div key={step.title}>
                <p className="font-display text-clay text-2xl">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 font-display text-lg text-lapis">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-ink/70">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <h2 className="font-display text-3xl text-lapis">Our programs</h2>
          <Link href="/courses" className="text-sm font-medium text-clay">
            View all courses
          </Link>
        </div>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.slice(0, 6).map((course) => (
            <CourseCard key={course.slug} course={course} />
          ))}
        </div>
      </section>
    </>
  );
}
