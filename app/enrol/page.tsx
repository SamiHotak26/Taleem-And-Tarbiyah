import { courses } from "@/lib/courses";
import { plans } from "@/lib/plans";
import { sendEnquiry } from "./actions";

const input =
  "mt-1 block w-full rounded-md border border-ink/20 bg-white px-4 py-2.5 text-sm focus:border-lapis focus:outline-none focus:ring-1 focus:ring-lapis";
const label = "block text-sm font-medium text-ink/70";

export default function EnrolPage({
  searchParams,
}: {
  searchParams: { plan?: string; sent?: string; error?: string };
}) {
  if (searchParams.sent) {
    return (
      <section className="mx-auto max-w-xl px-6 py-20">
        <div className="rounded-lg border border-ink/10 bg-white/60 p-8 text-center">
          <p className="font-display text-2xl text-lapis">Thank you!</p>
          <p className="mt-2 text-sm text-ink/70">
            We&apos;ve received your request and will contact you within one
            business day, in sha Allah, to arrange a free trial class.
          </p>
        </div>
      </section>
    );
  }

  const planNames = [...plans.map((p) => p.name), "Not sure yet"];
  const chosenPlan = planNames.includes(searchParams.plan ?? "")
    ? searchParams.plan
    : "Not sure yet";

  return (
    <section className="mx-auto max-w-xl px-6 py-20">
      <p className="text-sm font-medium text-clay">Enrol</p>
      <h1 className="mt-2 font-display text-3xl text-lapis">Enrol your child</h1>
      <p className="mt-2 text-sm text-ink/60">
        Tell us a little about your family and we&apos;ll arrange a free trial
        class. No payment needed today.
      </p>

      {searchParams.error && (
        <p className="mt-6 rounded-md bg-clay/15 px-4 py-3 text-sm font-medium text-clay-dark">
          Please fill in your name, email and your child&apos;s name.
        </p>
      )}

      <form action={sendEnquiry} className="mt-8 space-y-4">
        {/* Spam trap — hidden from real visitors */}
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
          aria-hidden="true"
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <label className={label}>
            Parent name
            <input name="parent_name" required className={input} />
          </label>
          <label className={label}>
            Email
            <input name="email" type="email" required className={input} />
          </label>
        </div>

        <label className={label}>
          Phone / WhatsApp (optional)
          <input name="phone" type="tel" className={input} />
        </label>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className={label}>
            Child&apos;s name
            <input name="child_name" required className={input} />
          </label>
          <label className={label}>
            Child&apos;s age
            <input name="child_age" className={input} />
          </label>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className={label}>
            Course
            <select name="course" className={input}>
              {courses.map((c) => (
                <option key={c.slug} value={c.title}>
                  {c.title}
                </option>
              ))}
            </select>
          </label>
          <label className={label}>
            Plan
            <select name="plan" className={input} defaultValue={chosenPlan}>
              {planNames.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </label>
        </div>

        <label className={label}>
          Anything else we should know? (optional)
          <textarea name="message" rows={4} maxLength={2000} className={input} />
        </label>

        <button
          type="submit"
          className="w-full rounded-full bg-clay px-6 py-3 text-sm font-medium text-cream hover:bg-clay-dark transition-colors"
        >
          Send enrolment request
        </button>
      </form>
    </section>
  );
}
