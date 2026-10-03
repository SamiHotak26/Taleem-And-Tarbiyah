import type { Metadata } from "next";
import Link from "next/link";
import { Eye, Lock, MessageCircle, ShieldCheck, UserCheck, Video } from "lucide-react";

export const metadata: Metadata = {
  title: "Safety & Safeguarding — Ta'lim and Tarbiya",
};

const promises = [
  {
    icon: Video,
    title: "Every class is recorded",
    body: "Every lesson is recorded and shared with parents, so you can watch exactly what happened in any class.",
  },
  {
    icon: Eye,
    title: "Parents are always welcome",
    body: "You can sit in on any class, at any time. For younger children, we encourage a parent to be nearby.",
  },
  {
    icon: MessageCircle,
    title: "No private contact with children",
    body: "Teachers only communicate through parents. They never message, call or add children on social media.",
  },
  {
    icon: UserCheck,
    title: "Carefully chosen teachers",
    body: "Every teacher is interviewed, reference-checked and trained before teaching, and agrees to our code of conduct.",
  },
  {
    icon: ShieldCheck,
    title: "Male and female teachers",
    body: "Families can choose a male or female teacher, whichever they feel most comfortable with.",
  },
  {
    icon: Lock,
    title: "Your information stays private",
    body: "Children's details and recordings are only seen by our admin team, the teacher and you.",
  },
];

export default function SafeguardingPage() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-20">
      <p className="text-sm font-medium text-clay">Safety &amp; Safeguarding</p>
      <h1 className="mt-3 font-display text-4xl text-lapis">
        Your child&apos;s safety comes first
      </h1>
      <p className="mt-4 max-w-2xl text-ink/70">
        Learning online should feel just as safe as learning at your local
        masjid. These are the promises we make to every family.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {promises.map(({ icon: Icon, title, body }) => (
          <div key={title} className="rounded-3xl border border-ink/10 bg-white p-6">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-lapis text-white">
              <Icon className="h-5 w-5" />
            </span>
            <h2 className="mt-4 font-display text-xl text-lapis">{title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink/70">{body}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 rounded-3xl bg-amber-50 p-8">
        <h2 className="font-display text-2xl text-lapis">Raising a concern</h2>
        <p className="mt-3 leading-relaxed text-ink/80">
          If anything in a class worries you or your child, please tell us
          straight away by emailing{" "}
          <a href="mailto:info@taleemandtarbiyah.com" className="font-medium text-lapis underline">
            info@taleemandtarbiyah.com
          </a>
          . Every concern is taken seriously, looked into promptly and kept
          confidential. If a child is ever in immediate danger, please contact
          your local emergency services first.
        </p>
      </div>

      <p className="mt-8 text-sm text-ink/60">
        See also our{" "}
        <Link href="/privacy" className="text-lapis underline">
          Privacy Policy
        </Link>
        .
      </p>
    </section>
  );
}
