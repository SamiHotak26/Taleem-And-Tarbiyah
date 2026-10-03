import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — Ta'lim and Tarbiya",
};

const sections = [
  {
    title: "Who we are",
    body: [
      "Ta'lim and Tarbiya is an online academy teaching Quran, Islamic studies, Dari and Pashto to children, run from Afghanistan and serving families around the world, including the UK and Europe.",
      "If you have any questions about this policy or your data, email us at info@taleemandtarbiyah.com.",
    ],
  },
  {
    title: "What information we collect",
    body: [
      "When you enrol: the parent's name, email address and phone or WhatsApp number (optional), your child's first name and age, the course and plan you choose, and any message you send us.",
      "When your child joins classes: class notes, progress records and recordings of live lessons.",
      "We do not ask for children's email addresses, photos, home addresses or payment card details on this website.",
    ],
  },
  {
    title: "Why we use it",
    body: [
      "To contact you about your enrolment and arrange a free trial class.",
      "To match your child with a suitable teacher and run their classes.",
      "To share class records and recordings with you, so you can follow your child's progress.",
      "To keep our classes safe (see our Safety & Safeguarding page).",
      "We never sell your information and we never use it for advertising.",
    ],
  },
  {
    title: "Our legal basis",
    body: [
      "We use your information because it is needed to provide the classes you have asked for (contract), and because we have a legitimate interest in keeping classes safe and running well. Information about children is always provided by, and managed through, their parent or guardian.",
    ],
  },
  {
    title: "Who can see it",
    body: [
      "Only our admin team and your child's teacher. Parents can only see their own children's records.",
      "We use trusted service providers to run the website and classes: Vercel (website hosting), Supabase (secure database), Formspree and Zoho (email). They store data on our behalf and may be located outside the UK; we only use providers that protect data to recognised standards.",
    ],
  },
  {
    title: "How long we keep it",
    body: [
      "Enrolment requests that do not go ahead are deleted within 12 months.",
      "Class records and recordings are kept while your child is enrolled and deleted within 12 months after they leave, unless you ask us to delete them sooner.",
    ],
  },
  {
    title: "Your rights",
    body: [
      "You can ask us to see, correct or delete the information we hold about you or your child at any time. Just email info@taleemandtarbiyah.com and we will reply within one month.",
      "If you live in the UK and are unhappy with how we handle your data, you can complain to the Information Commissioner's Office (ico.org.uk). If you live in the EU, you can contact your local data protection authority.",
    ],
  },
  {
    title: "Keeping your data secure",
    body: [
      "Passwords are encrypted, accounts are protected by login, and our database is only accessible to our own systems. No system is perfectly secure, but we take sensible steps to protect your information.",
    ],
  },
  {
    title: "Changes to this policy",
    body: [
      "If we change this policy, we will update this page and the date below.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-20">
      <p className="text-sm font-medium text-clay">Privacy</p>
      <h1 className="mt-3 font-display text-4xl text-lapis">Privacy Policy</h1>
      <p className="mt-4 text-ink/70">
        We keep your family&apos;s information safe and only use it to teach
        your child. This page explains what we collect and why, in plain
        language.
      </p>

      <div className="mt-10 space-y-8">
        {sections.map((s) => (
          <div key={s.title}>
            <h2 className="font-display text-2xl text-lapis">{s.title}</h2>
            {s.body.map((text) => (
              <p key={text} className="mt-3 leading-relaxed text-ink/80">
                {text}
              </p>
            ))}
          </div>
        ))}
      </div>

      <p className="mt-12 text-sm text-ink/50">Last updated: 3 October 2026</p>
    </section>
  );
}
