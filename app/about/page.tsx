const values = [
  {
    title: "Structured, not improvised",
    body: "Every class follows a set curriculum with clear milestones, so progress doesn't depend on any one teacher's memory or mood.",
  },
  {
    title: "Rooted in heritage",
    body: "Alongside Quran and Islamic studies, we help children stay connected to Dari and Pashto — language, not just religion, is part of identity.",
  },
  {
    title: "Accountable to parents",
    body: "A dedicated coordinator — separate from the teacher — checks in on progress and answers your questions directly.",
  },
];

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-20">
      <p className="text-sm font-medium text-clay">About us</p>
      <h1 className="mt-3 font-display text-4xl text-lapis">
        Built for families raising children far from home
      </h1>

      <p className="mt-6 text-ink/80 leading-relaxed">
        Ta&apos;lim wa Tarbiya started from a simple observation: Afghan
        families abroad want their children to grow up knowing the Quran,
        their Deen, and their language — but finding a teacher who is
        qualified, reliable, and actually available on a weekly schedule is
        hard to do alone.
      </p>
      <p className="mt-4 text-ink/80 leading-relaxed">
        We built a structured institution instead of a freelance
        marketplace — one where curriculum, accountability, and consistency
        don&apos;t depend on finding the right person by luck.
      </p>

      <div className="mt-12 grid sm:grid-cols-3 gap-6">
        {values.map((v) => (
          <div key={v.title} className="rounded-lg border border-ink/10 bg-white/60 p-6">
            <h2 className="font-display text-lg text-lapis">{v.title}</h2>
            <p className="mt-2 text-sm text-ink/70">{v.body}</p>
          </div>
        ))}
      </div>

      <div className="mt-16">
        <h2 className="font-display text-2xl text-lapis">Our teachers</h2>
        <p className="mt-3 text-ink/70 leading-relaxed">
          Every teacher is vetted for both credentials — Ijazah, formal
          Islamic studies training, or teaching certification — and the
          ability to actually connect with children over video call.
          Fluency in Dari and/or Pashto is standard, not an exception.
        </p>
      </div>
    </section>
  );
}
