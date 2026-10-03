import Link from "next/link";
import Image from "next/image";
import {
  BookOpen,
  CalendarCheck,
  Heart,
  Moon,
  Sparkles,
  Star,
  Users,
  Video,
} from "lucide-react";
import { courses } from "@/lib/courses";
import heroImage from "./hero.jpg";

const stats = [
  { value: "100%", label: "Parent satisfaction", color: "bg-sky-100 text-sky-800" },
  { value: "12", label: "Active students", color: "bg-amber-100 text-amber-800" },
  { value: "2", label: "Teachers", color: "bg-emerald-100 text-emerald-800" },
  { value: "5", label: "Countries served", color: "bg-rose-100 text-rose-800" },
];

const features = [
  { icon: Users, text: "Live 1-to-1 classes" },
  { icon: Video, text: "Every class recorded" },
  { icon: Star, text: "Free trial class" },
];

const steps = [
  {
    icon: CalendarCheck,
    color: "bg-sky-500",
    title: "Choose a plan",
    body: "Pick the schedule and subjects that fit your family — no long-term contract required to start.",
  },
  {
    icon: Heart,
    color: "bg-clay",
    title: "Meet your teacher",
    body: "We match your child with a kind teacher based on age, level and personality, then set up a free trial class.",
  },
  {
    icon: Sparkles,
    color: "bg-emerald-500",
    title: "Start learning, live",
    body: "Weekly live one-to-one classes, recorded so you and your child can watch them again anytime.",
  },
];

const cardColors = [
  "bg-sky-50 border-sky-200",
  "bg-amber-50 border-amber-200",
  "bg-emerald-50 border-emerald-200",
  "bg-rose-50 border-rose-200",
  "bg-violet-50 border-violet-200",
  "bg-orange-50 border-orange-200",
];

