import Link from "next/link";

const steps = [
  {
    title: "Book a free trial class",
    body: "Tell us your child's age and current level. We'll schedule a single free 30-minute class with a teacher who fits — no payment details needed.",
  },
  {
    title: "Meet your teacher & get a plan",
    body: "After the trial, your teacher gives you an honest read on where your child is, and recommends a course track and weekly frequency that fits your goals.",
  },
  {
    title: "Choose a plan",
    body: "Pick from Starter, Standard, or Immersive based on how many classes per week works for your family. No long-term contract — change or pause anytime.",
  },
  {
    title: "Start your weekly rhythm",
    body: "Live one-to-one classes happen at the same time each week. Every session is recorded, so your child (or you) can revisit anything that needs review.",
  },
  {
    title: "Stay in the loop",
    body: "A dedicated coordinator — not just the teacher — checks in on progress and sends regular reports, so learning doesn't depend on one person's memory.",
  },
];

const faqs = [
  {
    q: "What if the first teacher isn't a good fit?",
    a: "Tell your coordinator and we'll match your child with someone else — no extra cost, no awkwardness.",
  },
  {
    q: "Can we do classes in Dari or Pashto instead of English?",
    a: "Yes. Most of our teachers are fluent in Dari and/or Pashto and will teach in whichever language is most comfortable for your child.",
  },
  {
    q: "What platform are classes held on?",
    a: "Live sessions run over video call, recorded automatically so you always have a copy to revisit.",
  },
  {
    q: "Can we pause during a trip or exam season?",
    a: "Yes — just let your coordinator know in advance and we'll pause billing until you're ready to resume.",
  },
];

export default function HowItWorksPage() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-20">
      <p className="text-sm font-medium text-clay">How it works</p>
      <h1 className="mt-3 font-display text-4xl text-lapis">
        From first class to lasting habit
      </h1>
      <p className="mt-4 max-w-prose text-ink/70">
        Here&apos;s exactly what happens from the moment you reach out, to
        your child&apos;s first live class, to the ongoing rhythm that
        follows.
      </p>

      <div className="mt-12 space-y-8">
        {steps.map((step, i) => (
          <div key={step.title} className="flex gap-6">
            <div className="flex-shrink-0 font-display text-2xl text-clay">
              {String(i + 1).padStart(2, "0")}
            </div>
            <div>
              <h2 className="font-display text-lg text-lapis">
                {step.title}
              </h2>
              <p className="mt-1 text-sm text-ink/70">{step.body}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16">
        <h2 className="font-display text-2xl text-lapis">
          Common questions
        </h2>
        <div className="mt-6 space-y-6">
          {faqs.map((faq) => (
            <div key={faq.q} className="border-t border-ink/10 pt-6">
              <h3 className="font-medium text-ink">{faq.q}</h3>
              <p className="mt-1 text-sm text-ink/70">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-16 rounded-lg bg-lapis p-8 text-center">
        <h2 className="font-display text-2xl text-cream">
          Ready to try your first class, free?
        </h2>
        <Link
          href="/contact"
          className="mt-6 inline-block rounded-full bg-clay px-6 py-3 text-sm font-medium text-cream hover:bg-clay-dark transition-colors"
        >
          Book a free trial class
        </Link>
      </div>
    </section>
  );
}