const iconColors = [
  "bg-sky-500",
  "bg-amber-500",
  "bg-emerald-500",
  "bg-rose-500",
  "bg-violet-500",
  "bg-orange-500",
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-sky-100 via-sky-50 to-cream">
        {/* Playful background shapes */}
        <div aria-hidden className="pointer-events-none absolute -top-16 -left-16 h-64 w-64 rounded-full bg-amber-200/60 blur-2xl" />
        <div aria-hidden className="pointer-events-none absolute top-40 -right-20 h-72 w-72 rounded-full bg-rose-200/50 blur-2xl" />
        <div aria-hidden className="pointer-events-none absolute bottom-0 left-1/3 h-48 w-48 rounded-full bg-emerald-200/50 blur-2xl" />
        <Star aria-hidden className="absolute top-10 right-1/3 h-6 w-6 text-amber-400 fill-amber-300" />
        <Star aria-hidden className="absolute top-1/2 left-6 h-4 w-4 text-sky-400 fill-sky-300" />
        <Moon aria-hidden className="absolute bottom-12 right-10 h-8 w-8 text-amber-400 fill-amber-200" />

        <div className="relative mx-auto max-w-6xl px-6 pt-14 pb-20 md:pt-20 md:pb-24 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-clay shadow-sm">
              <BookOpen className="h-4 w-4" />
              Live online Quran &amp; Islamic education
            </p>
            <h1 className="mt-5 font-display text-4xl md:text-6xl font-semibold leading-[1.1] text-lapis">
                          Teaching children to love their Deen{" "}
              <span className="text-clay">and be proud of their heritage, wherever they grow up.</span>
            </h1>
            <p className="mt-6 text-lg text-ink/75 max-w-prose">
                           Ta&apos;lim and Tarbiya gives Afghan families abroad a fun,
              structured way to teach children Quran, Islamic studies, Dari
              and Pashto, live and one-to-one, with a caring teacher who
              knows each child by name.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/enrol"
                className="rounded-full bg-clay px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-orange-200 hover:bg-clay-dark hover:-translate-y-0.5 transition-all"
              >
                Book a free trial class
              </Link>
              <Link
                href="/pricing"
                className="rounded-full bg-white px-7 py-3.5 text-base font-semibold text-lapis border-2 border-lapis hover:bg-lapis hover:text-white transition-colors"
              >
                View plans
              </Link>
            </div>

            <ul className="mt-8 flex flex-wrap gap-3">
              {features.map(({ icon: Icon, text }) => (
                <li
                  key={text}
                  className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-sm font-medium text-ink shadow-sm"
                >
                  <Icon className="h-4 w-4 text-sky-600" />
                  {text}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative">
            <div className="relative aspect-[4/5] rotate-2 rounded-[2rem] border-8 border-white bg-lapis overflow-hidden shadow-2xl">
              <Image
                src={heroImage}
                alt="A child reading the Quran, following the lines with her finger"
                fill
                priority
                placeholder="blur"
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-5 -left-4 md:-left-8 flex items-center gap-3 rounded-2xl bg-white px-5 py-3 shadow-xl">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-400">
                <Star className="h-5 w-5 text-white fill-white" />
              </span>
              <div>
                <p className="text-sm font-bold text-ink">Free trial class</p>
                <p className="text-xs text-ink/60">No payment needed</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {stats.map((s) => (
            <div key={s.label} className={`rounded-3xl p-6 text-center ${s.color}`}>
              <p className="font-display text-4xl font-semibold">{s.value}</p>
              <p className="mt-1 text-sm font-medium opacity-80">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why us */}
      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="rounded-[2rem] bg-lapis px-8 py-12 md:px-14 text-white relative overflow-hidden">
          <Sparkles aria-hidden className="absolute top-6 right-8 h-10 w-10 text-amber-300" />
          <h2 className="font-display text-3xl md:text-4xl font-semibold max-w-2xl">
            Not a tutor marketplace. A small academy that knows your child.
          </h2>
          <p className="mt-4 max-w-2xl text-white/85 text-lg">
            Your child learns live and one-to-one with one of our own
            teachers, and every class is recorded, so you can see exactly
            what was covered and help your child revise at home.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="bg-amber-50 border-y border-amber-100">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-lapis text-center">
            Getting started is easy
          </h2>
          <p className="mt-3 text-center text-ink/70">Just three simple steps</p>
          <div className="mt-12 grid md:grid-cols-3 gap-8">
            {steps.map(({ icon: Icon, color, title, body }, i) => (
              <div
                key={title}
                className="relative rounded-3xl bg-white p-8 pt-12 text-center shadow-sm"
              >
                <span
                  className={`absolute -top-7 left-1/2 -translate-x-1/2 flex h-14 w-14 items-center justify-center rounded-full ${color} text-white shadow-lg`}
                >
                  <Icon className="h-7 w-7" />
                </span>
                <p className="text-sm font-bold text-clay">Step {i + 1}</p>
                <h3 className="mt-1 font-display text-xl font-semibold text-lapis">{title}</h3>
                <p className="mt-3 text-sm text-ink/70">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-lapis">
            Our programs
          </h2>
          <Link href="/courses" className="text-sm font-semibold text-clay hover:underline">
            View all courses →
          </Link>
        </div>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.slice(0, 6).map((course, i) => (
            <Link
              key={course.slug}
              href={`/courses/${course.slug}`}
              className={`group rounded-3xl border-2 p-6 transition-all hover:-translate-y-1 hover:shadow-lg ${cardColors[i % cardColors.length]}`}
            >
              <span
                className={`flex h-12 w-12 items-center justify-center rounded-2xl ${iconColors[i % iconColors.length]} text-white`}
              >
                <BookOpen className="h-6 w-6" />
              </span>
              <p className="mt-4 text-xs font-bold uppercase tracking-wide text-ink/50">
                {course.level}
              </p>
              <h3 className="mt-1 font-display text-xl font-semibold text-lapis">
                {course.title}
              </h3>
              <p className="mt-2 text-sm text-ink/70">{course.tagline}</p>
              <p className="mt-4 text-sm font-semibold text-clay group-hover:underline">
                Learn more →
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Final call to action */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="rounded-[2rem] bg-gradient-to-r from-clay to-amber-500 px-8 py-12 md:px-14 text-center text-white">
          <h2 className="font-display text-3xl md:text-4xl font-semibold">
            Ready to start your child&apos;s journey?
          </h2>
          <p className="mt-3 text-white/90 text-lg">
            Book a free trial class today, no payment needed.
          </p>
          <Link
            href="/enrol"
            className="mt-8 inline-block rounded-full bg-white px-8 py-3.5 text-base font-semibold text-clay shadow-lg hover:-translate-y-0.5 transition-transform"
          >
            Book a free trial class
          </Link>
        </div>
      </section>
    </>
  );
}
